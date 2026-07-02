import Footer from "@/components/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Highlights - Bach Tran",
  description: "A few moments worth remembering.",
};

type Highlight = {
  start: string;
  end?: string;
  role: string;
  place: string;
  href?: string;
  location?: string;
  current?: boolean;
  description?: string;
};

const highlights: Highlight[] = [
  {
    start: "jul 2025",
    end: "jul 2026",
    role: "ai engineer",
    place: "readme",
    href: "https://readme.com/",
    location: "sf bay area",
    description:
      "working on ai for technical documentation. remote from sydney, which means shipping by day and occasionally waking up to a very active us thread.",
  },
  {
    start: "mar 2025",
    end: "jul 2026",
    role: "forward deployed engineer",
    place: "lyra",
    href: "https://lyratechnologies.com.au/",
    location: "sydney",
    description:
      "building ai products for us startups. the fde life: scoping, shipping, and occasionally getting called \"the ai guy\" by my co-workers.",
  },
  {
    start: "dec 2024",
    end: "feb 2025",
    role: "ml engineer intern",
    place: "canva",
    href: "https://www.canva.com/",
    location: "sydney",
    description:
      "worked on ai for design relayout - basically, teaching a model to move boxes around so humans don't have to. three months of summer flying between adelaide and sydney didn't hurt either.",
  },
  {
    start: "aug 2024",
    end: "jul 2025",
    role: "student researcher",
    place: "aiml",
    href: "https://www.adelaide.edu.au/aiml/",
    location: "adelaide",
    description:
      "bbvisual lab under prof. minh hoai nguyen. worked on ai for visual counting - turns out counting not as easy as it looks, especially for neural nets.",
  },
  {
    start: "jun 2024",
    end: "aug 2024",
    role: "ai trainee",
    place: "cinnamon ai",
    href: "https://cinnamon.ai/en/",
    location: "hanoi",
    description:
      "spent a short stint in vietnam learning ai engineering and building projects. bonus: getting to eat phở for breakfast on weekdays again.",
  },
  {
    start: "feb 2024",
    end: "oct 2024",
    role: "research intern",
    place: "mit media lab",
    href: "https://www.media.mit.edu/",
    location: "boston",
    description:
      "mit adelaide living lab under dr. tobin south. worked on backdoor attacks in ai models - the fun kind of security research and random yapping every week",
  },
  {
    start: "2024",
    role: "project manager",
    place: "squad",
    href: "https://www.squadadelaide.org/",
    description:
      "organized a datathon and did a quant competition with the team - short stint, but a fun reminder that projects are usually harder on the people side than the technical side.",
  },
  {
    start: "2023",
    end: "2025",
    role: "president",
    place: "adelaide university mathematics society",
    href: "https://aums.org.au/",
    description:
      "helped run aums for two years. ran events, signed off on t-shirt designs, and learned that getting maths students into a room is somehow harder than the maths itself.",
  },
  {
    start: "nov 2023",
    end: "feb 2024",
    role: "research intern",
    place: "aiml",
    href: "https://www.adelaide.edu.au/aiml/",
    location: "adelaide",
    description:
      "summer research under dr. antonios perperidis on ml for 4d medical imaging. my first real taste of research, and the moment i realized how much i didn't know.",
  },
  {
    start: "feb 2023",
    end: "present",
    current: true,
    role: "bs in computer science",
    place: "university of adelaide",
    href: "https://www.adelaide.edu.au/",
    description:
      "final-year cs student. started out doing maths-y things, drifted into ai, then quant, then startups - in roughly that order.",
  },
  {
    start: "sep 2022",
    end: "apr 2023",
    role: "president",
    place: "hanoi - amsterdam maths lovers club",
    href: "https://www.facebook.com/toanhaml",
    location: "hanoi",
    description:
      "ran the maths club at my high school - problem sets, sessions, and rounding up people who actually wanted to do extra maths for fun.",
  },
  {
    start: "jun 2022",
    end: "jun 2023",
    role: "co-organizer",
    place: "tedxhanoiamsterdamhs",
    href: "https://www.ted.com/tedx/events/51821",
    description:
      "organized the first ever tedx event for my highschool. ran around hanoi finding venues, ordering merch, chasing speakers, mentoring the team. it was fun!",
  },
  {
    start: "apr 2023",
    role: "meritorious prize",
    place: "international mathematical modeling challenge",
    href: "https://www.immchallenge.org/",
    description:
      "spent a weekend with three teammates wrestling a real-world problem into a maths model, then writing it up like our lives depended on it. ended up with a meritorious prize.",
  },
  {
    start: "jan 2023",
    role: "third prize",
    place: "vietnam national mathematical olympiad",
    href: "", // TODO: VMO (optional)
    description:
      "years of olympiad training condensed into one very long exam. walked out unsure, walked back in to find a third prize next to my name.",
  },
  {
    start: "sep 2020",
    end: "jun 2023",
    role: "mathematics",
    place: "hanoi - amsterdam high school for the gifted",
    href: "https://hn-ams.edu.vn/en",
    description:
      "the school that turned a kid who liked counting into a kid who couldn't stop. spent seven years deep in olympiad maths and skipping classes to play soccer, made friends i still text now, and figured out i also kinda liked code.",
  },
];

