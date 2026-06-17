import type { MetadataRoute } from 'next';

const siteUrl = () => (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, '');

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const locales = ['id', 'en'] as const;

  return locales.map((locale) => ({
    url: `${base}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1
  }));
}
