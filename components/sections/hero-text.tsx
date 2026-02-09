"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

// 动态导入 3D 场景，避免阻塞首屏渲染
const SplineScene = dynamic(
  () => import("@/components/ui/spline").then((mod) => mod.SplineScene),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-muted/30 rounded-lg">
        <div className="animate-pulse text-muted-foreground text-sm">Loading 3D...</div>
      </div>
    ),
  }
);

interface HeroTextProps {
  description: string;
  cta: {
    primary: { text: string; link: string };
    secondary: { text: string; link: string };
  };
}

// 使用 React.memo 减少不必要的重渲染
const RotatingText = ({ texts }: { texts: string[] }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [texts.length]);

  return (
    <span className="relative flex overflow-hidden h-[1.2em] md:h-[1.1em]">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          className="absolute font-semibold text-foreground"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {texts[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

export function HeroText({ description, cta }: HeroTextProps) {
  const rotatingTexts = useMemo(
    () => [
      "AI Native 产品践行者",
      "AI 产品经理",
      "AI 技术型产品负责人",
      "AI 全栈工程师",
    ],
    []
  );

  return (
    <section className="min-h-[calc(100vh-4rem)] flex flex-col justify-center px-6 py-12 lg:px-12">
      <div className="mx-auto max-w-6xl w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Text Animation */}
          <div className="flex flex-col gap-8">
            <div>
              <h1 className="text-4xl md:text-7xl max-w-2xl tracking-tighter font-regular">
                <span className="text-foreground">Hi, 我是 Ryan</span>
              </h1>
              <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight font-medium mt-2">
                <RotatingText texts={rotatingTexts} />
              </h1>
            </div>

            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground max-w-lg">
              {description}
            </p>

            <div className="flex flex-row gap-3">
              <Link
                href={cta.secondary.link}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition-all hover:bg-secondary"
              >
                {cta.secondary.text}
              </Link>
              <Link
                href={cta.primary.link}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-all hover:bg-foreground/90"
              >
                {cta.primary.text}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right - 3D Spline Scene (懒加载) */}
          <div className="flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[500px] h-[400px] lg:h-[500px]">
              <SplineScene 
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
