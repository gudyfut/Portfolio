"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CommandPalette, type PaletteAction } from "./command-palette";
import { DICT, LINKS, SECTION_IDS, type Dict, type Lang, type LayerId } from "./content";
import { IntegrationMap, SystemDiagram } from "./diagrams";
import {
  useActiveSection,
  useBodyLock,
  useLocalTime,
  useMounted,
  usePrefersReducedMotion,
  useRevealScope,
  useScrollProgress,
  useSpotlight,
  useTyper,
} from "./hooks";
import { Ic } from "./icons";
import "./portfolio.css";

/* ------------------------------------------------------------------ */
/* Small pieces                                                        */
/* ------------------------------------------------------------------ */

function SectionHead({
  stage,
  note,
  title,
  lead,
  headingId,
}: {
  stage: string;
  note: string;
  title: string;
  lead?: string;
  headingId: string;
}) {
  return (
    <header className="cl-shead cl-rev">
      <div className="cl-shead-row">
        <span className="cl-stage">{stage}</span>
        <span className="cl-shead-line" aria-hidden="true" />
        <span className="cl-snote">{note}</span>
      </div>
      <h2 id={headingId}>{title}</h2>
      {lead && <p className="cl-lead">{lead}</p>}
    </header>
  );
}

function Terminal({ hero, reduced }: { hero: Dict["hero"]; reduced: boolean }) {
  const mounted = useMounted();
  const { lines, partial, finished } = useTyper(hero.termLines, mounted, reduced);
  return (
    <div className="cl-term" role="img" aria-label={hero.termAria}>
      <div className="cl-term-bar">
        <span className="cl-term-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="cl-term-title">{hero.termTitle}</span>
        <span className="cl-term-badge">
          <i className="cl-livedot" aria-hidden="true" />
          {hero.termBadge}
        </span>
      </div>
      <div className="cl-term-body" aria-hidden="true">
        {lines.map((l, i) => (
          <p key={i} className={`cl-tline ${l.kind}`}>
            {l.kind === "cmd" ? <b>$</b> : l.kind === "ok" ? <b>✓</b> : <b>→</b>}
            <span>{l.text}</span>
          </p>
        ))}
        <p className="cl-tline cmd">
          <b>$</b>
          <span>{finished ? "" : partial}</span>
          <i className="cl-cursor" />
        </p>
      </div>
    </div>
  );
}

function Marquee({ items }: { items: string[] }) {
  const track = (hidden: boolean) => (
    <div className="cl-marq-track" aria-hidden={hidden || undefined}>
      {items.map((s) => (
        <span key={s} className="cl-marq-item">
          {s}
          <i aria-hidden="true">✦</i>
        </span>
      ))}
    </div>
  );
  return (
    <div className="cl-marquee" aria-hidden="true">
      <div className="cl-marq-inner">
        {track(false)}
        {track(true)}
      </div>
    </div>
  );
}

function Rail({
  active,
  names,
  label,
  fillRef,
}: {
  active: string;
  names: string[];
  label: string;
  fillRef: React.RefObject<HTMLSpanElement | null>;
}) {
  const activeIdx = SECTION_IDS.indexOf(active as (typeof SECTION_IDS)[number]);
  return (
    <nav className="cl-rail" aria-label={label}>
      <span className="cl-rail-line" aria-hidden="true">
        <span className="cl-rail-fill" ref={fillRef} />
      </span>
      {SECTION_IDS.map((id, i) => (
        <a
          key={id}
          href={`#${id}`}
          className={`cl-rail-item${i === activeIdx ? " on" : ""}${i < activeIdx ? " past" : ""}`}
          aria-current={i === activeIdx ? "true" : undefined}
        >
          <span className="cl-rail-dot" aria-hidden="true" />
          <span className="cl-rail-lab">{names[i]}</span>
        </a>
      ))}
    </nav>
  );
}

