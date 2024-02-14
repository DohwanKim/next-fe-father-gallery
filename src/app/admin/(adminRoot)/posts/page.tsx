import Link from 'next/link';

import Posts from '@/components/admin/organism/Posts';

import { css } from '../../../../../styled-system/css';

export default async function PostPage() {
  return (
    <>
      <h1 className={css({ fontSize: '22px', fontWeight: 'bold', mb: '16px' })}>
        Admin Posts
      </h1>
      <Link href={'/admin/posts/new'}>등록하기</Link>
      <Posts />
    </>
  );
}
