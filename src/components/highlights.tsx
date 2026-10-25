import type { ReactNode } from "react";

// Selected milestones from the former Highlights page and the published résumé.
// Keep newest first; each entry should read as one short sentence.
const highlights = [
  {
    date: "jul 2026",
    dateTime: "2026-07",
    before: "started ",
    label: "vicious builders collective",
    href: "https://viciousbuilders.com/",
    after: ", helping builders launch free open-source Apps.",
  },
  {
    date: "jun 2026",
    dateTime: "2026-06",
    before: "started research with ",
    label: "dr. xin yu",
    href: "https://xinyu-au.github.io/",
    after: ", with a focus on memory and multi-agent systems.",
  },
  {
    date: "jul 2025",
    dateTime: "2025-07",
    before: "joined ",
    label: "readme",
    href: "https://readme.com/",
    after: " to work on ai for Technical documentation.",
  },
  {
    date: "mar 2025",
    dateTime: "2025-03",
    before: "joined ",
    label: "lyra",
    href: "https://lyratechnologies.com.au/",
    after: " as a forward deployed engineer, building ai products for us startups.",
  },
  {
    date: "dec 2024",
    dateTime: "2024-12",
    before: "spent the summer at ",
    label: "canva",
    href: "https://www.canva.com/",
    after: ", working on ai for design relayout.",
  },
  {
    date: "aug 2024",
    dateTime: "2024-08",
    before: "started researching visual counting at ",
    label: "aiml",
    href: "https://www.adelaide.edu.au/aiml/",
    after: (
      <>
        {" with "}
        <HighlightLink href="https://minhhoai.net/">prof. minh hoai nguyen</HighlightLink>
        .
      </>
    ),
  },
  {
    date: "feb 2024",
    dateTime: "2024-02",
    before: "joined the ",
    label: "mit adelaide living lab",
    href: "https://www.media.mit.edu/",
    after: (
      <>
        {" to research backdoor attacks in ai models with "}
        <HighlightLink href="https://tobin.page/">dr. tobin south</HighlightLink>
        .
      </>
    ),
  },
  {
    date: "jul 2023",
    dateTime: "2023-07",
    before: "started studying computer science at the ",
    label: "university of adelaide",
    href: "https://www.adelaide.edu.au/",
    after: ".",
  },
  {
    date: "apr 2023",
    dateTime: "2023-04",
    before: "won a meritorious prize in the ",
    label: "international mathematical modeling challenge",
    href: "https://www.immchallenge.org/",
    after: ".",
  },
  {
    date: "jan 2023",
    dateTime: "2023-01",
    before: "won third prize in the vietnam national mathematical olympiad.",
  },
];

function HighlightLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
    >
      {children}
    </a>
  );
}

export default function Highlights() {
  return (
    <section
      id="highlights"
      aria-labelledby="highlights-heading"
      className="site-container scroll-mt-24 pb-4"
    >
      <div className="border-t border-border pt-10 md:pt-12">
        <h2
          id="highlights-heading"
          className="font-serif text-4xl md:text-5xl tracking-[-0.03em] leading-tight"
        >
          highlights
        </h2>
        <ol className="mt-7 md:mt-8 space-y-5 md:space-y-4">
          {highlights.map((highlight) => (
            <li
              key={highlight.dateTime}
              className="grid gap-1 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-7"
            >
              <time
                dateTime={highlight.dateTime}
                className="font-mono text-xs leading-7 text-muted tabular-nums"
              >
                {highlight.date}
              </time>
              <p className="max-w-[78ch] text-[0.9375rem] md:text-base leading-7 text-foreground/85">
                {highlight.before}
                {highlight.href && (
                  <HighlightLink href={highlight.href}>
                    {highlight.label}
                  </HighlightLink>
                )}
                {highlight.after}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
