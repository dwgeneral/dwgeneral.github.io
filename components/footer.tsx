"use client";

interface FooterProps {
  copyright: string;
  madeWith: string;
}

export function Footer({ copyright, madeWith }: FooterProps) {
  return (
    <footer className="border-t border-border bg-background py-8">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">{copyright}</p>
          <p className="text-sm text-muted-foreground">{madeWith}</p>
        </div>
      </div>
    </footer>
  );
}
