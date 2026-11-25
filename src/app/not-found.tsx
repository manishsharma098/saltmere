import Link from "next/link";
import { ArrowRight } from "@/components/icons";

export const metadata = { title: "Page not found", robots: { index: false, follow: false } };

export default function NotFound() {
  return (
    <section className="container-site flex min-h-[70vh] flex-col items-center justify-center pt-[140px] text-center desk:pt-[160px]">
      <p className="t-eyebrow">404</p>
      <h1 className="mt-4 font-display text-[56px] font-medium leading-[1.02] tracking-[-0.04em] text-fg tab:text-[88px] desk:text-[112px]">
        Lost at <span className="text-accent">sea.</span>
      </h1>
      <p className="mt-5 max-w-[440px] font-sans text-[16px] leading-[1.55] text-muted">
        The page you are looking for got away. Head back to the harbour or pick a boat for your day of fishing.
      </p>
      <div className="mt-9 flex flex-wrap items-center justify-center gap-[10px]">
        <Link href="/" className="btn-primary btn-lift">
          <span>Back home</span>
          <span className="btn-chip">
            <ArrowRight size={18} />
          </span>
        </Link>
        <Link href="/fleet" className="btn-ghost btn-lift">
          See the fleet
        </Link>
      </div>
    </section>
  );
}
