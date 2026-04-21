import Link from "next/link";
import { getAllPostMeta, formatDateShort } from "@/lib/posts";
import Footer from "@/components/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Writing — Bach Tran",
  description: "Notes on AI, coding, and the occasional detour.",
};

export default function PostsPage() {
  const posts = getAllPostMeta();
  const years = Array.from(
    new Set(posts.map((p) => new Date(p.date).getFullYear().toString()))
  );

  return (
    <div className="px-6 max-w-[1100px] mx-auto pt-16 md:pt-24 pb-24">
      <header className="mb-16 md:mb-24">
        <span className="animate-fade-up section-number font-mono uppercase text-xs tracking-widest text-muted">
          archive · {posts.length} pieces
        </span>
        <h1 className="animate-fade-up delay-2 mt-4 font-serif text-5xl md:text-7xl tracking-[-0.03em] leading-[0.95]">
          Writing<em className="text-muted font-serif">,</em>
          <br />
          <em className="text-muted font-serif">ongoing.</em>
        </h1>
        <p className="animate-fade-up delay-3 mt-6 max-w-[54ch] text-muted leading-relaxed">
          A slow archive. Mostly &ldquo;top-of-mind&rdquo; reflections, plus a few
          technical pieces when something teaches me something worth keeping.
        </p>
      </header>

      <div className="space-y-20">
        {years.map((year, yi) => {
          const yearPosts = posts.filter(
            (p) => new Date(p.date).getFullYear().toString() === year
          );
          return (
            <section key={year} className="animate-fade-up" style={{ animationDelay: `${0.2 + yi * 0.1}s` }}>
              <div className="flex items-baseline gap-6 mb-6">
                <h2 className="font-serif text-6xl md:text-7xl tracking-[-0.03em] text-muted/40">
                  {year}
                </h2>
                <div className="flex-1 h-px bg-border" />
                <span className="font-mono text-xs text-muted">
                  {yearPosts.length} {yearPosts.length === 1 ? "piece" : "pieces"}
                </span>
              </div>

              <ul className="divide-y divide-border border-y border-border">
                {yearPosts.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/posts/${p.slug}/`}
                      className="row-hover group grid grid-cols-[auto_1fr] md:grid-cols-[120px_1fr_auto] gap-4 md:gap-8 items-baseline py-7 hover:pl-2 transition-all duration-300"
                    >
                      <span className="font-mono text-xs text-muted tabular-nums whitespace-nowrap">
                        {formatDateShort(p.date)}
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-serif text-2xl md:text-3xl tracking-tight leading-snug group-hover:italic transition-all">
                          {p.title}
                        </h3>
                        {p.description && (
                          <p className="text-sm text-muted mt-1.5 max-w-[64ch]">
                            {p.description}
                          </p>
                        )}
                      </div>
                      {p.tags && p.tags.length > 0 && (
                        <div className="hidden md:flex gap-1.5 shrink-0">
                          {p.tags.map((t) => (
                            <span
                              key={t}
                              className="font-mono text-[0.6875rem] uppercase tracking-wider text-muted border border-border px-2 py-0.5"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
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
