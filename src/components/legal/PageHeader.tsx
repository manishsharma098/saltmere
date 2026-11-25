import { Reveal } from "@/components/motion";
import RiseWords, { type WordSegment } from "./RiseWords";
import { H1, LEAD } from "./styles";

/**
 * Title + lead block at the top of Contact, Imprint and Privacy.
 * Left aligned from 1200px, centred below.
 */
export default function PageHeader({ title, lead }: { title: WordSegment[]; lead: string }) {
  return (
    <div className="flex w-full flex-col items-center gap-6 pb-7 text-center tab:pb-8 desk:items-start desk:pb-12 desk:text-left">
      <h1 className={`${H1} w-full text-fg [text-wrap:balance]`}>
        <RiseWords segments={title} />
      </h1>
      <Reveal onMount delay={0.35} duration={1} className="w-full max-w-[520px]">
        <p className={`${LEAD} text-muted [text-wrap:pretty]`}>{lead}</p>
      </Reveal>
    </div>
  );
}
