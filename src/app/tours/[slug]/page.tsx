import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/motion";
import { ArrowRight, MailIcon, WhatsAppIcon } from "@/components/icons";
import { CONTACT } from "@/components/Nav";
import TitleWords from "@/components/tours/TitleWords";
import { ArrowLeft, CheckCircleIcon, ClockIcon, MoneyBagIcon, SunSmallIcon } from "@/components/tours/icons";
import { fishingCopy } from "@/lib/fishing";
import { getNextTour, getTour, tourFocus, tours } from "@/lib/tours";

const copy = fishingCopy.tours;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return tours.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tour = getTour(slug);
  if (!tour) return {};
  const description = `${tour.title}: ${tour.duration}, ${tour.timing}. ${tour.description}`.slice(0, 160);
  const title = `${tour.title} | Fishing trip in Dubai, Saltmere`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/tours/${tour.slug}` },
    openGraph: {
      title,
      description,
      url: `/tours/${tour.slug}`,
      images: [{ url: tour.image, alt: tour.title }],
    },
  };
}

/* Framer type presets (text breakpoints: 390 / 810 / 1200 / 1400) */
const H3 =
  "font-display text-[26px] font-medium leading-[1.05] tracking-[-0.03em] desk:text-[31.2px] min-[1400px]:text-[38px]";
const SAND_BTN_SHADOW =
  "shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.4),inset_0px_-1px_0px_0px_rgba(11,22,35,0.1),0px_0px_0px_1px_rgba(11,22,35,0.16),0px_1px_1px_0px_rgba(11,22,35,0.14),0px_4px_10px_-3px_rgba(11,22,35,0.12)]";

export default async function TourPage({ params }: Props) {
  const { slug } = await params;
  const tour = getTour(slug);
  if (!tour) notFound();
  const next = getNextTour(slug);

  const facts = [
    { icon: <ClockIcon size={16} />, label: tour.duration },
    { icon: <SunSmallIcon size={16} />, label: tour.timing },
    { icon: <MoneyBagIcon size={16} />, label: tour.fromLabel },
  ];

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="flex w-full p-[10px]">
        <div className="relative flex min-h-[82vh] w-full flex-col items-center justify-end overflow-clip rounded-[20px] px-[14px] pb-6 pt-[100px] min-[390px]:px-4 min-[390px]:pb-7 min-[390px]:pt-[110px] tab:px-6 tab:pb-10 tab:pt-[120px] desk:min-h-[84vh] desk:px-[26px] desk:pb-14">
          <Image
            src={tour.image}
            alt={`${tour.title} off the Dubai coast`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: tourFocus(tour.slug) }}
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#040b14bd_0%,#040b1485_38%,#040b142e_70%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,#040b14c7_0%,#040b142e_52%)]" />

          <div className="relative flex w-full max-w-[1320px] flex-col items-center gap-[18px] desk:items-start">
            <Link
              href="/tours"
              className="flex h-11 items-center gap-[6px] text-[15px] font-medium leading-[1.2] text-[#ffffffc7] transition-colors duration-300 hover:text-white"
            >
              <ArrowLeft size={16} />
              <span>{copy.back}</span>
            </Link>

            <TitleWords
              words={tour.titleLines}
              className="w-full max-w-[980px] text-center font-display text-[46px] font-medium leading-[0.96] tracking-[-0.04em] text-white min-[390px]:text-[50px] tab:text-[60px] desk:text-left desk:text-[88.8px] min-[1400px]:text-[108px]"
            />

            <Reveal onMount delay={0.3} className="w-full max-w-[460px]">
              <p className="text-center text-[17px] leading-[1.5] text-[#ffffffc7] desk:text-left min-[1400px]:text-[20px]">
                {tour.description}
              </p>
            </Reveal>

            <Reveal onMount delay={0.4} className="w-full">
              <ul className="flex w-full flex-wrap justify-center gap-2 pt-2 desk:justify-start">
                {facts.map((f) => (
                  <li
                    key={f.label}
                    className="flex h-10 items-center gap-2 rounded-full bg-[#040b1475] shadow-[inset_0_0_0_1px_#ffffff29] px-4 backdrop-blur-[16px]"
                  >
                    <span className="text-accent-soft">{f.icon}</span>
                    <span className="whitespace-nowrap text-[14px] font-medium leading-[1.55] text-white">{f.label}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Details ---------- */}
      <section className="flex w-full flex-col items-center pt-12 tab:pt-16 desk:pt-24">
        <div className="flex w-full max-w-[1392px] flex-col px-4 tab:px-6 desk:px-9 wide:px-10">
          <div className="flex w-full flex-col gap-12 desk:flex-row desk:items-start desk:gap-20">
            {/* Plan */}
            <Reveal className="flex w-full flex-col items-center gap-6 desk:w-px desk:flex-[1.3_0_0] desk:items-start">
              <h3 className={`${H3} w-full text-center text-fg desk:text-left`}>{tour.planTitle}</h3>
              <ol className="flex w-full flex-col shadow-[inset_0_-1px_0_0_var(--line)]">
                {tour.plan.map((s) => (
                  <li
                    key={s.time}
                    className="flex w-full flex-col items-center gap-1 py-5 shadow-[inset_0_1px_0_0_var(--line)] desk:flex-row desk:items-start desk:gap-5"
                  >
                    <p className="whitespace-pre font-display text-[26px] font-medium leading-[1.3] tracking-[-0.03em] text-accent desk:w-[110px] desk:shrink-0 desk:whitespace-normal">
                      {s.time}
                    </p>
                    <p className="w-full text-center text-[18px] leading-[1.45] text-fg desk:flex-1 desk:text-left">
                      {s.text}
                    </p>
                  </li>
                ))}
              </ol>
            </Reveal>

            {/* Included */}
            <Reveal className="flex w-full flex-col items-center gap-[22px] rounded-[20px] bg-sand p-[22px] min-[390px]:p-6 tab:p-10 desk:w-px desk:flex-[1_0_0] desk:items-start">
              <h3 className={`${H3} w-full text-center text-ink desk:text-left`}>Included</h3>
              <ul className="flex w-full flex-col gap-3">
                {tour.included.map((item) => (
                  <li key={item} className="flex w-full items-start gap-[10px]">
                    <span className="text-accent-deep">
                      <CheckCircleIcon size={20} />
                    </span>
                    <span className="text-[16px] leading-[1.55] text-ink">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="w-full text-center text-[15px] leading-[1.55] text-ink-muted desk:text-left">
                Best for: {tour.bestFor}
              </p>
              <Link
                href="/fleet"
                className="btn-lift inline-flex h-14 items-center justify-center gap-[14px] whitespace-nowrap rounded-[12px] bg-ink pl-[26px] pr-2 text-[16px] font-bold leading-[1.2] tracking-[-0.005em] text-sand shadow-[var(--shadow-primary)]"
              >
                Check dates
                <span className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-sand-line">
                  <ArrowRight size={18} />
                </span>
              </Link>
              <div className="flex w-full flex-wrap justify-center gap-[10px] desk:justify-start">
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn-lift inline-flex h-[52px] items-center justify-center gap-[10px] whitespace-nowrap rounded-[12px] bg-sand-2 px-[22px] text-[15px] font-bold leading-[1.2] tracking-[-0.005em] text-ink ${SAND_BTN_SHADOW}`}
                >
                  <span className="text-accent-deep">
                    <WhatsAppIcon size={20} />
                  </span>
                  WhatsApp us
                </a>
                <a
                  href={CONTACT.email}
                  className={`btn-lift inline-flex h-[52px] items-center justify-center gap-[10px] whitespace-nowrap rounded-[12px] bg-sand-2 px-[22px] text-[15px] font-bold leading-[1.2] tracking-[-0.005em] text-ink ${SAND_BTN_SHADOW}`}
                >
                  <span className="text-accent-deep">
                    <MailIcon size={20} />
                  </span>
                  Email
                </a>
              </div>
            </Reveal>
          </div>

          {/* Prices */}
          <div className="flex w-full flex-col items-start gap-6 pt-[72px] desk:pt-[110px]">
            <Reveal className="w-full">
              <h2 className="w-full text-center font-display text-[36px] font-medium leading-none tracking-[-0.035em] text-fg min-[390px]:text-[38px] tab:text-[40.5px] desk:text-left desk:text-[60px] min-[1400px]:text-[72px]">
                {copy.pricesTitle}
              </h2>
            </Reveal>
            <div className="flex w-full flex-col gap-2">
              {tour.prices.map((p) => (
                <Link
                  key={p.boatSlug}
                  href={`/boat/${p.boatSlug}`}
                  className="flex w-full flex-col items-center gap-3 rounded-[12px] bg-surface shadow-[inset_0_0_0_1px_var(--line)] px-[10px] pb-[18px] pt-[10px] transition-colors duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)] hover:bg-surface-2 tab:flex-row tab:gap-5 tab:py-[10px] tab:pl-[10px] tab:pr-6"
                >
                  <Image src={p.image} alt={`${p.boat}, ${p.type}`} width={240} height={160} className="h-20 w-[120px] shrink-0 rounded-[8px] object-cover" />
                  <div className="flex w-full flex-col gap-[2px] tab:w-px tab:flex-1">
                    <p className="text-[16px] font-bold leading-[1.3] text-fg">{p.boat}</p>
                    <p className="text-[14px] font-medium leading-[1.55] text-muted">{p.type}</p>
                  </div>
                  <p className="whitespace-nowrap text-[20px] font-bold leading-[1.3] tracking-[-0.01em] text-fg min-[390px]:text-[22px]">
                    {p.price}
                  </p>
                </Link>
              ))}
            </div>
            <p className="w-full text-center text-[14px] leading-[1.55] text-muted min-[640px]:text-[13px]">
              {copy.pricesNote}
            </p>
          </div>

          {/* Next trip */}
          <div className="flex w-full pt-14 desk:pt-[110px]">
            <Reveal className="w-full">
              <Link
                href={`/tours/${next.slug}`}
                className="flex w-full flex-col items-center rounded-[20px] bg-surface shadow-[inset_0_0_0_1px_var(--line)] p-6 transition-colors duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)] hover:bg-surface-2 desk:flex-row desk:justify-between desk:p-11"
              >
                <span className="whitespace-pre text-[14px] font-medium leading-[1.55] text-muted">{copy.next}</span>
                <span className="w-full text-center font-display text-[32px] font-medium leading-none tracking-[-0.035em] text-fg min-[390px]:text-[34px] tab:text-[37.3px] desk:w-px desk:flex-1 desk:text-right desk:text-[55.2px] min-[1400px]:text-[64px]">
                  {next.title}
                </span>
                <span className="text-fg">
                  <ArrowRight size={32} />
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
