import { getProfileData } from "@/lib/markdown";
import { Metadata } from "next";
import { AIChat } from "@/components/sections/ai-chat";
import { Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { WeChatIcon, XiaohongshuIcon, GitHubIcon, XIcon } from "@/components/icons";

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfileData();
  return {
    title: `${profile.contact.title} | ${profile.name}`,
    description: profile.contact.description,
  };
}

export default async function ContactPage() {
  const profile = await getProfileData();

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
    <div className="mx-auto max-w-3xl px-6 py-24 lg:px-12">
      <div className="mb-16">
        <h1 className="text-3xl font-medium tracking-tight text-foreground">
          {profile.contact.title}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {profile.contact.description}
        </p>
      </div>

      <div className="grid gap-16 lg:grid-cols-2">
        {/* Contact Info */}
        <div className="space-y-8">
          {/* Contact Methods */}
          <div className="space-y-4">
            <a
              href={`mailto:${profile.contact.email}`}
              className="group flex items-center gap-4 text-muted-foreground transition-colors hover:text-foreground"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">邮箱</p>
                <p className="text-sm">{profile.contact.email}</p>
              </div>
            </a>

            {profile.contact.socials.map((social) => {
              const Icon = getIcon(social.platform);
              return (
                <Link
                  key={social.platform}
                  href={social.url}
                  target={social.url.startsWith("http") ? "_blank" : undefined}
                  rel={
                    social.url.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
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
          <div className="grid grid-cols-2 gap-6 pt-8">
            {/* WeChat QR Code */}
            <div>
              <p className="mb-4 text-sm font-medium text-foreground">微信公众号</p>
              <div className="relative h-36 w-36 overflow-hidden rounded-xl border border-border">
                <Image
                  src="/mp_qrcode.png"
                  alt="微信公众号二维码"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">扫码关注公众号</p>
            </div>

            {/* Xiaohongshu QR Code */}
            <div>
              <p className="mb-4 text-sm font-medium text-foreground">小红书</p>
              <div className="relative h-36 w-36 overflow-hidden rounded-xl border border-border">
                <Image
                  src="/xhs_qrcode.png"
                  alt="小红书二维码"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">扫码关注小红书</p>
            </div>
          </div>
        </div>

        {/* AI Chat */}
        <div>
          <p className="mb-4 text-sm font-medium text-foreground">与 AI 助手 Sunday 对话</p>
          <AIChat />
        </div>
      </div>
    </div>
  );
}
