import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";
import Footer from "@/components/footer";
import VisitedPlaces from "@/components/visited-places";
import Gallery, { type GalleryPhoto } from "@/components/gallery";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "More - Bach Tran",
  description: "Photos, places, and other things beyond the CV.",
};

function getAlbum(): GalleryPhoto[] {
  const dir = path.join(process.cwd(), "public", "album");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f))
    .sort()
    .map((file) => {
      const buffer = fs.readFileSync(path.join(dir, file));
      const { width = 1600, height = 1200 } = imageSize(buffer);
      return {
        file,
        caption: file.replace(/\.(jpg|jpeg|png|webp)$/i, ""),
        width,
        height,
      };
    });
}

const regions = [
  { label: "home", color: "emerald", countries: ["vietnam"] },
  {
    label: "europe",
    countries: ["france", "germany", "belgium", "bulgaria", "luxembourg", "netherlands"],
  },
  { label: "north america", countries: ["united states"] },
  {
    label: "asia",
    countries: ["cambodia", "china", "hong kong", "india", "myanmar", "singapore", "uae", "taiwan", "qatar"],
  },
  { label: "oceania", countries: ["australia"] },
];

export default function MorePage() {
  const album = getAlbum();
  const totalCountries = regions.reduce((a, r) => a + r.countries.length, 0);

  return (
    <div className="pb-24">
      <header className="px-6 max-w-[1100px] mx-auto pt-16 md:pt-24 pb-16 md:pb-20">
        <h1 className="animate-fade-up font-serif text-5xl md:text-6xl tracking-[-0.03em] leading-[0.98]">
          more
        </h1>
        <p className="animate-fade-up delay-3 mt-5 max-w-[54ch] text-muted leading-relaxed">
          random personal things outside of work - photos, places, music, food, etc.
        </p>
      </header>

      {/* Gallery */}
      <section className="px-6 max-w-[1100px] mx-auto py-12 md:py-16">
        <div className="mb-8 flex items-baseline justify-between gap-4">
          <h2 className="font-mono text-xs tracking-widest text-muted">
            frames
          </h2>
          <span className="font-mono text-xs text-muted">
            {album.length} photos
          </span>
        </div>

        <Gallery photos={album} />
      </section>

      {/* Countries */}
      <section className="px-6 max-w-[1100px] mx-auto py-16 md:py-20">
        <div className="mb-8 flex items-baseline justify-between gap-4">
          <h2 className="font-mono text-xs tracking-widest text-muted">
            atlas
          </h2>
          <span className="font-mono text-xs text-muted tabular-nums">
            {totalCountries} countries · 5 regions
          </span>
        </div>

        <div className="animate-fade-up mb-12">
          <VisitedPlaces />
        </div>

        <ul className="divide-y divide-border border-t border-border">
          {regions.map((r, ri) => (
            <li
              key={r.label}
              className="grid grid-cols-[140px_1fr] md:grid-cols-[200px_1fr] gap-6 md:gap-10 py-6 animate-fade-up"
              style={{ animationDelay: `${0.1 + ri * 0.08}s` }}
            >
              <span className="font-mono text-xs tracking-widest text-muted flex items-center gap-2">
                {r.color === "emerald" && (
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
                )}
                {r.label}
              </span>
              <span className="font-sans text-lg md:text-xl tracking-tight leading-relaxed">
                {r.countries.join(", ")}
              </span>
            </li>
          ))}
        </ul>
      </section>
      <Footer />
    </div>
  );
}
