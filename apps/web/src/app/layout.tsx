import type { Metadata } from 'next';
import { cn } from '@internal/utils';

import { Geist, Geist_Mono } from 'next/font/google';
import siteConfig from '../../site.config';
import { ThemeProvider } from '../components/ThemeProvider';
import { ThemeToggle } from '../components/ThemeToggle';

// import VisitTracker from '../components/VisitTracker'; // Uncomment to enable visitor tracking
import { metadata as siteMetadata } from './metadata';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isThemeEnabled = siteConfig.theme?.enabled !== false;
  const defaultTheme = siteConfig.theme?.defaultTheme ?? 'system';

  return (
    <html
      lang="en"
      className={cn(geistSans.variable, geistMono.variable, defaultTheme)}
      suppressHydrationWarning
    >
      <head>
        <meta name="darkreader" content="NO-DARKREADER-PLUGIN" />
        <script
          // eslint-disable-next-line react-dom/no-dangerously-set-innerhtml
          dangerouslySetInnerHTML={{
            // https://github.com/pacocoursey/next-themes/issues/349
            __html: `
              // Polyfill for __name function used by next-themes
              if (typeof __name === 'undefined') {
                window.__name = function(fn, name) {
                  if (fn && typeof fn === 'function') {
                    Object.defineProperty(fn, 'name', { value: name, configurable: true });
                  }
                  return fn;
                };
              }
            `,
          }}
        />
      </head>
      <body className="bg-background text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme={defaultTheme}
          enableSystem
          disableTransitionOnChange={false}
        >
          <div className="bg-background text-foreground min-h-screen transition-colors">
            {/* Theme toggle in top-right corner */}
            {isThemeEnabled && (
              <div className="fixed top-4 right-4 z-50">
                <ThemeToggle />
              </div>
            )}
            {/* <VisitTracker /> */} {/* Uncomment to enable visitor tracking */}
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
