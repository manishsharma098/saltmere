/* Icons copied from the Saltmere reference (24x24, 1.5 stroke). */
import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement> & { size?: number };
const base = (size: number, rest: SVGProps<SVGSVGElement>) => ({
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  width: size,
  height: size,
  "aria-hidden": true,
  style: { display: "block", flex: "none" },
  ...rest,
});

const LOGO_PATH = "M0 3280 l0 -3280 4830 0 4830 0 0 3280 0 3280 -4830 0 -4830 0 0 -3280z m5310 3131 c1466 -228 2556 -1451 2633 -2954 5 -89 5 -89 -27 -83 -209 36 -710 43 -941 13 -342 -45 -498 -84 -990 -247 -498 -165 -677 -207 -970 -231 -388 -31 -720 25 -1290 216 -589 197 -803 246 -1210 276 -188 14 -515 6 -685 -16 -63 -8 -117 -15 -119 -15 -5 0 8 203 20 325 146 1442 1360 2609 2849 2739 138 12 600 -2 730 -23z m2372 -3411 c537 -36 914 -168 1698 -593 l155 -84 3 -417 c1 -229 0 -416 -2 -416 -16 0 -338 158 -494 243 -693 374 -1085 498 -1582 500 -379 1 -642 -64 -1145 -283 -441 -192 -600 -251 -825 -305 -426 -102 -920 -98 -1342 10 -202 52 -368 113 -794 293 -524 222 -886 295 -1305 263 -464 -35 -828 -159 -1444 -490 -195 -106 -454 -231 -475 -231 -6 0 -10 159 -10 413 l0 413 232 126 c778 423 1223 558 1843 558 489 0 777 -65 1400 -315 574 -230 783 -285 1145 -301 401 -18 744 59 1291 289 561 236 791 296 1279 330 103 8 227 6 372 -3z m73 -1360 c511 -47 887 -187 1690 -627 l90 -50 3 -412 c2 -413 2 -413 -25 -406 -44 11 -299 136 -475 233 -632 348 -1034 480 -1518 499 -395 15 -711 -64 -1285 -319 -622 -276 -898 -343 -1415 -343 -479 1 -777 74 -1380 337 -518 227 -816 301 -1215 301 -526 1 -965 -133 -1610 -493 -195 -109 -464 -240 -492 -240 -2 0 -3 186 -3 414 l0 414 158 88 c815 453 1294 605 1911 604 483 -1 818 -79 1426 -333 579 -241 869 -308 1285 -294 357 12 616 76 1060 262 102 43 232 98 290 122 484 204 1009 289 1505 243z";

/** Saltmere sun-over-waves mark (966x656), filled with currentColor. */
export function LogoMark({ width = 35, height = 24, ...rest }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 966 656" width={width} height={height} aria-hidden style={{ display: "block", flex: "none" }} {...rest}>
      <g transform="translate(0,656) scale(0.1,-0.1)" fill="currentColor">
        <path d={LOGO_PATH} />
      </g>
    </svg>
  );
}

export const ArrowRight = ({ size = 18, ...r }: P) => (
  <svg {...base(size, r)}>
    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18.5 12H5m8 6s6-4.419 6-6s-6-6-6-6" />
  </svg>
);

export const WhatsAppIcon = ({ size = 20, ...r }: P) => (
  <svg {...base(size, r)}>
    <g fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinejoin="round" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12c0 1.379.28 2.693.784 3.888c.279.66.418.99.436 1.24c.017.25-.057.524-.204 1.073L2 22l3.799-1.016c.549-.147.823-.22 1.073-.204c.25.018.58.157 1.24.436A10 10 0 0 0 12 22Z" />
      <path d="m8.588 12.377l.871-1.081c.367-.456.82-.88.857-1.488c.008-.153-.1-.841-.315-2.218C9.916 7.049 9.41 7 8.973 7c-.57 0-.855 0-1.138.13c-.358.163-.725.622-.806 1.007c-.064.305-.016.515.079.935c.402 1.783 1.347 3.544 2.811 5.009c1.465 1.464 3.226 2.409 5.01 2.811c.42.095.629.143.934.079c.385-.08.844-.448 1.008-.806c.129-.283.129-.568.129-1.138c0-.438-.049-.943-.59-1.028c-1.377-.216-2.065-.323-2.218-.315c-.607.036-1.032.49-1.488.857l-1.081.87" />
    </g>
  </svg>
);

export const MailIcon = ({ size = 20, ...r }: P) => (
  <svg {...base(size, r)}>
    <g fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5">
      <path d="m2 6l6.913 3.917c2.549 1.444 3.625 1.444 6.174 0L22 6" />
      <path d="M2.016 13.476c.065 3.065.098 4.598 1.229 5.733c1.131 1.136 2.705 1.175 5.854 1.254c1.94.05 3.862.05 5.802 0c3.149-.079 4.723-.118 5.854-1.254c1.131-1.135 1.164-2.668 1.23-5.733c.02-.986.02-1.966 0-2.952c-.066-3.065-.099-4.598-1.23-5.733c-1.131-1.136-2.705-1.175-5.854-1.254a115 115 0 0 0-5.802 0c-3.149.079-4.723.118-5.854 1.254c-1.131 1.135-1.164 2.668-1.23 5.733a69 69 0 0 0 0 2.952Z" />
    </g>
  </svg>
);

