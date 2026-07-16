"use client";

import { useEffect, useState, useSyncExternalStore, type RefObject } from "react";
import type { TermLine } from "./content";

const subscribeNever = () => () => {};

export function useMounted(): boolean {
  return useSyncExternalStore(
    subscribeNever,
    () => true,
    () => false,
  );
}

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (cb: () => void) => {
  const mq = window.matchMedia(REDUCED_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(REDUCED_QUERY).matches,
    () => false,
  );
}

/**
 * Marks the root with data-js (so no-JS visitors always see content), then
 * reveals every `.cl-rev` descendant as it enters the viewport.
 */
export function useRevealScope(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    el.setAttribute("data-js", "true");
    const targets = Array.from(el.querySelectorAll<HTMLElement>(".cl-rev"));
    if (!("IntersectionObserver" in window)) {
      targets.forEach((t) => t.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -7% 0px" },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [root]);
}

/** Cursor-following highlight for `.cl-spot` cards (writes CSS vars, no re-renders). */
export function useSpotlight(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const card = (e.target as HTMLElement | null)?.closest<HTMLElement>(".cl-spot");
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      card.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };
    el.addEventListener("pointermove", onMove, { passive: true });
    return () => el.removeEventListener("pointermove", onMove);
  }, [root]);
}

/**
 * Writes overall scroll progress (0..1) into a `--p` CSS var on the given
 * elements, bypassing React renders, and reports a cheap `scrolled` flag.
 */
export function useScrollProgress(targets: RefObject<HTMLElement | null>[]) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    let raf = 0;
    let lastScrolled = false;
    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      for (const t of targets) {
        t.current?.style.setProperty("--p", p.toFixed(4));
      }
      const s = window.scrollY > 24;
      if (s !== lastScrolled) {
        lastScrolled = s;
        setScrolled(s);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [targets]);
  return scrolled;
}

/** Tracks which section id is currently in view. */
export function useActiveSection(ids: readonly string[]): string {
  const [active, setActive] = useState<string>(ids[0] ?? "");
  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.05, 0.2, 0.5] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);
  return active;
}

export interface TyperState {
  lines: TermLine[];
  partial: string;
  finished: boolean;
}

/** Types terminal lines: commands char-by-char, outputs appear whole. */
export function useTyper(src: TermLine[], enabled: boolean, reduced: boolean): TyperState {
  const [state, setState] = useState<TyperState>({ lines: [], partial: "", finished: false });
  useEffect(() => {
    if (!enabled) return;
    let alive = true;
    let li = 0;
    let ci = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const tick = () => {
      if (!alive) return;
      const cur = src[li];
      if (!cur) {
        setState((s) => ({ ...s, finished: true }));
        return;
      }
      if (cur.kind === "cmd") {
        if (ci < cur.text.length) {
          ci += 1;
          setState((s) => ({ ...s, partial: cur.text.slice(0, ci) }));
          timer = setTimeout(tick, 20 + Math.random() * 45);
        } else {
          li += 1;
          ci = 0;
          setState((s) => ({ lines: [...s.lines, cur], partial: "", finished: false }));
          timer = setTimeout(tick, 320);
        }
      } else {
        li += 1;
        setState((s) => ({ lines: [...s.lines, cur], partial: "", finished: false }));
        timer = setTimeout(tick, cur.kind === "ok" ? 520 : 420);
      }
    };
    const start = setTimeout(() => {
      if (!alive) return;
      if (reduced) {
        setState({ lines: src, partial: "", finished: true });
        return;
      }
      setState({ lines: [], partial: "", finished: false });
      timer = setTimeout(tick, 700);
    }, 0);
    return () => {
      alive = false;
      clearTimeout(start);
      if (timer) clearTimeout(timer);
    };
  }, [src, enabled, reduced]);
  return state;
}

/** Live clock for a given IANA timezone (null until mounted). */
export function useLocalTime(timeZone: string): string | null {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone,
    });
    const tick = () => setTime(fmt.format(new Date()));
    const start = setTimeout(tick, 0);
    const id = setInterval(tick, 10_000);
    return () => {
      clearTimeout(start);
      clearInterval(id);
    };
  }, [timeZone]);
  return time;
}

/** Locks body scroll while `locked` is true. */
export function useBodyLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked]);
}
