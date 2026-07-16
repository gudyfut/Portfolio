"use client";

import {
  type CSSProperties,
  type ElementType,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

function subscribeMediaQuery(query: string, cb: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia(query);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

/* ------------------------------------------------------------------ */
/* Reduced-motion + touch detection hooks                              */
/* ------------------------------------------------------------------ */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (cb) => subscribeMediaQuery("(prefers-reduced-motion: reduce)", cb),
    () => (typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false),
    () => false
  );
}

export function useIsTouch() {
  return useSyncExternalStore(
    (cb) => subscribeMediaQuery("(hover: none), (pointer: coarse)", cb),
    () => (typeof window !== "undefined" ? window.matchMedia("(hover: none), (pointer: coarse)").matches : false),
    () => false
  );
}

/* ------------------------------------------------------------------ */
/* Reveal on scroll                                                    */
/* ------------------------------------------------------------------ */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("glm-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

export function useRevealAll() {
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>(".glm-reveal:not(.glm-in):not([data-glm-managed])")
    );
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("glm-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ------------------------------------------------------------------ */
/* Reveal (React-owned)                                                */
/* Unlike useRevealAll (imperative classList), this keeps `glm-in` as  */
/* part of React's own className so it survives re-renders on elements */
/* whose className changes via state (e.g. active skill cards).        */
/* ------------------------------------------------------------------ */
export function Reveal({
  children,
  className = "",
  style,
  delay = 0,
  as,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  as?: ElementType;
} & Record<string, unknown>) {
  const As: ElementType = as ?? "div";
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <As
      ref={ref}
      data-glm-managed=""
      className={`glm-reveal${inView ? " glm-in" : ""}${className ? ` ${className}` : ""}`}
      style={{ "--reveal-delay": `${delay}ms`, ...style } as CSSProperties}
      {...rest}
    >
      {children}
    </As>
  );
}

/* ------------------------------------------------------------------ */
/* Particle network canvas                                             */
/* ------------------------------------------------------------------ */
export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;
    const mouse = { x: -9999, y: -9999, active: false };

    type P = { x: number; y: number; vx: number; vy: number; r: number };
    let particles: P[] = [];

    const palette = ["#5eead4", "#22d3ee", "#a78bfa"];

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(90, Math.max(34, Math.floor((w * h) / 18000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.38,
        vy: (Math.random() - 0.5) * 0.38,
        r: Math.random() * 1.8 + 0.7,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 18000) {
            const d = Math.sqrt(d2) || 1;
            const f = (1 - d / 134) * 0.9;
            p.x += (dx / d) * f;
            p.y += (dy / d) * f;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(148, 163, 184, 0.55)";
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 13000) {
            const alpha = (1 - d2 / 13000) * 0.32;
            const color = palette[(i + j) % palette.length];
            ctx.strokeStyle = color;
            ctx.globalAlpha = alpha;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        if (mouse.active) {
          const a = particles[i];
          const dx = a.x - mouse.x;
          const dy = a.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 24000) {
            ctx.strokeStyle = "#5eead4";
            ctx.globalAlpha = (1 - d2 / 24000) * 0.5;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    build();
    draw();
    window.addEventListener("resize", build);
    window.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", build);
      window.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
      style={{ pointerEvents: "none" }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Custom cursor (desktop only)                                        */
/* ------------------------------------------------------------------ */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouch();

  useEffect(() => {
    if (isTouch) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;
    let visible = false;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!visible) {
        visible = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;

      const t = e.target as HTMLElement;
      const interactive = t.closest(
        "a, button, [role='button'], input, textarea, .glm-chip, [data-cursor='hover']"
      );
      ring.classList.toggle("glm-hover", !!interactive);
    };

    const onLeave = () => {
      visible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [isTouch]);

  if (isTouch) return null;
  return (
    <>
      <div ref={dotRef} className="glm-cursor-dot" style={{ opacity: 0 }} aria-hidden="true" />
      <div ref={ringRef} className="glm-cursor-ring" style={{ opacity: 0 }} aria-hidden="true" />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Magnetic button wrapper                                             */
/* ------------------------------------------------------------------ */
export function Magnetic({
  children,
  strength = 0.4,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouch();

  useEffect(() => {
    if (isTouch) return;
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    };
    const onLeave = () => {
      el.style.transform = "translate(0px, 0px)";
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength, isTouch]);

  return (
    <div ref={ref} className={className} style={{ transition: "transform 0.25s ease", display: "inline-block" }}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 3D tilt card                                                        */
/* ------------------------------------------------------------------ */
export function TiltCard({
  children,
  className,
  max = 8,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouch();

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isTouch) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(800px) rotateY(${px * max}deg) rotateX(${-py * max}deg) translateZ(0)`;
    },
    [isTouch, max]
  );

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (el) el.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg)";
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transition: "transform 0.25s ease", transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Typewriter (rotating word)                                          */
/* ------------------------------------------------------------------ */
export function Typewriter({
  words,
  typing = 75,
  deletingSpeed = 38,
  pause = 1500,
  className,
}: {
  words: string[];
  typing?: number;
  deletingSpeed?: number;
  pause?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [sub, setSub] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!words.length) return;
    const current = words[index % words.length];
    let delay = isDeleting ? deletingSpeed : typing;
    if (!isDeleting && sub === current.length) {
      delay = pause;
    }

    const t = setTimeout(() => {
      const cur = words[index % words.length];
      if (!isDeleting) {
        if (sub < cur.length) {
          setSub((s) => s + 1);
        } else {
          setIsDeleting(true);
        }
      } else if (sub > 0) {
        setSub((s) => s - 1);
      } else {
        setIsDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      }
    }, delay);

    return () => clearTimeout(t);
  }, [sub, isDeleting, index, words, typing, pause, deletingSpeed]);

  return (
    <span className={className} aria-live="polite">
      <span>{words[index % words.length].slice(0, sub)}</span>
      <span
        aria-hidden="true"
        style={{
          display: "inline-block",
          width: "2px",
          marginLeft: "3px",
          background: "currentColor",
          animation: "glm-blink 1s steps(1) infinite",
        }}
      >
        &nbsp;
      </span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Animated counter                                                    */
/* ------------------------------------------------------------------ */
export function Counter({
  value,
  suffix = "",
  duration = 1600,
  className,
}: {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            if (reduced) {
              setN(value);
              return;
            }
            const start = performance.now();
            const tick = (now: number) => {
              const p = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - p, 3);
              setN(Math.round(value * eased));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, duration, reduced]);

  return (
    <span ref={ref} className={className}>
      {n}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Scroll progress bar                                                 */
/* ------------------------------------------------------------------ */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? window.scrollY / max : 0;
      el.style.transform = `scaleX(${pct})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return (
    <div className="fixed left-0 top-0 z-[60] h-[3px] w-full origin-left">
      <div
        ref={ref}
        className="h-full w-full origin-left"
        style={{
          transform: "scaleX(0)",
          background: "linear-gradient(90deg, #5eead4, #22d3ee, #a78bfa)",
        }}
      />
    </div>
  );
}
