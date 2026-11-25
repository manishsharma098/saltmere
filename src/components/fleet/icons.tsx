// Hugeicons stroke icons used by the reference (24x24, stroke 1.5).
const P: Record<string, string> = {
  calendar: `<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M16 2v4M8 2v4m5-2h-2C7.229 4 5.343 4 4.172 5.172S3 8.229 3 12v2c0 3.771 0 5.657 1.172 6.828S7.229 22 11 22h2c3.771 0 5.657 0 6.828-1.172S21 17.771 21 14v-2c0-3.771 0-5.657-1.172-6.828S16.771 4 13 4M3 10h18"/><path d="M12.126 14H12m.125 4H12m-4.376-4H7.5m.125 4H7.5m9.125-4H16.5m-4.25 0a.25.25 0 1 1-.5 0a.25.25 0 0 1 .5 0m0 4a.25.25 0 1 1-.5 0a.25.25 0 0 1 .5 0m-4.5-4a.25.25 0 1 1-.5 0a.25.25 0 0 1 .5 0m0 4a.25.25 0 1 1-.5 0a.25.25 0 0 1 .5 0m9-4a.25.25 0 1 1-.5 0a.25.25 0 0 1 .5 0"/></g>`,
  users: `<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18.5 20.5c-.234-2.931-2.658-5.252-5.692-5.448L11.999 15q-.431.012-.811.03C8.18 15.172 5.73 17.597 5.5 20.5m9.75-11.25a3.25 3.25 0 1 1-6.5 0a3.25 3.25 0 0 1 6.5 0M5.502 8.5A3.25 3.25 0 0 1 9.5 3.752M18.496 8.5A3.25 3.25 0 0 0 14.5 3.752M22 18c-.18-2.263-2-4.5-4-5M2 18c.18-2.263 2-4.5 4-5"/>`,
  clock: `<g fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l2 2"/></g>`,
  minus: `<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 12H4"/>`,
  plus: `<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12.001 5v14.002m7.001-7H5"/>`,
  arrowRight: `<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18.5 12H5m8 6s6-4.419 6-6s-6-6-6-6"/>`,
  arrowLeft: `<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5.5 12.002H19m-8 6s-6-4.419-6-6s6-6 6-6"/>`,
  arrowUpRight: `<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 6.65s6.938-.542 7.915.435S17.35 15 17.35 15m-.85-7.5l-10 10"/>`,
  length: `<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"><path d="m17.5 10.5l2 2M14 14l2 2m-5.5 1.5l2 2"/><path stroke-linejoin="round" d="M10.536 4.678c1.364-1.365 2.047-2.047 2.808-2.363a4.14 4.14 0 0 1 3.17 0c.761.316 1.444.998 2.808 2.363c1.365 1.364 2.047 2.047 2.363 2.808a4.14 4.14 0 0 1 0 3.17c-.316.761-.998 1.444-2.363 2.808l-5.857 5.858c-1.365 1.365-2.048 2.047-2.809 2.363a4.14 4.14 0 0 1-3.17 0c-.761-.316-1.444-.998-2.808-2.363c-1.365-1.364-2.047-2.047-2.363-2.808a4.14 4.14 0 0 1 0-3.17c.316-.761.998-1.444 2.363-2.808z"/></g>`,
  bed: `<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"><path stroke-linejoin="round" d="M22 17.5H2M22 21v-5c0-1.886 0-2.828-.586-3.414S19.886 12 18 12H6c-1.886 0-2.828 0-3.414.586S2 14.114 2 16v5"/><path d="M11 12v-1.787c0-.38-.057-.508-.35-.658C10.04 9.243 9.299 9 8.5 9s-1.54.243-2.15.555c-.293.15-.35.278-.35.658V12m12 0v-1.787c0-.38-.057-.508-.35-.658C17.04 9.243 16.299 9 15.5 9s-1.54.243-2.15.555c-.293.15-.35.278-.35.658V12"/><path d="M21 12V7.36c0-.691 0-1.037-.192-1.363s-.466-.496-1.014-.834C17.587 3.8 14.9 3 12 3s-5.587.8-7.794 2.163c-.548.338-.822.507-1.014.834S3 6.669 3 7.36V12"/></g>`,
  crew: `<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 21c-.233-2.931-2.658-5.252-5.691-5.448L9.5 15.5q-.432.012-.812.03C5.681 15.672 3.231 18.097 3 21m9.75-11.25a3.25 3.25 0 1 1-6.5 0a3.25 3.25 0 0 1 6.5 0M21 17.501c-.23-2.87-2.546-5.226-5.5-5.505M15.988 9A3.25 3.25 0 0 0 17.5 6.25C17.5 4.455 16.05 3 14.26 3c-.879 0-1.676.351-2.26.921"/>`,
  speed: `<g fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" d="M13.5 13L17 9m-3 6a2 2 0 1 1-4 0a2 2 0 0 1 4 0Zm-8-3a6 6 0 0 1 9-5.197"/><path d="M2.5 12c0-4.478 0-6.717 1.391-8.109c1.392-1.39 3.63-1.39 8.11-1.39c4.477 0 6.717 0 8.108 1.39c1.391 1.392 1.391 3.63 1.391 8.11c0 4.477 0 6.717-1.391 8.108S16.479 21.5 12 21.5c-4.478 0-6.717 0-8.109-1.391c-1.39-1.391-1.39-3.63-1.39-8.109Z"/></g>`,
  pin: `<g fill="none" stroke="currentColor" stroke-width="1.5"><path d="M13.618 21.367A2.37 2.37 0 0 1 12 22a2.37 2.37 0 0 1-1.617-.633C6.412 17.626 1.09 13.447 3.685 7.38C5.09 4.1 8.458 2 12.001 2s6.912 2.1 8.315 5.38c2.592 6.06-2.717 10.259-6.698 13.987Z"/><path d="M15.5 11a3.5 3.5 0 1 1-7 0a3.5 3.5 0 0 1 7 0Z"/></g>`,
  check: `<g fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12s4.477 10 10 10s10-4.477 10-10Z"/><path stroke-linecap="round" stroke-linejoin="round" d="m8 12.5l2.5 2.5L16 9"/></g>`,
  whatsapp: `<g fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linejoin="round" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12c0 1.379.28 2.693.784 3.888c.279.66.418.99.436 1.24c.017.25-.057.524-.204 1.073L2 22l3.799-1.016c.549-.147.823-.22 1.073-.204c.25.018.58.157 1.24.436A10 10 0 0 0 12 22Z"/><path d="m8.588 12.377l.871-1.081c.367-.456.82-.88.857-1.488c.008-.153-.1-.841-.315-2.218C9.916 7.049 9.41 7 8.973 7c-.57 0-.855 0-1.138.13c-.358.163-.725.622-.806 1.007c-.064.305-.016.515.079.935c.402 1.783 1.347 3.544 2.811 5.009c1.465 1.464 3.226 2.409 5.01 2.811c.42.095.629.143.934.079c.385-.08.844-.448 1.008-.806c.129-.283.129-.568.129-1.138c0-.438-.049-.943-.59-1.028c-1.377-.216-2.065-.323-2.218-.315c-.607.036-1.032.49-1.488.857l-1.081.87"/></g>`,
  mail: `<g fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"><path d="m2 6l6.913 3.917c2.549 1.444 3.625 1.444 6.174 0L22 6"/><path d="M2.016 13.476c.065 3.065.098 4.598 1.229 5.733c1.131 1.136 2.705 1.175 5.854 1.254c1.94.05 3.862.05 5.802 0c3.149-.079 4.723-.118 5.854-1.254c1.131-1.135 1.164-2.668 1.23-5.733c.02-.986.02-1.966 0-2.952c-.066-3.065-.099-4.598-1.23-5.733c-1.131-1.136-2.705-1.175-5.854-1.254a115 115 0 0 0-5.802 0c-3.149.079-4.723.118-5.854 1.254c-1.131 1.135-1.164 2.668-1.23 5.733a69 69 0 0 0 0 2.952Z"/></g>`,
  call: `<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m4.912 10.541l2.64-2.64a2.08 2.08 0 0 0 .507-2.064a27 27 0 0 1-.49-1.844C7.453 3.45 6.976 3 6.42 3H4.912c-1.11 0-2.023.904-1.901 2.008c.926 8.392 7.59 15.055 15.981 15.981c1.104.122 2.008-.79 2.008-1.9v-1.51c0-.554-.452-1.01-.998-1.11a15 15 0 0 1-1.774-.459c-.767-.244-1.619-.072-2.188.496l-2.581 2.582"/>`,
  checkCircle: `<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12s4.477 10 10 10s10-4.477 10-10"/><path d="m8 12.5l2.5 2.5L16 9"/></g>`,
  cancel: `<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18 6L6 18m12 0L6 6"/>`,
  chevronDown: `<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18 9s-4.419 6-6 6s-6-6-6-6"/>`,
};

export type IconName = keyof typeof P;

export function Icon({ name, size = 18, className, style }: { name: IconName; size?: number; className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      className={className}
      style={{ display: "block", flex: "none", ...style }}
      dangerouslySetInnerHTML={{ __html: P[name] }}
    />
  );
}
