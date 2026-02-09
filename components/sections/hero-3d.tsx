'use client'

import { SplineScene } from "@/components/ui/spline";
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Hero3DProps {
  greeting: string;
  tagline: string;
  description: string;
  cta: {
    primary: { text: string; link: string };
    secondary: { text: string; link: string };
  };
}

export function Hero3D({ greeting, tagline, description, cta }: Hero3DProps) {
  return (
    <section className="min-h-[calc(100vh-4rem)] flex flex-col justify-center px-6 py-12 lg:px-12">
      <div className="w-full min-h-[500px] bg-background relative overflow-hidden">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
        />
        
        <div className="flex flex-col lg:flex-row h-full">
          {/* Left content */}
          <div className="flex-1 p-8 lg:p-12 relative z-10 flex flex-col justify-center">
            <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase mb-4">
              {greeting}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              {tagline}
            </h1>
            <p className="mt-6 text-muted-foreground max-w-lg text-lg leading-relaxed">
              {description}
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
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
            </div>
          </div>

          {/* Right content - 3D Scene */}
          <div className="flex-1 relative min-h-[300px] lg:min-h-[500px]">
            <SplineScene 
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
