import '@/styles/globals.css';

import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { Faustina } from 'next/font/google';
import { ReactNode } from 'react';

import MswProvider from '@/components/provider/msw-provider';
import QueryProvider from '@/components/provider/query-provider';
import { ThemeProvider } from '@/components/provider/theme-provider';
import MetaIconHeader from '@/components/user/meta-icon-header';

const faustina = Faustina({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | KimDongCheol Art',
    default: 'KimDongCheol Art',
  },
  applicationName: 'KimDongCheol Art',
  generator: 'KimDongCheol Art',
  authors: {
    name: 'KimDongCheol',
    url: 'https://kimdongcheol-art.com/',
  },
  description: 'A painting challenge by a non-majors',
  keywords: [
    'painting',
    'challenge',
    'non-majors',
    'watercolors',
    'gallery',
    'KimDongCheol',
    'art',
  ],
  creator: 'KimDoHwan',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>KimDongCheol Art</title>
        <MetaIconHeader />
      </head>
      <body className={`${faustina.className} flex flex-col min-h-dvh`}>
        <MswProvider>
          <QueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </QueryProvider>
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </MswProvider>
      </body>
    </html>
  );
}
