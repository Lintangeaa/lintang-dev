'use client';

import type { FeaturedProject } from '@/lib/api/soulcodeClient';
import { projectExternalUrl } from '@/lib/api/soulcodeClient';
import type { Locale } from '@/i18n/routing';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';

type Props = {
  project: FeaturedProject;
  locale: Locale;
  viewLabel: string;
  index: number;
};

export function ProjectCard({ project, locale, viewLabel, index }: Props) {
  const href = projectExternalUrl(locale, project.slug);

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
    >
      {project.cover_image && (
        <div className="relative aspect-video w-full overflow-hidden bg-card-hover">
          <Image
            src={project.cover_image}
            alt={project.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="font-semibold text-foreground group-hover:text-primary">{project.title}</h3>
          <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground" />
        </div>
        {project.summary && (
          <p className="mb-4 line-clamp-3 flex-1 text-sm text-muted-foreground">{project.summary}</p>
        )}
        {project.tech_stack && project.tech_stack.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.tech_stack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
        <span className="mt-4 text-sm font-medium text-primary">{viewLabel} →</span>
      </div>
    </motion.a>
  );
}
