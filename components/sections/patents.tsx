"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { FileText } from "lucide-react";

interface Patent {
  name: string;
  description: string;
}

interface PatentsSectionProps {
  title: string;
  items: Patent[];
}

export function PatentsSection({ title, items }: PatentsSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (items.length === 0) return null;

  return (
    <section
      ref={ref}
      className="border-t border-border px-6 py-24 lg:px-12"
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

          <div className="space-y-6">
            {items.map((patent, index) => (
              <motion.div
                key={patent.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex items-start gap-4 rounded-xl border border-border bg-background p-6 transition-all hover:border-foreground/20"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
                  <FileText className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{patent.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {patent.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
