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
    start: "Jul 2025",
    end: "Present",
    current: true,
    role: "AI Engineer",
    place: "ReadMe",
    href: "https://readme.com/",
    location: "SF Bay Area",
    description:
      "Working on AI for technical documentation. Remote from Sydney, which means shipping by day and occasionally waking up to a very active US thread.",
  },
  {
    start: "Mar 2025",
    end: "Present",
    current: true,
    role: "Forward Deployed Engineer",
    place: "Lyra",
    href: "https://lyratechnologies.com.au/",
    location: "Sydney",
    description:
      "Building AI products for US startups. The FDE life: scoping, shipping, and occasionally getting called \"the AI guy\" by my co-workers.",
  },
  {
    start: "Dec 2024",
    end: "Feb 2025",
    role: "ML Engineer Intern",
    place: "Canva",
    href: "https://www.canva.com/",
    location: "Sydney",
    description:
      "Worked on AI for design relayout - basically, teaching a model to move boxes around so humans don't have to. Three months of summer flying between Adelaide and Sydney didn't hurt either.",
  },
  {
    start: "Aug 2024",
    end: "Jul 2025",
    role: "Student Researcher",
    place: "AIML",
    href: "https://www.adelaide.edu.au/aiml/",
    location: "Adelaide",
    description:
      "BBVisual Lab under Prof. Minh Hoai Nguyen. Worked on AI for visual counting - turns out counting not as easy as it looks, especially for neural nets.",
  },
  {
    start: "Jun 2024",
    end: "Aug 2024",
    role: "AI Trainee",
    place: "Cinnamon AI",
    href: "https://cinnamon.ai/en/",
    location: "Hanoi",
    description:
      "Spent a short stint in Vietnam learning AI engineering and building projects. Bonus: getting to eat phở for breakfast on weekdays again.",
  },
  {
    start: "Feb 2024",
    end: "Oct 2024",
    role: "Research Intern",
    place: "MIT Media Lab",
    href: "https://www.media.mit.edu/",
    location: "Boston",
    description:
      "MIT Adelaide Living Lab under Dr. Tobin South. Worked on backdoor attacks in AI models - the fun kind of security research and random yapping every week",
  },
  {
    start: "2024",
    role: "Project Manager",
    place: "SQUAD",
    href: "https://www.squadadelaide.org/",
    description:
      "Organized a Datathon and did a Quant competition with the team - short stint, but a fun reminder that projects are usually harder on the people side than the technical side.",
  },
  {
    start: "2023",
    end: "2025",
    role: "President",
    place: "Adelaide University Mathematics Society",
    href: "https://aums.org.au/",
    description:
      "Helped run AUMS for two years. Ran events, signed off on T-shirt designs, and learned that getting maths students into a room is somehow harder than the maths itself.",
  },
  {
    start: "Nov 2023",
    end: "Feb 2024",
    role: "Research Intern",
    place: "AIML",
    href: "https://www.adelaide.edu.au/aiml/",
    location: "Adelaide",
    description:
      "Summer research under Dr. Antonios Perperidis on ML for 4D medical imaging. My first real taste of research, and the moment I realized how much I didn't know.",
  },
  {
    start: "Feb 2023",
    end: "Present",
    current: true,
    role: "BS in Computer Science",
    place: "University of Adelaide",
    href: "https://www.adelaide.edu.au/",
    description:
      "Final-year CS student. Started out doing maths-y things, drifted into AI, then quant, then startups - in roughly that order.",
  },
  {
    start: "Sep 2022",
    end: "Apr 2023",
    role: "President",
    place: "Hanoi - Amsterdam Maths Lovers Club",
    href: "https://www.facebook.com/toanhaml",
    location: "Hanoi",
    description:
      "Ran the maths club at my high school - problem sets, sessions, and rounding up people who actually wanted to do extra maths for fun.",
  },
  {
    start: "Jun 2022",
    end: "Jun 2023",
    role: "Co-organizer",
    place: "TEDxHanoiAmsterdamHS",
    href: "https://www.ted.com/tedx/events/51821",
    description:
      "Organized the first ever TEDx event for my highschool. Ran around Hanoi finding venues, ordering merch, chasing speakers, mentoring the team. It was fun!",
  },
  {
    start: "Apr 2023",
    role: "Meritorious Prize",
    place: "International Mathematical Modeling Challenge",
    href: "https://www.immchallenge.org/",
    description:
      "Spent a weekend with three teammates wrestling a real-world problem into a maths model, then writing it up like our lives depended on it. Ended up with a Meritorious Prize.",
  },
  {
    start: "Jan 2023",
    role: "Third Prize",
    place: "Vietnam National Mathematical Olympiad",
    href: "", // TODO: VMO (optional)
    description:
      "Years of olympiad training condensed into one very long exam. Walked out unsure, walked back in to find a Third Prize next to my name.",
  },
  {
    start: "Sep 2020",
    end: "Jun 2023",
    role: "Mathematics",
    place: "Hanoi - Amsterdam High School for the Gifted",
    href: "https://hn-ams.edu.vn/en",
    description:
      "The school that turned a kid who liked counting into a kid who couldn't stop. Spent seven years deep in olympiad maths and skipping classes to play soccer, made friends I still text now, and figured out I also kinda liked code.",
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
        className={`tl-dot absolute left-0 top-[7px] -translate-x-1/2 h-[11px] w-[11px] rounded-full ring-4 ring-background transition-colors ${
          h.current ? "bg-foreground" : "bg-border"
        }`}
      />
      <div className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted tabular-nums">
        {h.end ? `${h.start} — ${h.end}` : h.start}
      </div>
      <h3 className="mt-2 font-serif text-lg md:text-xl tracking-tight leading-snug">
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
        <h1 className="animate-fade-up font-serif text-5xl md:text-6xl tracking-[-0.03em] leading-[0.98]">
          Highlights.
        </h1>
        <p className="animate-fade-up delay-3 mt-5 max-w-[54ch] text-muted leading-relaxed">
          A few moments worth remembering - work, school, and the side things that took on a life of their own.
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
