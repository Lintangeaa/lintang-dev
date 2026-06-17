'use client';

import type { LintangHeroContent } from '@/lib/api/soulcodeClient';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';

const SOCIAL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  github: FaGithub,
  linkedin: FaLinkedinIn
};

type Props = {
  content: LintangHeroContent | null;
  socialLinks: Record<string, string> | null;
};

export function HeroSection({ content, socialLinks }: Props) {
  const t = useTranslations('sections');
  const [displayText, setDisplayText] = useState('');
  const phrases = content?.typing_phrases?.length ? content.typing_phrases : [content?.headline ?? 'Lintang Dandung Prakoso'];
  const phrase = phrases[0] ?? 'Lintang Dandung Prakoso';

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= phrase.length) {
        setDisplayText(phrase.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 80);
    return () => clearInterval(timer);
  }, [phrase]);

  const primaryLabel = content?.cta_primary_label || t('viewProjects');
  const secondaryLabel = content?.cta_secondary_label || t('learnMore');
  const primaryUrl = content?.cta_primary_url || '#projects';
  const secondaryUrl = content?.cta_secondary_url || '#about';

  return (
    <section id="home" className="relative flex min-h-[calc(100vh-4.25rem)] items-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_50%)]" />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-16 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start gap-6 md:flex-row md:items-center"
        >
          {content?.profile_image && (
            <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-2xl border border-border shadow-lg md:h-40 md:w-40">
              <Image src={content.profile_image} alt={content.headline} fill className="object-cover" priority />
            </div>
          )}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold md:text-6xl lg:text-7xl">
              {displayText}
              <span className="animate-pulse text-primary">|</span>
            </h1>
            {content?.subheadline && (
              <h2 className="text-xl font-semibold text-primary md:text-2xl">{content.subheadline}</h2>
            )}
            {socialLinks && Object.keys(socialLinks).length > 0 && (
              <div className="flex items-center gap-3 pt-2">
                {Object.entries(socialLinks).map(([key, href]) => {
                  const Icon = SOCIAL_ICONS[key.toLowerCase()];
                  if (!Icon || !href) return null;
                  return (
                    <a
                      key={key}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-border bg-card p-3 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                      aria-label={key}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            )}
            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <Link
                href={primaryUrl}
                className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 font-semibold text-white transition-transform hover:scale-105"
              >
                {primaryLabel}
              </Link>
              <Link
                href={secondaryUrl}
                className="inline-flex items-center justify-center rounded-lg border-2 border-primary px-8 py-3 font-semibold text-primary transition-colors hover:bg-primary/10"
              >
                {secondaryLabel}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
