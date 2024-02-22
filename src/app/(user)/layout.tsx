import { ReactNode } from 'react';

import UserHeader from '@/components/user/organism/UserHeader';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <UserHeader />
      <main>{children}</main>
    </>
  );
}
