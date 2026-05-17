"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./theme-toggle";

const links = [
  { href: "/", label: "about", match: (p: string) => p === "/" },
  { href: "/highlights/", label: "highlights", match: (p: string) => p.startsWith("/highlights") },
  { href: "/posts/", label: "blog", match: (p: string) => p.startsWith("/posts") },
  { href: "/more/", label: "more", match: (p: string) => p.startsWith("/more") },
];

export default function Nav() {
  const pathname = usePathname() || "/";
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/75 border-b border-border">
      <div className="max-w-[1100px] mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="font-mono text-sm tracking-tight font-medium"
        >
          bach tran
        </Link>
        <div className="flex items-center gap-7 font-mono text-xs tracking-wide text-muted">
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
      </div>
    </nav>
  );
}
