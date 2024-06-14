import Posts from '@/components/admin/organism/posts';

export default async function PostPage() {
  return (
    <>
      <h1 className={'text-3xl font-bold mb-10'}>게시글 관리</h1>
      <Posts />
    </>
  );
}
