import '@/styles/globals.css';

import type { Metadata } from 'next';
import { Faustina } from 'next/font/google';
import { ReactNode } from 'react';

import QueryProvider from '@/components/provider/query-provider';
import { ThemeProvider } from '@/components/provider/theme-provider';

const faustina = Faustina({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | 김동철 그림세상',
    default: '김동철 그림세상',
  },
  description: '비전공자의 그림 도전',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
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
      </body>
    </html>
  );
}