export const PhoneIcon = ({ size = 20, ...r }: P) => (
  <svg {...base(size, r)}>
    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m4.912 10.541l2.64-2.64a2.08 2.08 0 0 0 .507-2.064a27 27 0 0 1-.49-1.844C7.453 3.45 6.976 3 6.42 3H4.912c-1.11 0-2.023.904-1.901 2.008c.926 8.392 7.59 15.055 15.981 15.981c1.104.122 2.008-.79 2.008-1.9v-1.51c0-.554-.452-1.01-.998-1.11a15 15 0 0 1-1.774-.459c-.767-.244-1.619-.072-2.188.496l-2.581 2.582" />
  </svg>
);

export const SunIcon = ({ size = 20, ...r }: P) => (
  <svg {...base(size, r)}>
    <g fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M17 12a5 5 0 1 1-10 0a5 5 0 0 1 10 0Z" />
      <path strokeLinecap="round" d="M12 2v1.5m0 17V22m7.07-2.929l-1.06-1.06M5.99 5.989L4.928 4.93M22 12h-1.5m-17 0H2m17.071-7.071l-1.06 1.06M5.99 18.011l-1.06 1.06" />
    </g>
  </svg>
);

export const MoonIcon = ({ size = 20, ...r }: P) => (
  <svg {...base(size, r)}>
    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21.5 14.078A8.557 8.557 0 0 1 9.922 2.5C5.668 3.497 2.5 7.315 2.5 11.873a9.627 9.627 0 0 0 9.627 9.627c4.558 0 8.376-3.168 9.373-7.422" />
  </svg>
);

export const XIcon = ({ size = 20, ...r }: P) => (
  <svg {...base(size, r)}>
    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m3 21l7.548-7.548M21 3l-7.548 7.548m0 0L8 3H3l7.548 10.452m2.904-2.904L21 21h-5l-5.452-7.548" />
  </svg>
);

export const InstagramIcon = ({ size = 20, ...r }: P) => (
  <svg {...base(size, r)}>
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
      <path d="M3 12c0-4.243 0-6.364 1.318-7.682S7.758 3 12 3s6.364 0 7.682 1.318S21 7.758 21 12s0 6.364-1.318 7.682S16.242 21 12 21s-6.364 0-7.682-1.318S3 16.242 3 12" />
      <path d="M16 12a4 4 0 1 1-8 0a4 4 0 0 1 8 0m1.375-5.25h-.125m.25 0a.25.25 0 1 1-.5 0a.25.25 0 0 1 .5 0" />
    </g>
  </svg>
);

export const ShieldIcon = ({ size = 16, ...r }: P) => (
  <svg {...base(size, r)}>
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5">
      <path d="M20.992 11.183V8.28c0-1.64 0-2.46-.404-2.995s-1.318-.794-3.145-1.314a25 25 0 0 1-3.229-1.173C13.016 2.266 12.417 2 11.993 2s-1.023.266-2.222.798c-.88.39-1.98.818-3.228 1.173c-1.828.52-2.742.78-3.146 1.314c-.404.535-.404 1.355-.404 2.995v2.903c0 5.625 5.063 9 7.594 10.336c.607.32.91.481 1.406.481s.8-.16 1.406-.48c2.531-1.337 7.594-4.712 7.594-10.337Z" />
      <path strokeLinejoin="round" d="M8.492 11.833s.875 0 1.75 1.667c0 0 2.78-4.167 5.25-5" />
    </g>
  </svg>
);

export const CrewIcon = ({ size = 16, ...r }: P) => (
  <svg {...base(size, r)}>
    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 21c-.233-2.931-2.658-5.252-5.691-5.448L9.5 15.5q-.432.012-.812.03C5.681 15.672 3.231 18.097 3 21m9.75-11.25a3.25 3.25 0 1 1-6.5 0a3.25 3.25 0 0 1 6.5 0M21 17.501c-.23-2.87-2.546-5.226-5.5-5.505M15.988 9A3.25 3.25 0 0 0 17.5 6.25C17.5 4.455 16.05 3 14.26 3c-.879 0-1.676.351-2.26.921" />
  </svg>
);

export const CalendarIcon = ({ size = 16, ...r }: P) => (
  <svg {...base(size, r)}>
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
      <path d="M16 2v4M8 2v4m13 10v-4c0-3.771 0-5.657-1.172-6.828S16.771 4 13 4h-2C7.229 4 5.343 4 4.172 5.172S3 8.229 3 12v2c0 3.771 0 5.657 1.172 6.828S7.229 22 11 22h1M3 10h18" />
      <path d="M21 19.5h-6.5m2 2.5c-.506-.491-2.5-1.8-2.5-2.5s1.994-2.009 2.5-2.5" />
    </g>
  </svg>
);
