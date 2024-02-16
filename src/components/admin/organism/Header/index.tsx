'use client';

import { Home, LogOut, Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { signOut } from '@/service/auth';

const navItems = [
  // { name: '대시보드', href: '/admin/dashboard' },
  { name: '게시글', href: '/admin/posts' },
  // { name: '통계', href: '/admin/analytics' },
];

const AdminHeader = () => {
  const pathname = usePathname();
  const { setTheme } = useTheme();
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
                className={`transition-colors hover:text-foreground/80 text-foreground${
                  pathname === item.href ? '' : '/60'
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme('light')}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
