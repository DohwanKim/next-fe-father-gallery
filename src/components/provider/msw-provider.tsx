'use client';

import { ReactNode } from 'react';

import { initMocks } from '@/mocks';

if (process.env.NEXT_PUBLIC_USE_MSW === 'true') {
  initMocks().then(() => console.log('MSW initialized'));
}

const MswProvider = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default MswProvider;
