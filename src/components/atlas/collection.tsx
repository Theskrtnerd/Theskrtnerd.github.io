"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, type FormEvent } from "react";
import type { AtlasAudience, Entry } from "./data";

const PersonalAtlas = dynamic(() => import("../personal-atlas"), { ssr: false, loading: () => <p className="site-container pt-16" role="status">Opening atlas…</p> });

async function loadEntries(audience: AtlasAudience, signal?: AbortSignal): Promise<Entry[] | null> {
  const endpoint = audience === "private" ? "/api/atlas/private/collection/" : "/api/atlas/collection/";
  const response = await fetch(endpoint, { cache: "no-store", signal });
  if (response.status === 401 && audience === "private") return null;
  if (!response.ok) throw new Error("Collection unavailable");
  return response.json();
}

export default function AtlasCollection({ audience = "public" }: { audience?: AtlasAudience }) {
  const [entries, setEntries] = useState<Entry[] | null>(null);
  const [checking, setChecking] = useState(true);
  const [locked, setLocked] = useState(false);
  const [busy, setBusy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    loadEntries(audience, controller.signal).then(collection => {
      if (!controller.signal.aborted) {
        setEntries(collection);
        setLocked(collection === null);
      }
    }).catch(() => {
      if (!controller.signal.aborted) setError("Couldn’t load the atlas. Please refresh to try again.");
    }).finally(() => {
      if (!controller.signal.aborted) setChecking(false);
    });
    return () => controller.abort();
  }, [audience]);

  async function unlock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const password = String(new FormData(form).get("password") || "");
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/atlas/access/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
      if (!response.ok) throw new Error("Access denied");
      const collection = await loadEntries("private");
      if (!collection) throw new Error("Access denied");
      setEntries(collection);
      setLocked(false);
      form.reset();
    } catch {
      setError("Couldn’t unlock the atlas. Check the password and try again.");
    } finally { setBusy(false); }
  }

  if (checking) return <p className="site-container pt-16 md:pt-24 text-muted" role="status">Opening atlas…</p>;
  if (entries) return <PersonalAtlas entries={entries} audience={audience} />;
  if (!locked) return <p className="site-container pt-16 md:pt-24 text-muted" role="alert">{error}</p>;
  return <div className="atlas-page site-container pt-16 md:pt-24">
    <header className="atlas-heading mb-12 md:mb-16"><div><h1 className="font-serif text-5xl md:text-6xl tracking-[-0.03em] leading-[0.98]">personal <em>atlas</em><span aria-hidden="true">✳</span></h1><p className="mt-5 text-muted leading-relaxed">a private collection.</p></div></header>
    <form className="atlas-unlock" onSubmit={unlock} aria-busy={busy}>
      <label htmlFor="atlas-password">password</label>
      <div>
        <input id="atlas-password" name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" required disabled={busy} aria-invalid={error ? true : undefined} aria-describedby={error ? "atlas-unlock-error" : undefined} />
        <button type="submit" disabled={busy}>{busy ? "opening…" : "open atlas"}</button>
      </div>
      <button className="atlas-password-toggle" type="button" aria-controls="atlas-password" aria-pressed={showPassword} onClick={() => setShowPassword(value => !value)}>{showPassword ? "hide password" : "show password"}</button>
      {error && <p id="atlas-unlock-error" role="alert">{error}</p>}
    </form>
  </div>;
}
