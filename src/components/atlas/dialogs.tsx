"use client";

import { type RefObject, type CSSProperties } from "react";
import { Artwork } from "./card";
import { categories, entryLabel, type Entry } from "./data";

export function EntryDialog({ dialogRef, entry, onClose, onPlay }: { dialogRef: RefObject<HTMLDialogElement | null>; entry: Entry | null; onClose: () => void; onPlay: (entry: Entry) => void }) {
  return <dialog ref={dialogRef} className="atlas-dialog" aria-labelledby="atlas-detail-title" onClose={onClose} onClick={e => { if (e.target === e.currentTarget) dialogRef.current?.close(); }}>
    <button className="atlas-close" aria-label="Close entry" onClick={() => dialogRef.current?.close()}>×</button>
    {entry && <div className="atlas-detail">
      <p className="atlas-eyebrow">{categories.find(c => c.kind === entry.kind)?.label} / {entry.difficulty && <><span className="atlas-difficulty">{entry.difficulty}</span> / </>}{entryLabel(entry)}</p>
      <h2 id="atlas-detail-title">{entry.kind === "quote" ? `“${entry.text || entry.title}”` : entry.title}</h2>{entry.byline && <p className="atlas-detail-byline">{entry.byline}</p>}
      {entry.audio && <button className="atlas-primary" onClick={() => { onPlay(entry); dialogRef.current?.close(); }}>▶ play audio</button>}
      {entry.image && <a href={entry.image} target="_blank" rel="noreferrer" aria-label={`Open ${entry.title} at full size`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="atlas-detail-photo" src={entry.image} alt={entry.title} width={600} height={800} />
      </a>}
      {entry.videoId && <iframe key={entry.videoId} title={entry.title} src={`https://www.youtube-nocookie.com/embed/${entry.videoId}`} allow="encrypted-media; picture-in-picture; fullscreen" allowFullScreen />}
      {entry.kind !== "quote" && !entry.image && !entry.videoId && !entry.audio && <div className="atlas-detail-art" style={{ "--art-color": entry.color } as CSSProperties}><Artwork entry={entry} /></div>}
      {entry.note && <p className="atlas-detail-note">{entry.note}</p>}
      {entry.url && <a href={entry.url} target="_blank" rel="noreferrer">open original ↗</a>}
    </div>}
  </dialog>;
}
