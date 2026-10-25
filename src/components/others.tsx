import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";
import Gallery, { type GalleryPhoto } from "@/components/gallery";
import AtlasDiscovery from "@/components/atlas/discovery";

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
        caption: file
          .replace(/\.(jpg|jpeg|png|webp)$/i, "")
          .replace(/\s*\(\d{4}(?:\s*[-–]\s*\d{4})?\)\s*$/, ""),
        width,
        height,
      };
    });
}

const countries = [
  "Australia", "belgium", "bulgaria", "cambodia", "china", "france",
  "germany", "hong kong", "india", "luxembourg", "myanmar", "netherlands",
  "qatar", "Singapore", "taiwan", "uae", "united states", "vietnam",
];

export default function Others() {
  const album = getAlbum();

  return (
    <section
      id="others"
      aria-labelledby="others-heading"
      className="site-container mt-20 md:mt-24 scroll-mt-24"
    >
      <div className="border-t border-border pt-10 md:pt-12">
        <h2
          id="others-heading"
          className="font-serif text-4xl md:text-5xl tracking-[-0.03em] leading-tight"
        >
          others
        </h2>

        {album.length > 0 && (
          <div className="mt-5 md:mt-6 grid gap-1 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-7" role="group" aria-labelledby="photos-heading">
            <h3 id="photos-heading" className="pt-2 font-mono text-xs leading-7 text-muted">photos</h3>
            <Gallery photos={album} />
          </div>
        )}

        <div className={`${album.length > 0 ? "mt-8" : "mt-5 md:mt-6"} grid items-baseline gap-1 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-7`}>
          <h3 className="font-mono text-xs leading-7 text-muted whitespace-nowrap">countries visited</h3>
          <ul aria-label="Countries visited" className="max-w-[78ch] text-[0.9375rem] md:text-base leading-7 text-foreground/85">
            {countries.map((country, index) => (
              <li key={country} className="inline">
                {country}
                {(country === "Australia" || country === "vietnam") && (
                  <>
                    {" "}
                    <span className="text-muted">
                      ({country === "Australia" ? "currently here" : "home"})
                    </span>
                  </>
                )}
                {index < countries.length - 1 ? ", " : ""}
              </li>
            ))}
          </ul>
        </div>
        <AtlasDiscovery />
      </div>
    </section>
  );
}
