import { ReactNode } from 'react';

import AdminHeader from '@/components/admin/organism/Header';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <AdminHeader />
      <main>{children}</main>
    </>
  );
}
