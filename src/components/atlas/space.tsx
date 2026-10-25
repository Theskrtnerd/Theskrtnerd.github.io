"use client";

import { memo, useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import { AtlasCard } from "./card";
import { entryLabel, type Entry } from "./data";

type Pose = { x: number; y: number; zoom: number; rx: number; ry: number };
type Layout = "globe" | "constellation";
const home: Pose = { x: 0, y: 0, zoom: 1, rx: -8, ry: -18 };
const perspective = 1800;
const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));
// Match browser CSS serialization during hydration.
const cssNumber = (n: number) => Math.round(n * 100) / 100;

const GlobeObjects = memo(function GlobeObjects({ entries, radius, layout, onOpen, onHover }: { entries: Entry[]; radius: number; layout: Layout; onOpen: (entry: Entry) => void; onHover: (entry: Entry) => void }) {
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  return <>
    {layout === "globe" && entries.length > 0 && [0, 60, 120].map(angle => <div key={angle} className="globe-ring" aria-hidden="true" style={{ width: radius * 2, height: radius * 2, transform: `translate(-50%, -50%) rotateY(${angle}deg)` }} />)}
    {entries.map((entry, i) => {
      const y = 1 - 2 * (i + .5) / entries.length;
      const horizontal = Math.sqrt(1 - y * y);
      const angle = goldenAngle * i;
      const distance = radius * (layout === "globe" ? 1 : .48 + .72 * ((i * 17 % 101) / 100));
      const smallCollection = entries.length <= 3;
      const x = smallCollection ? (i - (entries.length - 1) / 2) * distance * .5 : Math.cos(angle) * horizontal * distance;
      const vertical = smallCollection ? 0 : -y * distance;
      const z = smallCollection ? Math.sqrt(distance * distance - x * x) : Math.sin(angle) * horizontal * distance;
      const ry = Math.atan2(x, z) * 180 / Math.PI;
      const rx = Math.asin(-vertical / distance) * 180 / Math.PI;
      return <AtlasCard key={entry.id} entry={entry} onOpen={onOpen} onHover={onHover} point={[x, vertical, z]} style={{ position: "absolute", width: 190, left: "50%", top: "50%", transform: `translate(-50%, -50%) translate3d(${cssNumber(x)}px, ${cssNumber(vertical)}px, ${cssNumber(z)}px) rotateY(${cssNumber(ry)}deg) rotateX(${cssNumber(rx)}deg)` }} />;
    })}
  </>;
});

