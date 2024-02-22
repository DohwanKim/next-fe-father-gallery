import Image from 'next/image';
import Link from 'next/link';

import ThemeToggleButton from '@/components/common/atom/ThemeToggleButton';
import HeaderNav from '@/components/user/organism/HeaderNav';
import HeaderSocial from '@/components/user/organism/HeaderSocial';

const UserHeader = () => {
  return (
    <header
      className={
        'sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'
      }
    >
      <div
        className={
          'relative container mx-auto flex h-[60px] justify-between items-center'
        }
      >
        <h1
          className={
            'w-[100px] h-[40px] absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%]'
          }
        >
          <Link href={'/'} scroll={false}>
            <Image src={'/readme-logo.png'} alt={'next.js'} layout={'fill'} />
          </Link>
        </h1>
        <HeaderSocial />
        <ThemeToggleButton />
      </div>
      <div className={'border-t border-b'}>
        <HeaderNav />
      </div>
    </header>
  );
};

export default UserHeader;