import { ReactNode } from 'react';

import AdminHeader from '@/components/admin/organism/Header';
import Modal from '@/components/admin/organism/Modal';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <AdminHeader />
      <main className={'container py-8'}>{children}</main>
      <Modal />
    </>
  );
}
