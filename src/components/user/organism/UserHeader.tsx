'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

import ThemeToggleButton from '@/components/common/atom/ThemeToggleButton';
import HeaderNav from '@/components/user/organism/HeaderNav';
import HeaderSocial from '@/components/user/organism/HeaderSocial';

const UserHeader = () => {
  const pathname = usePathname();
  const headerRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const [isHeaderHideByScroll, setIsHeaderHideByScroll] =
    useState<boolean>(false);

  const mainScrollEvent = useCallback(() => {
    const $header = headerRef.current;

    if ($header) {
      const minValue = 122;
      const currentScrollY = window.scrollY;
      if (minValue < currentScrollY) {
        const isHide = lastScrollY.current < currentScrollY;

        setIsHeaderHideByScroll(isHide);
      }
      lastScrollY.current = window.scrollY;
    }
  }, []);

  useEffect(() => {
    if (window) {
      window.addEventListener('scroll', mainScrollEvent);
      mainScrollEvent();
    }
    return () => {
      if (window) {
        window.removeEventListener('scroll', mainScrollEvent);
      }
    };
  }, [mainScrollEvent]);

  useEffect(() => {
    setIsHeaderHideByScroll(false);
  }, [pathname]);

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${
        isHeaderHideByScroll
          ? 'transform translate-y-[-100%]'
          : 'transform translate-y-0'
      } transition-transform duration-300 ease-in-out`}
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
            <Image src={'/readme-logo.png'} alt={'next.js'} fill={true} />
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
