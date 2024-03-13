import '@/styles/globals.css';

import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { Faustina } from 'next/font/google';
import { ReactNode } from 'react';

import QueryProvider from '@/components/provider/query-provider';
import { ThemeProvider } from '@/components/provider/theme-provider';
import MetaIconHeader from '@/components/user/meta-icon-header';

const faustina = Faustina({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | KimDongCheol Art',
    default: 'KimDongCheol Art',
  },
  description: 'A painting challenge by a non-majors',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <title>KimDongCheol Art</title>
        <MetaIconHeader />
      </head>
      <body className={`${faustina.className} flex flex-col min-h-dvh`}>
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
        <Analytics />
      </body>
    </html>
  );
}
