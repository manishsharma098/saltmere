/* Tour-page icons copied from the Saltmere reference (24x24 viewBox, 1.5 stroke). */
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

export const ArrowUpRight = ({ size = 20, ...r }: P) => (
  <svg {...base(size, r)}>
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M9 6.65s6.938-.542 7.915.435S17.35 15 17.35 15m-.85-7.5l-10 10"
    />
  </svg>
);

export const ArrowLeft = ({ size = 16, ...r }: P) => (
  <svg {...base(size, r)}>
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M5.5 12.002H19m-8 6s-6-4.419-6-6s6-6 6-6"
    />
  </svg>
);

export const ClockIcon = ({ size = 16, ...r }: P) => (
  <svg {...base(size, r)}>
    <g fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l2 2" />
    </g>
  </svg>
);

export const SunSmallIcon = ({ size = 16, ...r }: P) => (
  <svg {...base(size, r)}>
    <g fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M17 12a5 5 0 1 1-10 0a5 5 0 0 1 10 0Z" />
      <path
        strokeLinecap="round"
        d="M12 2v1.5m0 17V22m7.07-2.929l-1.06-1.06M5.99 5.989L4.928 4.93M22 12h-1.5m-17 0H2m17.071-7.071l-1.06 1.06M5.99 18.011l-1.06 1.06"
      />
    </g>
  </svg>
);

export const MoneyBagIcon = ({ size = 16, ...r }: P) => (
  <svg {...base(size, r)}>
    <g fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5">
      <path
        strokeLinecap="round"
        d="M20.943 16.835a15.76 15.76 0 0 0-4.476-8.616c-.517-.503-.775-.754-1.346-.986C14.55 7 14.059 7 13.078 7h-2.156c-.981 0-1.472 0-2.043.233c-.57.232-.83.483-1.346.986a15.76 15.76 0 0 0-4.476 8.616C2.57 19.773 5.28 22 8.308 22h7.384c3.029 0 5.74-2.227 5.25-5.165"
      />
      <path d="M7.257 4.443c-.207-.3-.506-.708.112-.8c.635-.096 1.294.338 1.94.33c.583-.009.88-.268 1.2-.638C10.845 2.946 11.365 2 12 2s1.155.946 1.491 1.335c.32.37.617.63 1.2.637c.646.01 1.305-.425 1.94-.33c.618.093.319.5.112.8l-.932 1.359c-.4.58-.599.87-1.017 1.035S13.837 7 12.758 7h-1.516c-1.08 0-1.619 0-2.036-.164S8.589 6.38 8.189 5.8z" />
      <path
        strokeLinecap="round"
        d="M13.627 12.919c-.216-.799-1.317-1.519-2.638-.98s-1.53 2.272.467 2.457c.904.083 1.492-.097 2.031.412c.54.508.64 1.923-.739 2.304c-1.377.381-2.742-.214-2.89-1.06m1.984-5.06v.761m0 5.476v.764"
      />
    </g>
  </svg>
);

export const CheckCircleIcon = ({ size = 20, ...r }: P) => (
  <svg {...base(size, r)}>
    <g fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12s4.477 10 10 10s10-4.477 10-10Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m8 12.5l2.5 2.5L16 9" />
    </g>
  </svg>
);
