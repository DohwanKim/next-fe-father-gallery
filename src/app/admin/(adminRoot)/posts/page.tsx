import { Suspense } from 'react';

import Posts from '@/components-admin/Posts';

import { css } from '../../../../../styled-system/css';

export default async function Page() {
  return (
    <>
      <h1 className={css({ fontSize: '22px', fontWeight: 'bold', mb: '16px' })}>
        Admin Posts
      </h1>
      <Suspense fallback={<>loading...</>}>
        <Posts />
      </Suspense>
    </>
  );
}
