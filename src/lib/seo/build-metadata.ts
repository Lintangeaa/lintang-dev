import type { Metadata } from 'next';
import type { Locale } from '@/i18n/routing';
import type { LintangSettings } from '@/lib/api/soulcodeClient';

const DEFAULT_OG = '/images/lintang.webp';

function siteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, '');
}

export type PageSeoInput = {
  locale: Locale;
  title: string;
  description?: string | null;
  path?: string;
  ogImage?: string | null;
  noIndex?: boolean;
  type?: 'website' | 'article';
};

export function buildPageMetadata(input: PageSeoInput): Metadata {
  const base = siteUrl();
  const path = input.path ?? `/${input.locale}`;
  const canonical = `${base}${path.startsWith('/') ? path : `/${path}`}`;
  const description = input.description ?? undefined;
  const ogImage = input.ogImage || DEFAULT_OG;
  const pathWithoutLocale = path.replace(/^\/(id|en)/, '') || '';

  return {
    title: input.title,
    description,
    robots: input.noIndex ? { index: false, follow: false } : { index: true, follow: true },
    alternates: {
      canonical,
      languages: {
        id: `${base}/id${pathWithoutLocale}`,
        en: `${base}/en${pathWithoutLocale}`
      }
    },
    openGraph: {
      title: input.title,
      description,
      url: canonical,
      siteName: 'Lintang Dandung Prakoso',
      locale: input.locale === 'id' ? 'id_ID' : 'en_US',
      alternateLocale: input.locale === 'id' ? ['en_US'] : ['id_ID'],
      type: input.type ?? 'website',
      images: [{ url: ogImage, width: 1200, height: 630, alt: input.title }]
    },
    twitter: {
      card: 'summary_large_image',
      title: input.title,
      description,
      images: [ogImage]
    }
  };
}

export function buildLintangRootMetadata(
  locale: Locale,
  settings?: LintangSettings | null,
  fallbacks?: { title: string; description: string; brandName: string; tagline: string }
): Metadata {
  const title = settings?.meta_title || fallbacks?.title || 'Lintang Dandung Prakoso';
  const description = settings?.meta_description || fallbacks?.description;
  const meta = buildPageMetadata({
    locale,
    title,
    description,
    path: `/${locale}`,
    ogImage: settings?.og_image
  });

  return {
    ...meta,
    icons: {
      icon: settings?.og_image || DEFAULT_OG,
      shortcut: settings?.og_image || DEFAULT_OG,
      apple: settings?.og_image || DEFAULT_OG
    },
    openGraph: {
      ...meta.openGraph,
      title: fallbacks ? `${fallbacks.brandName} — ${fallbacks.tagline}` : title
    }
  };
}
