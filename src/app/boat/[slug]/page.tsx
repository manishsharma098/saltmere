import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import "@/components/fleet/fleet.css";
import "@/components/boat/boat.css";
import { boats } from "@/lib/data";
import { fishingCopy } from "@/lib/fishing";
import { Appear, WordsAppear } from "@/components/fleet/anim";
import { Icon, type IconName } from "@/components/fleet/icons";
import Gallery from "@/components/boat/Gallery";
import Availability from "@/components/boat/Availability";
import InquiryForm from "@/components/boat/InquiryForm";

const WHATSAPP = "https://www.whatsapp.com/";
const EMAIL = "mailto:hello@saltmere.example?subject=Charter%20request&body=Hello%20Saltmere%2C";
const PHONE = "tel:+971500000000";
const copy = fishingCopy.boat;
const L = copy.specLabels;

export function generateStaticParams() {
  return boats.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const b = boats.find((x) => x.slug === slug);
  if (!b) return {};
  const kind = b.type.charAt(0).toLowerCase() + b.type.slice(1);
  const title = `${b.name} | Fishing charter in Dubai, Saltmere`;
  const description = `${b.name}, ${kind} for up to ${b.guests} anglers from ${b.berth}. ${b.tagline}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/boat/${b.slug}` },
    openGraph: {
      title,
      description,
      url: `/boat/${b.slug}`,
      images: [{ url: b.images[0], alt: `${b.name}, a ${b.type.toLowerCase()} fishing boat` }],
    },
  };
}

export default async function BoatPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = boats.findIndex((x) => x.slug === slug);
  if (index < 0) notFound();
  const b = boats[index];
  const next = boats[(index + 1) % boats.length];
  const fullDay = b.prices.find((p) => p.tour === "Full day")?.price ?? b.prices[0].price;

  const specs: { icon: IconName; value: string; label: string }[] = [
    { icon: "length", value: b.length, label: L.length },
    { icon: "users", value: String(b.guests), label: L.guests },
    { icon: "bed", value: b.cabins, label: L.cabins },
    { icon: "crew", value: b.crew, label: L.crew },
    { icon: "speed", value: b.speed, label: L.speed },
    { icon: "pin", value: b.berth, label: L.berth },
  ];
  const contacts: { href: string; icon: IconName; long: string; short: string; external?: boolean }[] = [
    { href: WHATSAPP, icon: "whatsapp", long: "WhatsApp us", short: "Chat", external: true },
    { href: EMAIL, icon: "mail", long: "Email", short: "Email" },
    { href: PHONE, icon: "call", long: "Call", short: "Call" },
  ];

  return (
    <div className="bt-page">
      <div className="bt-content">
        <Link href="/fleet" className="bt-crumb">
          <Icon name="arrowLeft" size={16} />
          Fleet
        </Link>

        <div className="bt-header">
          <h1 className="slm-h1">
            <WordsAppear parts={[{ text: b.name }]} />
          </h1>
          <Appear className="bt-lead" delay={0.3}>
            <p className="slm-lead" style={{ whiteSpace: "pre" }}>
              {b.type}.
            </p>
            <p className="slm-lead" style={{ whiteSpace: "pre" }}>
              {b.tagline}
            </p>
          </Appear>
        </div>

        <div className="bt-gallery">
          <div className="bt-stage">
            <Gallery images={b.gallery} focus={b.focus} alt={`${b.name}, ${b.type}`} />
          </div>
          <p className="bt-small bt-center-sm">{copy.photoNote}</p>
        </div>

        <div className="bt-cols">
          <div className="bt-info">
            <div className="bt-about">
              <Appear>
                <p className="bt-blurb bt-center-sm">{b.description}</p>
              </Appear>
              <ul className="bt-specs">
                {specs.map((s, i) => (
                  <li key={s.label} className={`bt-spec${i % 3 === 0 ? " is-first" : ""}`}>
                    <Icon name={s.icon} size={20} className="bt-spec-icon" />
                    <p className="bt-spec-value">{s.value}</p>
                    <p className="bt-label14" style={{ width: "100%" }}>
                      {s.label}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <Appear className="bt-block">
              <h3 className="bt-h3">{copy.pricesTitle}</h3>
              <ul className="bt-prices">
                {b.prices.map((p) => (
                  <li key={p.tour} className={`bt-price${p.tour === "Full day" ? " is-featured" : ""}`}>
                    <div className="bt-price-label">
                      <p className="bt-price-name">{p.tour}</p>
                      <p className="bt-label14 bt-price-hint">{p.length}</p>
                    </div>
                    <p className="bt-price-value">{p.price.replace(" ", " ")}</p>
                  </li>
                ))}
              </ul>
              <p className="bt-small bt-center-sm" style={{ width: "100%" }}>
                {copy.pricesNote}
              </p>
            </Appear>

            <Appear className="bt-block">
              <h3 className="bt-h3">{copy.onBoardTitle}</h3>
              <ul className="bt-amenities">
                {b.onBoard.map((a) => (
                  <li key={a} className="bt-amenity">
                    <span className="bt-check">
                      <Icon name="check" size={20} />
                    </span>
                    <p>{a}</p>
                  </li>
                ))}
              </ul>
            </Appear>

            <Appear className="bt-block">
              <h3 className="bt-h3">{copy.chatTitle}</h3>
              <div className="bt-contact">
                {contacts.map((c) => (
                  <a key={c.long} href={c.href} className="bt-ghost" {...(c.external ? { target: "_blank", rel: "noopener" } : {})}>
                    <Icon name={c.icon} size={20} />
                    <span className="is-long">{c.long}</span>
                    <span className="is-short">{c.short}</span>
                  </a>
                ))}
              </div>
              <p className="bt-small bt-center-sm" style={{ width: "100%" }}>
                {copy.chatText}
              </p>
            </Appear>
          </div>

          <div className="bt-request" id="request-boat">
            <Appear delay={0.1}>
              <Availability slug={b.slug} boatIndex={index + 1} fleetSize={boats.length} boatGuests={b.guests} />
            </Appear>
            <Appear delay={0.2}>
              <InquiryForm boats={boats.map((x) => x.name)} />
            </Appear>
          </div>
        </div>

        <div className="bt-next-wrap">
          <Appear as="div">
            <Link href={`/boat/${next.slug}`} className="bt-next">
              <span className="bt-label14">{copy.nextBoat}</span>
              <span className="bt-next-name">{next.name}</span>
              <Icon name="arrowRight" size={18} />
            </Link>
          </Appear>
        </div>
      </div>

      <div className="bt-bar">
        <div className="bt-bar-price">
          <p className="bt-small">Full day</p>
          <p className="bt-price-value">{fullDay.replace(" ", " ")}</p>
        </div>
        <a className="bt-bar-wa" href={WHATSAPP} target="_blank" rel="noopener" aria-label="WhatsApp">
          <Icon name="whatsapp" size={24} />
        </a>
        <a className="bt-request-btn" href="#request-boat">
          {copy.request}
        </a>
      </div>
    </div>
  );
}
