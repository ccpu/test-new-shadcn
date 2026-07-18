// src/env.ts

import siteConfig from '../site.config';

// Type-safe environment loader for next-sitemap config
export const env = {
  SITE_URL: siteConfig.url,
};
