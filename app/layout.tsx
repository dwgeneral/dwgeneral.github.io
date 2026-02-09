import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getProfileData } from "@/lib/markdown";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // 优化字体加载
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfileData();
  return {
    title: profile.seo.title,
    description: profile.seo.description,
    metadataBase: new URL("https://keepsurf.space"),
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profile = await getProfileData();

  return (
    <html lang="zh-CN" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background`}
      >
        <Navbar name={profile.name} />
        <main className="min-h-[calc(100vh-4rem)] pt-16">
          {children}
        </main>
        <Footer
          copyright={profile.footer.copyright}
          madeWith={profile.footer.made_with}
        />
      </body>
    </html>
  );
}
