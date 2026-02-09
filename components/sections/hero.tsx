"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
  greeting: string;
  tagline: string;
  description: string;
  cta: {
    primary: { text: string; link: string };
    secondary: { text: string; link: string };
  };
}

export function HeroSection({
  greeting,
  tagline,
  description,
  cta,
}: HeroSectionProps) {
  return (
    <section className="flex min-h-[calc(100vh-4rem)] flex-col justify-center px-6 py-24 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-8"
        >
          {/* Avatar - Mobile only */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="relative mx-auto h-24 w-24 overflow-hidden rounded-full lg:hidden"
          >
            <Image
              src="/personal_avatar.png"
              alt="Avatar"
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-sm font-medium tracking-wide text-muted-foreground uppercase"
          >
            {greeting}
          </motion.p>

          {/* Tagline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl font-medium tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            style={{ lineHeight: 1.1 }}
          >
            {tagline}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            {description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col gap-4 pt-4 sm:flex-row"
          >
            <Link
              href={cta.primary.link}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-all hover:bg-foreground/90"
            >
              {cta.primary.text}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href={cta.secondary.link}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition-all hover:bg-secondary"
            >
              {cta.secondary.text}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
