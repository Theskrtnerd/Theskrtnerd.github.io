import Image from "next/image";

const socials = [
  { label: "github", href: "https://github.com/Theskrtnerd" },
  { label: "linkedin", href: "https://linkedin.com/in/xineohperif/" },
  { label: "résumé", href: "/Bach_Tran_Resume_20251110.pdf" },
  { label: "email", href: "mailto:jayden161208@gmail.com" },
];

export default function Home() {
  return (
    <section className="h-[calc(100dvh-3.5rem)] overflow-hidden flex items-center">
      <div className="px-6 max-w-[1100px] mx-auto w-full">
        <div className="grid md:grid-cols-[auto_1fr] gap-8 md:gap-14 items-center">
          <div className="animate-fade-up avatar-halo shrink-0 mx-auto md:mx-0">
            <Image
              src="/images/new-ava.jpeg"
              alt="Bach Tran"
              width={200}
              height={200}
              priority
              className="rounded-full w-[140px] h-[140px] md:w-[176px] md:h-[176px] object-cover"
            />
          </div>

          <div className="max-w-[58ch]">
            <div className="animate-fade-up delay-1 font-mono text-[0.6875rem] tracking-[0.2em] uppercase text-muted mb-4">
              hanoi → adelaide → sydney
            </div>

            <h1 className="animate-fade-up delay-2 font-serif text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95] tracking-[-0.03em] mb-2">
              <span className="hero-title">Bach Tran</span>
            </h1>
            <p className="animate-fade-up delay-3 font-mono text-xs tracking-wide text-muted mb-6">
              <span className="italic font-serif text-sm normal-case tracking-normal text-muted/80">a.k.a.</span>{" "}
              Barry · xineohperif · Theskrtnerd
            </p>

            <div className="animate-fade-up delay-4 text-[0.9375rem] md:text-base leading-[1.75] text-foreground/85 space-y-4">
              <p>
                I build things with code, mostly around applied AI.
                Currently a final-year CS student at the University of Adelaide,
                figuring out what to do next.
              </p>
              <p>
                Before that: a kid in Hanoi who was kinda into maths, then a
                student in Australia who got too into everything else - AI,
                quant, and lately startups. Somewhere along the way the maths
                turned into code, and the code kept branching into whatever I
                was curious about that month.
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
