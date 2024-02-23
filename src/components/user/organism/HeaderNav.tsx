'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
];

const HeaderNav = () => {
  const pathname = usePathname();

  return (
    <nav
      className={
        'container flex mx-auto h-[60px] items-center justify-center gap-x-5'
      }
    >
      {navItems.map((item) => (
        <Link
          key={item.href}
          className={`flex items-center h-full transition-colors hover:text-foreground/80 ${
            pathname === item.href ? '' : 'text-foreground/60'
          }`}
          href={item.href}
          scroll={false}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
};

export default HeaderNav;
