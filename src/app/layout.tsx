import type { Metadata } from 'next';
import './tailwind.css';
import './globals.scss';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Xelar',
  description: 'Wire your stream bridges',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
