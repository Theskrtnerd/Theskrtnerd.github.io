"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { AtlasCard } from "./atlas/card";
import { EntryDialog } from "./atlas/dialogs";
import { categories, monthKey, monthLabel, type AtlasAudience, type Entry } from "./atlas/data";

const AtlasSpace = dynamic(() => import("./atlas/space"), { ssr: false, loading: () => <p role="status">Loading 3D view…</p> });

export default function PersonalAtlas({ entries, audience = "public" }: { entries: Entry[]; audience?: AtlasAudience }) {
  const [view, setView] = useState<"space" | "mosaic">("mosaic");
  const [kind, setKind] = useState("all");
  const [query, setQuery] = useState("");
  const [period, setPeriod] = useState("all");
  const [limit, setLimit] = useState(60);
  const [selected, setSelected] = useState<Entry | null>(null);
  const [playing, setPlaying] = useState<Entry | null>(null);
  const detailRef = useRef<HTMLDialogElement>(null);
  const allEntries = entries;
  const filtered = useMemo(() => allEntries.filter(e => (kind === "all" || e.kind === kind) && (!query || `${e.title} ${e.text || ""} ${e.byline}`.toLowerCase().includes(query.toLowerCase()))).sort((a, b) => (b.date || "9999").localeCompare(a.date || "9999")), [allEntries, kind, query]);
  const months = useMemo(() => [...new Set(filtered.map(monthKey))].sort((a, b) => a === "undated" ? -1 : b === "undated" ? 1 : b.localeCompare(a)), [filtered]);
  const activePeriod = period === "all" || months.includes(period) ? period : "all";
  const mosaicEntries = filtered.filter(e => activePeriod === "all" || monthKey(e) === activePeriod);
  const displayed = mosaicEntries.slice(0, limit);
  const groups = [...new Set(displayed.map(monthKey))];

  const openEntry = useCallback((entry: Entry) => { setSelected(entry); detailRef.current?.showModal(); }, []);
  function nextRecording() {
    const tracks = entries.filter(e => e.audio);
    const i = tracks.findIndex(e => e.id === playing?.id);
    if (tracks.length) setPlaying(tracks[(i + 1) % tracks.length]);
  }

  return <div className={`atlas-page site-container pt-16 md:pt-24 ${playing ? "has-player" : ""}`}>
    <header className="atlas-heading mb-12 md:mb-16"><div><h1 className="font-serif text-5xl md:text-6xl tracking-[-0.03em] leading-[0.98]">personal <em>atlas</em><span aria-hidden="true">✳</span></h1><p className="mt-5 max-w-[54ch] text-muted leading-relaxed">{audience === "private" ? "music, photos, and things i’ve read or watched." : "photos and things i’ve read or watched."}</p></div></header>
    <div className="atlas-toolbar">
      <div className="atlas-category-bar" aria-label="Filter collection"><button aria-pressed={kind === "all"} onClick={() => { setKind("all"); setLimit(60); }}>all</button>{categories.filter(c => allEntries.some(e => e.kind === c.kind)).map(c => <button key={c.kind} aria-pressed={kind === c.kind} onClick={() => { setKind(c.kind); setLimit(60); }}>{c.label}</button>)}</div>
      <div className="atlas-tools">
        <div className="atlas-search"><label htmlFor="atlas-search" className="sr-only">Search atlas</label><input id="atlas-search" type="search" placeholder="search…" value={query} onChange={e => { setQuery(e.target.value); setLimit(60); }} /></div>
        {view === "mosaic" && months.filter(m => m !== "undated").length > 1 && <label><span className="sr-only">Filter by date</span><select value={activePeriod} onChange={e => { setPeriod(e.target.value); setLimit(60); }}><option value="all">all dates</option>{months.map(m => <option key={m} value={m}>{monthLabel(m)}</option>)}</select></label>}
        <label><span className="sr-only">Atlas view</span><select aria-label="Atlas view" value={view} onChange={e => setView(e.target.value as "space" | "mosaic")}><option value="mosaic">mosaic</option><option value="space">3d space</option></select></label>
      </div>
    </div>

    {view === "space" ? <>
      <AtlasSpace key={kind} entries={filtered} onOpen={openEntry} />
    </> : <>
      {groups.map(group => <section className="atlas-month" key={group} aria-label={monthLabel(group)}>{group !== "undated" && <div className="atlas-month-heading"><h2>{monthLabel(group)}</h2></div>}<div className={`atlas-mosaic${kind === "quote" ? " atlas-quotes" : ""}`}>{displayed.filter(e => monthKey(e) === group).map(entry => <AtlasCard key={entry.id} entry={entry} onOpen={openEntry} />)}</div></section>)}
      {!mosaicEntries.length && <p className="atlas-empty">Nothing matches. Try another search or filter.</p>}
      {displayed.length < mosaicEntries.length && <div className="atlas-load-more"><button onClick={() => setLimit(n => n + 60)}>explore more ↓</button><span>{displayed.length} of {mosaicEntries.length} items</span></div>}
    </>}

    <EntryDialog dialogRef={detailRef} entry={selected} onClose={() => setSelected(null)} onPlay={setPlaying} />
    {playing && <div className="atlas-player" role="region" aria-label="Audio player"><div><span>NOW PLAYING</span><strong>{playing.title}</strong></div><audio key={playing.audio} controls autoPlay preload="metadata" src={playing.audio} onEnded={nextRecording} /><button aria-label="Next track" onClick={nextRecording}>next ↗</button><button aria-label="Close player" onClick={() => setPlaying(null)}>×</button></div>}
  </div>;
}
