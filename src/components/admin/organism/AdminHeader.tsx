'use client';

import { Home, LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import ThemeToggleButton from '@/components/common/atom/ThemeToggleButton';
import { Button } from '@/components/ui/button';
import { signOut } from '@/service/auth';

const navItems = [
  // { name: '대시보드', href: '/admin/dashboard' },
  { name: '게시글', href: '/admin/posts' },
  // { name: '통계', href: '/admin/analytics' },
];

const AdminHeader = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header
      className={
        'sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'
      }
    >
      <div className={'container flex h-14 max-w-screen-2xl items-center'}>
        <div className={'flex mr-4'}>
          <Link
            href={'/admin'}
            className={'font-bold mr-6 flex items-center space-x-2'}
            scroll={false}
          >
            Father Gallery Admin
          </Link>
          <nav className={'flex items-center gap-6 text-sm'}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                className={`transition-colors hover:text-foreground/80 ${
                  pathname === item.href ? '' : 'text-foreground/60'
                }`}
                href={item.href}
                scroll={false}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className={'flex flex-1 items-center  space-x-2 justify-end'}>
          <ThemeToggleButton />
          <Button
            variant="outline"
            size="icon"
            onClick={async () => {
              await signOut().then(() => {
                router.push('/admin');
              });
            }}
          >
            <LogOut className="absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
          </Button>
          <Button variant="outline" size="icon" asChild>
            <Link href={'/'} scroll={false}>
              <Home className="absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
