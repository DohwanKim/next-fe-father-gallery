import { ReactNode } from 'react';

import { css } from '../../../styled-system/css';
import AdminHeader from '../../components-admin/Header';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <AdminHeader />
      <main
        className={css({
          width: '1140px',
          padding: '20px 20px 0',
          margin: '0 auto',
        })}
      >
        {children}
      </main>
    </>
  );
}
