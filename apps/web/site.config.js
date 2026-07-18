/** @typedef {import("./types/site.config").SiteConfig} SiteConfig */

/**
 * Site configuration - JavaScript version for use in build tools
 * This is the source of truth for site configuration
 * @type {SiteConfig}
 */
const siteConfig = {
  name: 'Coundflare Next.js Monorepo Template',
  description:
    'A starter template for building Next.js applications with Cloudflare Workers in a monorepo setup using Turborepo and PNPM.',
  url: 'https://example.com',
  ogImage: 'https://example.com/og.png',
  author: {
    name: 'Author Name',
    email: 'Author Email',
  },
  // Theme configuration
  theme: {
    enabled: true, // Set to false to disable theme switching
    defaultTheme: 'system', // 'light', 'dark', or 'system'
  },
};

module.exports = siteConfig;
