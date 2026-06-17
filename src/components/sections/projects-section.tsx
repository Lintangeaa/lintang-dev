import type { FeaturedProject } from '@/lib/api/soulcodeClient';
import type { Locale } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import { ProjectCard } from './project-card';

type Props = {
  projects: FeaturedProject[];
  locale: Locale;
};

export async function ProjectsSection({ projects, locale }: Props) {
  const t = await getTranslations('projects');

  return (
    <section id="projects" className="py-20">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">{t('label')}</p>
        <h2 className="section-title">{t('title')}</h2>

        {projects.length === 0 ? (
          <p className="mt-8 text-muted-foreground">{t('empty')}</p>
        ) : (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                locale={locale}
                viewLabel={t('viewProject')}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
