import { dmSans, jetbrainsMono, manrope, spaceGrotesk, syne } from '@/fonts';
import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import { Providers } from './providers';
import { cn } from '@/lib/utils';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/constants/site';

import '@/styles/global.scss';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
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
