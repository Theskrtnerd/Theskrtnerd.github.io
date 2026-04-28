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
      title: `${post.title} - Bach Tran`,
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
    <article className="px-6 max-w-[760px] mx-auto pt-16 md:pt-20 pb-24">
      <Link
        href="/posts/"
        className="animate-fade-up inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted hover:text-foreground transition-colors group mb-12"
      >
        <span className="inline-block group-hover:-translate-x-0.5 transition-transform">←</span>
        all writing
      </Link>

      <header className="animate-fade-up delay-2 mb-12">
        <time
          dateTime={post.date}
          className="font-mono text-xs uppercase tracking-widest text-muted"
        >
          {formatDate(post.date)}
        </time>

        <h1 className="mt-4 font-serif text-4xl md:text-6xl tracking-[-0.03em] leading-[1.02]">
          {post.title}
        </h1>

        {post.description && (
          <p className="mt-5 text-lg text-muted font-serif italic leading-snug">
            {post.description}
          </p>
        )}
      </header>

      <div
        className="prose animate-fade-up delay-3"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />

      <nav className="mt-20 pt-8 border-t border-border grid grid-cols-2 gap-6">
        <div>
          {prev && (
            <Link
              href={`/posts/${prev.slug}/`}
              className="group block hover:-translate-x-0.5 transition-transform"
            >
              <span className="font-mono text-xs uppercase tracking-widest text-muted">
                ← previous
              </span>
              <p className="font-serif text-lg mt-2 underline decoration-transparent decoration-1 underline-offset-[6px] group-hover:decoration-foreground/40 transition-colors">
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
              <p className="font-serif text-lg mt-2 underline decoration-transparent decoration-1 underline-offset-[6px] group-hover:decoration-foreground/40 transition-colors">
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