export default function AtlasSpace({ entries, onOpen }: { entries: Entry[]; onOpen: (entry: Entry) => void }) {
  const [layout, setLayout] = useState<Layout>("globe");
  const [mode, setMode] = useState<"orbit" | "pan">("orbit");
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState<Entry | null>(null);
  const shellRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const zoomLabel = useRef<HTMLSpanElement>(null);
  const current = useRef<Pose>({ ...home });
  const target = useRef<Pose>({ ...home });
  const fit = useRef(9000);
  const maxZoom = useRef(5);
  const motionMode = useRef(mode);
  const animate = useRef<() => void>(() => {});
  const drag = useRef<{ x: number; y: number; moved: boolean; pointerId: number } | null>(null);
  const suppressClick = useRef(false);
  const radius = Math.max(250, Math.round(Math.sqrt(entries.length) * 72));
  const onHover = useCallback((entry: Entry) => setHovered(entry), []);

  useEffect(() => { motionMode.current = mode; }, [mode]);
  useEffect(() => {
    const scene = sceneRef.current, world = worldRef.current;
    if (!scene || !world) return;
    let frame: number | null = null;
    let disposed = false;
    let visible = true;
    let viewportWidth = scene.clientWidth, viewportHeight = scene.clientHeight;
    // Keep all entries addressable, but avoid compositing back-facing/offscreen tiles.
    const tiles = [...world.querySelectorAll<HTMLButtonElement>("[data-space-point]")].map(element => ({
      element, point: element.dataset.spacePoint!.split(",").map(Number), shown: true,
    }));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    function render() {
      frame = null;
      if (disposed || !visible || document.hidden || !world || !scene) return;
      let distanceToTarget = 0;
      for (const key of Object.keys(current.current) as (keyof Pose)[]) {
        const delta = target.current[key] - current.current[key];
        current.current[key] += reducedMotion.matches || Math.abs(delta) < .001 ? delta : delta * .2;
        distanceToTarget += Math.abs(delta);
      }
      const c = current.current;
      const cameraDistance = fit.current / c.zoom;
      const z = perspective - cameraDistance;
      const rx = c.rx * Math.PI / 180, ry = c.ry * Math.PI / 180;
      const cx = Math.cos(rx), sx = Math.sin(rx), cy = Math.cos(ry), sy = Math.sin(ry);
      let shown = 0;
      for (const tile of tiles) {
        const [px, py, pz] = tile.point;
        const x = cy * px + sy * pz, yz = -sy * px + cy * pz;
        const y = cx * py - sx * yz, depth = sx * py + cx * yz;
        const facing = depth * cameraDistance - x * c.x - y * c.y > px * px + py * py + pz * pz;
        const scale = perspective / (cameraDistance - depth);
        const projectedX = scale * (x + c.x), projectedY = scale * (y + c.y);
        const margin = 160 * Math.abs(scale);
        const show = facing && cameraDistance > depth && Math.abs(projectedX) < viewportWidth / 2 + margin && Math.abs(projectedY) < viewportHeight / 2 + margin;
        if (show !== tile.shown) { tile.element.style.display = show ? "" : "none"; tile.shown = show; }
        if (show) shown++;
      }
      world.dataset.visibleCards = String(shown);
      world.style.transform = `translate(-50%, -50%) translate3d(${c.x}px, ${c.y}px, ${z}px) rotateX(${c.rx}deg) rotateY(${c.ry}deg)`;
      world.dataset.camera = `${c.x.toFixed(2)},${c.y.toFixed(2)},${c.zoom.toFixed(2)},${c.rx.toFixed(2)},${c.ry.toFixed(2)}`;
      scene.classList.toggle("space-closeup", c.zoom > 2.2);
      if (zoomLabel.current) zoomLabel.current.textContent = `${Math.round(c.zoom * 100)}%`;
      if (distanceToTarget > .01) frame = requestAnimationFrame(render);
    }
    function schedule() { if (!disposed && visible && !document.hidden && frame === null) frame = requestAnimationFrame(render); }
    animate.current = schedule;
    const observer = new ResizeObserver(() => {
      viewportWidth = scene.clientWidth; viewportHeight = scene.clientHeight;
      const size = Math.min(viewportWidth, viewportHeight) * .43;
      fit.current = Math.sqrt(radius * radius + (perspective * radius / Math.max(120, size)) ** 2);
      maxZoom.current = Math.min(10, fit.current / (radius + 400));
      target.current.zoom = clamp(target.current.zoom, .55, maxZoom.current);
      schedule();
    });
    observer.observe(scene);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) schedule();
      else if (frame !== null) { cancelAnimationFrame(frame); frame = null; }
    });
    intersection.observe(scene);
    const visibilityChange = () => {
      if (!document.hidden) schedule();
      else if (frame !== null) { cancelAnimationFrame(frame); frame = null; }
    };
    document.addEventListener("visibilitychange", visibilityChange);
    function wheel(event: WheelEvent) {
      event.preventDefault();
      const units = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? scene!.clientHeight : 1;
      const dx = event.deltaX * units, dy = event.deltaY * units;
      if (event.ctrlKey || event.metaKey) target.current.zoom = clamp(target.current.zoom * Math.exp(-dy * .01), .55, maxZoom.current);
      else if (motionMode.current === "pan") {
        target.current.x = clamp(target.current.x - dx, -scene!.clientWidth * 2, scene!.clientWidth * 2);
        target.current.y = clamp(target.current.y - dy, -scene!.clientHeight * 2, scene!.clientHeight * 2);
      } else {
        target.current.ry -= dx * .14;
        target.current.rx = clamp(target.current.rx + dy * .14, -85, 85);
      }
      schedule();
    }
    scene.addEventListener("wheel", wheel, { passive: false });
    schedule();
    return () => { disposed = true; observer.disconnect(); intersection.disconnect(); document.removeEventListener("visibilitychange", visibilityChange); scene.removeEventListener("wheel", wheel); if (frame !== null) cancelAnimationFrame(frame); animate.current = () => {}; };
  }, [radius, entries, layout]);

  useEffect(() => {
    if (!expanded) return;
    const previous = document.body.style.overflow;
    const previousFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    shellRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
    const keyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpanded(false);
      if (event.key === "Tab") {
        const controls = [...(shellRef.current?.querySelectorAll<HTMLElement>("button:not(:disabled), [tabindex='0']") || [])];
        const first = controls[0], last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    window.addEventListener("keydown", keyboard);
    return () => { document.body.style.overflow = previous; window.removeEventListener("keydown", keyboard); previousFocus?.focus(); };
  }, [expanded]);

  function reset() { target.current = { ...home }; animate.current(); }
  function zoom(multiplier: number) { target.current.zoom = clamp(target.current.zoom * multiplier, .55, maxZoom.current); animate.current(); }
  function turn(dx: number, dy: number) { target.current.ry += dx; target.current.rx = clamp(target.current.rx + dy, -85, 85); animate.current(); }
  function pointerStart(event: PointerEvent<HTMLDivElement>) {
    if (event.button !== 0) return;
    suppressClick.current = false;
    drag.current = { x: event.clientX, y: event.clientY, moved: false, pointerId: event.pointerId };
  }
  function pointerMove(event: PointerEvent<HTMLDivElement>) {
    const origin = drag.current;
    if (!origin || event.pointerId !== origin.pointerId) return;
    const dx = event.clientX - origin.x, dy = event.clientY - origin.y;
    if (!origin.moved && Math.hypot(dx, dy) < 6) return;
    origin.moved = true; suppressClick.current = true;
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.setPointerCapture(event.pointerId);
    if (mode === "pan") { target.current.x += dx; target.current.y += dy; }
    else { target.current.ry += dx * .2; target.current.rx = clamp(target.current.rx - dy * .2, -85, 85); }
    origin.x = event.clientX; origin.y = event.clientY;
    animate.current();
  }
  function pointerStop(event: PointerEvent<HTMLDivElement>) {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    drag.current = null;
  }

  return <section ref={shellRef} className={`atlas-space-shell ${expanded ? "space-expanded" : ""}`} role={expanded ? "dialog" : "region"} aria-modal={expanded || undefined} aria-label="Interactive 3D atlas">
    <div className="space-topbar"><div><h2>{layout}</h2></div><div className="space-mode"><button aria-pressed={layout === "globe"} onClick={() => { setLayout("globe"); reset(); }}>globe</button><button aria-pressed={layout === "constellation"} onClick={() => { setLayout("constellation"); reset(); }}>constellation</button><button aria-label={expanded ? "Exit expanded space" : "Expand space"} onClick={() => setExpanded(e => !e)}>{expanded ? "close ↙" : "expand ↗"}</button></div></div>
    <div ref={sceneRef} className={`atlas-space globe-space layout-${layout}`} tabIndex={0} role="region" aria-label="Two-finger scroll to orbit; pinch to zoom. Arrow keys orbit; plus and minus zoom; R resets. Touch or mouse drag also works." onPointerDown={pointerStart} onPointerMove={pointerMove} onPointerUp={pointerStop} onPointerCancel={pointerStop} onClickCapture={event => { const blocked = suppressClick.current; suppressClick.current = false; if (blocked && event.detail > 0) { event.preventDefault(); event.stopPropagation(); } }} onKeyDown={event => {
      if (event.target !== event.currentTarget) return;
      const arrows: Record<string, [number, number]> = { ArrowLeft: [-15, 0], ArrowRight: [15, 0], ArrowUp: [0, -15], ArrowDown: [0, 15] };
      if (arrows[event.key]) { event.preventDefault(); turn(...arrows[event.key]); }
      if (event.key === "+" || event.key === "=") { event.preventDefault(); zoom(1.25); }
      if (event.key === "-") { event.preventDefault(); zoom(.8); }
      if (event.key.toLowerCase() === "r") { event.preventDefault(); reset(); }
    }}>
      <div className="space-horizon" aria-hidden="true" />
      <div ref={worldRef} className="atlas-world globe-world" style={{ width: radius * 2, height: radius * 2, visibility: entries.length ? "visible" : "hidden" }}><GlobeObjects entries={entries} radius={radius} layout={layout} onOpen={onOpen} onHover={onHover} /></div>
      <div className="space-floating-caption"><span>{entries.length} items</span><p>{entries.length ? "Scroll to orbit · pinch to zoom" : "No entries match. Try another search or filter."}</p></div>
      {hovered && entries.some(e => e.id === hovered.id) && <div className="space-hover-preview" aria-live="polite"><span>{hovered.kind}</span><strong>{hovered.title}</strong><time dateTime={hovered.date}>{entryLabel(hovered)}</time></div>}
    </div>
    <div className="space-bottom"><div className="space-interaction-mode"><button aria-pressed={mode === "orbit"} onClick={() => setMode("orbit")}>orbit</button><button aria-pressed={mode === "pan"} onClick={() => setMode("pan")}>pan</button><span>two-finger scroll</span></div><div className="space-camera-controls"><div className="space-pan"><button aria-label="Orbit left" onClick={() => turn(-15, 0)}>←</button><button aria-label="Orbit up" onClick={() => turn(0, -15)}>↑</button><button aria-label="Orbit down" onClick={() => turn(0, 15)}>↓</button><button aria-label="Orbit right" onClick={() => turn(15, 0)}>→</button></div><button aria-label="Zoom out" onClick={() => zoom(.8)}>−</button><span ref={zoomLabel}>100%</span><button aria-label="Zoom in" onClick={() => zoom(1.25)}>+</button><button onClick={reset}>reset</button></div></div>
  </section>;
}
