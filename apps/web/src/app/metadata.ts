import type { Metadata } from 'next';
import siteConfig from '../../site.config';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ['developer', 'portfolio', 'nextjs', 'react', 'typescript'],
  authors: [{ name: siteConfig.author.name, url: siteConfig.url }],
  creator: siteConfig.author.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        // This image is used for Open Graph metadata. It controls the preview shown when your site is shared on social media, helping with branding and engagement.
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  // twitter: {
  //   card: "summary_large_image",
  //   title: SITE_CONFIG.name,
  //   description: SITE_CONFIG.description,
  //   images: ["/og-image.svg"],
  //   creator: "@internal",
  // },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  verification: {
    google: '', // Add Google Search Console verification
    yandex: '', // Add Yandex verification if needed
  },
};
