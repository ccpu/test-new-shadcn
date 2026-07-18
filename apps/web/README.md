# Web App

Next.js 15 app with Cloudflare Workers deployment, analytics, and optimized validation architecture.

## Features

- **Next.js 15** with App Router
- **Tailwind CSS v4** styling with dark mode support
- **tailwindcss-animated** - Pre-built animations for smooth UX
- **Theme System** - Light, Dark, and System preference modes with next-themes
- **Cloudflare D1** database with visit tracking
- **next-sitemap** for automated sitemap and robots.txt generation
- **Simplified validation** - Zod only at API boundaries
- **TypeScript** throughout

## Development

```bash
pnpm dev      # Start dev server
pnpm build    # Build for production
pnpm sitemap  # Generate sitemap and robots.txt
pnpm deploy   # Deploy to Cloudflare
```

`pnpm deploy` validates `wrangler.jsonc` first and stops if `yourdomain.com` has not been replaced with your real custom domain.

## SEO & Sitemaps

This app uses `next-sitemap` to automatically generate:

- `sitemap.xml` - Contains all discoverable routes
- `robots.txt` - Search engine crawling rules

The sitemap is automatically generated during the build process, or can be generated manually with `pnpm sitemap`. Configuration is in `next-sitemap.config.js`.

## Routes

- `/` - Home page
- `/analytics` - Visit analytics dashboard
- `/blog` - Blog pages
- `/contact` - Contact page
- `/api/visits` - Visit tracking API

## Structure

```
src/
├── app/           # App Router pages & API routes
├── components/    # React components
├── db/           # Drizzle schema & database
└── lib/          # Services, repositories, hooks
```

## Configuration Files

- `site.config.js` - JavaScript version for build tools
- `next-sitemap.config.js` - Sitemap generation configuration
- `next.config.ts` - Next.js configuration with Cloudflare Workers support
- `drizzle.config.ts` - Database configuration
- `wrangler.jsonc` - Cloudflare Workers configuration with a placeholder custom domain that must be replaced before deployment

## Theme System

The app includes a comprehensive theme system built with `next-themes`:

- **Light Mode** - Clean and bright interface
- **Dark Mode** - Comfortable for low-light environments
- **System Mode** - Automatically follows your OS preference
- **Persistent** - Remembers your choice across sessions
- **Configurable** - Can be enabled/disabled via `site.config.ts`

Toggle between themes using the button in the top-right corner, or cycle through Light → Dark → System modes.

## Animations

This template uses **tailwindcss-animated** for smooth, performant animations:

- **Pre-built animations** - Fade, bounce, wiggle, zoom, and more
- **Utility classes** - Control duration, delay, timing, and iteration
- **Responsive support** - Apply animations based on screen size
- **Hover animations** - Interactive button and link effects
- **Optimized performance** - CSS-based animations for best performance

Key animation patterns used:

- Page load sequences with staggered delays
- Hover effects on interactive elements
- Entrance animations for content sections

For more animations and customization options, see the [tailwindcss-animated documentation](https://tailwindcss-animated.com/).
