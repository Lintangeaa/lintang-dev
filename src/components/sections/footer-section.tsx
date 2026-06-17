import { getTranslations } from 'next-intl/server';

export async function FooterSection() {
  const t = await getTranslations('footer');
  const tBrand = await getTranslations('brand');
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto max-w-6xl px-4 text-center lg:px-6">
        <p className="text-sm text-muted-foreground">
          © {year} {tBrand('name')}. {t('rights')}
        </p>
      </div>
    </footer>
  );
}
