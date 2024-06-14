import { ReactNode } from 'react';

import UserFooter from '@/components/user/organism/user-footer';
import UserHeader from '@/components/user/organism/user-header';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <UserHeader />
      <main className={'flex-auto pt-12 pb-24'}>{children}</main>
      <UserFooter />
    </>
  );
}
