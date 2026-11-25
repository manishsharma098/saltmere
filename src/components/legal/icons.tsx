/* Extra icons used on About / Contact, copied from the reference (24x24, 1.5 stroke). */
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

export const PeopleIcon = ({ size = 24, ...r }: P) => (
  <svg {...base(size, r)}>
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M16 21c-.233-2.931-2.658-5.252-5.691-5.448L9.5 15.5q-.432.012-.812.03C5.681 15.672 3.231 18.097 3 21m9.75-11.25a3.25 3.25 0 1 1-6.5 0a3.25 3.25 0 0 1 6.5 0M21 17.501c-.23-2.87-2.546-5.226-5.5-5.505M15.988 9A3.25 3.25 0 0 0 17.5 6.25C17.5 4.455 16.05 3 14.26 3c-.879 0-1.676.351-2.26.921"
    />
  </svg>
);

export const ShieldCheckIcon = ({ size = 24, ...r }: P) => (
  <svg {...base(size, r)}>
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5">
      <path d="M20.992 11.183V8.28c0-1.64 0-2.46-.404-2.995s-1.318-.794-3.145-1.314a25 25 0 0 1-3.229-1.173C13.016 2.266 12.417 2 11.993 2s-1.023.266-2.222.798c-.88.39-1.98.818-3.228 1.173c-1.828.52-2.742.78-3.146 1.314c-.404.535-.404 1.355-.404 2.995v2.903c0 5.625 5.063 9 7.594 10.336c.607.32.91.481 1.406.481s.8-.16 1.406-.48c2.531-1.337 7.594-4.712 7.594-10.337Z" />
      <path strokeLinejoin="round" d="M8.492 11.833s.875 0 1.75 1.667c0 0 2.78-4.167 5.25-5" />
    </g>
  </svg>
);

export const MapPinIcon = ({ size = 24, ...r }: P) => (
  <svg {...base(size, r)}>
    <g fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M13.618 21.367A2.37 2.37 0 0 1 12 22a2.37 2.37 0 0 1-1.617-.633C6.412 17.626 1.09 13.447 3.685 7.38C5.09 4.1 8.458 2 12.001 2s6.912 2.1 8.315 5.38c2.592 6.06-2.717 10.259-6.698 13.987Z" />
      <path d="M15.5 11a3.5 3.5 0 1 1-7 0a3.5 3.5 0 0 1 7 0Z" />
    </g>
  </svg>
);

export const PlusIcon = ({ size = 20, ...r }: P) => (
  <svg {...base(size, r)}>
    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12.001 5v14.002m7.001-7H5" />
  </svg>
);

export const CloseIcon = ({ size = 20, ...r }: P) => (
  <svg {...base(size, r)}>
    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18 6L6 18m12 0L6 6" />
  </svg>
);

export const CheckIcon = ({ size = 18, ...r }: P) => (
  <svg {...base(size, r)}>
    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 14.5s1.5 0 3.5 3.5c0 0 5.559-9.167 10.5-11" />
  </svg>
);
