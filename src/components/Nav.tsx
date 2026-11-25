"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, LogoMark, MailIcon, MoonIcon, PhoneIcon, SunIcon, WhatsAppIcon } from "./icons";

const LINKS = [
  { href: "/fleet", label: "Fleet" },
  { href: "/tours", label: "Trips" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];
const MENU_LINKS = [{ href: "/", label: "Home" }, ...LINKS];

export const CONTACT = {
  phone: "+971 50 000 0000",
  tel: "tel:+971500000000",
  email: "mailto:hello@saltmere.example?subject=Charter%20request&body=Hello%20Saltmere%2C",
  whatsapp: "https://www.whatsapp.com/",
  address: "Berth 14, Dubai Marina, Dubai",
};

const EASE = [0.25, 0.8, 0.25, 1] as const;

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/") || (href === "/fleet" && pathname.startsWith("/boat/"));
}

function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" aria-label="Saltmere, home" onClick={onClick} className="flex h-11 items-center gap-[10px] text-accent">
      <LogoMark width={35} height={24} />
      <span className="font-display text-[21px] font-bold leading-[1.2] tracking-[-0.03em] text-fg">Saltmere</span>
    </Link>
  );
}

function ThemeToggle({ compact }: { compact?: boolean }) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
  }, []);
  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("saltmere-theme", next);
    } catch {}
  };
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      className={`grid size-11 place-items-center rounded-[12px] text-fg transition-[background-color] duration-300 hover:bg-fill ${
        compact ? "bg-fill" : "bg-transparent"
      }`}
    >
      {theme === "dark" ? <SunIcon size={20} /> : <MoonIcon size={20} />}
    </button>
  );
}

function Burger({ open, onClick }: { open: boolean; onClick: () => void }) {
  const t = { duration: 0.35, ease: EASE };
  return (
    <button
      type="button"
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      onClick={onClick}
      className="btn-lift relative size-11 rounded-[12px] bg-accent"
      style={{ boxShadow: "var(--shadow-primary)" }}
    >
      <motion.span
        className="absolute left-3 h-[2px] w-5 rounded-[2px] bg-on-accent"
        initial={false}
        animate={open ? { top: 21, rotate: 45 } : { top: 15, rotate: 0 }}
        transition={t}
      />
      <motion.span
        className="absolute left-3 top-[21px] h-[2px] rounded-[2px] bg-on-accent"
        initial={false}
        animate={open ? { width: 0, opacity: 0 } : { width: 12, opacity: 1 }}
        transition={t}
      />
      <motion.span
        className="absolute left-3 h-[2px] w-5 rounded-[2px] bg-on-accent"
        initial={false}
        animate={open ? { top: 21, rotate: -45 } : { top: 27, rotate: 0 }}
        transition={t}
      />
    </button>
  );
}

function GhostFull({ href, icon, label, external }: { href: string; icon: React.ReactNode; label: string; external?: boolean }) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener" } : {})}
      className="btn-ghost btn-lift w-full gap-2 px-3"
    >
      {icon}
      <span>{label}</span>
    </a>
  );
}

