import Link from 'next/link';

import Posts from '@/components/admin/organism/Posts';
import { Button } from '@/components/ui/button';

export default async function PostPage() {
  return (
    <>
      <h1 className={'text-3xl font-bold mb-10'}>게시글 관리</h1>
      <div className={'flex justify-between mb-3'}>
        <Button variant={'destructive'}>일괄 삭제</Button>
        <Button asChild>
          <Link href={'/admin/posts/new'}>새글 등록</Link>
        </Button>
      </div>
      <Posts />
    </>
  );
}
