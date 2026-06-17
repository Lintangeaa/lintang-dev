'use client';

import { useLocale } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const LOCALES = [
  { code: 'id', label: 'ID' },
  { code: 'en', label: 'EN' }
] as const;

function localeHref(pathname: string, from: string, to: string) {
  if (pathname === `/${from}` || pathname.startsWith(`/${from}/`)) {
    return pathname.replace(`/${from}`, `/${to}`) || `/${to}`;
  }
  return `/${to}`;
}

export function LanguageSwitcher() {
  const contextLocale = useLocale();
  const pathname = usePathname();
  const segment = pathname.split('/').filter(Boolean)[0];
  const locale = segment === 'en' || segment === 'id' ? segment : contextLocale;
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const active = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];
  const others = LOCALES.filter((l) => l.code !== locale);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onEscape);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onEscape);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="min-w-8 rounded-md border border-border px-2 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-card-hover"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Language"
      >
        {active.label}
      </button>

      {open && (
        <ul
          className="absolute right-0 top-full z-50 mt-1 w-full overflow-hidden rounded-lg border border-border bg-card py-0.5 shadow-lg"
          role="listbox"
        >
          {others.map((item) => (
            <li key={item.code} role="option">
              <Link
                href={localeHref(pathname, locale, item.code)}
                onClick={() => setOpen(false)}
                className="block px-2 py-1.5 text-center text-xs font-semibold text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
