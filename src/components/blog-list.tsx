import Link from "next/link";
import { formatDateShort, getAllPostMeta } from "@/lib/posts";

export default function BlogList() {
  const posts = getAllPostMeta();

  return (
    <section
      id="blog"
      aria-labelledby="blog-heading"
      className="site-container mt-20 md:mt-24 scroll-mt-24"
    >
      <div className="border-t border-border pt-10 md:pt-12">
        <h2
          id="blog-heading"
          className="font-serif text-4xl md:text-5xl tracking-[-0.03em] leading-tight"
        >
          blog
        </h2>
        <ol className="mt-5 md:mt-6">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/posts/${post.slug}/`}
                className="group grid min-h-11 items-baseline gap-1 py-2 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-7 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
              >
                <time
                  dateTime={post.date}
                  className="font-mono text-xs leading-7 text-muted tabular-nums lowercase"
                >
                  {formatDateShort(post.date)}
                </time>
                <span className="max-w-[78ch] text-[0.9375rem] md:text-base leading-7 text-foreground/85 underline decoration-border underline-offset-4 group-hover:text-foreground group-hover:decoration-foreground transition-colors">
                  {post.slug === "slow-down-or-move-fast"
                    ? post.title.toLowerCase().replace(/^slow/, "sLow")
                    : post.title.toLowerCase()}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
