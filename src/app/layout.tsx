import { dmSans, jetbrainsMono, manrope, spaceGrotesk, syne } from '@/fonts';
import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import { Providers } from './providers';
import { cn } from '@/lib/utils';

import '@/styles/global.scss';

export const metadata: Metadata = {
  title: 'Xelar',
  description: 'Wire your stream bridges',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={
        cn(
          spaceGrotesk.variable,
          syne.variable,
          dmSans.variable,
          manrope.variable,
          jetbrainsMono.variable,
        )
      }
    >
      <body>
        <Providers>{children}</Providers>
        <Toaster
          theme='dark'
          position={'bottom-right'}
          richColors
          closeButton
          duration={4000}
          toastOptions={{
            duration: 2000,
            style: {
              borderRadius: '8px',
              animation: 'revert',
            },
          }}
        />
      </body>
    </html>
  );
}
