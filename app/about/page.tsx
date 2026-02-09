import { getProfileData, markdownToHtml } from "@/lib/markdown";
import { Metadata } from "next";
import Image from "next/image";

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfileData();
  return {
    title: `${profile.about.title} | ${profile.name}`,
    description: profile.seo.description,
  };
}

export default async function AboutPage() {
  const profile = await getProfileData();
  const aboutHtml = await markdownToHtml(profile.about.content);

  return (
    <div className="mx-auto max-w-3xl px-6 py-24 lg:px-12">
      {/* Header with Avatar */}
      <div className="mb-16 flex flex-col items-center gap-6 text-center">
        <div className="relative h-32 w-32 overflow-hidden rounded-full">
          <Image
            src="/personal_avatar.png"
            alt={profile.name}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div>
          <h1 className="text-3xl font-medium tracking-tight text-foreground">
            {profile.name}
          </h1>
          <p className="mt-2 text-muted-foreground">{profile.title}</p>
        </div>
      </div>

      {/* About Content */}
      <div
        className="prose prose-neutral max-w-none"
        dangerouslySetInnerHTML={{ __html: aboutHtml }}
      />
    </div>
  );
}
