"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggle from "./theme-toggle";

const links = [
  { href: "/", label: "about", match: (p: string) => p === "/" },
  { href: "/highlights/", label: "highlights", match: (p: string) => p.startsWith("/highlights") },
  { href: "/posts/", label: "blog", match: (p: string) => p.startsWith("/posts") },
  { href: "/more/", label: "more", match: (p: string) => p.startsWith("/more") },
];

export default function Nav() {
  const pathname = usePathname() || "/";
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/75 border-b border-border">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="font-mono text-sm tracking-tight font-medium"
        >
          bach tran
        </Link>
        <div className="hidden sm:flex items-center gap-7 font-mono text-xs tracking-wide text-muted">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              data-active={l.match(pathname)}
              className="nav-link hover:text-foreground transition-colors duration-300 data-[active=true]:text-foreground"
            >
              {l.label}
            </Link>
          ))}
          <ThemeToggle />
        </div>
        <div className="flex items-center gap-1 sm:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
            className="w-11 h-11 -mr-1 flex items-center justify-center text-muted hover:text-foreground transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
              {menuOpen ? (
                <path strokeLinecap="round" d="m6 6 12 12M18 6 6 18" />
              ) : (
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      <div
        id="mobile-navigation"
        className={`sm:hidden overflow-hidden border-t border-border transition-[max-height,opacity] duration-200 ease-out motion-reduce:transition-none ${menuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0 border-t-transparent"}`}
        aria-hidden={!menuOpen}
      >
        <div className="px-4 py-3 grid grid-cols-2 gap-x-6 gap-y-1 font-mono text-sm tracking-wide text-muted">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              data-active={l.match(pathname)}
              tabIndex={menuOpen ? 0 : -1}
              onClick={() => setMenuOpen(false)}
              className="nav-link py-2 hover:text-foreground transition-colors duration-200 data-[active=true]:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
