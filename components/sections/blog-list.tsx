"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BlogPost } from "@/lib/markdown";

interface BlogListProps {
  posts: BlogPost[];
}

export function BlogList({ posts }: BlogListProps) {
  if (posts.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-muted/30 p-12 text-center">
        <p className="text-muted-foreground">暂无文章，敬请期待...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post, index) => (
        <motion.article
          key={post.slug}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Link href={`/blog/${post.slug}`} className="group block">
            <div className="rounded-xl border border-border bg-background p-6 transition-all hover:border-foreground/20">
              <div className="flex flex-col gap-3">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-lg font-medium text-foreground transition-colors group-hover:text-muted-foreground">
                    {post.title}
                  </h2>
                  <time
                    dateTime={post.date}
                    className="shrink-0 text-sm text-muted-foreground"
                  >
                    {new Date(post.date).toLocaleDateString("zh-CN", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                </div>
                {post.excerpt && (
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {post.excerpt}
                  </p>
                )}
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Link>
        </motion.article>
      ))}
    </div>
  );
}
