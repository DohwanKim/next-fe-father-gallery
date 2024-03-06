import { ReactNode } from 'react';

import UserFooter from '@/components/user/organism/UserFooter';
import UserHeader from '@/components/user/organism/UserHeader';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <UserHeader />
      <main className={'flex-auto pt-12 pb-24'}>{children}</main>
      <UserFooter />
    </>
  );
}
