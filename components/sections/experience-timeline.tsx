"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
}

interface ExperienceTimelineProps {
  items: ExperienceItem[];
}

export function ExperienceTimeline({ items }: ExperienceTimelineProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="relative">
      {/* Timeline line */}
      <div className="absolute left-0 top-2 bottom-0 w-px bg-border md:left-2" />

      <div className="space-y-12">
        {items.map((item, index) => (
          <motion.div
            key={`${item.company}-${index}`}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="relative pl-8 md:pl-12"
          >
            {/* Timeline dot */}
            <div className="absolute left-[-3px] top-2 h-1.5 w-1.5 rounded-full bg-foreground md:left-[5px]" />

            {/* Content */}
            <div className="space-y-3">
              <div className="flex flex-col gap-1">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-base font-medium text-foreground">
                    {item.role}
                  </h3>
                  <span className="text-xs text-muted-foreground">
                    {item.period}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {item.company} · {item.location}
                </p>
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>

              {item.highlights.length > 0 && (
                <ul className="space-y-1.5 pt-2">
                  {item.highlights.map((highlight, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span className="mt-1.5 h-0.5 w-0.5 flex-shrink-0 rounded-full bg-muted-foreground" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
