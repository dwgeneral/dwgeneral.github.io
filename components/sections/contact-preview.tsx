"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Mail, ArrowRight } from "lucide-react";
import Image from "next/image";
import { WeChatIcon, XiaohongshuIcon, GitHubIcon, XIcon } from "@/components/icons";

interface Social {
  platform: string;
  url: string;
  handle: string;
}

interface ContactPreviewProps {
  title: string;
  description: string;
  email: string;
  socials: Social[];
}

export function ContactPreview({
  title,
  description,
  email,
  socials,
}: ContactPreviewProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const getIcon = (platform: string) => {
    switch (platform) {
      case "wechat":
        return WeChatIcon;
      case "xiaohongshu":
        return XiaohongshuIcon;
      case "GitHub":
        return GitHubIcon;
      case "My OpenClaw GitHub":
        return GitHubIcon;
      case "X":
        return XIcon;
      default:
        return null;
    }
  };

  const getLabel = (platform: string) => {
    switch (platform) {
      case "wechat":
        return "微信公众号";
      case "xiaohongshu":
        return "小红书";
      case "X":
        return "X (Twitter)";
      default:
        return platform;
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="border-t border-border px-6 py-24 lg:px-12"
    >
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-6 text-2xl font-medium tracking-tight text-foreground">
            {title}
          </h2>
          <p className="mb-8 max-w-xl text-muted-foreground">{description}</p>

          {/* Contact Methods */}
          <div className="mb-12 space-y-4">
            <a
              href={`mailto:${email}`}
              className="group flex items-center gap-4 text-muted-foreground transition-colors hover:text-foreground"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">邮箱</p>
                <p className="text-sm">{email}</p>
              </div>
            </a>

            {socials.map((social) => {
              const Icon = getIcon(social.platform);
              return (
                <Link
                  key={social.platform}
                  href={social.url}
                  target={social.url.startsWith("http") ? "_blank" : undefined}
                  rel={
                    social.url.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  className="group flex items-center gap-4 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                    {Icon && <Icon className="h-5 w-5" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {getLabel(social.platform)}
                    </p>
                    <p className="text-sm">{social.handle}</p>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* QR Codes */}
          <div className="mb-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
            <div>
              <p className="mb-3 text-xs font-medium text-muted-foreground">
                微信公众号
              </p>
              <div className="relative aspect-square w-full max-w-[140px] overflow-hidden rounded-xl border border-border">
                <Image
                  src="/mp_qrcode.png"
                  alt="微信公众号二维码"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div>
              <p className="mb-3 text-xs font-medium text-muted-foreground">
                小红书
              </p>
              <div className="relative aspect-square w-full max-w-[140px] overflow-hidden rounded-xl border border-border">
                <Image
                  src="/xhs_qrcode.png"
                  alt="小红书二维码"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* CTA */}
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-muted-foreground"
          >
            查看完整联系方式
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
