import Link from 'next/link';

import Posts from '@/components/admin/organism/Posts';

export default async function PostPage() {
  return (
    <>
      <h1>Admin Posts</h1>
      <Link href={'/admin/posts/new'}>등록하기</Link>
      <Posts />
    </>
  );
}
