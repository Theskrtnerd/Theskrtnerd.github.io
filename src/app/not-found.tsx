import Link from "next/link";

export default function NotFound() {
  return (
    <section className="site-container flex min-h-[calc(100dvh-3.5rem)] items-center py-16 md:py-24">
      <div className="max-w-[38rem]">
        <p className="font-mono text-xs tracking-[0.2em] text-muted mb-5">
          404 / page not found
        </p>
        <h1 className="font-serif text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95] tracking-[-0.03em]">
          a little off the map.
        </h1>
        <p className="mt-6 max-w-[38ch] text-base leading-7 text-muted">
          this page may have moved, or never existed. let&apos;s get you back
          somewhere familiar.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-11 items-center gap-2 font-mono text-sm underline decoration-border underline-offset-4 hover:decoration-foreground transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
        >
          <span aria-hidden="true">←</span> back home
        </Link>
      </div>
    </section>
  );
}
