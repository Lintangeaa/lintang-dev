'use client';

import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils/cn';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button type="button" className="inline-flex h-9 w-9 items-center justify-center rounded-md" aria-label="Theme" />
    );
  }

  const cycle = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  const Icon = theme === 'dark' ? Moon : theme === 'light' ? Sun : Monitor;

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label="Toggle theme"
      className={cn(
        'inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors',
        'hover:bg-card-hover hover:text-foreground'
      )}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}
