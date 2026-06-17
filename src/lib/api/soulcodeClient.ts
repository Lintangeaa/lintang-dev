import type { Locale } from '@/i18n/routing';

const API_BASE = () => (process.env.NEXT_PUBLIC_SOULCODE_API_URL ?? '').replace(/\/$/, '');

export type LintangHeroContent = {
  profile_image: string | null;
  cta_primary_label: string | null;
  cta_primary_url: string | null;
  cta_secondary_label: string | null;
  cta_secondary_url: string | null;
  headline: string;
  subheadline: string | null;
  typing_phrases: string[];
};

export type LintangAboutContent = {
  image: string | null;
  title: string;
  body: string | null;
};

export type LintangSkillItem = {
  id: number;
  icon: string | null;
  sort_order: number;
  title: string;
  description: string | null;
};

export type LintangSettings = {
  meta_title: string | null;
  meta_description: string | null;
  og_image: string | null;
  social_links: Record<string, string> | null;
};

export type LintangContent = {
  locale: Locale;
  hero: LintangHeroContent;
  about: LintangAboutContent;
  skills: LintangSkillItem[];
  settings: LintangSettings;
};

export type FeaturedProject = {
  slug: string;
  title: string;
  summary: string | null;
  cover_image: string | null;
  project_url: string | null;
  client_name: string | null;
  tech_stack: string[] | null;
};

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`API ${res.status}: ${url}`);
  return res.json() as Promise<T>;
}

export async function fetchLintangContent(locale: Locale): Promise<LintangContent> {
  const base = API_BASE();
  if (!base) throw new Error('NEXT_PUBLIC_SOULCODE_API_URL is not set');
  return fetchJson<LintangContent>(`${base}/api/public/lintang/content?locale=${locale}`);
}

export async function fetchFeaturedProjects(locale: Locale): Promise<FeaturedProject[]> {
  const base = API_BASE();
  if (!base) return [];
  const data = await fetchJson<{ projects: FeaturedProject[] }>(
    `${base}/api/public/projects/featured?locale=${locale}`
  );
  return data.projects ?? [];
}

export function projectExternalUrl(locale: Locale, slug: string): string {
  const site = (process.env.NEXT_PUBLIC_SOULCODE_SITE_URL ?? 'https://soulcode.web.id').replace(/\/$/, '');
  return `${site}/${locale}/projects/${slug}`;
}
