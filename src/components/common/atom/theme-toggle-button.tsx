'use client';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import * as React from 'react';
import { HTMLAttributes } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Props extends HTMLAttributes<HTMLButtonElement> {}

const ThemeToggleButton = ({ className, ...props }: Props) => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      size={'default'}
      className={cn('w-[40px] px-0', className)}
      variant={'default'}
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      {...props}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] transition-all scale-100 rotate-0 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute top-1/2 -translate-y-1/2 h-[1.2rem] w-[1.2rem] transition-all rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggleButton;
