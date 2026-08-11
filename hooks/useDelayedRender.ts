import { useEffect, useRef, useState } from 'react';

type Options = {
  enterDelay?: number;
  exitDelay?: number;
};

/**
 * Keeps a component mounted for `exitDelay` ms after it is deactivated so an
 * exit transition can play, and flips `rendered` on `enterDelay` ms after it is
 * activated so an enter transition has a frame to start from.
 *
 * Replaces the `use-delayed-render` package, which is unmaintained and only
 * declares support for React 16.
 */
export default function useDelayedRender(
  active = false,
  { enterDelay = 0, exitDelay = 0 }: Options = {}
) {
  const [mounted, setMounted] = useState(active);
  const [rendered, setRendered] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const activatedAt = useRef<number>(null);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);

    if (active) {
      activatedAt.current = Date.now();
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMounted(true);
      if (enterDelay <= 0) {
        setRendered(true);
      } else {
        timer.current = setTimeout(() => setRendered(true), enterDelay);
      }
      return;
    }

    setRendered(false);

    // If it was only active briefly, cut the exit short by the same amount so
    // rapid toggling still feels responsive.
    let delay = exitDelay;
    if (activatedAt.current !== null) {
      const elapsed = Date.now() - activatedAt.current;
      if (enterDelay && elapsed < enterDelay) delay = 0;
      else if (exitDelay && elapsed < exitDelay) delay = elapsed;
    }

    if (delay <= 0) {
      setMounted(false);
    } else {
      timer.current = setTimeout(() => setMounted(false), delay);
    }
  }, [active, enterDelay, exitDelay]);

  useEffect(() => () => clearTimeout(timer.current), []);

  return { mounted, rendered };
}
