import type { Locale } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';
import { AboutSection } from '@/components/sections/about-section';
import { FooterSection } from '@/components/sections/footer-section';
import { HeroSection } from '@/components/sections/hero-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { SkillsSection } from '@/components/sections/skills-section';
import { fetchFeaturedProjects, fetchLintangContent } from '@/lib/api/soulcodeClient';

export const revalidate = 60;

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [content, projects] = await Promise.all([
    fetchLintangContent(locale as Locale).catch(() => null),
    fetchFeaturedProjects(locale as Locale).catch(() => [])
  ]);

  return (
    <div className="mesh-bg">
      <HeroSection content={content?.hero ?? null} socialLinks={content?.settings?.social_links ?? null} />
      <AboutSection content={content?.about ?? null} />
      <SkillsSection skills={content?.skills ?? []} />
      <ProjectsSection projects={projects} locale={locale as Locale} />
      <FooterSection />
    </div>
  );
}
