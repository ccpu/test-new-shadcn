import type { NextConfig } from 'next';

// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';

const nextConfig: NextConfig = {
  output: 'standalone',
};

// 🔒 SAFETY CHECK: Only run this simulation in development
// eslint-disable-next-line no-restricted-properties, node/prefer-global/process
if (process.env.NODE_ENV === 'development') {
  // You can also pass options here to connect to REAL remote data
  // e.g. { experimental: { remoteBindings: true } }
  initOpenNextCloudflareForDev().catch(console.error);
}

export default nextConfig;