export default function Nav() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);

  // close on route change
  useEffect(() => setOpen(false), [pathname]);

  // lock scroll + Escape to close while menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const mq = window.matchMedia("(min-width: 1200px)");
    const onMq = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onMq);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-[10px] z-50 flex justify-center">
      {/* ---------- Desktop (>=1200) ---------- */}
      <div className="hidden w-full flex-col items-center px-9 pt-3 desk:flex">
        <div
          className="pointer-events-auto flex h-[60px] w-full max-w-[980px] items-center justify-between rounded-[20px] bg-glass pl-[22px] pr-2 backdrop-blur-[22px]"
          style={{ boxShadow: "var(--shadow-island)" }}
        >
          <Logo />
          <nav aria-label="Main" className="flex h-11 items-center gap-9">
            {LINKS.map((l) => {
              const active = isActive(pathname, l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={`-mx-4 -my-[11px] inline-block rounded-[12px] px-4 py-[11px] font-sans text-[15px] font-medium leading-[1.2] transition-[color,background-color] duration-300 ease-out-soft hover:bg-fill hover:text-fg ${
                    active ? "bg-fill text-fg" : "text-muted"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-[6px]">
            <ThemeToggle />
            <Link
              href="/fleet"
              className="btn-lift flex h-11 items-center rounded-[12px] bg-accent px-[22px] font-sans text-[15px] font-bold leading-[1.2] tracking-[-0.005em] text-on-accent"
              style={{ boxShadow: "var(--shadow-primary)" }}
            >
              Check dates
            </Link>
          </div>
        </div>
      </div>

      {/* ---------- Compact (<1200) ---------- */}
      <div className="w-full desk:hidden">
        {/* dim overlay behind the sheet */}
        <AnimatePresence>
          {open && (
            <motion.div
              key="overlay"
              className="pointer-events-auto fixed inset-0 -z-10 bg-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              onClick={close}
            />
          )}
        </AnimatePresence>

        {/* menu sheet */}
        <AnimatePresence>
          {open && (
            <motion.div
              key="sheet"
              id="mobile-menu"
              className="pointer-events-auto absolute inset-x-0 top-0 z-[1] flex flex-col items-center gap-9 min-h-[596px] overflow-hidden rounded-b-[28px] bg-bg px-4 pb-7 pt-[112px]"
              initial={{ opacity: 0, clipPath: "inset(0 0 100% 0 round 0 0 28px 28px)" }}
              animate={{ opacity: 1, clipPath: "inset(0 0 0% 0 round 0 0 28px 28px)" }}
              exit={{ opacity: 0, clipPath: "inset(0 0 100% 0 round 0 0 28px 28px)" }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              {/* Reference quirk: labels + actions fade in but stay translated 18px down when open. */}
              <nav aria-label="Menu" className="flex w-full flex-col items-center gap-1">
                {MENU_LINKS.map((l, i) => {
                  const active = isActive(pathname, l.href);
                  return (
                    <div key={l.href} className="relative flex min-h-14 items-center justify-center">
                      <span className="t-eyebrow absolute -left-[26px] top-2">{String(i + 1).padStart(2, "0")}</span>
                      <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 18 }}
                        transition={{ duration: 0.45, delay: 0.12 + i * 0.05, ease: EASE }}
                      >
                        <Link
                          href={l.href}
                          onClick={close}
                          aria-current={active ? "page" : undefined}
                          className={`font-display text-[46.8px] font-medium leading-[1.05] tracking-[-0.04em] transition-colors duration-300 ease-out-soft hover:text-fg min-[390px]:text-[50.7px] tab:text-[72px] ${
                            active ? "text-fg" : "text-muted"
                          }`}
                        >
                          {l.label}
                        </Link>
                      </motion.div>
                    </div>
                  );
                })}
              </nav>
              <motion.div
                className="flex w-full max-w-[560px] flex-col items-center gap-3"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 18 }}
                transition={{ duration: 0.45, delay: 0.12, ease: EASE }}
              >
                <Link href="/fleet" onClick={close} className="btn-primary btn-lift w-full">
                  <span>Check dates</span>
                  <span className="btn-chip">
                    <ArrowRight size={18} />
                  </span>
                </Link>
                <div className="grid w-full grid-cols-3 gap-2">
                  <GhostFull href={CONTACT.whatsapp} external icon={<WhatsAppIcon size={20} />} label="Chat" />
                  <GhostFull href={CONTACT.email} icon={<MailIcon size={20} />} label="Email" />
                  <GhostFull href={CONTACT.tel} icon={<PhoneIcon size={20} />} label="Call" />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* island */}
        <div className="relative z-[2] flex w-full justify-center px-4 pt-7">
          <div
            className="pointer-events-auto flex h-[60px] w-full max-w-[560px] items-center justify-between rounded-[20px] pl-[18px] pr-[7px] transition-[background-color,box-shadow,backdrop-filter] duration-300"
            style={{
              backgroundColor: open ? "transparent" : "var(--glass)",
              boxShadow: open ? "none" : "var(--shadow-island)",
              backdropFilter: open ? "none" : "blur(22px)",
              WebkitBackdropFilter: open ? "none" : "blur(22px)",
            }}
          >
            <Logo onClick={close} />
            <div className="flex items-center gap-[6px]">
              <ThemeToggle compact />
              <Burger open={open} onClick={() => setOpen((o) => !o)} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
