'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { signOut } from '@/service/auth';

const AdminHeader = () => {
  const router = useRouter();

  return (
    <>
      <header>
        <Link href={'/admin'} scroll={false}>
          Father Gallery
        </Link>
        <nav>
          <Link href={'/admin/dashboard'}>대시보드</Link>
          <Link href={'/admin/posts'}>게시글</Link>
          <Link href={'/admin/analytics'}>통계</Link>
        </nav>
        <div>
          <button
            onClick={async () => {
              await signOut().then(() => {
                router.push('/admin');
              });
            }}
          >
            로그아웃
          </button>
          <Link href={'/'}>홈페이지로 가기</Link>
        </div>
      </header>
      {/*dummy space*/}
      <div />
    </>
  );
};

export default AdminHeader;
