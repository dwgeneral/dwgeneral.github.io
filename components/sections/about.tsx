"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface AboutSectionProps {
  title: string;
  content: string;
}

export function AboutSection({ title, content }: AboutSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
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
          <div
            className="prose prose-neutral max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </motion.div>
      </div>
    </section>
  );
}
