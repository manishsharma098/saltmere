/**
 * Type + layout classes shared by the About, Contact, Imprint and Privacy pages.
 * Values come from the reference Framer CSS. Breakpoints: base = phone (<810),
 * tab >= 810, desk >= 1200, wide >= 1600, plus the small-phone (<390) step.
 */

/** Page content wrapper: max 1392 incl. gutters 16 / 24 / 36 / 40. */
export const WRAP = "w-full max-w-[1392px] px-4 tab:px-6 desk:px-9 wide:px-10";

/** Hero / page title: 108 desk, 60 tab, 50 phone, 46 small phone. */
export const H1 =
  "font-display font-medium text-[50px] leading-[0.96] tracking-[-0.04em] max-[389.98px]:text-[46px] tab:text-[60px] desk:text-[108px]";

/** Lead under the page title: 20/30 desk, 17/25.5 below. */
export const LEAD = "text-[17px] leading-[1.5] desk:text-[20px]";

/** Section title: 72 desk, 40.5 tab, 38 phone, 36 small phone. */
export const H2 =
  "font-display font-medium text-[38px] leading-none tracking-[-0.035em] max-[389.98px]:text-[36px] tab:text-[40.5px] desk:text-[72px]";

/** Title inside a sand card: 38 desk, 26 below. */
export const CARD_TITLE =
  "font-display font-medium text-[26px] leading-[1.05] tracking-[-0.03em] desk:text-[38px]";

/** List item title (How we work, channels): 26 desk, 24 below. */
export const ITEM_TITLE =
  "font-display font-medium text-[24px] leading-[1.1] tracking-[-0.03em] desk:text-[26px]";

export const BODY = "text-[16px] leading-[1.55]";
export const SMALL = "text-[15px] leading-[1.55]";

/** Hairline drawn as an inset border so it does not change layout (Framer draws these with ::after). */
export const LINE_TOP = "shadow-[inset_0_1px_0_0_var(--line)]";
