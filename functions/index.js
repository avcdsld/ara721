import { onRequest } from 'firebase-functions/v2/https';
import { defineSecret } from 'firebase-functions/params';
import { logger } from 'firebase-functions';
import { initializeApp } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

import { submitTransaction, TRANSACTIONS } from './flow.js';

const FLOW_PRIVATE_KEY = defineSecret('FLOW_PRIVATE_KEY');

initializeApp();
const db = getFirestore();

const PER_IP_INTERVAL_MS = 60 * 1000; // one request per IP per minute
const DAILY_LIMIT = 100; // site-wide, protects the account's gas balance
const GLOBAL_SPACING_MS = 3000; // keeps proposer sequence numbers from racing

const COLLECTION = 'artRateLimits';

/** Day key on a fixed +09:00 offset, so the daily budget resets at midnight JST. */
function dayKeyJst(now) {
  return new Date(now + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
}

function clientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim();
  }
  return req.ip || 'unknown';
}

/**
 * Atomically checks every limit and records the attempt. Returns null when the
 * caller may proceed, otherwise an object describing which limit was hit.
 */
async function reserveSlot(ip, now) {
  const globalRef = db.collection(COLLECTION).doc(`global-${dayKeyJst(now)}`);
  // Firestore document ids cannot contain "/", which IPv6 CIDR-ish values never
  // have, but encode defensively anyway.
  const ipRef = db.collection(COLLECTION).doc(`ip-${encodeURIComponent(ip)}`);

  return db.runTransaction(async (tx) => {
    const [globalSnap, ipSnap] = await Promise.all([
      tx.get(globalRef),
      tx.get(ipRef)
    ]);

    const globalData = globalSnap.data() || { count: 0, lastSubmitAt: 0 };
    const ipData = ipSnap.data() || { lastRequestAt: 0 };

    if (now - (ipData.lastRequestAt || 0) < PER_IP_INTERVAL_MS) {
      const retryAfter = Math.ceil(
        (PER_IP_INTERVAL_MS - (now - ipData.lastRequestAt)) / 1000
      );
      return { limit: 'ip', retryAfter };
    }

    if ((globalData.count || 0) >= DAILY_LIMIT) {
      return { limit: 'daily', retryAfter: null };
    }

    if (now - (globalData.lastSubmitAt || 0) < GLOBAL_SPACING_MS) {
      return { limit: 'busy', retryAfter: 3 };
    }

    tx.set(ipRef, { lastRequestAt: now }, { merge: true });
    tx.set(
      globalRef,
      {
        count: FieldValue.increment(1),
        lastSubmitAt: now,
        expiresAt: new Date(now + 3 * 24 * 60 * 60 * 1000)
      },
      { merge: true }
    );
    return null;
  });
}

export const art = onRequest(
  {
    region: 'asia-northeast1',
    secrets: [FLOW_PRIVATE_KEY],
    maxInstances: 3,
    timeoutSeconds: 60,
    cors: ['https://ara721.art', 'https://ara721-art.web.app']
  },
  async (req, res) => {
    if (req.method !== 'POST') {
      res.set('Allow', 'POST');
      return res.status(405).json({ error: 'method not allowed' });
    }

    // The caller picks an action, never the Cadence. Anything else is rejected
    // before the private key is touched.
    const action = req.body?.action;
    if (typeof action !== 'string' || !Object.hasOwn(TRANSACTIONS, action)) {
      return res.status(400).json({
        error: 'action must be one of: ' + Object.keys(TRANSACTIONS).join(', ')
      });
    }

    const now = Date.now();
    const ip = clientIp(req);

    let limited;
    try {
      limited = await reserveSlot(ip, now);
    } catch (err) {
      logger.error('rate limit check failed', err);
      return res.status(503).json({ error: 'rate limiter unavailable' });
    }

    if (limited) {
      if (limited.retryAfter) res.set('Retry-After', String(limited.retryAfter));
      return res.status(429).json({ error: 'rate limited', ...limited });
    }

    try {
      const transactionId = await submitTransaction(
        action,
        FLOW_PRIVATE_KEY.value()
      );
      logger.info('submitted', { action, transactionId });
      return res.status(200).json({ transactionId });
    } catch (err) {
      logger.error('transaction failed', { action, message: err?.message });
      return res.status(502).json({ error: 'transaction failed' });
    }
  }
);
