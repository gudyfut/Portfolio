"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Dict } from "./content";
import { Ic, type IconName } from "./icons";
import { useBodyLock } from "./hooks";

export interface PaletteAction {
  id: string;
  group: "nav" | "act" | "link";
  icon: IconName;
  label: string;
  keywords?: string;
  run: () => void;
}

const GROUP_ORDER: PaletteAction["group"][] = ["nav", "act", "link"];

export function CommandPalette({
  open,
  onClose,
  actions,
  t,
}: {
  open: boolean;
  onClose: () => void;
  actions: PaletteAction[];
  t: Dict["palette"];
}) {
  if (!open) return null;
  return <PaletteDialog onClose={onClose} actions={actions} t={t} />;
}

function PaletteDialog({
  onClose,
  actions,
  t,
}: {
  onClose: () => void;
  actions: PaletteAction[];
  t: Dict["palette"];
}) {
  const [query, setQuery] = useState("");
  const [idx, setIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useBodyLock(true);

  useEffect(() => {
    const id = window.setTimeout(() => inputRef.current?.focus(), 20);
    return () => window.clearTimeout(id);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const pool = q
      ? actions.filter((a) => `${a.label} ${a.keywords ?? ""}`.toLowerCase().includes(q))
      : actions;
    return GROUP_ORDER.flatMap((g) => pool.filter((a) => a.group === g));
  }, [actions, query]);

  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-idx="${idx}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [idx]);

  const execute = (action: PaletteAction | undefined) => {
    if (!action) return;
    onClose();
    window.requestAnimationFrame(() => action.run());
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || (e.key === "Tab" && !e.shiftKey)) {
      e.preventDefault();
      setIdx((i) => (filtered.length ? (i + 1) % filtered.length : 0));
    } else if (e.key === "ArrowUp" || (e.key === "Tab" && e.shiftKey)) {
      e.preventDefault();
      setIdx((i) => (filtered.length ? (i - 1 + filtered.length) % filtered.length : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      execute(filtered[idx]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  return (
    <div
      className="cl-pal-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="cl-pal"
        role="dialog"
        aria-modal="true"
        aria-label={t.placeholder}
        onKeyDown={onKeyDown}
      >
        <div className="cl-pal-head">
          <Ic name="search" size={16} className="cl-pal-searchic" />
          <input
            ref={inputRef}
            className="cl-pal-input"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIdx(0);
            }}
            placeholder={t.placeholder}
            role="combobox"
            aria-expanded="true"
            aria-controls="cl-pal-list"
            aria-activedescendant={filtered.length ? `cl-pal-item-${idx}` : undefined}
            aria-autocomplete="list"
            spellCheck={false}
            autoComplete="off"
          />
          <kbd className="cl-kbd">esc</kbd>
        </div>

        <div className="cl-pal-list" id="cl-pal-list" role="listbox" ref={listRef}>
          {filtered.length === 0 && (
            <p className="cl-pal-empty">
              {t.empty} &ldquo;{query}&rdquo;
            </p>
          )}
          {GROUP_ORDER.map((g) => {
            const group = filtered.filter((a) => a.group === g);
            if (group.length === 0) return null;
            return (
              <div key={g} className="cl-pal-group">
                <p className="cl-pal-glabel">{t.groups[g]}</p>
                {group.map((a) => {
                  const i = filtered.indexOf(a);
                  return (
                    <button
                      key={a.id}
                      type="button"
                      id={`cl-pal-item-${i}`}
                      data-idx={i}
                      role="option"
                      aria-selected={i === idx}
                      className={`cl-pal-item${i === idx ? " on" : ""}`}
                      onPointerMove={() => setIdx(i)}
                      onClick={() => execute(a)}
                    >
                      <Ic name={a.icon} size={16} className="cl-pal-ic" />
                      <span className="cl-pal-label">{a.label}</span>
                      <span className="cl-pal-hint">{t.hints[a.group]}</span>
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>

        <div className="cl-pal-foot">
          <span>
            <kbd className="cl-kbd">↑</kbd>
            <kbd className="cl-kbd">↓</kbd> {t.footKeys.move}
          </span>
          <span>
            <kbd className="cl-kbd">↵</kbd> {t.footKeys.select}
          </span>
          <span>
            <kbd className="cl-kbd">esc</kbd> {t.footKeys.close}
          </span>
          <span className="cl-pal-brand">mm·2026</span>
        </div>
      </div>
    </div>
  );
}
