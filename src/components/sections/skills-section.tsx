import type { LintangSkillItem } from '@/lib/api/soulcodeClient';
import { FadeIn } from '@/components/motion/fade-in';
import { Brain, Code, Wrench } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  brain: Brain,
  code: Code,
  wrench: Wrench,
  tools: Wrench
};

type Props = {
  skills: LintangSkillItem[];
};

export async function SkillsSection({ skills }: Props) {
  const t = await getTranslations('sections');

  if (!skills.length) return null;

  return (
    <section id="skills" className="py-20">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <h2 className="section-title">{t('skills')}</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill, index) => {
            const iconKey = (skill.icon ?? 'code').toLowerCase();
            const Icon = ICON_MAP[iconKey] ?? Code;

            return (
              <FadeIn
                key={skill.id}
                delay={index * 0.08}
                className="rounded-xl border border-border bg-card p-6 shadow-sm transition-transform hover:scale-[1.02] hover:border-primary/40"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-3 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-foreground">{skill.title}</h3>
                </div>
                {skill.description && (
                  <p className="text-sm leading-relaxed text-muted-foreground">{skill.description}</p>
                )}
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
