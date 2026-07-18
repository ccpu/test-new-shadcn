import { cn } from '@internal/utils';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="bg-background text-foreground grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-sans transition-colors sm:p-20">
      <main
        className={cn(
          'row-start-2 flex flex-col items-center gap-[32px] sm:items-start',
          // Animation classes
          'animate-fade-up animate-delay-200',
        )}
      >
        <Image
          className={cn(
            'transition-all dark:invert',
            // Animation classes
            'animate-bounce-in animate-delay-300',
          )}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <ol
          className={cn(
            'text-foreground list-inside list-decimal text-center font-mono text-sm/6 sm:text-left',
            // Animation classes
            'animate-fade-up animate-delay-500',
          )}
        >
          <li
            className={cn(
              'mb-2 tracking-[-.01em]',
              // Animation classes
              'animate-fade-right animate-delay-700',
            )}
          >
            Get started by editing{' '}
            <code className="border-border bg-muted text-foreground rounded border px-1 py-0.5 font-mono font-semibold">
              src/app/page.tsx
            </code>
            .
          </li>
          <li
            className={cn(
              'mb-2 tracking-[-.01em]',
              // Animation classes
              'animate-fade-right animate-delay-[800ms]',
            )}
          >
            Save and see your changes instantly.
          </li>
          <li
            className={cn(
              'mb-2 tracking-[-.01em]',
              // Animation classes
              'animate-fade-right animate-delay-[900ms]',
            )}
          >
            Deploy to Cloudflare Workers with zero configuration.
          </li>
          <li
            className={cn(
              'mb-2 tracking-[-.01em]',
              // Animation classes
              'animate-fade-right animate-delay-1000',
            )}
          >
            Set up your Cloudflare API token and account ID.
          </li>
          <li
            className={cn(
              'mb-2 tracking-[-.01em]',
              // Animation classes
              'animate-fade-right animate-delay-[1100ms]',
            )}
          >
            Push to main branch for automatic deployment.
          </li>
          <li
            className={cn(
              'tracking-[-.01em]',
              // Animation classes
              'animate-fade-right animate-delay-[1200ms]',
            )}
          >
            Visit{' '}
            <a
              href="/analytics"
              className="underline transition-colors hover:text-blue-600 dark:hover:text-blue-400"
            >
              /analytics
            </a>{' '}
            to see page visit tracking with Drizzle + D1.
            <br />
            <span className="text-xs text-gray-500">
              Visitor tracking is <strong>disabled by default</strong> and requires
              configuration. See <strong>visitor_DATABASE_SETUP.md</strong> for setup
              instructions.
            </span>
          </li>
        </ol>

        <div
          className={cn(
            'flex flex-col items-center gap-4 sm:flex-row',
            // Animation classes
            'animate-fade-up animate-delay-[1400ms]',
          )}
        >
          <a
            className={cn(
              'flex h-10 w-full items-center justify-center rounded-full border border-solid border-gray-300 bg-white px-4 text-sm font-medium text-gray-900 transition-colors hover:border-gray-400 hover:bg-gray-50 sm:h-12 sm:w-auto sm:px-5 sm:text-base dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:hover:border-gray-500 dark:hover:bg-gray-700',
              // Animation classes
              'hover:animate-wiggle animate-duration-200',
            )}
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read Next.js docs
          </a>
          <a
            className={cn(
              'flex h-10 w-full items-center justify-center rounded-full border border-solid border-orange-500/30 bg-orange-500/10 px-4 text-sm font-medium text-orange-700 transition-colors hover:border-orange-500/50 hover:bg-orange-500/20 sm:h-12 sm:w-auto sm:px-5 sm:text-base dark:border-orange-400/30 dark:bg-orange-400/10 dark:text-orange-300 dark:hover:border-orange-400/50 dark:hover:bg-orange-400/20',
              // Animation classes
              'hover:animate-wiggle animate-duration-200',
            )}
            href="https://developers.cloudflare.com/workers/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cloudflare Workers
          </a>
        </div>
      </main>
      <footer
        className={cn(
          'row-start-3 flex flex-wrap items-center justify-center gap-[24px] text-gray-600 dark:text-gray-400',
          // Animation classes
          'animate-fade-up animate-delay-[1600ms]',
        )}
      >
        <a
          className={cn(
            'flex items-center gap-2 transition-colors hover:text-gray-900 hover:underline hover:underline-offset-4 dark:hover:text-gray-100',
            // Animation classes
            'hover:animate-bounce-in animate-duration-300',
          )}
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
            className="dark:invert"
          />
          Learn
        </a>
        <a
          className={cn(
            'flex items-center gap-2 transition-colors hover:text-gray-900 hover:underline hover:underline-offset-4 dark:hover:text-gray-100',
            // Animation classes
            'hover:animate-bounce-in animate-duration-300',
          )}
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
            className="dark:invert"
          />
          Examples
        </a>
        <a
          className={cn(
            'flex items-center gap-2 transition-colors hover:text-gray-900 hover:underline hover:underline-offset-4 dark:hover:text-gray-100',
            // Animation classes
            'hover:animate-bounce-in animate-duration-300',
          )}
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
            className="dark:invert"
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
