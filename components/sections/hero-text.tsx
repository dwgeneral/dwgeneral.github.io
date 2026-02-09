"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { SplineScene } from "@/components/ui/spline";

interface HeroTextProps {
  description: string;
  cta: {
    primary: { text: string; link: string };
    secondary: { text: string; link: string };
  };
}

export function HeroText({ description, cta }: HeroTextProps) {
  const [titleNumber, setTitleNumber] = useState(0);
  const rotatingTexts = useMemo(
    () => [
      "AI Native 产品践行者",
      "AI 产品经理",
      "AI 技术型产品负责人",
      "AI 全栈工程师",
    ],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === rotatingTexts.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, rotatingTexts]);

  return (
    <section className="min-h-[calc(100vh-4rem)] flex flex-col justify-center px-6 py-12 lg:px-12">
      <div className="mx-auto max-w-6xl w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Text Animation */}
          <div className="flex flex-col gap-8">
            <div>
              {/* <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase mb-2">
                Ryan
              </p> */}
              <h1 className="text-4xl md:text-7xl max-w-2xl tracking-tighter font-regular">
                <span className="text-spektr-cyan-50">Hi, 我是 Ryan</span>
              </h1>
              <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight font-medium">
                <span className="relative flex overflow-hidden h-[1.2em] md:h-[1.1em]">
                  {rotatingTexts.map((title, index) => (
                    <motion.span
                      key={index}
                      className="absolute font-semibold text-foreground"
                      initial={{ opacity: 0, y: -50 }}
                      transition={{ type: "spring", stiffness: 50 }}
                      animate={
                        titleNumber === index
                          ? {
                              y: 0,
                              opacity: 1,
                            }
                          : {
                              y: titleNumber > index ? -50 : 50,
                              opacity: 0,
                            }
                      }
                    >
                      {title}
                    </motion.span>
                  ))}
                </span>
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

          {/* Right - 3D Spline Scene */}
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
