import { Metadata } from 'next';
import { ReactNode } from 'react';

import AdminHeader from '@/components/admin/organism/AdminHeader';
import Modal from '@/components/admin/organism/Modal';

export const metadata: Metadata = {
  title: 'ADMIN',
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <AdminHeader />
      <main className={'container py-8'}>{children}</main>
      <Modal />
    </>
  );
}
