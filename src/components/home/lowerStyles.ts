// Shared class strings for the lower half of Home, taken from the Saltmere Framer CSS.
// Layout breakpoints: ≥1600 / 1200–1599 / 810–1199 / 390–809 / <390.
// Text presets switch at 1400 / 1200 / 810 / 390.

/** Section wrapper: padding-top 144 / 180 (≥1600) / 97 (810–1199) / 96 (<810). */
export const section =
  "relative flex w-full flex-col items-center pt-[144px] min-[1600px]:pt-[180px] max-[1200px]:pt-[97px] max-[810px]:pt-[96px]";

/** Content column: max 1392, padding 36 / 40 / 24 / 16. */
export const content =
  "relative flex w-full max-w-[1392px] flex-col items-start px-9 min-[1600px]:px-10 max-[1200px]:px-6 max-[810px]:px-4";

/** Section header block (title + lead). */
export const header =
  "relative flex w-full max-w-[900px] flex-col items-start gap-5 pb-[54px] min-[1600px]:pb-16 max-[1200px]:items-center max-[1200px]:pb-9 max-[810px]:pb-8";

/** H2 preset (Cabinet Grotesk 72/60/40.5/38/36, lh 1, ls -0.035em). Centered below 1200. */
export const h2 =
  "m-0 w-full font-display font-medium leading-none tracking-[-0.035em] text-fg text-[72px] max-[1400px]:text-[60px] max-[1200px]:text-[40.5px] max-[1200px]:text-center max-[810px]:text-[38px] max-[390px]:text-[36px] [text-wrap:balance]";

/** Lead preset (Satoshi 20 / 17, lh 1.5, muted). */
export const lead =
  "m-0 w-full max-w-[440px] font-sans text-[20px] leading-[1.5] text-muted max-[1400px]:text-[17px] max-[1200px]:text-center [text-wrap:pretty]";

/** Body preset (Satoshi 16 / 1.55). */
export const body = "m-0 font-sans text-[16px] font-normal leading-[1.55]";
