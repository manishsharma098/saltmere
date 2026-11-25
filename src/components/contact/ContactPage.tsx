import type { ReactNode } from "react";
import { Reveal } from "@/components/motion";
import { MailIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import PageHeader from "@/components/legal/PageHeader";
import { MapPinIcon } from "@/components/legal/icons";
import { H2, ITEM_TITLE, WRAP } from "@/components/legal/styles";
import InquiryForm from "./InquiryForm";
import Faq from "./Faq";
import { fishingCopy } from "@/lib/fishing";

const CONTACT = fishingCopy.contact;

const CHANNELS: { icon: ReactNode; title: string; value: string; note: string }[] = [
  { icon: <WhatsAppIcon size={24} />, title: "WhatsApp", value: "Message us on WhatsApp", note: CONTACT.cards[0].note },
  { icon: <PhoneIcon size={24} />, title: "Phone", value: "+971 50 000 0000", note: "Phone" },
  { icon: <MailIcon size={24} />, title: "Email", value: "hello@saltmere.example", note: "Reply within one working day" },
  { icon: <MapPinIcon size={24} />, title: CONTACT.cards[2].title, value: CONTACT.cards[2].text, note: "Berth 14, Dubai Marina, Dubai" },
];

const BUTTONS = [
  { icon: <WhatsAppIcon size={20} />, label: CONTACT.cta, href: "https://www.whatsapp.com/" },
  {
    icon: <MailIcon size={20} />,
    label: "Email",
    href: "mailto:hello@saltmere.example?subject=Fishing%20trip%20request&body=Hello%20Saltmere%2C",
  },
  { icon: <PhoneIcon size={20} />, label: "+971 50 000 0000", href: "tel:+971500000000" },
];

export default function ContactPage() {
  return (
    <>
      <section className="flex w-full flex-col items-center pt-[136px] tab:pt-[152px] desk:pt-[172px] wide:pt-[176px]">
        <div className={`${WRAP} flex flex-col items-start`}>
          <PageHeader
            title={[{ text: "Let us plan" }, { text: "your trip.", className: "text-accent" }]}
            lead={CONTACT.sub}
          />

          <div className="flex w-full flex-col items-start gap-12 desk:flex-row desk:gap-20">
            {/* channels + buttons */}
            <div className="flex w-full flex-col gap-7 desk:w-px desk:flex-[0.8_0_0]">
              <ul className="flex w-full flex-col shadow-[inset_0_-1px_0_0_var(--line)]">
                {CHANNELS.map((c, i) => (
                  <Reveal
                    as="li"
                    key={c.title}
                    delay={i * 0.06}
                    className="flex w-full flex-col items-center gap-[14px] py-6 text-center shadow-[inset_0_1px_0_0_var(--line)] desk:flex-row desk:items-start desk:gap-5 desk:text-left"
                  >
                    <div className="grid h-[52px] w-[52px] flex-none place-items-center rounded-xl bg-fill text-accent">
                      {c.icon}
                    </div>
                    <div className="flex w-full flex-col gap-1 desk:w-px desk:flex-1">
                      <h3 className={`${ITEM_TITLE} text-fg`}>{c.title}</h3>
                      <p className="text-[18px] leading-[1.4] font-medium text-fg">{c.value}</p>
                      <p className="text-[16px] leading-[1.55] text-muted">{c.note}</p>
                    </div>
                  </Reveal>
                ))}
              </ul>
              <Reveal className="flex w-full flex-col gap-[10px]">
                {BUTTONS.map((b) => (
                  <a
                    key={b.label}
                    href={b.href}
                    {...(b.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="btn-ghost btn-lift w-full"
                  >
                    {b.icon}
                    {b.label}
                  </a>
                ))}
              </Reveal>
            </div>

            {/* form */}
            <Reveal delay={0.08} className="w-full desk:w-px desk:flex-[1.2_0_0]">
              <InquiryForm />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="flex w-full flex-col items-center pt-24 tab:pt-[97px] desk:pt-36 wide:pt-[180px]">
        <div className={`${WRAP} flex flex-col items-start`}>
          <div className="flex w-full flex-col items-start gap-10 desk:flex-row desk:gap-24">
            <Reveal className="w-full text-center desk:w-px desk:flex-[0.8_0_0] desk:text-left">
              <h2 className={`${H2} text-fg`}>{CONTACT.faqTitle}</h2>
            </Reveal>
            <Faq />
          </div>
        </div>
      </section>
    </>
  );
}
