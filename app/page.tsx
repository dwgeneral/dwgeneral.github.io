import { getProfileData, markdownToHtml } from "@/lib/markdown";
import { HeroText } from "@/components/sections/hero-text";
import { AboutSection } from "@/components/sections/about";
import { CompetenciesSection } from "@/components/sections/competencies";
import { FeaturedProjectsSection } from "@/components/sections/featured-projects";
import { ContributionsSection } from "@/components/sections/contributions";
import { PatentsSection } from "@/components/sections/patents";
import { ContactPreview } from "@/components/sections/contact-preview";

export default async function HomePage() {
  const profile = await getProfileData();
  const aboutHtml = await markdownToHtml(profile.about.content);

  return (
    <div className="flex flex-col">
      {/* Hero Section with Text Animation */}
      <HeroText
        description={profile.hero.description}
        cta={profile.hero.cta}
      />

      {/* About Section */}
      <AboutSection
        title={profile.about.title}
        content={aboutHtml}
      />

      {/* Core Competencies */}
      <CompetenciesSection
        title={profile.core_competencies.title}
        items={profile.core_competencies.items}
      />

      {/* Featured Projects */}
      <FeaturedProjectsSection
        title={profile.projects.title}
        projects={profile.projects.featured}
      />

      {/* Open Source Contributions */}
      <ContributionsSection
        title={profile.contributions.title}
        items={profile.contributions.items}
      />

      {/* Patents */}
      <PatentsSection
        title={profile.patents.title}
        items={profile.patents.items}
      />

      {/* Contact Preview */}
      <ContactPreview
        title={profile.contact.title}
        description={profile.contact.description}
        email={profile.contact.email}
        socials={profile.contact.socials}
      />
    </div>
  );
}
