"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Sparkles,
  Code,
  Rocket,
  Cpu,
  TrendingUp,
  LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  sparkles: Sparkles,
  code: Code,
  rocket: Rocket,
  cpu: Cpu,
  "trending-up": TrendingUp,
};

interface Competency {
  title: string;
  icon: string;
  description: string;
}

interface CompetenciesSectionProps {
  title: string;
  items: Competency[];
}

export function CompetenciesSection({ title, items }: CompetenciesSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="border-t border-border bg-muted/30 px-6 py-24 lg:px-12"
    >
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-12 text-2xl font-medium tracking-tight text-foreground">
            {title}
          </h2>

          <div className="grid gap-6 sm:grid-cols-2">
            {items.map((item, index) => {
              const Icon = iconMap[item.icon] || Sparkles;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group rounded-xl border border-border bg-background p-6 transition-all hover:border-foreground/20"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-2 text-base font-medium text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