function LocalTimeChip({ t }: { t: Dict["contact"] }) {
  const time = useLocalTime(LINKS.timezone);
  return (
    <span className="cl-fact">
      <Ic name="clock" size={14} />
      {t.timeLabel}: <b>{time ?? "--:--"}</b>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Portfolio({ className = "" }: { className?: string }) {
  const [lang, setLang] = useState<Lang>("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [toast, setToast] = useState<{ id: number; text: string } | null>(null);
  const [filter, setFilter] = useState<LayerId | "all">("all");
  const [copied, setCopied] = useState(false);

  const t = DICT[lang];
  const rootRef = useRef<HTMLDivElement>(null);
  const railFillRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useRevealScope(rootRef);
  useSpotlight(rootRef);
  useBodyLock(menuOpen);
  const progressTargets = useMemo(() => [railFillRef, barRef], []);
  const scrolled = useScrollProgress(progressTargets);
  const active = useActiveSection(SECTION_IDS);

  /* language: restore from storage / URL param (deferred so hydration stays clean) */
  useEffect(() => {
    const id = window.setTimeout(() => {
      const param = new URLSearchParams(window.location.search).get("lang");
      if (param === "pt" || param === "en") {
        setLang(param);
        return;
      }
      const saved = window.localStorage.getItem("cl-lang");
      if (saved === "pt" || saved === "en") setLang(saved);
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  const switchLang = useCallback((next: Lang) => {
    setLang(next);
    try {
      window.localStorage.setItem("cl-lang", next);
    } catch {
      /* private mode */
    }
  }, []);

  /* palette hotkey + debug param */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    const id = window.setTimeout(() => {
      if (new URLSearchParams(window.location.search).get("cmdk") === "1") {
        setPaletteOpen(true);
      }
    }, 0);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(id);
    };
  }, []);

  /* console easter egg */
  const egged = useRef(false);
  useEffect(() => {
    if (egged.current) return;
    egged.current = true;
    console.log(
      "%c☕ murilo monferrari %c fullstack · automation · aws \n%c→ murilorfm@gmail.com · github.com/gudyfut",
      "background:#ecaa54;color:#1c1207;font-weight:bold;padding:3px 8px;border-radius:4px 0 0 4px",
      "background:#1d1610;color:#f4eee4;padding:3px 8px;border-radius:0 4px 4px 0",
      "color:#b8ad9c;padding:4px 0",
    );
  }, []);

  const showToast = useCallback((text: string) => {
    setToast({ id: Date.now(), text });
  }, []);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(id);
  }, [toast]);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(LINKS.email);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = LINKS.email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    showToast(DICT[lang].toasts.copied);
  }, [lang, showToast]);

  const scrollToId = useCallback(
    (id: string) => {
      document.getElementById(id)?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
    },
    [reduced],
  );

  const paletteActions = useMemo<PaletteAction[]>(
    () => [
      { id: "top", group: "nav", icon: "home", label: t.palette.items.top, keywords: "home start hero inicio", run: () => scrollToId("top") },
      { id: "about", group: "nav", icon: "compass", label: t.palette.items.about, keywords: "about sobre bio education unifei", run: () => scrollToId("about") },
      { id: "xp", group: "nav", icon: "zap", label: t.palette.items.xp, keywords: "work jobs experience simcafe golden experiencia", run: () => scrollToId("experience") },
      { id: "stack", group: "nav", icon: "layers", label: t.palette.items.stack, keywords: "skills tools stack tecnologias", run: () => scrollToId("stack") },
      { id: "contact", group: "nav", icon: "mail", label: t.palette.items.contact, keywords: "contact email hire contato", run: () => scrollToId("contact") },
      { id: "copy", group: "act", icon: "copy", label: t.palette.items.copyEmail, keywords: "copy email clipboard copiar", run: copyEmail },
      { id: "lang", group: "act", icon: "globe", label: t.palette.items.switchLang, keywords: "language idioma portugues english translate", run: () => switchLang(lang === "en" ? "pt" : "en") },
      {
        id: "print",
        group: "act",
        icon: "printer",
        label: t.palette.items.print,
        keywords: "print pdf resume cv curriculo imprimir",
        run: () => {
          showToast(DICT[lang].toasts.print);
          setTimeout(() => window.print(), 400);
        },
      },
      { id: "coffee", group: "act", icon: "coffee", label: t.palette.items.coffee, keywords: "coffee cafe brew easter egg", run: () => showToast(DICT[lang].toasts.coffee) },
      { id: "gh", group: "link", icon: "github", label: t.palette.items.github, keywords: "github code repos gudyfut", run: () => window.open(LINKS.github, "_blank", "noopener,noreferrer") },
      { id: "li", group: "link", icon: "linkedin", label: t.palette.items.linkedin, keywords: "linkedin profile perfil", run: () => window.open(LINKS.linkedin, "_blank", "noopener,noreferrer") },
      { id: "mailto", group: "link", icon: "mail", label: t.palette.items.sendEmail, keywords: "email mail write escrever", run: () => window.open(LINKS.mailto, "_self") },
      { id: "bench", group: "link", icon: "terminal", label: t.palette.items.benchmark, keywords: "benchmark home gpt glm claude", run: () => window.location.assign("/") },
    ],
    [t, lang, copyEmail, scrollToId, showToast, switchLang],
  );

  const navigate = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    scrollToId(id);
  };

  return (
    <div ref={rootRef} className={`cl ${className}`} lang={lang === "pt" ? "pt-BR" : "en"}>
      <a className="cl-skip" href="#about">
        {t.a11y.skip}
      </a>
      <div className="cl-noise" aria-hidden="true" />
      <div className="cl-orb cl-orb-a" aria-hidden="true" />
      <div className="cl-orb cl-orb-b" aria-hidden="true" />
      <div className="cl-bar" ref={barRef} aria-hidden="true">
        <span />
      </div>

      {/* ---------------------------------------------------- nav --- */}
      <header className={`cl-nav${scrolled || menuOpen ? " scrolled" : ""}`}>
        <div className="cl-nav-in">
          <a href="#top" className="cl-logo" onClick={navigate("top")} aria-label="Murilo Monferrari — top">
            <span className="cl-logo-mark" aria-hidden="true">
              mm
            </span>
            <span className="cl-logo-txt">
              murilo<b>.monferrari</b>
            </span>
          </a>

          <nav className="cl-nav-links" aria-label={t.a11y.navLabel}>
            {t.nav.links.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={navigate(l.id)}
                className={active === l.id ? "on" : ""}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="cl-nav-tools">
            <div className="cl-langsw" role="group" aria-label={t.a11y.langLabel}>
              <button type="button" aria-pressed={lang === "en"} onClick={() => switchLang("en")}>
                EN
              </button>
              <button type="button" aria-pressed={lang === "pt"} onClick={() => switchLang("pt")}>
                PT
              </button>
            </div>
            <button
              type="button"
              className="cl-cmdbtn"
              onClick={() => setPaletteOpen(true)}
              aria-label={t.nav.paletteLabel}
              title={t.nav.paletteLabel}
            >
              <Ic name="command" size={13} />
              <span>K</span>
            </button>
            <button
              type="button"
              className="cl-burger"
              aria-expanded={menuOpen}
              aria-controls="cl-menu"
              aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
              onClick={() => setMenuOpen((o) => !o)}
            >
              <Ic name={menuOpen ? "x" : "menu"} size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* -------------------------------------------- mobile menu --- */}
      <div id="cl-menu" className={`cl-menu${menuOpen ? " open" : ""}`} inert={!menuOpen}>
        <nav aria-label={t.a11y.navLabel}>
          {t.nav.links.map((l, i) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={navigate(l.id)}
              style={{ "--d": `${i * 60}ms` } as React.CSSProperties}
            >
              <span className="cl-menu-idx">0{i + 1}</span>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="cl-menu-foot">
          <div className="cl-langsw" role="group" aria-label={t.a11y.langLabel}>
            <button type="button" aria-pressed={lang === "en"} onClick={() => switchLang("en")}>
              EN
            </button>
            <button type="button" aria-pressed={lang === "pt"} onClick={() => switchLang("pt")}>
              PT
            </button>
          </div>
          <div className="cl-menu-social">
            <a href={LINKS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Ic name="github" size={20} />
            </a>
            <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Ic name="linkedin" size={20} />
            </a>
            <a href={LINKS.mailto} aria-label="Email">
              <Ic name="mail" size={20} />
            </a>
          </div>
        </div>
      </div>

      <main>
        {/* ------------------------------------------------ hero --- */}
        <section id="top" className="cl-hero" aria-label={t.a11y.heroLabel}>
          <div className="cl-hero-bg" aria-hidden="true" />
          <div className="cl-wrap cl-hero-grid">
            <div className="cl-hero-copy">
              <p className="cl-avail cl-e" style={{ "--d": "0ms" } as React.CSSProperties}>
                <i className="cl-livedot" aria-hidden="true" />
                {t.hero.avail}
              </p>
              <h1 className="cl-e" style={{ "--d": "80ms" } as React.CSSProperties}>
                <span className="cl-name-a">Murilo</span>
                <span className="cl-name-b">Monferrari</span>
              </h1>
              <p className="cl-role cl-e" style={{ "--d": "170ms" } as React.CSSProperties}>
                {t.hero.role}
              </p>
              <p className="cl-intro cl-e" style={{ "--d": "240ms" } as React.CSSProperties}>
                {t.hero.intro}
              </p>
              <div className="cl-ctas cl-e" style={{ "--d": "310ms" } as React.CSSProperties}>
                <a href="#experience" className="cl-btn cl-btn-solid" onClick={navigate("experience")}>
                  {t.hero.ctaWork}
                  <Ic name="down" size={16} />
                </a>
                <button type="button" className="cl-btn cl-btn-ghost" onClick={copyEmail}>
                  <Ic name={copied ? "check" : "copy"} size={16} />
                  {t.hero.ctaEmail}
                </button>
                <button type="button" className="cl-hero-kbd" onClick={() => setPaletteOpen(true)}>
                  <kbd className="cl-kbd">ctrl</kbd>
                  <kbd className="cl-kbd">K</kbd>
                  <span>{t.hero.kbdHint}</span>
                </button>
              </div>
              <div className="cl-stats cl-e" style={{ "--d": "390ms" } as React.CSSProperties}>
                {t.hero.stats.map(([v, l]) => (
                  <div key={l} className="cl-stat">
                    <span className="cl-stat-v">{v}</span>
                    <span className="cl-stat-l">{l}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="cl-hero-side cl-e" style={{ "--d": "300ms" } as React.CSSProperties}>
              <Terminal hero={t.hero} reduced={reduced} />
            </div>
          </div>
        </section>

        <Marquee items={t.marquee} />

        {/* ----------------------------------------------- about --- */}
        <section id="about" className="cl-section" aria-labelledby="cl-h-about">
          <div className="cl-wrap">
            <SectionHead
              stage={t.about.stage}
              note={t.about.note}
              title={t.about.title}
              headingId="cl-h-about"
            />
            <div className="cl-about-grid">
              <div className="cl-about-main cl-rev">
                <p className="cl-body-lg">{t.about.body}</p>
                <div className="cl-langrow">
                  <span className="cl-langrow-label">{t.about.langsLabel}</span>
                  {t.about.langs.map((l) => (
                    <span key={l.label} className="cl-langchip">
                      <Ic name="globe" size={14} />
                      {l.label} — <b>{l.level}</b>
                    </span>
                  ))}
                </div>
                <div className="cl-traits">
                  {t.about.traits.map((tr, i) => (
                    <article
                      key={tr.title}
                      className="cl-trait cl-spot cl-rev"
                      style={{ "--d": `${i * 70}ms` } as React.CSSProperties}
                    >
                      <Ic name={tr.icon} size={18} className="cl-trait-ic" />
                      <h3>{tr.title}</h3>
                      <p>{tr.desc}</p>
                    </article>
                  ))}
                </div>
              </div>

              <aside className="cl-edu cl-spot cl-rev" style={{ "--d": "120ms" } as React.CSSProperties}>
                <p className="cl-edu-label">
                  <Ic name="cap" size={16} />
                  {t.about.eduLabel}
                </p>
                <h3>{t.about.degree}</h3>
                <p className="cl-edu-school">{t.about.school}</p>
                <p className="cl-edu-period">{t.about.period}</p>
                <span className="cl-status">
                  <i className="cl-livedot" aria-hidden="true" />
                  {t.about.status}
                </span>
                <div className="cl-progress" role="img" aria-label={t.about.progressLabel}>
                  <span className="cl-progress-track" aria-hidden="true">
                    <span className="cl-progress-fill" />
                  </span>
                  <span className="cl-progress-label">{t.about.progressLabel}</span>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* ------------------------------------------ experience --- */}
        <section id="experience" className="cl-section cl-section-alt" aria-labelledby="cl-h-xp">
          <div className="cl-wrap">
            <SectionHead
              stage={t.xp.stage}
              note={t.xp.note}
              title={t.xp.title}
              lead={t.xp.lead}
              headingId="cl-h-xp"
            />
            <div className="cl-xps">
              {t.xp.jobs.map((job, i) => (
                <article key={job.company} className="cl-xp cl-rev">
                  <div className="cl-xp-head">
                    <span className="cl-xp-idx" aria-hidden="true">
                      {job.idx}
                    </span>
                    <div className="cl-xp-title">
                      <h3>{job.role}</h3>
                      <p>
                        <b>{job.company}</b> · {job.kind}
                      </p>
                    </div>
                    <span className={`cl-xp-period${job.live ? " live" : ""}`}>
                      {job.live && <i className="cl-livedot" aria-hidden="true" />}
                      {job.period}
                    </span>
                  </div>
                  <div className={`cl-xp-body${i % 2 === 1 ? " flip" : ""}`}>
                    <div className="cl-xp-text">
                      <p className="cl-xp-desc">{job.desc}</p>
                      <p className="cl-xp-scope">
                        <span>{job.scopeLabel}</span>
                        {job.scope}
                      </p>
                      <div className="cl-tags">
                        {job.tags.map((tag) => (
                          <span key={tag} className="cl-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <figure className="cl-xp-visual">
                      {i === 0 ? (
                        <SystemDiagram t={t.xp.diagram} reduced={reduced} />
                      ) : (
                        <IntegrationMap t={t.xp.hub} />
                      )}
                      <figcaption>{job.visualCaption}</figcaption>
                    </figure>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ----------------------------------------------- stack --- */}
        <section id="stack" className="cl-section" aria-labelledby="cl-h-stack">
          <div className="cl-wrap">
            <SectionHead
              stage={t.stack.stage}
              note={t.stack.note}
              title={t.stack.title}
              lead={t.stack.lead}
              headingId="cl-h-stack"
            />
            <div className="cl-filters cl-rev">
              <span className="cl-filters-hint">{t.stack.filterHint}</span>
              <div className="cl-filters-row" role="group" aria-label={t.stack.filterHint}>
                {t.stack.filters.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    aria-pressed={filter === f.id}
                    className={filter === f.id ? "on" : ""}
                    onClick={() => setFilter(f.id)}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="cl-stackgrid" data-filter={filter}>
              {t.stack.groups.map((g, i) => (
                <section
                  key={g.id}
                  className="cl-skillcard cl-spot cl-rev"
                  style={{ "--d": `${i * 70}ms` } as React.CSSProperties}
                  aria-label={g.title}
                >
                  <header>
                    <Ic name={g.icon} size={17} className="cl-skillcard-ic" />
                    <h3>{g.title}</h3>
                    <span className="cl-count">{String(g.chips.length).padStart(2, "0")}</span>
                  </header>
                  <div className="cl-chips">
                    {g.chips.map((c) => (
                      <span key={c.label} className="cl-chip" data-tags={c.tags?.join(" ") ?? ""}>
                        {c.label}
                      </span>
                    ))}
                  </div>
                  {g.note && <p className="cl-skillnote">{g.note}</p>}
                </section>
              ))}
            </div>
          </div>
        </section>

        {/* --------------------------------------------- contact --- */}
        <section id="contact" className="cl-section cl-section-alt cl-contact" aria-labelledby="cl-h-contact">
          <div className="cl-wrap">
            <header className="cl-shead cl-contact-head cl-rev">
              <div className="cl-shead-row">
                <span className="cl-stage">{t.contact.stage}</span>
                <span className="cl-shead-line" aria-hidden="true" />
                <span className="cl-snote">{t.contact.note}</span>
              </div>
              <h2 id="cl-h-contact">{t.contact.title}</h2>
              <p className="cl-lead">{t.contact.lead}</p>
              <p className="cl-avail">
                <i className="cl-livedot" aria-hidden="true" />
                {t.contact.avail}
              </p>
            </header>

            <div className="cl-contact-grid cl-rev">
              {t.contact.cards.map((c) => (
                <a
                  key={c.id}
                  className="cl-ccard cl-spot"
                  href={c.href}
                  {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <Ic name={c.icon} size={19} className="cl-ccard-ic" />
                  <span className="cl-ccard-label">{c.label}</span>
                  <span className="cl-ccard-value">{c.value}</span>
                  <Ic name="up-right" size={15} className="cl-ccard-arrow" />
                </a>
              ))}
            </div>

            <div className="cl-contact-actions cl-rev">
              <a href={LINKS.mailto} className="cl-btn cl-btn-solid">
                <Ic name="mail" size={16} />
                {t.contact.mailCta}
              </a>
              <button type="button" className="cl-btn cl-btn-ghost" onClick={copyEmail}>
                <Ic name={copied ? "check" : "copy"} size={16} />
                {t.contact.copyBtn}
              </button>
            </div>

            <div className="cl-facts cl-rev">
              <span className="cl-fact">
                <Ic name="pin" size={14} />
                {t.contact.loc}
              </span>
              <LocalTimeChip t={t.contact} />
              <span className="cl-fact">
                <Ic name="chat" size={14} />
                {t.contact.replies}
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* -------------------------------------------------- footer --- */}
      <footer className="cl-footer">
        <div className="cl-wrap cl-footer-in">
          <p>{t.footer.rights}</p>
          <p className="cl-footer-credit">
            <Link href="/">{t.footer.credit}</Link>
          </p>
          <a href="#top" onClick={navigate("top")} className="cl-back">
            {t.footer.top}
            <Ic name="up-right" size={14} />
          </a>
        </div>
      </footer>

      <Rail active={active} names={t.rail.names} label={t.rail.label} fillRef={railFillRef} />

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        actions={paletteActions}
        t={t.palette}
      />

      {toast && (
        <div key={toast.id} className="cl-toast" role="status">
          {toast.text}
        </div>
      )}
    </div>
  );
}
