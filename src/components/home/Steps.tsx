"use client";

import { Reveal } from "@/components/motion";
import { body, content, section } from "./lowerStyles";

const steps = [
  { n: "01", title: "Choose a day", text: "Set date, anglers and trip. The fleet filters to what is free." },
  { n: "02", title: "Send a request", text: "Pick a boat and ask for the date. We answer within a working day." },
  { n: "03", title: "We plan it", text: "Target species, grounds and times, agreed with the captain. A deposit holds the boat." },
  { n: "04", title: "Lines out", text: "Walk down the pontoon. The crew takes it from there." },
];

export default function Steps() {
  return (
    <section className={section} aria-label="Steps">
      <div className={content}>
        <Reveal className="relative flex w-full flex-col items-start gap-[60px] rounded-[20px] bg-sand p-[60px] min-[1600px]:gap-[72px] min-[1600px]:p-[72px] max-[1200px]:items-center max-[1200px]:gap-10 max-[1200px]:p-10 max-[810px]:gap-7 max-[810px]:px-[22px] max-[810px]:py-8 max-[390px]:px-5">
          <h2 className="m-0 w-full font-display font-medium leading-none tracking-[-0.035em] text-ink text-[72px] max-[1400px]:text-[60px] max-[1200px]:text-[40.5px] max-[1200px]:text-center max-[810px]:text-[38px] max-[390px]:text-[36px] [text-wrap:balance]">
            From request to <span className="text-accent-deep">lines out.</span>
          </h2>
          <ol className="relative m-0 grid w-full list-none grid-cols-4 gap-10 p-0 max-[1200px]:grid-cols-2 max-[810px]:grid-cols-1 max-[810px]:gap-0">
            {steps.map((s) => (
              <li
                key={s.n}
                className="flex w-full flex-col items-start gap-[10px] self-start shadow-[inset_0_1px_0_var(--ink-line)] pt-[22px] max-[1200px]:items-center max-[1200px]:gap-[6px]"
              >
                <p className="m-0 w-full font-display text-[56px] font-medium leading-none tracking-[-0.035em] text-accent-deep max-[1200px]:text-center max-[810px]:text-[40px]">
                  {s.n}
                </p>
                <h3 className="m-0 w-full font-sans text-[22px] font-bold leading-[1.3] tracking-[-0.02em] text-ink max-[1200px]:text-center max-[810px]:text-[19px]">
                  {s.title}
                </h3>
                <p className={`${body} w-full max-w-[300px] text-ink-muted max-[1200px]:text-center`}>{s.text}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
