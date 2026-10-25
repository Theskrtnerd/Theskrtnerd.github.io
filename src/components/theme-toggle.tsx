"use client";

export default function ThemeToggle() {
  function toggle() {
    const dark = document.documentElement.classList.toggle("dark");
    try { localStorage.setItem("theme", dark ? "dark" : "light"); } catch {}
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="w-8 h-8 flex items-center justify-center text-muted hover:text-foreground transition-colors duration-300"
    >
        <svg className="w-4 h-4 hidden [.dark_&]:block" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
          <circle cx="12" cy="12" r="4.5" />
          <path d="M12 1.5v2.2M12 20.3v2.2M4.22 4.22l1.55 1.55M18.23 18.23l1.55 1.55M1.5 12h2.2M20.3 12h2.2M4.22 19.78l1.55-1.55M18.23 5.77l1.55-1.55" />
        </svg>
        <svg className="w-4 h-4 block [.dark_&]:hidden" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
          <path d="M21 12.8A9 9 0 1111.2 3 7 7 0 0021 12.8z" />
        </svg>
    </button>
  );
}
