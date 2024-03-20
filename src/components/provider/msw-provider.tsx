'use client';

import { ReactNode } from 'react';

import { initMocks } from '@/mocks';

if (process.env.NODE_ENV === 'test') {
  initMocks().then(() => console.log('MSW initialized'));
}

const MswProvider = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default MswProvider;
