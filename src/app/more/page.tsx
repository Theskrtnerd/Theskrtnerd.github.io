import Image from "next/image";
import fs from "node:fs";
import path from "node:path";
import Footer from "@/components/footer";
import VisitedPlaces from "@/components/visited-places";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "More — Bach Tran",
  description: "Photos, places, and other things beyond the CV.",
};

type Photo = { file: string; caption: string };

function getAlbum(): Photo[] {
  const dir = path.join(process.cwd(), "public", "album");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f))
    .sort()
    .map((file) => ({
      file,
      caption: file.replace(/\.(jpg|jpeg|png|webp)$/i, ""),
    }));
}

const regions = [
  {
    label: "Home",
    color: "emerald",
    countries: ["Vietnam"],
  },
  {
    label: "Europe",
    countries: ["France", "Germany", "Belgium", "Bulgaria", "Luxembourg", "Netherlands"],
  },
  {
    label: "North America",
    countries: ["United States"],
  },
  {
    label: "Asia",
    countries: ["Cambodia", "China", "Hong Kong", "India", "Myanmar", "Singapore", "UAE", "Taiwan", "Qatar"],
  },
  {
    label: "Oceania",
    countries: ["Australia"],
  },
];

export default function MorePage() {
  const album = getAlbum();
  const totalCountries = regions.reduce((a, r) => a + r.countries.length, 0);

  return (
    <div className="pb-24">
      <header className="px-6 max-w-[1100px] mx-auto pt-16 md:pt-24 pb-16 md:pb-20">
        <span className="animate-fade-up section-number font-mono uppercase text-xs tracking-widest text-muted">
          the margins
        </span>
        <h1 className="animate-fade-up delay-2 mt-4 font-serif text-5xl md:text-7xl tracking-[-0.03em] leading-[0.95]">
          More about<br />
          <em className="text-muted font-serif">the human.</em>
        </h1>
        <p className="animate-fade-up delay-3 mt-6 max-w-[54ch] text-muted leading-relaxed">
          A few frames and a rough map — the parts that rarely make the CV but
          make the person.
        </p>
      </header>

      {/* Gallery */}
      <section className="px-6 max-w-[1100px] mx-auto py-16 md:py-20">
        <div className="mb-10 flex items-baseline justify-between flex-wrap gap-4">
          <div>
            <span className="section-number font-mono uppercase text-xs tracking-widest text-muted">
              01 / frames
            </span>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl tracking-[-0.02em]">
              Some favourites.
            </h2>
          </div>
          <span className="font-mono text-xs text-muted">
            {album.length} photos
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {album.map((p, i) => (
            <figure
              key={p.file}
              className="gallery-item animate-fade-up group"
              style={{ animationDelay: `${0.1 + (i % 6) * 0.07}s` }}
            >
              <div className="relative aspect-[4/5] overflow-hidden border border-border bg-surface">
                <Image
                  src={`/album/${encodeURIComponent(p.file)}`}
                  alt={p.caption}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
                />
              </div>
              <figcaption className="mt-3 flex items-start gap-3 font-mono text-[0.6875rem] uppercase tracking-wider text-muted">
                <span className="tabular-nums shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="leading-relaxed normal-case tracking-normal font-sans text-[0.8125rem]">
                  {p.caption}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Countries */}
      <section className="px-6 max-w-[1100px] mx-auto py-20 md:py-28">
        <div className="mb-12 flex items-baseline justify-between flex-wrap gap-4">
          <div>
            <span className="section-number font-mono uppercase text-xs tracking-widest text-muted">
              02 / atlas
            </span>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl tracking-[-0.02em]">
              Countries visited.
            </h2>
          </div>
          <span className="font-mono text-xs text-muted tabular-nums">
            {totalCountries} countries · 5 regions
          </span>
        </div>

        <div className="animate-fade-up mb-12">
          <VisitedPlaces />
        </div>

        <div className="border-t border-border">
          {regions.map((r, ri) => (
            <div
              key={r.label}
              className="grid grid-cols-[140px_1fr] md:grid-cols-[200px_1fr] gap-6 md:gap-10 py-8 md:py-10 border-b border-border animate-fade-up"
              style={{ animationDelay: `${0.1 + ri * 0.1}s` }}
            >
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-muted flex items-center gap-2">
                  {r.color === "emerald" && (
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
                  )}
                  {String(ri + 1).padStart(2, "0")} · {r.label}
                </span>
                <p className="mt-2 font-mono text-[0.6875rem] text-muted/60">
                  {r.countries.length} {r.countries.length === 1 ? "country" : "countries"}
                </p>
              </div>
              <ul className="flex flex-wrap gap-x-6 gap-y-3 items-baseline">
                {r.countries.map((c) => (
                  <li
                    key={c}
                    className="font-serif text-2xl md:text-3xl tracking-tight leading-none"
                  >
                    {c}
                    <span className="text-muted/40 ml-6 font-sans text-lg align-top">·</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-10 max-w-[54ch] font-serif text-lg italic text-muted leading-relaxed">
          &ldquo;We travel not to escape life, but for life not to escape us.&rdquo;
          <span className="block not-italic font-sans text-xs tracking-widest uppercase text-muted/60 mt-3">
            — anonymous, probably
          </span>
        </p>
      </section>
      <Footer />
    </div>
  );
}
