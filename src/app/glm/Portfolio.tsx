"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Counter,
  CustomCursor,
  Magnetic,
  ParticleField,
  Reveal,
  ScrollProgress,
  TiltCard,
  Typewriter,
  useRevealAll,
} from "./effects";
import {
  ABOUT,
  CONTACT,
  EDUCATION,
  EXPERIENCE,
  HERO_TITLES,
  LANGUAGES_SPOKEN,
  NAV,
  PROFILE,
  SKILL_GROUPS,
  SOFT_SKILLS,
  STATS,
  TERMINAL,
  UI,
  type Lang,
} from "./content";
import "./portfolio.css";

/* ---------- inline icons ---------- */
type IconProps = { className?: string; style?: React.CSSProperties };
const I = {
  code: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={p.className}>
      <path d="m8 6-6 6 6 6M16 6l6 6-6 6" />
    </svg>
  ),
  layers: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={p.className}>
      <path d="m12 2 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5" /><path d="m3 17 9 5 9-5" />
    </svg>
  ),
  spark: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={p.className}>
      <path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" />
    </svg>
  ),
  compass: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={p.className}>
      <circle cx="12" cy="12" r="10" /><path d="m16 8-4 8-4-4 8-4Z" />
    </svg>
  ),
  mail: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={p.className}>
      <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 7 10 6 10-6" />
    </svg>
  ),
  phone: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={p.className}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  ),
  github: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={p.className}>
      <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.57.1.78-.25.78-.55v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.79 2.73 1.27 3.4.97.1-.76.41-1.27.74-1.56-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.41-5.25 5.69.42.36.79 1.08.79 2.18v3.23c0 .31.21.66.79.55A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  ),
  linkedin: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={p.className}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  ),
  arrowDown: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={p.className}>
      <path d="M12 5v14M5 12l7 7 7-7" />
    </svg>
  ),
  arrowRight: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={p.className}>
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  ),
  copy: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={p.className}>
      <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  ),
  check: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={p.className}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  ),
  search: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={p.className}>
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
    </svg>
  ),
  close: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={p.className}>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  ),
  menu: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={p.className}>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  globe: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={p.className}>
      <circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" />
    </svg>
  ),
  map: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={p.className}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" /><circle cx="12" cy="10" r="3" />
    </svg>
  ),
  cap: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={p.className}>
      <path d="M22 10 12 5 2 10l10 5 10-5Z" /><path d="M6 12v5c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-5" />
    </svg>
  ),
};

const ICONS: Record<string, (p: IconProps) => React.ReactElement> = {
  code: I.code,
  layers: I.layers,
  spark: I.spark,
  compass: I.compass,
};

