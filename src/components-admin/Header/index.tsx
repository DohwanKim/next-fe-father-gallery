import Link from 'next/link';

import { css } from '../../../styled-system/css';

const AdminHeader = () => {
  const height = '60px';

  return (
    <>
      <header
        className={css({
          display: 'flex',
          position: 'fixed',
          left: 0,
          top: 0,
          width: '100%',
          height,
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px',
          backgroundColor: 'whitesmoke',
        })}
      >
        <Link
          href={'/admin'}
          className={css({
            fontSize: 20,
            fontWeight: 'bold',
          })}
        >
          Father Gallery
        </Link>
        <nav
          className={css({
            display: 'flex',
            gap: '16px',
          })}
        >
          <Link href={'/admin'}>대시보드</Link>
          <Link href={'/admin/posts'}>게시글</Link>
          <Link href={'/admin/analytics'}>통계</Link>
        </nav>
        <Link href={'/'}>홈페이지로 가기</Link>
      </header>
      {/*dummy space*/}
      <div className={css({ height })} />
    </>
  );
};

export default AdminHeader;
