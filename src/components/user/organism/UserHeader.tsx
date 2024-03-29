'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef } from 'react';

import ThemeToggleButton from '@/components/common/atom/ThemeToggleButton';
import HeaderNav from '@/components/user/organism/HeaderNav';
import PostFilter from '@/components/user/organism/PostFilter';
import SocialLinks from '@/components/user/organism/SocialLinks';
import useLayoutStore from '@/store/layout';

const HEADER_HEIGHT = 60 as const;

const UserHeader = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const { isHeaderHide, isShowSubMenu, setIsHeaderHide } = useLayoutStore();

  const mainScrollEvent = useCallback(() => {
    const $header = headerRef.current;

    if ($header) {
      const minValue = HEADER_HEIGHT + 2 + (isShowSubMenu ? 60 : 0);
      const currentScrollY = window.scrollY;
      if (minValue < currentScrollY) {
        const isHide = lastScrollY.current < currentScrollY;

        setIsHeaderHide(isHide);
      }
      lastScrollY.current = window.scrollY;
    }
  }, [isShowSubMenu, setIsHeaderHide]);

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
    setIsHeaderHide(false);
  }, [setIsHeaderHide]);

  return (
    <header
      id="user-header"
      ref={headerRef}
      className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transform transition-transform duration-300 ease-in-out ${
        isHeaderHide ? 'translate-y-[-100%]' : 'translate-y-0'
      }`}
    >
      <div
        className={
          'relative container mx-auto flex h-[60px] justify-between items-center'
        }
      >
        <div className={'flex gap-x-6'}>
          <h1 className={''}>
            <Link
              href={'/'}
              scroll={false}
              className={'relative block w-[40px] h-[40px]'}
            >
              <Image
                src={'/sample-logo.png'}
                alt={'KimDongCheol Art'}
                fill
                sizes={'100%'}
                className={'object-contain'}
              />
            </Link>
          </h1>
          <SocialLinks isGray />
        </div>
        <ThemeToggleButton />
        <div
          className={
            'absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%]'
          }
        >
          <HeaderNav />
        </div>
      </div>
      {isShowSubMenu && (
        <div className={'flex items-center justify-center border-t h-[60px]'}>
          <PostFilter />
        </div>
      )}
    </header>
  );
};

export default UserHeader;
