'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HTMLAttributes, useEffect } from 'react';

import { cn } from '@/lib/utils';
import useLayoutStore from '@/store/layout';

type NavItem = {
  name: string;
  href: string;
  query?: string;
};

export const navItems: NavItem[] = [
  { name: 'Home', href: '/' },
  { name: 'Gallery', href: '/gallery', query: '?type=WATERCOLOR' },
  { name: 'About', href: '/about' },
];

interface Props extends HTMLAttributes<HTMLDivElement> {
  onClickNav?: () => void;
}

const HeaderNav = ({ onClickNav, ...props }: Props) => {
  const { setIsShowSubMenu, setIsHeaderHide } = useLayoutStore();
  const pathname = usePathname();
  const firstPath = pathname.split('/')[1];

  useEffect(() => {
    setIsShowSubMenu(pathname === '/gallery');
    setIsHeaderHide(false);
  }, [pathname, setIsHeaderHide, setIsShowSubMenu]);

  return (
    <nav
      className={cn(
        'container flex mx-auto h-[60px] items-center justify-center gap-x-5',
        props.className,
      )}
    >
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href + (item.query || '')}
          scroll={false}
          className={`flex items-center h-full transition-colors hover:text-foreground/80 ${
            `/${firstPath}` === item.href ? '' : 'text-foreground/60'
          }`}
          onClick={() => {
            if (onClickNav) {
              onClickNav();
            }
          }}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
};

export default HeaderNav;
