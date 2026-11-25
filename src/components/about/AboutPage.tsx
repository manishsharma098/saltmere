import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/motion";
import { ArrowRight, SunIcon } from "@/components/icons";
import RiseWords from "@/components/legal/RiseWords";
import { PeopleIcon, ShieldCheckIcon } from "@/components/legal/icons";
import { BODY, CARD_TITLE, H1, H2, ITEM_TITLE, LEAD, SMALL, WRAP } from "@/components/legal/styles";
import { fishingCopy } from "@/lib/fishing";

const ABOUT = fishingCopy.about;

/** Splits "Plain [accent]" copy into the plain part and the bracketed accent. */
function splitAccent(s: string): [string, string] {
  const m = s.match(/^(.*?)\s*\[(.+)\]\s*$/);
  return m ? [m[1], m[2]] : [s, ""];
}

const [HERO_PLAIN, HERO_ACCENT] = splitAccent(ABOUT.headline);
const [CREW_PLAIN, CREW_ACCENT] = splitAccent(ABOUT.crew.headline);

const SECTION_PT = "pt-16 tab:pt-[72px] desk:pt-36";

function Section({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section className={`flex w-full flex-col items-center ${className}`}>
      <div className={`${WRAP} flex flex-col items-start`}>{children}</div>
    </section>
  );
}

/* ---------------------------------------------------------------- hero */

function Hero() {
  return (
    <section className="flex w-full p-[10px]">
      <div className="relative flex min-h-[84vh] flex-1 flex-col items-center justify-end overflow-hidden rounded-[20px] px-4 pt-[110px] pb-7 max-[389.98px]:px-[14px] max-[389.98px]:pt-[100px] max-[389.98px]:pb-6 tab:px-6 tab:pt-[120px] tab:pb-10 desk:px-[26px] desk:pb-14">
        <Image
          src={ABOUT.images.main}
          alt="Dubai Marina towers at golden hour, seen from the wake of a fishing boat"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "50% 40%" }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(4,11,20,.74) 0%, rgba(4,11,20,.52) 38%, rgba(4,11,20,.18) 70%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: "linear-gradient(0deg, rgba(4,11,20,.78) 0%, rgba(4,11,20,.18) 52%)" }}
        />
        <div className="relative flex w-full max-w-[1320px] flex-col items-center gap-6 text-center desk:items-start desk:text-left">
          <h1 className={`${H1} w-full max-w-[980px]`}>
            <RiseWords
              segments={[
                { text: HERO_PLAIN, className: "text-white" },
                { text: HERO_ACCENT, className: "text-accent-soft" },
              ]}
            />
          </h1>
          <Reveal onMount delay={0.35} duration={1} className="w-full max-w-[460px]">
            <p className={`${LEAD} text-white/[0.78]`}>{ABOUT.sub}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- story */

