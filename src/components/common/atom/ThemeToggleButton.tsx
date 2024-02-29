'use client';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

const ThemeToggleButton = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      className={'relative hover:text-foreground/80'}
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      suppressHydrationWarning
    >
      <Sun className="h-[1.2rem] w-[1.2rem] transition-all scale-100 rotate-0 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute top-1/2 -translate-y-1/2 h-[1.2rem] w-[1.2rem] transition-all rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
};

export default ThemeToggleButton;
