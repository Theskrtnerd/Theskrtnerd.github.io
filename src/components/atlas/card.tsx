"use client";

import { memo, type CSSProperties } from "react";
import { categories, entryLabel, type Entry } from "./data";

export function Artwork({ entry }: { entry: Entry }) {
  if (entry.image) return <div className="atlas-art photo-art">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={entry.image} alt={entry.title} width={400} height={400} loading="lazy" draggable={false} />
  </div>;
  if (entry.videoId) return <div className="atlas-art video-art">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={`https://i.ytimg.com/vi/${entry.videoId}/hqdefault.jpg`} alt="" width={480} height={360} loading="lazy" draggable={false} />
    <span className="atlas-media-mark" aria-hidden="true">↗</span>
  </div>;
  if (entry.kind === "recording") return <div className="atlas-art record-art" aria-hidden="true"><div className="record-disc"><div className="record-label"><span>{entry.recordingType || entry.byline === "a recording by bach" ? "bach" : "music"}</span><small>{entry.recordingType || (entry.byline === "a recording by bach" ? "recordings" : "songs")}</small></div></div><span className="record-side">PLAY<br />{entry.id.slice(-3).replace(/[^0-9]/g, "") || "01"}</span></div>;
  if (entry.kind === "book") return <div className="atlas-art book-art" aria-hidden="true"><span>{entry.byline}</span><strong>{entry.title}</strong>{entry.subtitle && <i>{entry.subtitle}</i>}</div>;
  if (entry.kind === "quote") return <div className="atlas-art quote-art"><p>“{entry.text || entry.title}”</p></div>;
  if (entry.kind === "post") return <div className="atlas-art post-art"><span className="post-at">{entry.byline} ↗</span><p>{entry.text || entry.title}</p></div>;
  return <div className="atlas-art article-art" data-difficulty={entry.kind === "leetcode" ? entry.difficulty?.toLowerCase() : undefined} aria-hidden="true"><span>{entry.kind === "video" ? "WATCH /" : entry.kind === "leetcode" ? "SOLVED /" : "READ /"} {entry.kind === "leetcode" ? entry.id.replace("leetcode-", "") : entry.id.slice(-2)}</span><strong>{entry.title}</strong><div className="article-lines"><i /><i /><i /></div><span className="article-arrow">↗</span></div>;
}

export const AtlasCard = memo(function AtlasCard({ entry, onOpen, onHover, style, point }: { entry: Entry; onOpen: (entry: Entry) => void; onHover?: (entry: Entry) => void; style?: CSSProperties; point?: [number, number, number] }) {
  return <button type="button" className={`atlas-card kind-${entry.kind}`} data-space-point={point?.join(",")} aria-label={`Explore ${entry.title}`} onClick={() => onOpen(entry)} onPointerEnter={() => onHover?.(entry)} onFocus={() => onHover?.(entry)} style={{ "--art-color": entry.color || "#bac9ce", ...style } as CSSProperties}>
    <Artwork entry={entry} />
    <div className="atlas-card-caption"><div className="atlas-card-meta"><span>{categories.find(c => c.kind === entry.kind)?.label}</span></div>{entry.kind !== "quote" && <h3>{entry.title}</h3>}<time dateTime={entry.date}>{entry.difficulty && <><span className="atlas-difficulty">{entry.difficulty}</span> · </>}{entry.recordingType && <>{entry.recordingType} · </>}{entryLabel(entry)}</time></div>
  </button>;
});
