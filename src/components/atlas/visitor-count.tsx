"use client";

import { useEffect, useState } from "react";
import { savedVisitor } from "@/lib/atlas-visitor-id";

export default function VisitorCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    async function register() {
      // Serialize first visits across tabs when the browser supports Web Locks.
      const id = navigator.locks
        ? await navigator.locks.request("atlas-visitor-id", savedVisitor)
        : savedVisitor();
      if (controller.signal.aborted) return;
      const response = await fetch("/api/atlas/visitors/", {
        method: id ? "POST" : "GET",
        ...(id ? { headers: { "Content-Type": "application/json" }, body: JSON.stringify({ visitorId: id }) } : {}),
        cache: "no-store", signal: controller.signal,
      });
      if (!response.ok) return;
      const data = await response.json();
      if (!controller.signal.aborted && Number.isSafeInteger(data.count) && data.count >= 0) setCount(data.count);
    }
    void register().catch(() => { /* Atlas stays usable if the counter is unavailable. */ });
    return () => controller.abort();
  }, []);

  return <p className="mt-4 min-h-4 font-mono text-xs text-muted" aria-live="polite">
    {count !== null && `${count.toLocaleString("en")} ${count === 1 ? "explorer has" : "explorers have"} found this page`}
  </p>;
}
