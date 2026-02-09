import { getProfileData } from "@/lib/markdown";
import { Metadata } from "next";
import { ProjectsGrid } from "@/components/sections/projects-grid";

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfileData();
  return {
    title: `${profile.projects.title} | ${profile.name}`,
    description: profile.seo.description,
  };
}

export default async function ProjectsPage() {
  const profile = await getProfileData();

  return (
    <div className="mx-auto max-w-3xl px-6 py-24 lg:px-12">
      <h1 className="mb-16 text-3xl font-medium tracking-tight text-foreground">
        {profile.projects.title}
      </h1>
      <ProjectsGrid
        featured={profile.projects.featured}
        other={profile.projects.other}
      />
    </div>
  );
}
