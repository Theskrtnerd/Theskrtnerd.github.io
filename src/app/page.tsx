import AvatarFlip from "@/components/avatar-flip";

const socials = [
  { label: "github", href: "https://github.com/Theskrtnerd" },
  { label: "linkedin", href: "https://linkedin.com/in/xineohperif/" },
  { label: "x", href: "https://x.com/tvbbd2" },
  { label: "résumé", href: "/Bach_Tran_Resume_20251110.pdf" },
  { label: "email", href: "mailto:jayden161208@gmail.com" },
];

export default function Home() {
  return (
    <section className="h-[calc(100dvh-3.5rem)] overflow-hidden flex items-center">
      <div className="px-6 max-w-[1100px] mx-auto w-full">
        <div className="grid md:grid-cols-[auto_1fr] gap-8 md:gap-14 items-center">
          <AvatarFlip />

          <div className="max-w-[58ch]">
            <div className="animate-fade-up delay-1 font-mono text-[0.6875rem] tracking-[0.2em] text-muted mb-4">
              hanoi → adelaide → sydney
            </div>

            <h1 className="animate-fade-up delay-2 font-serif text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95] tracking-[-0.03em] mb-2">
              bach tran
            </h1>
            <p className="animate-fade-up delay-3 font-mono text-xs tracking-wide text-muted mb-6">
              <span className="text-sm normal-case tracking-normal text-muted/80">a.k.a.</span>{" "}
              barry · xineohperif · theskrtnerd · viet bach tran
            </p>

            <div className="animate-fade-up delay-4 text-[0.9375rem] md:text-base leading-[1.75] text-foreground/85 space-y-4">
              <p>
                i build things with code, mostly around applied ai.
                currently a final-year cs student at the university of adelaide,
                figuring out what to do next.
              </p>
              <p>
                before that: a kid in hanoi who was kinda into maths, then a
                student in australia who got too into everything else - ai,
                quant, and lately startups. the maths turned into code at
                some point, and i've mostly followed whatever seemed
                interesting since.
              </p>
              <p className="text-muted flex flex-wrap items-baseline gap-x-2">
                <span>off-hours, a</span>
                <span className="role-rotator text-foreground">
                  <span className="role-rotator-track">
                    <span>part-time life enjoyer</span>
                    <span>reluctant soccer captain</span>
                    <span>aspiring indie guitarist</span>
                    <span>hit-or-miss comedian</span>
                    <span>part-time life enjoyer</span>
                  </span>
                </span>
              </p>
            </div>

            <ul className="animate-fade-up delay-5 mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs tracking-wide text-muted">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="nav-link hover:text-foreground transition-colors"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
