import { Reveal } from "@/components/motion";
import PageHeader from "./PageHeader";
import { BODY, CARD_TITLE, WRAP } from "./styles";

export type LegalSection = { heading: string; lines: string[] };

/**
 * Shared layout for Imprint and Privacy: page header + one sand card of sections.
 * `contained` centres the 1392px column (Privacy). The reference Imprint page
 * leaves that column left-aligned on wide screens, so it passes `contained={false}`.
 */
export default function LegalPage({
  title,
  lead,
  sections,
  contained = true,
}: {
  title: string;
  lead: string;
  sections: LegalSection[];
  contained?: boolean;
}) {
  return (
    <section className={`flex w-full flex-col pt-[136px] tab:pt-[152px] desk:pt-[172px] wide:pt-[176px] ${contained ? "items-center" : "items-start"}`}>
      <div className={`${WRAP} flex flex-col items-start`}>
        <PageHeader title={[{ text: title }]} lead={lead} />
        <Reveal className="flex w-full max-w-[860px] flex-col gap-[30px] rounded-[20px] bg-sand p-6 max-[389.98px]:p-[22px] tab:p-10 desk:p-14">
          {sections.map((s) => (
            <div key={s.heading} className="flex w-full flex-col gap-2">
              <h3 className={`${CARD_TITLE} text-ink`}>{s.heading}</h3>
              {s.lines.map((l) => (
                <p key={l} className={`${BODY} text-ink-muted`}>
                  {l}
                </p>
              ))}
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
