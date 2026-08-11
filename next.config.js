/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true
  },
  trailingSlash: true
};

// Security headers are served by Firebase Hosting (see firebase.json).
// `headers()` here would be silently ignored under `output: 'export'`.
