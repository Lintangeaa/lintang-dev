import type { LintangAboutContent } from '@/lib/api/soulcodeClient';
import { FadeIn } from '@/components/motion/fade-in';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

type Props = {
  content: LintangAboutContent | null;
};

export async function AboutSection({ content }: Props) {
  const t = await getTranslations('sections');

  if (!content?.title && !content?.body) return null;

  return (
    <section id="about" className="py-20">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <h2 className="section-title">{content?.title || t('about')}</h2>
        <div className="mt-12 grid items-center gap-12 lg:grid-cols-3">
          {content?.image && (
            <FadeIn className="flex justify-center lg:col-span-1">
              <div className="relative overflow-hidden rounded-2xl border border-border shadow-xl">
                <Image src={content.image} alt={content.title} width={300} height={300} className="object-cover" />
              </div>
            </FadeIn>
          )}
          <FadeIn
            delay={0.1}
            className={`prose-lintang ${content?.image ? 'lg:col-span-2' : 'lg:col-span-3'}`}
          >
            {content?.body?.split('\n\n').map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
