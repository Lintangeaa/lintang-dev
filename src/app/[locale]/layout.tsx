import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { SiteHeader } from '@/components/site-header';
import { Providers } from '@/providers/providers';
import { buildLintangRootMetadata } from '@/lib/seo/build-metadata';
import { fetchLintangContent } from '@/lib/api/soulcodeClient';
import { generateStaticParams, routing, type Locale } from '@/i18n/routing';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
});

export { generateStaticParams };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  const brand = await getTranslations({ locale, namespace: 'brand' });
  const content = await fetchLintangContent(locale as Locale).catch(() => null);

  return buildLintangRootMetadata(locale as Locale, content?.settings ?? null, {
    title: t('title'),
    description: t('description'),
    brandName: brand('name'),
    tagline: brand('tagline')
  });
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <SiteHeader />
            <main className="min-h-screen pt-[4.25rem]">{children}</main>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
