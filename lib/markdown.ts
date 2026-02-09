import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";
import fs from "fs";
import path from "path";

const contentDirectory = path.join(process.cwd(), "content");

export interface ProfileData {
  name: string;
  title: string;
  location: string;
  age: number;
  years_of_experience: string;
  email: string;
  phone: string;
  github: string;
  wechat_public: string;
  xiaohongshu: string;
  seo: {
    title: string;
    description: string;
  };
  hero: {
    greeting: string;
    tagline: string;
    description: string;
    cta: {
      primary: { text: string; link: string };
      secondary: { text: string; link: string };
    };
  };
  about: {
    title: string;
    content: string;
  };
  core_competencies: {
    title: string;
    items: Array<{
      title: string;
      icon: string;
      description: string;
    }>;
  };
  experience: {
    title: string;
    items: Array<{
      company: string;
      role: string;
      period: string;
      location: string;
      description: string;
      highlights: string[];
    }>;
  };
  projects: {
    title: string;
    featured: Array<{
      name: string;
      tagline: string;
      period: string;
      role: string;
      company: string;
      description: string;
      highlights: string[];
      tags: string[];
      featured: boolean;
    }>;
    other: Array<{
      name: string;
      period: string;
      role: string;
      description: string;
      tags: string[];
    }>;
  };
  skills: {
    title: string;
    categories: Array<{
      name: string;
      items: string[];
    }>;
  };
  contributions: {
    title: string;
    items: Array<{
      name: string;
      role: string;
      link: string;
      description: string;
      tags: string[];
    }>;
  };
  patents: {
    title: string;
    items: Array<{
      name: string;
      description: string;
    }>;
  };
  education: {
    title: string;
    items: Array<{
      school: string;
      degree: string;
      major: string;
      period: string;
    }>;
  };
  contact: {
    title: string;
    description: string;
    email: string;
    socials: Array<{
      platform: string;
      url: string;
      handle: string;
    }>;
  };
  footer: {
    copyright: string;
    made_with: string;
  };
}

export async function getProfileData(): Promise<ProfileData> {
  const fullPath = path.join(contentDirectory, "profile.md");
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(fileContents);
  return data as ProfileData;
}

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(gfm).use(html).process(markdown);
  return result.toString();
}

// Blog posts
export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
}

export function getAllBlogPosts(): BlogPost[] {
  const postsDirectory = path.join(contentDirectory, "blog");
  
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || slug,
        date: data.date || new Date().toISOString(),
        excerpt: data.excerpt || "",
        content,
        tags: data.tags || [],
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  const postsDirectory = path.join(contentDirectory, "blog");
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || slug,
    date: data.date || new Date().toISOString(),
    excerpt: data.excerpt || "",
    content,
    tags: data.tags || [],
  };
}
