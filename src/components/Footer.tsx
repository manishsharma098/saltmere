"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Reveal } from "./motion";
import {
  ArrowRight,
  CalendarIcon,
  CrewIcon,
  InstagramIcon,
  MailIcon,
  PhoneIcon,
  ShieldIcon,
  WhatsAppIcon,
  XIcon,
} from "./icons";
import { CONTACT } from "./Nav";
import { boats } from "@/lib/data";

const FLEET = boats.map((b) => ({ href: `/boat/${b.slug}`, label: b.name }));
const CHARTER = [
  { href: "/tours", label: "Trips" },
  { href: "/fleet", label: "Check dates" },
  { href: "/about", label: "About" },
];
const LEGAL = [
  { href: "/imprint", label: "Imprint" },
  { href: "/privacy", label: "Privacy" },
];

function FooterLink({ href, label, current }: { href: string; label: string; current: boolean }) {
  return (
    <div className="flex min-h-11 items-center">
      <Link
        href={href}
        aria-current={current ? "page" : undefined}
        className="whitespace-pre font-sans text-[16px] leading-[1.55] text-fg transition-colors duration-300 ease-out-soft hover:text-muted"
      >
        {label}
      </Link>
    </div>
  );
}

function Column({
  title,
  links,
  pathname,
  children,
}: {
  title: string;
  links: { href: string; label: string }[];
  pathname: string;
  children?: React.ReactNode;
}) {
  return (
    <nav
      aria-label={title}
      className="flex w-full flex-col items-center max-tab:flex-none tab:w-px tab:flex-1 desk:items-start"
    >
      <p className="w-full font-sans text-[14px] font-medium leading-[1.55] text-muted max-desk:text-center">{title}</p>
      <div className="flex flex-col items-center desk:items-start">
        {links.map((l) => (
          <FooterLink key={l.href} {...l} current={pathname === l.href} />
        ))}
      </div>
      {children}
    </nav>
  );
}

const ghost = "btn-ghost btn-lift max-tab:w-full";

export default function Footer() {
  const pathname = usePathname() || "/";

  return (
    <div className="flex w-full flex-col items-center pt-16 tab:pt-[73px] desk:pt-[108px] wide:pt-[140px]">
      <footer
        className="relative flex w-full flex-col items-center overflow-clip rounded-t-[20px] bg-surface pt-12 tab:pt-[57px] desk:pt-[84px]"
        style={{ boxShadow: "var(--shadow-footer)" }}
      >
        <div className="flex w-full max-w-[1392px] flex-col px-4 tab:px-6 desk:px-9">
          {/* Columns */}
          <div className="flex w-full flex-col items-center gap-9 pb-12 tab:flex-row tab:flex-wrap tab:justify-center tab:gap-x-6 tab:gap-y-9 tab:pb-14 desk:flex-nowrap desk:items-start desk:justify-start desk:gap-16 desk:pb-20">
            <Reveal className="flex w-full flex-col items-center gap-[14px] text-center desk:w-px desk:flex-[1.7] desk:items-start desk:text-left">
              <h2 className="w-full font-display text-[30px] font-medium leading-[1.02] tracking-[-0.035em] text-fg [text-wrap:balance] min-[390px]:text-[32px] desk:text-[43.2px] min-[1400px]:text-[52px]">
                Your next catch <span className="text-accent">starts here.</span>
              </h2>
              <p className="w-full font-sans text-[16px] leading-[1.55] text-muted">
                Tell us the date and how many anglers are coming. We reply within the hour.
              </p>
              <div className="w-full pt-8">
                <a href={CONTACT.tel} className="block font-sans text-[15px] leading-[1.55] text-fg">
                  {CONTACT.phone}
                </a>
              </div>
              <p className="w-full font-sans text-[15px] leading-[1.55] text-fg">{CONTACT.address}</p>
            </Reveal>

            <Column title="Fleet" links={FLEET} pathname={pathname} />
            <Column title="Charter" links={CHARTER} pathname={pathname} />
            <Column title="Legal" links={LEGAL} pathname={pathname}>
              <div className="flex gap-[6px] pt-[14px]">
                <a
                  href="https://x.com/"
                  target="_blank"
                  rel="noopener"
                  aria-label="X"
                  className="btn-lift grid size-11 place-items-center rounded-[12px] bg-fill text-fg"
                >
                  <XIcon size={20} />
                </a>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener"
                  aria-label="Instagram"
                  className="btn-lift grid size-11 place-items-center rounded-[12px] bg-fill text-fg"
                >
                  <InstagramIcon size={20} />
                </a>
              </div>
            </Column>
          </div>

          {/* Actions */}
          <div className="grid w-full grid-cols-2 gap-[10px] pb-12 tab:flex tab:flex-wrap tab:items-center tab:justify-center desk:justify-start">
            <Link href="/contact" className="btn-primary btn-lift col-span-2 max-tab:w-full">
              <span>Request a date</span>
              <span className="btn-chip">
                <ArrowRight size={18} />
              </span>
            </Link>
            <a href={CONTACT.whatsapp} target="_blank" rel="noopener" className={`${ghost} col-span-2`}>
              <WhatsAppIcon size={20} />
              <span>WhatsApp us</span>
            </a>
            <a href={CONTACT.email} className={ghost}>
              <MailIcon size={20} />
              <span>Email</span>
            </a>
            <a href={CONTACT.tel} className={ghost}>
              <PhoneIcon size={20} />
              <span>Call</span>
            </a>
          </div>

          {/* Base */}
          <div className="flex w-full flex-col items-center gap-3 border-t border-line pb-7 pt-[22px] desk:flex-row desk:flex-wrap desk:justify-between desk:gap-0">
            <p className="w-full text-center font-sans text-[14px] leading-[1.55] text-muted min-[640px]:text-[13px] desk:w-auto desk:text-left">
              © 2026 Saltmere Charter, Dubai.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {[
                { icon: <ShieldIcon size={16} />, label: "Insured" },
                { icon: <CrewIcon size={16} />, label: "Licences included" },
                { icon: <CalendarIcon size={16} />, label: "Weather-proof dates" },
              ].map((b) => (
                <div key={b.label} className="flex items-center gap-[6px] text-muted">
                  {b.icon}
                  <span className="whitespace-nowrap font-sans text-[14px] leading-[1.55] min-[640px]:text-[13px]">{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Big wordmark */}
        <div aria-hidden className="flex w-full justify-center overflow-clip">
          <p className="select-none whitespace-pre font-display text-[82px] font-bold leading-[0.8] tracking-[-0.05em] text-wordmark min-[390px]:text-[96px] tab:text-[200px] desk:text-[300px]">
            Saltmere
          </p>
        </div>
        <div className="h-12 tab:h-16" />
      </footer>
    </div>
  );
}
