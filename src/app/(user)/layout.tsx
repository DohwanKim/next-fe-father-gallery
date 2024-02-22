import { ReactNode } from 'react';

import UserFooter from '@/components/user/organism/UserFooter';
import UserHeader from '@/components/user/organism/UserHeader';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <UserHeader />
      <main className={'flex-auto'}>{children}</main>
      <UserFooter />
    </>
  );
}