export default function Portfolio() {
  const [lang, setLang] = useState<Lang>("en");
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  useRevealAll();

  const t = useCallback((en: string, pt: string) => (lang === "en" ? en : pt), [lang]);
  const ui = UI[lang];

  /* active section tracking */
  useEffect(() => {
    const ids = NAV.map((n) => n.id);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  /* command palette hotkey */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
      if (e.key === "Escape") {
        setPaletteOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const scrollTo = useCallback((id: string) => {
    setPaletteOpen(false);
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-clip bg-[#070710] text-zinc-100 antialiased selection:bg-teal-300/30">
      <ScrollProgress />
      <CustomCursor />
      <AmbientBackground />

      <Navbar
        lang={lang}
        setLang={setLang}
        active={active}
        scrollTo={scrollTo}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        openPalette={() => setPaletteOpen(true)}
        ui={ui}
      />

      {paletteOpen && (
        <CommandPalette onClose={() => setPaletteOpen(false)} onSelect={scrollTo} lang={lang} t={t} />
      )}

      <Hero lang={lang} scrollTo={scrollTo} t={t} ui={ui} />
      <About lang={lang} />
      <Skills lang={lang} />
      <Experience lang={lang} />
      <Education lang={lang} />
      <Contact lang={lang} t={t} />
      <Footer lang={lang} />

      {/* mobile menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-[55] md:hidden">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            style={{ animation: "glm-fade-in 0.2s ease" }}
            onClick={() => setMenuOpen(false)}
          />
          <nav
            className="glm-glass absolute right-0 top-0 flex h-full w-72 flex-col gap-1 p-6 pt-24"
            style={{ animation: "glm-fade-up 0.3s ease" }}
          >
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className={`rounded-lg px-4 py-3 text-left text-base font-medium transition ${
                  active === n.id ? "bg-white/10 text-teal-300" : "text-zinc-300 hover:bg-white/5"
                }`}
              >
                {n[lang]}
              </button>
            ))}
          </nav>
        </div>
      )}
    </main>
  );
}

/* ================================================================== */
/* Ambient background                                                  */
/* ================================================================== */
function AmbientBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="glm-grid-bg absolute inset-0 opacity-60"
        style={{ animation: "glm-grid-pan 22s linear infinite" }}
      />
      <div
        className="glm-aurora-el absolute -left-40 -top-40 h-[42rem] w-[42rem] rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, #5eead4, transparent 60%)", animation: "glm-aurora 26s ease-in-out infinite" }}
      />
      <div
        className="glm-aurora-el absolute -right-40 top-20 h-[38rem] w-[38rem] rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #a78bfa, transparent 60%)", animation: "glm-aurora 32s ease-in-out infinite reverse" }}
      />
      <div
        className="glm-aurora-el absolute bottom-0 left-1/3 h-[34rem] w-[34rem] rounded-full opacity-15 blur-3xl"
        style={{ background: "radial-gradient(circle, #22d3ee, transparent 60%)", animation: "glm-aurora 30s ease-in-out infinite" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_30%,#070710_85%)]" />
    </div>
  );
}

/* ================================================================== */
/* Navbar                                                              */
/* ================================================================== */
function Navbar({
  lang,
  setLang,
  active,
  scrollTo,
  menuOpen,
  setMenuOpen,
  openPalette,
  ui,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
  active: string;
  scrollTo: (id: string) => void;
  menuOpen: boolean;
  setMenuOpen: (o: boolean) => void;
  openPalette: () => void;
  ui: (typeof UI)[Lang];
}) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-white/8 bg-[#070710]/80 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <button onClick={() => scrollTo("home")} className="group flex items-center gap-2.5" data-cursor="hover">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-teal-300 to-violet-400 text-sm font-bold text-[#070710] shadow-lg shadow-teal-500/20">
            MM
          </span>
          <span className="hidden text-sm font-semibold tracking-tight text-zinc-200 sm:block">
            Murilo<span className="text-teal-300">.</span>
          </span>
        </button>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => scrollTo(n.id)}
              data-cursor="hover"
              data-active={active === n.id}
              className="glm-underline-link rounded-md px-3 py-2 text-sm font-medium text-zinc-400 transition hover:text-zinc-100"
            >
              {n[lang]}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={openPalette}
            data-cursor="hover"
            className="hidden items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-400 transition hover:border-white/25 hover:text-zinc-200 lg:flex"
            aria-label={ui.commandTitle}
          >
            <I.search className="h-3.5 w-3.5" />
            <span className="hidden xl:inline">{ui.commandTitle}</span>
            <kbd className="rounded border border-white/15 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-zinc-400">
              {ui.commandKeys}
            </kbd>
          </button>

          <button
            onClick={() => setLang(lang === "en" ? "pt" : "en")}
            data-cursor="hover"
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-semibold text-zinc-300 transition hover:border-teal-300/50 hover:text-teal-200"
            aria-label="Switch language"
          >
            <I.globe className="h-3.5 w-3.5" />
            {ui.langLabel}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            data-cursor="hover"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-300 md:hidden"
            aria-label={menuOpen ? ui.closeMenu : ui.openMenu}
          >
            {menuOpen ? <I.close className="h-4 w-4" /> : <I.menu className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}

/* ================================================================== */
/* Command palette                                                     */
/* ================================================================== */
function CommandPalette({
  onClose,
  onSelect,
  lang,
  t,
}: {
  onClose: () => void;
  onSelect: (id: string) => void;
  lang: Lang;
  t: (en: string, pt: string) => string;
}) {
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const id = setTimeout(() => inputRef.current?.focus(), 30);
    return () => clearTimeout(id);
  }, []);

  const results = useMemo(() => {
    const all = NAV.map((n) => ({ id: n.id, label: n[lang] }));
    if (!q.trim()) return all;
    return all.filter((r) => r.label.toLowerCase().includes(q.toLowerCase()));
  }, [q, lang]);

  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[18vh]">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" style={{ animation: "glm-fade-in 0.2s ease" }} onClick={onClose} />
      <div
        className="glm-glass glm-scroll relative w-full max-w-lg overflow-hidden rounded-2xl shadow-2xl"
        style={{ animation: "glm-fade-scale 0.22s cubic-bezier(0.22,1,0.36,1)" }}
      >
        <div className="flex items-center gap-3 border-b border-white/10 px-4">
          <I.search className="h-4 w-4 text-zinc-500" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("Jump to a section…", "Ir para uma seção…")}
            className="h-14 flex-1 bg-transparent text-sm text-zinc-100 outline-none placeholder:text-zinc-500"
          />
          <kbd className="rounded border border-white/15 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-zinc-400">ESC</kbd>
        </div>
        <div className="max-h-72 overflow-y-auto glm-scroll p-2">
          {results.length === 0 && (
            <p className="px-3 py-6 text-center text-sm text-zinc-500">{t("No results", "Sem resultados")}</p>
          )}
          {results.map((r) => (
            <button
              key={r.id}
              onClick={() => onSelect(r.id)}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm text-zinc-300 transition hover:bg-white/8 hover:text-zinc-100"
            >
              <span className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white/5 text-[10px] font-bold text-teal-300">
                  {r.label.charAt(0)}
                </span>
                {r.label}
              </span>
              <I.arrowRight className="h-3.5 w-3.5 text-zinc-600" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/* Hero                                                                */
/* ================================================================== */
function Hero({
  lang,
  scrollTo,
  t,
  ui,
}: {
  lang: Lang;
  scrollTo: (id: string) => void;
  t: (en: string, pt: string) => string;
  ui: (typeof UI)[Lang];
}) {
  return (
    <section id="home" className="relative flex min-h-screen items-center pt-24 pb-16">
      <div className="absolute inset-0 -z-[1]">
        <ParticleField />
      </div>

      <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="glm-reveal">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-300/30 bg-teal-300/5 px-3 py-1.5 text-xs font-medium text-teal-200">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-teal-300" style={{ animation: "glm-ping-ring 1.8s ease-out infinite" }} />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-300" style={{ animation: "glm-pulse-dot 2s ease-in-out infinite" }} />
            </span>
            {ui.available}
          </div>

          <h1 className="mt-6 text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            <span className="block text-zinc-500 text-base font-medium uppercase tracking-[0.25em] mb-3">
              {PROFILE.role}
            </span>
            <span className="block glm-gradient-text">{PROFILE.firstName}</span>
            <span className="block glm-gradient-text">{PROFILE.lastName}</span>
          </h1>

          <div className="mt-6 flex min-h-[2.2rem] items-center text-lg font-medium text-zinc-300 sm:text-xl">
            <span className="text-teal-300">{"// "}</span>
            <Typewriter words={HERO_TITLES[lang]} className="ml-2 text-zinc-100" />
          </div>

          <p className="mt-6 max-w-xl text-base leading-7 text-zinc-400">
            {lang === "en"
              ? "Computer Science student (7th semester) at UNIFEI. I build fullstack apps, ship Python automations to production and deploy on AWS — ready for international teams."
              : "Estudante de Ciência da Computação (7º período) na UNIFEI. Construo apps fullstack, coloco automações Python em produção e faço deploy na AWS — pronto para times internacionais."}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Magnetic strength={0.35}>
              <button
                onClick={() => scrollTo("contact")}
                data-cursor="hover"
                className="group inline-flex h-12 items-center gap-2 rounded-xl bg-gradient-to-r from-teal-300 to-cyan-400 px-6 text-sm font-semibold text-[#070710] shadow-lg shadow-teal-500/25 transition hover:shadow-teal-400/40"
              >
                {t("Let's build together", "Vamos construir juntos")}
                <I.arrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </button>
            </Magnetic>
            <Magnetic strength={0.25}>
              <button
                onClick={() => scrollTo("experience")}
                data-cursor="hover"
                className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/12 bg-white/5 px-6 text-sm font-semibold text-zinc-200 transition hover:border-white/30 hover:bg-white/10"
              >
                {t("See experience", "Ver experiência")}
              </button>
            </Magnetic>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-zinc-500">
            <span className="inline-flex items-center gap-1.5"><I.map className="h-3.5 w-3.5 text-teal-300/70" />{PROFILE.location}</span>
            <span className="inline-flex items-center gap-1.5"><I.cap className="h-3.5 w-3.5 text-teal-300/70" />{PROFILE.roleNote[lang]} · {PROFILE.period[lang]}</span>
            <a href={PROFILE.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 transition hover:text-zinc-200" data-cursor="hover">
              <I.github className="h-3.5 w-3.5 text-teal-300/70" />{PROFILE.github}
            </a>
          </div>
        </div>

        {/* terminal */}
        <div className="glm-reveal" style={{ ["--reveal-delay" as string]: "120ms" }}>
          <Terminal lang={lang} ui={ui} />
        </div>
      </div>

      <button
        onClick={() => scrollTo("about")}
        data-cursor="hover"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-zinc-500 transition hover:text-teal-300 md:flex"
        aria-label={ui.scrollDown}
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">{ui.scrollDown}</span>
        <I.arrowDown className="h-4 w-4" style={{ animation: "glm-caret 1.6s ease-in-out infinite" }} />
      </button>
    </section>
  );
}

/* ================================================================== */
/* Terminal                                                            */
/* ================================================================== */
function Terminal({ lang, ui }: { lang: Lang; ui: (typeof UI)[Lang] }) {
  const lines = TERMINAL[lang];
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    const line = lines[step];
    if (typed.length < line.cmd.length) {
      const to = setTimeout(() => setTyped(line.cmd.slice(0, typed.length + 1)), 55);
      return () => clearTimeout(to);
    }
    const next = setTimeout(() => {
      if (step < lines.length - 1) {
        setStep((s) => s + 1);
        setTyped("");
      } else {
        setDone(true);
      }
    }, 700);
    return () => clearTimeout(next);
  }, [typed, step, lines, done]);

  return (
    <TiltCard max={6} className="glm-glass rounded-2xl p-1 shadow-2xl shadow-black/40">
      <div className="rounded-[15px] bg-[#0b0b16]/90">
        <div className="flex items-center gap-2 border-b border-white/8 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-2 font-mono text-xs text-zinc-500">{ui.terminalTitle}: ~</span>
        </div>
        <div className="glm-scroll h-[290px] overflow-y-auto p-4 font-mono text-[13px] leading-relaxed">
          {lines.map((line, idx) => {
            if (idx < step) {
              return (
                <div key={idx} className="mb-1">
                  <div className="text-zinc-600">
                    <span className="text-teal-300">➜</span> <span className="text-violet-300">~</span>{" "}
                    <span className="text-zinc-200">{line.cmd}</span>
                  </div>
                  <div className="pl-1 text-zinc-400">{line.out}</div>
                </div>
              );
            }
            if (idx === step && !done) {
              return (
                <div key={idx} className="mb-1">
                  <div className="text-zinc-600">
                    <span className="text-teal-300">➜</span> <span className="text-violet-300">~</span>{" "}
                    <span className="text-zinc-200">{typed}</span>
                    <span className="ml-0.5 inline-block h-3.5 w-1.5 -translate-y-0.5 bg-teal-300 align-middle" style={{ animation: "glm-blink 1s steps(1) infinite" }} />
                  </div>
                </div>
              );
            }
            if (idx === step && done) {
              return (
                <div key={idx} className="mb-1">
                  <div className="text-zinc-600">
                    <span className="text-teal-300">➜</span> <span className="text-violet-300">~</span>{" "}
                    <span className="text-zinc-200">{line.cmd}</span>
                  </div>
                  <div className="pl-1 text-zinc-400">{line.out}</div>
                </div>
              );
            }
            return null;
          })}
          {done && (
            <div className="text-zinc-600">
              <span className="text-teal-300">➜</span> <span className="text-violet-300">~</span>{" "}
              <span className="ml-0.5 inline-block h-3.5 w-1.5 -translate-y-0.5 bg-teal-300 align-middle" style={{ animation: "glm-blink 1s steps(1) infinite" }} />
            </div>
          )}
        </div>
      </div>
    </TiltCard>
  );
}

/* ================================================================== */
/* Section heading                                                     */
/* ================================================================== */
function SectionHeading({ eyebrow, heading }: { eyebrow: string; heading: string }) {
  return (
    <div className="glm-reveal mb-12 max-w-2xl">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-teal-300">{eyebrow}</p>
      <h2 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl lg:text-[2.75rem]">{heading}</h2>
    </div>
  );
}

/* ================================================================== */
/* About                                                               */
/* ================================================================== */
function About({ lang }: { lang: Lang }) {
  const a = ABOUT[lang];
  return (
    <section id="about" className="relative mx-auto w-full max-w-6xl px-5 py-24 sm:px-8">
      <SectionHeading eyebrow={a.eyebrow} heading={a.heading} />
      <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-start">
        <p className="glm-reveal text-lg leading-8 text-zinc-300">{a.body}</p>
        <div className="grid gap-3">
          {a.points.map((p, i) => (
            <TiltCard key={p.title} max={4} className="glm-reveal glm-glass rounded-xl p-5" >
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-teal-300/15 text-teal-300">
                  <I.check className="h-4 w-4" />
                </span>
                <div>
                  <h3 className="font-semibold text-zinc-100">{p.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-zinc-400">{p.text}</p>
                </div>
              </div>
              <span className="pointer-events-none absolute right-4 top-4 font-mono text-xs text-zinc-700">0{i + 1}</span>
            </TiltCard>
          ))}
        </div>
      </div>

      {/* stats */}
      <div className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {STATS.map((s, i) => (
          <div
            key={i}
            className="glm-reveal glm-glass rounded-xl p-5 text-center"
            style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
          >
            <div className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
              <Counter value={s.value} suffix={s.suffix} />
            </div>
            <div className="mt-1 text-sm font-semibold text-teal-300">{s[lang].label}</div>
            <div className="text-xs text-zinc-500">{s[lang].sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ================================================================== */
/* Skills                                                              */
/* ================================================================== */
function Skills({ lang }: { lang: Lang }) {
  const [active, setActive] = useState(0);
  return (
    <section id="skills" className="relative mx-auto w-full max-w-6xl px-5 py-24 sm:px-8">
      <div className="glm-reveal mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-teal-300">
        {lang === "en" ? "Skills" : "Habilidades"}
      </div>
      <h2 className="glm-reveal mb-12 max-w-2xl text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl lg:text-[2.75rem]">
        {lang === "en" ? "A stack I actually ship with." : "Uma stack que eu realmente entrego."}
      </h2>

      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        {/* group selector + list */}
        <div className="flex flex-col gap-2">
          {SKILL_GROUPS.map((g, i) => {
            const Icon = ICONS[g.icon];
            const isActive = i === active;
            return (
              <Reveal
                key={g.key}
                as="button"
                delay={i * 70}
                onClick={() => setActive(i)}
                data-cursor="hover"
                className={`group relative overflow-hidden rounded-xl border p-4 text-left transition-all ${
                  isActive
                    ? "border-teal-300/40 bg-teal-300/5"
                    : "border-white/8 bg-white/[0.02] hover:border-white/20"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-lg transition ${
                      isActive ? "bg-teal-300/20 text-teal-300" : "bg-white/5 text-zinc-400"
                    }`}
                  >
                    {Icon && <Icon className="h-5 w-5" />}
                  </span>
                  <div>
                    <div className={`font-semibold ${isActive ? "text-zinc-50" : "text-zinc-200"}`}>{g[lang].title}</div>
                    <div className="text-xs text-zinc-500">{g[lang].sub}</div>
                  </div>
                  <I.arrowRight
                    className={`ml-auto h-4 w-4 transition ${
                      isActive ? "translate-x-0 text-teal-300" : "-translate-x-1 text-zinc-600 opacity-0 group-hover:opacity-100"
                    }`}
                  />
                </div>
                {isActive && (
                  <span
                    className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-teal-300 to-cyan-400"
                  />
                )}
              </Reveal>
            );
          })}
        </div>

        {/* active group chips + languages bars */}
        <div className="glm-glass rounded-2xl p-6 sm:p-8">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-zinc-50">{SKILL_GROUPS[active][lang].title}</h3>
            <span className="font-mono text-xs text-zinc-500">{SKILL_GROUPS[active].items.length} {lang === "en" ? "items" : "itens"}</span>
          </div>
          <div className="flex flex-wrap gap-2" key={active} style={{ animation: "glm-fade-up 0.4s ease" }}>
            {SKILL_GROUPS[active].items.map((item) => (
              <span key={item} className="glm-chip" data-cursor="hover">
                <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-teal-300 to-violet-400" />
                {item}
              </span>
            ))}
          </div>

          <div className="my-7 h-px bg-white/8" />

          {/* spoken languages */}
          <h4 className="mb-4 text-sm font-semibold text-zinc-300">
            {lang === "en" ? "Spoken languages" : "Idiomas"}
          </h4>
          <div className="space-y-4">
            {LANGUAGES_SPOKEN[lang].map((l) => (
              <div key={l.name}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="font-medium text-zinc-200">{l.name}</span>
                  <span className="text-xs text-teal-300">{l.level}</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/8">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-teal-300 to-violet-400"
                    style={{ width: `${l.pct}%`, animation: "glm-fade-scale 0.8s ease" }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* soft skills marquee-ish row */}
          <div className="my-7 h-px bg-white/8" />
          <h4 className="mb-3 text-sm font-semibold text-zinc-300">
            {lang === "en" ? "How I work" : "Como eu trabalho"}
          </h4>
          <div className="flex flex-wrap gap-2">
            {SOFT_SKILLS[lang].map((s) => (
              <span key={s} className="glm-chip" data-cursor="hover">{s}</span>
            ))}
          </div>
        </div>
      </div>

      {/* marquee of all tech */}
      <div className="glm-reveal relative mt-16 overflow-hidden py-2 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <div className="glm-marquee gap-8">
          {[...SKILL_GROUPS[0].items, ...SKILL_GROUPS[1].items, ...SKILL_GROUPS[3].items].concat(
            [...SKILL_GROUPS[0].items, ...SKILL_GROUPS[1].items, ...SKILL_GROUPS[3].items]
          ).map((s, i) => (
            <span key={i} className="flex items-center gap-2 whitespace-nowrap text-sm font-medium text-zinc-600">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-300/50" />
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* Experience                                                          */
/* ================================================================== */
function Experience({ lang }: { lang: Lang }) {
  return (
    <section id="experience" className="relative mx-auto w-full max-w-6xl px-5 py-24 sm:px-8">
      <div className="glm-reveal mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-teal-300">
        {lang === "en" ? "Experience" : "Experiência"}
      </div>
      <h2 className="glm-reveal mb-14 max-w-2xl text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl lg:text-[2.75rem]">
        {lang === "en" ? "Real systems, running in production." : "Sistemas reais, rodando em produção."}
      </h2>

      <div className="relative">
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-teal-300/60 via-white/15 to-transparent sm:left-1/2" />

        <div className="space-y-10">
          {EXPERIENCE.map((job, i) => {
            const left = i % 2 === 0;
            return (
              <div
                key={job.company}
                className={`relative pl-9 sm:grid sm:grid-cols-2 sm:gap-8 sm:pl-0 ${left ? "" : ""}`}
              >
                {/* node */}
                <span
                  className="absolute left-0 top-2 z-10 flex h-4 w-4 items-center justify-center rounded-full border-2 border-[#070710] sm:left-1/2 sm:-translate-x-1/2"
                  style={{ background: job.accent, boxShadow: `0 0 0 4px ${job.accent}22` }}
                />

                <div
                  className={`glm-reveal sm:col-span-1 ${left ? "sm:col-start-1 sm:text-right sm:pr-12" : "sm:col-start-2 sm:pl-12"}`}
                >
                  <TiltCard max={5} className="glm-glass h-full rounded-2xl p-6">
                    <div className={`flex items-center gap-2 ${left ? "sm:justify-end" : ""}`}>
                      {job.current && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-300/15 px-2.5 py-0.5 text-[11px] font-semibold text-teal-300">
                          <span className="h-1.5 w-1.5 rounded-full bg-teal-300" style={{ animation: "glm-pulse-dot 1.8s infinite" }} />
                          {lang === "en" ? "Current" : "Atual"}
                        </span>
                      )}
                      <span className="text-xs font-medium text-zinc-500">{job.period}</span>
                    </div>
                    <h3 className="mt-2 text-lg font-semibold text-zinc-50">{job.role[lang]}</h3>
                    <div className="mt-0.5 font-medium" style={{ color: job.accent }}>
                      {job.company}
                    </div>
                    <ul className={`mt-4 space-y-2 text-sm leading-6 text-zinc-400 ${left ? "sm:text-right" : ""}`}>
                      {job[lang].map((line, idx) => (
                        <li key={idx} className={left ? "sm:flex sm:flex-row-reverse sm:items-start sm:gap-2" : "flex items-start gap-2"}>
                          <span className="mt-2 h-1 w-3 shrink-0 rounded-full" style={{ background: job.accent }} />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                    <div className={`mt-5 flex flex-wrap gap-1.5 ${left ? "sm:justify-end" : ""}`}>
                      {job.stack.map((s) => (
                        <span key={s} className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-medium text-zinc-300">
                          {s}
                        </span>
                      ))}
                    </div>
                  </TiltCard>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* Education                                                           */
/* ================================================================== */
function Education({ lang }: { lang: Lang }) {
  const e = EDUCATION[lang];
  return (
    <section id="education" className="relative mx-auto w-full max-w-6xl px-5 py-24 sm:px-8">
      <SectionHeading eyebrow={e.eyebrow} heading={e.heading} />
      <TiltCard max={5} className="glm-reveal glm-glass relative overflow-hidden rounded-2xl p-8">
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #a78bfa, transparent 60%)" }}
        />
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-400/20 to-teal-300/20 text-violet-300">
              <I.cap className="h-6 w-6" />
            </span>
            <div>
              <h3 className="text-xl font-semibold text-zinc-50">{e.degree}</h3>
              <p className="mt-1 text-zinc-300">{e.school}</p>
              <p className="mt-1 text-sm text-zinc-500">{e.period}</p>
            </div>
          </div>
          <div className="flex flex-col items-start gap-2 sm:items-end">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-300/15 px-3 py-1 text-xs font-semibold text-teal-300">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-300" style={{ animation: "glm-pulse-dot 1.8s infinite" }} />
              {lang === "en" ? "Active" : "Ativo"}
            </span>
            <p className="max-w-xs text-sm text-zinc-400 sm:text-right">{e.status}</p>
          </div>
        </div>

        {/* progress toward graduation */}
        <div className="relative mt-8">
          <div className="mb-2 flex items-center justify-between text-xs text-zinc-500">
            <span>2023</span>
            <span className="text-teal-300">{lang === "en" ? "7 / 8 semesters" : "7 / 8 períodos"}</span>
            <span>2026</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/8">
            <div
              className="h-full rounded-full bg-gradient-to-r from-teal-300 via-cyan-400 to-violet-400"
              style={{ width: "87.5%", animation: "glm-fade-scale 1s ease" }}
            />
          </div>
        </div>
      </TiltCard>
    </section>
  );
}

/* ================================================================== */
/* Contact                                                             */
/* ================================================================== */
function Contact({ lang, t }: { lang: Lang; t: (en: string, pt: string) => string }) {
  const c = CONTACT[lang];
  const [copied, setCopied] = useState<string | null>(null);
  const copy = (val: string, key: string) => {
    navigator.clipboard?.writeText(val).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(null), 1600);
    });
  };

  const channels = [
    { key: "email", icon: I.mail, label: "Email", value: PROFILE.email, href: `mailto:${PROFILE.email}` },
    { key: "phone", icon: I.phone, label: lang === "en" ? "Phone" : "Telefone", value: PROFILE.phone, href: `tel:${PROFILE.phoneHref}` },
    { key: "github", icon: I.github, label: "GitHub", value: PROFILE.github, href: PROFILE.githubUrl },
    { key: "linkedin", icon: I.linkedin, label: "LinkedIn", value: PROFILE.linkedin, href: PROFILE.linkedinUrl },
  ];

  return (
    <section id="contact" className="relative mx-auto w-full max-w-6xl px-5 py-24 sm:px-8">
      <div className="glm-glass relative overflow-hidden rounded-3xl p-8 sm:p-14">
        <div
          className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full opacity-25 blur-3xl"
          style={{ background: "radial-gradient(circle, #5eead4, transparent 60%)" }}
        />
        <div
          className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #a78bfa, transparent 60%)" }}
        />

        <div className="relative grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div className="glm-reveal">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-teal-300">{c.eyebrow}</p>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl lg:text-5xl">{c.heading}</h2>
            <p className="mt-5 max-w-md text-base leading-7 text-zinc-400">{c.body}</p>

            <Magnetic strength={0.3} className="mt-7">
              <a
                href={`mailto:${PROFILE.email}`}
                data-cursor="hover"
                className="group inline-flex h-12 items-center gap-2 rounded-xl bg-gradient-to-r from-teal-300 to-cyan-400 px-6 text-sm font-semibold text-[#070710] shadow-lg shadow-teal-500/25 transition hover:shadow-teal-400/40"
              >
                <I.mail className="h-4 w-4" />
                {c.cta}
                <I.arrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </a>
            </Magnetic>
          </div>

          <div className="grid gap-2">
            {channels.map((ch) => {
              const Icon = ch.icon;
              return (
                <div
                  key={ch.key}
                  className="group flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.02] p-3.5 transition hover:border-white/20 hover:bg-white/[0.04]"
                  data-cursor="hover"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5 text-teal-300 transition group-hover:bg-teal-300/15">
                    <Icon className="h-5 w-5" />
                  </span>
                  <a href={ch.href} target={ch.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="min-w-0 flex-1">
                    <div className="text-xs text-zinc-500">{ch.label}</div>
                    <div className="truncate text-sm font-medium text-zinc-200">{ch.value}</div>
                  </a>
                  <button
                    onClick={() => copy(ch.value, ch.key)}
                    data-cursor="hover"
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 text-zinc-400 transition hover:border-teal-300/50 hover:text-teal-300"
                    aria-label={c.copy}
                  >
                    {copied === ch.key ? <I.check className="h-4 w-4 text-teal-300" /> : <I.copy className="h-4 w-4" />}
                  </button>
                </div>
              );
            })}
            <p className="mt-1 px-1 text-xs text-zinc-600">
              {copied ? <span className="text-teal-300">✓ {c.copied}</span> : t("Click the icon to copy", "Clique no ícone para copiar")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* Footer                                                              */
/* ================================================================== */
function Footer({ lang }: { lang: Lang }) {
  return (
    <footer className="border-t border-white/8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 py-10 text-center sm:px-8 md:flex-row md:justify-between md:text-left">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-teal-300 to-violet-400 text-xs font-bold text-[#070710]">
            MM
          </span>
          <div>
            <p className="text-sm font-semibold text-zinc-200">{PROFILE.name}</p>
            <p className="text-xs text-zinc-500">
              {UI[lang].builtWith} · {new Date().getFullYear()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a href={PROFILE.githubUrl} target="_blank" rel="noreferrer" className="text-zinc-500 transition hover:text-teal-300" data-cursor="hover" aria-label="GitHub">
            <I.github className="h-5 w-5" />
          </a>
          <a href={PROFILE.linkedinUrl} target="_blank" rel="noreferrer" className="text-zinc-500 transition hover:text-teal-300" data-cursor="hover" aria-label="LinkedIn">
            <I.linkedin className="h-5 w-5" />
          </a>
          <a href={`mailto:${PROFILE.email}`} className="text-zinc-500 transition hover:text-teal-300" data-cursor="hover" aria-label="Email">
            <I.mail className="h-5 w-5" />
          </a>
        </div>
        <Link
          href="/"
          className="text-xs font-medium text-zinc-500 transition hover:text-teal-300"
          data-cursor="hover"
        >
          ← {UI[lang].backHome}
        </Link>
      </div>
    </footer>
  );
}
