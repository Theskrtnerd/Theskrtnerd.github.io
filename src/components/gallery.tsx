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
      <ul className="grid min-w-0 grid-cols-2 lg:grid-cols-5">
        {photos.map((p, i) => (
          <li key={p.file} className="min-w-0">
            <button
              type="button"
              onClick={() => setOpenIdx(i)}
              className="group relative block w-full cursor-zoom-in overflow-hidden text-left focus-visible:z-10 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-white"
              aria-label={`Open photo: ${p.caption}`}
              aria-haspopup="dialog"
            >
              <span className="relative block aspect-[3/2] overflow-hidden bg-surface">
                <Image
                  src={`/album/${encodeURIComponent(p.file)}`}
                  alt=""
                  fill
                  sizes="(min-width: 1100px) 211px, (min-width: 1024px) calc((100vw - 48px) / 5), (min-width: 640px) calc((100vw - 48px) / 2), calc((100vw - 32px) / 2)"
                  className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
              </span>
              <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3 pt-8 font-mono text-xs leading-5 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none">
                {p.caption}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {isOpen && current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex flex-col animate-fade-up"
          onClick={close}
        >
          <div className="flex items-center justify-between px-5 py-4 font-mono text-xs tracking-widest text-muted">
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
