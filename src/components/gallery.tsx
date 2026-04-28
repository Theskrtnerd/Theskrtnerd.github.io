"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export type GalleryPhoto = {
  file: string;
  caption: string;
  width: number;
  height: number;
};

export default function Gallery({ photos }: { photos: GalleryPhoto[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const isOpen = openIdx !== null;

  const close = useCallback(() => setOpenIdx(null), []);
  const next = useCallback(
    () => setOpenIdx((i) => (i === null ? null : (i + 1) % photos.length)),
    [photos.length]
  );
  const prev = useCallback(
    () =>
      setOpenIdx((i) =>
        i === null ? null : (i - 1 + photos.length) % photos.length
      ),
    [photos.length]
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, close, next, prev]);

  const current = openIdx !== null ? photos[openIdx] : null;

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
        {photos.map((p, i) => (
          <button
            key={p.file}
            type="button"
            onClick={() => setOpenIdx(i)}
            title={p.caption}
            className="animate-fade-up group relative aspect-[4/5] overflow-hidden bg-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
            style={{ animationDelay: `${0.05 + (i % 6) * 0.05}s` }}
            aria-label={`Open photo: ${p.caption}`}
          >
            <Image
              src={`/album/${encodeURIComponent(p.file)}`}
              alt={p.caption}
              fill
              sizes="(min-width: 768px) 33vw, 50vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 p-3 md:p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300"
            >
              <span className="block text-xs md:text-sm text-white leading-snug line-clamp-2">
                {p.caption}
              </span>
            </div>
          </button>
        ))}
      </div>

      {isOpen && current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex flex-col animate-fade-up"
          onClick={close}
        >
          <div className="flex items-center justify-between px-5 py-4 font-mono text-xs uppercase tracking-widest text-muted">
            <span className="tabular-nums">
              {String((openIdx ?? 0) + 1).padStart(2, "0")} /{" "}
              {String(photos.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
              className="hover:text-foreground transition-colors px-2 py-1"
              aria-label="Close"
            >
              close ✕
            </button>
          </div>

          <div
            className="flex-1 flex items-center justify-center px-4 md:px-16 pb-4 min-h-0"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={prev}
              aria-label="Previous photo"
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center text-muted hover:text-foreground transition-colors text-2xl"
            >
              ←
            </button>

            <figure className="flex flex-col items-center max-h-full max-w-full">
              <div className="relative max-h-[78vh] max-w-full">
                <Image
                  src={`/album/${encodeURIComponent(current.file)}`}
                  alt={current.caption}
                  width={current.width}
                  height={current.height}
                  sizes="90vw"
                  priority
                  className="max-h-[78vh] w-auto h-auto object-contain"
                />
              </div>
              <figcaption className="mt-5 max-w-[60ch] text-center text-sm text-muted leading-relaxed">
                {current.caption}
              </figcaption>
            </figure>

            <button
              type="button"
              onClick={next}
              aria-label="Next photo"
              className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center text-muted hover:text-foreground transition-colors text-2xl"
            >
              →
            </button>
          </div>
        </div>
      )}
    </>
  );
}
