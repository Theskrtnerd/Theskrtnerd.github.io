import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPostSlugs, getAllPostMeta, getPost, formatDate } from "@/lib/posts";
import Footer from "@/components/footer";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getPost(slug);
    return {
      title: `${post.title} — Bach Tran`,
      description: post.description ?? post.summary,
    };
  } catch {
    return { title: "Not found" };
  }
}

export default async function PostPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const slugs = getAllPostSlugs();
  if (!slugs.includes(slug)) notFound();

  const post = await getPost(slug);

  const all = getAllPostMeta();
  const idx = all.findIndex((p) => p.slug === slug);
  const prev = idx < all.length - 1 ? all[idx + 1] : null;
  const next = idx > 0 ? all[idx - 1] : null;

  return (
    <article className="px-6 max-w-[1100px] mx-auto pt-16 md:pt-20 pb-24">
      {/* Back */}
      <Link
        href="/posts/"
        className="animate-fade-up inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted hover:text-foreground transition-colors group mb-12"
      >
        <span className="inline-block group-hover:-translate-x-0.5 transition-transform">←</span>
        all writing
      </Link>

      {/* Header */}
      <header className="animate-fade-up delay-2 max-w-[70ch] mb-14">
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted mb-6">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {post.tags && post.tags.length > 0 && (
            <>
              <span className="text-muted/40">·</span>
              <span className="flex gap-1.5">
                {post.tags.map((t) => (
                  <span key={t} className="border border-border px-2 py-0.5 normal-case tracking-wider">
                    {t}
                  </span>
                ))}
              </span>
            </>
          )}
        </div>

        <h1 className="font-serif text-5xl md:text-7xl tracking-[-0.03em] leading-[0.98]">
          {post.title}
        </h1>

        {post.description && (
          <p className="mt-6 text-lg md:text-xl text-muted font-serif italic leading-snug max-w-[56ch]">
            {post.description}
          </p>
        )}

        <div className="mt-8 h-px bg-border" />

        <div className="mt-4 flex items-center gap-3 font-mono text-xs text-muted">
          <span>by</span>
          {(post.author?.length ? post.author : ["xineohperif"]).map((a, i, arr) => (
            <span key={a}>
              <span className="text-foreground">{a}</span>
              {i < arr.length - 1 && <span className="text-muted/40 ml-3">&</span>}
            </span>
          ))}
        </div>
      </header>

      {/* Body */}
      <div
        className="prose animate-fade-up delay-3 mx-auto"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />

      {/* Pager */}
      <nav className="mt-24 pt-8 border-t border-border grid grid-cols-2 gap-6">
        <div>
          {prev && (
            <Link
              href={`/posts/${prev.slug}/`}
              className="group block hover:-translate-x-0.5 transition-transform"
            >
              <span className="font-mono text-xs uppercase tracking-widest text-muted">
                ← previous
              </span>
              <p className="font-serif text-xl mt-2 group-hover:italic transition-all">
                {prev.title}
              </p>
            </Link>
          )}
        </div>
        <div className="text-right">
          {next && (
            <Link
              href={`/posts/${next.slug}/`}
              className="group block hover:translate-x-0.5 transition-transform"
            >
              <span className="font-mono text-xs uppercase tracking-widest text-muted">
                next →
              </span>
              <p className="font-serif text-xl mt-2 group-hover:italic transition-all">
                {next.title}
              </p>
            </Link>
          )}
        </div>
      </nav>
      <Footer />
    </article>
  );
}
