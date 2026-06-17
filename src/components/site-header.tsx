'use client';

import { Menu, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LanguageSwitcher } from './language-switcher';
import { ThemeSwitcher } from './theme-switcher';

function isNavActive(href: string, pathname: string, hash: string): boolean {
  const [path, fragment] = href.split('#');
  if (fragment) {
    const isHome = pathname === path || pathname === path.replace(/\/$/, '');
    return isHome && hash === `#${fragment}`;
  }
  return pathname === path || pathname.startsWith(`${path}/`);
}

export function SiteHeader() {
  const t = useTranslations('nav');
  const tBrand = useTranslations('brand');
  const contextLocale = useLocale();
  const pathname = usePathname();
  const segment = pathname.split('/').filter(Boolean)[0];
  const locale = segment === 'en' || segment === 'id' ? segment : contextLocale;
  const base = `/${locale}`;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hash, setHash] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const updateHash = () => setHash(window.location.hash);
    updateHash();
    window.addEventListener('hashchange', updateHash);
    return () => window.removeEventListener('hashchange', updateHash);
  }, [pathname]);

  const links = [
    { href: `${base}#home`, label: t('home') },
    { href: `${base}#about`, label: t('about') },
    { href: `${base}#skills`, label: t('skills') },
    { href: `${base}#projects`, label: t('projects') }
  ];

  const linkClass = (active: boolean) =>
    `text-sm font-medium transition-colors ${
      active ? 'text-primary' : 'text-muted-foreground hover:text-primary'
    }`;

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? 'glass shadow-sm' : ''}`}>
      <div className="mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between gap-4 px-4 lg:px-6">
        <Link href={base} className="flex shrink-0 items-center gap-2.5 font-semibold">
          <span className="text-base">{tBrand('name')}</span>
        </Link>
        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={linkClass(isNavActive(l.href, pathname, hash))}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <ThemeSwitcher />
          <LanguageSwitcher />
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-card-hover hover:text-foreground lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-border bg-card p-4 lg:hidden">
          <div className="flex flex-col gap-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`py-1 text-sm font-medium ${isNavActive(l.href, pathname, hash) ? 'text-primary' : ''}`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
