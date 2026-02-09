import { getProfileData } from "@/lib/markdown";
import { Metadata } from "next";
import { ExperienceTimeline } from "@/components/sections/experience-timeline";

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfileData();
  return {
    title: `${profile.experience.title} | ${profile.name}`,
    description: profile.seo.description,
  };
}

export default async function ExperiencePage() {
  const profile = await getProfileData();

  return (
    <div className="mx-auto max-w-3xl px-6 py-24 lg:px-12">
      <h1 className="mb-16 text-3xl font-medium tracking-tight text-foreground">
        {profile.experience.title}
      </h1>
      <ExperienceTimeline items={profile.experience.items} />
    </div>
  );
}