function HighlightItem({ h, i }: { h: Highlight; i: number }) {
  const place =
    h.href && h.href.length > 0 ? (
      <a
        href={h.href}
        target="_blank"
        rel="noopener noreferrer"
        className="nav-link text-foreground/90 hover:text-foreground transition-colors"
      >
        {h.place}
        <span aria-hidden className="ml-0.5 text-muted">↗</span>
      </a>
    ) : (
      <span className="text-foreground/90">{h.place}</span>
    );

  return (
    <li
      className="tl-item relative pl-8 md:pl-10 pb-10 md:pb-12 last:pb-0 animate-fade-up"
      style={{ animationDelay: `${0.05 + i * 0.045}s` }}
    >
      <span
        aria-hidden
        className={`tl-dot absolute -left-[5.5px] top-[7px] h-[11px] w-[11px] rounded-full ring-4 ring-background transition-colors ${
          h.current ? "bg-foreground" : "bg-border"
        }`}
      />
      <div className="font-mono text-[0.6875rem] tracking-[0.18em] text-muted tabular-nums">
        {h.end ? `${h.start} - ${h.end}` : h.start}
      </div>
      <h3 className="mt-2 font-sans font-medium text-lg md:text-xl tracking-tight leading-snug">
        {h.role}
      </h3>
      <div className="mt-1 text-sm">
        {place}
        {h.location && <span className="text-muted"> · {h.location}</span>}
      </div>
      {h.description && (
        <p className="mt-2.5 max-w-[58ch] text-[0.9375rem] leading-[1.7] text-muted">
          {h.description}
        </p>
      )}
    </li>
  );
}

export default function HighlightsPage() {
  return (
    <div className="pb-24">
      <header className="px-6 max-w-[1100px] mx-auto pt-16 md:pt-24 pb-12 md:pb-16">
        <h1 className="animate-fade-up font-sans font-bold text-5xl md:text-6xl tracking-[-0.03em] leading-[0.98]">
          highlights
        </h1>
        <p className="animate-fade-up delay-3 mt-5 max-w-[54ch] text-muted leading-relaxed">
          career, school, and a few side things along the way.
        </p>
      </header>

      <section className="px-6 max-w-[1100px] mx-auto py-8 md:py-12">
        <ol className="relative ml-1.5 border-l border-border max-w-[64ch]">
          {highlights.map((h, i) => (
            <HighlightItem key={`${h.start}-${i}`} h={h} i={i} />
          ))}
        </ol>
      </section>

      <Footer />
    </div>
  );
}
