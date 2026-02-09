"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface Project {
  name: string;
  tagline?: string;
  period: string;
  role: string;
  company?: string;
  description: string;
  highlights?: string[];
  tags: string[];
}

interface ProjectsGridProps {
  featured: Project[];
  other: Project[];
}

export function ProjectsGrid({ featured, other }: ProjectsGridProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="space-y-16">
      {/* Featured Projects */}
      <div className="space-y-8">
        <h2 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          重点项目
        </h2>
        <div className="space-y-8">
          {featured.map((project, index) => (
            <motion.article
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group rounded-xl border border-border bg-background p-6 transition-all hover:border-foreground/20 sm:p-8"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-lg font-medium tracking-tight text-foreground">
                      {project.name}
                    </h3>
                    {project.tagline && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {project.tagline}
                      </p>
                    )}
                  </div>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {project.period}
                  </span>
                </div>

                {/* Meta */}
                <p className="text-sm text-muted-foreground">
                  {project.role}
                  {project.company && ` · ${project.company}`}
                </p>

                {/* Description */}
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>

                {/* Highlights */}
                {project.highlights && project.highlights.length > 0 && (
                  <ul className="space-y-2">
                    {project.highlights.map((highlight, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-muted-foreground/60" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Other Projects */}
      <div className="space-y-8">
        <h2 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          其他项目
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {other.map((project, index) => (
            <motion.article
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: (featured.length + index) * 0.1 }}
              className="group rounded-xl border border-border bg-background p-6 transition-all hover:border-foreground/20"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-medium text-foreground">{project.name}</h3>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {project.period}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{project.role}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
