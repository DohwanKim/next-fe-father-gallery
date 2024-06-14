'use client';

import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef } from 'react';

import ThemeToggleButton from '@/components/common/atom/theme-toggle-button';
import HeaderNav from '@/components/user/organism/header-nav';
import PostFilter from '@/components/user/organism/post-filter';
import SocialLinks from '@/components/user/organism/social-links';
import useLayoutStore from '@/store/layout';

const HEADER_HEIGHT = 60 as const;

const UserHeader = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const {
    isHeaderHide,
    isShowSubMenu,
    isMobileHeaderShow,
    setIsMobileHeaderShow,
    setIsHeaderHide,
  } = useLayoutStore();

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
        </div>
        <div className={'invisible md:visible flex gap-4'}>
          <SocialLinks isGray />
          <ThemeToggleButton />
        </div>
        <button
          className={'md:hidden'}
          data-testid={'hamburger-button'}
          role={'menubar'}
          onClick={() => {
            setIsMobileHeaderShow(true);
          }}
        >
          <Menu />
        </button>
        <div
          className={
            'invisible md:visible absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%]'
          }
        >
          <HeaderNav />
        </div>
      </div>
      {isShowSubMenu && (
        <div
          data-testid={'sub-menu'}
          className={
            'flex items-center justify-center border-t min-h-[60px] py-2'
          }
        >
          <PostFilter />
        </div>
      )}
      <div
        className={`${
          isMobileHeaderShow ? 'visible opacity-100' : 'invisible opacity-0'
        } fixed top-0 left-0 w-dvw h-dvh bg-background/95 backdrop-blur transition-opacity supports-[backdrop-filter]:bg-background/90 z-50`}
      >
        <div
          className={
            'relative flex flex-col container mx-auto h-full justify-center items-center'
          }
        >
          <button
            className={'absolute right-[1rem] top-[1rem]'}
            onClick={() => {
              setIsMobileHeaderShow(false);
            }}
          >
            <X />
          </button>
          <HeaderNav
            className={'flex-col gap-y-14'}
            onClickNav={() => {
              setIsMobileHeaderShow(false);
            }}
          />
          <ThemeToggleButton
            className={'absolute bottom-[1rem] right-[1rem]'}
          />
          <SocialLinks className={'absolute top-[1rem] left-[1rem]'} />
        </div>
      </div>
    </header>
  );
};

export default UserHeader;
