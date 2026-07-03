import Link from "next/link";
import { getAllPostMeta, formatDateShort } from "@/lib/posts";
import Footer from "@/components/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Writing - Bach Tran",
  description: "Notes on AI, coding, and the occasional detour.",
};

export default function PostsPage() {
  const posts = getAllPostMeta();
  const years = Array.from(
    new Set(posts.map((p) => new Date(p.date).getFullYear().toString()))
  );

  return (
    <div className="pt-16 md:pt-24 pb-24">
      <header className="px-6 max-w-[1100px] mx-auto mb-16 md:mb-20">
        <h1 className="animate-fade-up font-serif text-5xl md:text-6xl tracking-[-0.03em] leading-[0.98]">
          writing
        </h1>
        <p className="animate-fade-up delay-3 mt-5 max-w-[54ch] text-muted leading-relaxed">
          i try to write things down when i can - some top-of-mind reflections,
          some random technical pieces, and other stuff in between.
        </p>
      </header>

      <div className="px-6 max-w-[1100px] mx-auto space-y-14">
        {years.map((year, yi) => {
          const yearPosts = posts.filter(
            (p) => new Date(p.date).getFullYear().toString() === year
          );
          return (
            <section
              key={year}
              className="animate-fade-up"
              style={{ animationDelay: `${0.2 + yi * 0.1}s` }}
            >
              <div className="flex items-baseline gap-4 mb-3">
                <span className="font-mono text-xs tracking-widest text-muted tabular-nums">
                  {year}
                </span>
                <div className="flex-1 h-px bg-border" />
              </div>

              <ul className="divide-y divide-border">
                {yearPosts.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/posts/${p.slug}/`}
                      className="grid grid-cols-[auto_1fr] gap-6 md:gap-10 items-baseline py-5 group"
                    >
                      <span className="font-mono text-xs text-muted tabular-nums whitespace-nowrap">
                        {formatDateShort(p.date)}
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-sans font-medium text-xl md:text-2xl tracking-tight leading-snug underline decoration-transparent decoration-1 underline-offset-[6px] group-hover:decoration-foreground/40 transition-colors lowercase">
                          {p.title}
                        </h3>
                        {p.description && (
                          <p className="text-sm text-muted mt-1.5 max-w-[64ch] lowercase">
                            {p.description}
                          </p>
                        )}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
      <Footer />
    </div>
  );
}