function Story() {
  return (
    <Section className="pt-16 tab:pt-[72px] desk:pt-24">
      <div className="flex w-full flex-col items-center gap-5 desk:flex-row">
        <Reveal className="relative flex min-h-[380px] w-full overflow-hidden rounded-[20px] desk:min-h-[520px] desk:w-px desk:flex-[1.1_0_0]">
          <Image
            src={ABOUT.images.secondary}
            alt="Spinning rods and reels lined up on the dock"
            fill
            sizes="(max-width: 1200px) 100vw, 55vw"
            className="object-cover"
            style={{ objectPosition: "30% 60%" }}
          />
        </Reveal>
        <Reveal
          delay={0.08}
          className="flex w-full flex-col items-center justify-center gap-[18px] rounded-[20px] bg-sand p-6 text-center tab:p-10 desk:min-h-[520px] desk:w-px desk:flex-[0.9_0_0] desk:items-start desk:p-14 desk:text-left"
        >
          <h3 className={`${CARD_TITLE} w-full text-ink`}>{ABOUT.why.title}</h3>
          <p className={`${BODY} w-full max-w-[420px] text-ink-muted`}>
            {ABOUT.why.lead}
          </p>
          <p className={`${BODY} w-full max-w-[420px] text-ink-muted`}>
            {ABOUT.why.text}
          </p>
          <Link
            href="/contact"
            className="btn-lift inline-flex h-14 items-center gap-[14px] rounded-xl bg-ink pr-2 pl-[26px] text-[16px] leading-[1.2] font-bold tracking-[-0.005em] whitespace-nowrap text-sand shadow-[var(--shadow-primary)]"
          >
            {ABOUT.why.cta}
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-[color-mix(in_srgb,var(--sand)_16%,transparent)]">
              <ArrowRight size={18} />
            </span>
          </Link>
        </Reveal>
      </div>

      {/* stats */}
      <div className="w-full pt-[72px]">
        <ul className="grid w-full grid-cols-1 shadow-[inset_0_1px_0_0_var(--line)] tab:grid-cols-3">
          {ABOUT.stats.map(({ value: num, label }, i) => (
            <Reveal
              as="li"
              key={label}
              delay={i * 0.06}
              className={`flex w-full flex-col items-center gap-[6px] pt-6 pb-4 tab:items-start tab:pt-7 tab:pb-2 ${
                i === 0
                  ? "tab:pr-6"
                  : "shadow-[inset_0_1px_0_0_var(--line)] tab:px-6 tab:shadow-[inset_1px_0_0_0_var(--line)]"
              }`}
            >
              <span className="block font-display text-[44px] leading-none font-medium tracking-[-0.04em] whitespace-nowrap tabular-nums desk:text-[60px] wide:text-[72px]">
                {num}
              </span>
              <p className={`${SMALL} w-full text-center text-muted tab:text-left`}>{label}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------------- crew */

// Crew photos: object-position keeps each face in the 0.8 portrait crop.
const CREW_FOCUS = ["50% 30%", "50% 40%", "80% 45%", "64% 40%"];
const CREW = ABOUT.crew.items.map((c, i) => [c.name, c.role, c.image, CREW_FOCUS[i] ?? "50% 40%"] as const);

function Crew() {
  return (
    <Section className={SECTION_PT}>
      <div className="flex w-full max-w-[900px] flex-col items-center gap-5 self-center pb-8 text-center desk:items-start desk:self-start desk:pb-[54px] desk:text-left">
        <Reveal className="w-full">
          <h2 className={`${H2} text-fg`}>
            {CREW_PLAIN} <span className="text-accent">{CREW_ACCENT}</span>
          </h2>
        </Reveal>
        <Reveal delay={0.06} className="w-full">
          <p className={`${LEAD} text-muted`}>{ABOUT.crew.sub}</p>
        </Reveal>
      </div>
      <ul className="grid w-full grid-cols-2 gap-[14px] tab:gap-5 desk:grid-cols-4">
        {CREW.map(([name, role, img, focus], i) => (
          <Reveal
            as="li"
            key={name}
            delay={i * 0.06}
            className="flex w-full flex-col items-center gap-1 text-center desk:items-start desk:text-left"
          >
            <div className="group relative aspect-[0.8] w-full overflow-hidden rounded-[20px]">
              <Image
                src={img}
                alt={`${name}, ${role}`}
                fill
                sizes="(max-width: 810px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)] group-hover:scale-[1.03] motion-reduce:transition-none"
                style={{ objectPosition: focus }}
              />
            </div>
            <h3 className="w-full font-display text-[22px] leading-[1.3] font-medium tracking-[-0.03em] text-fg">
              {name}
            </h3>
            <p className={`${SMALL} w-full text-muted`}>{role}</p>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

/* ---------------------------------------------------------------- how we work */

const STANDARD_ICONS = [<PeopleIcon key="people" size={24} />, <ShieldCheckIcon key="shield" size={24} />, <SunIcon key="sun" size={24} />];
const STANDARDS = ABOUT.values.items.map((v, i) => ({ icon: STANDARD_ICONS[i], ...v }));

function HowWeWork() {
  return (
    <Section className={SECTION_PT}>
      <Reveal className="w-full text-center desk:text-left">
        <h2 className={`${H2} text-fg`}>{ABOUT.values.title}</h2>
      </Reveal>
      <ul className="flex w-full flex-col pt-9">
        {STANDARDS.map((s, i) => (
          <Reveal
            as="li"
            key={s.title}
            delay={i * 0.06}
            className="flex w-full flex-col items-center gap-[14px] py-6 text-center shadow-[inset_0_1px_0_0_var(--line)] desk:flex-row desk:items-start desk:gap-5 desk:text-left"
          >
            <div className="grid h-[52px] w-[52px] flex-none place-items-center rounded-xl bg-fill text-accent">
              {s.icon}
            </div>
            <div className="flex w-full flex-col items-center gap-[6px] desk:w-px desk:flex-1 desk:items-start">
              <h3 className={`${ITEM_TITLE} w-full text-fg`}>{s.title}</h3>
              <p className={`${BODY} w-full max-w-[560px] text-muted`}>{s.text}</p>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

export default function AboutPage() {
  return (
    <>
      <Hero />
      <Story />
      <Crew />
      <HowWeWork />
    </>
  );
}
