"use client";

import { useEffect, useRef, useState } from "react";
import type { Dict, FlowNode } from "./content";
import { Ic } from "./icons";

const CYCLE_ORDER: FlowNode["id"][] = ["users", "web", "api", "db", "aws"];

function Conn() {
  return (
    <span className="cl-conn" aria-hidden="true">
      <i className="cl-dot" style={{ "--dl": "0s" } as React.CSSProperties} />
      <i className="cl-dot" style={{ "--dl": "1.3s" } as React.CSSProperties} />
    </span>
  );
}

function NodeButton({
  node,
  selected,
  onPick,
}: {
  node: FlowNode;
  selected: boolean;
  onPick: (id: FlowNode["id"]) => void;
}) {
  return (
    <button
      type="button"
      className={`cl-fnode${selected ? " sel" : ""}`}
      aria-pressed={selected}
      onClick={() => onPick(node.id)}
    >
      <Ic name={node.icon} size={17} className="cl-fnode-ic" />
      <span className="cl-fnode-t">{node.title}</span>
      <span className="cl-fnode-s">{node.sub}</span>
    </button>
  );
}

/** Interactive SIMCafé architecture: animated data flow + inspectable layers. */
export function SystemDiagram({
  t,
  reduced,
}: {
  t: Dict["xp"]["diagram"];
  reduced: boolean;
}) {
  const [sel, setSel] = useState<FlowNode["id"]>("web");
  const [inView, setInView] = useState(false);
  const interacted = useRef(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || reduced) return;
    const id = setInterval(() => {
      if (interacted.current) return;
      setSel((s) => CYCLE_ORDER[(CYCLE_ORDER.indexOf(s) + 1) % CYCLE_ORDER.length]);
    }, 4200);
    return () => clearInterval(id);
  }, [inView, reduced]);

  const pick = (id: FlowNode["id"]) => {
    interacted.current = true;
    setSel(id);
  };

  const [users, web, api, db] = t.nodes;
  const selNode = [...t.nodes, t.aws].find((n) => n.id === sel) ?? t.nodes[0];

  return (
    <div className="cl-flowwrap" ref={boxRef} role="group" aria-label={t.aria}>
      <div className="cl-flow">
        <NodeButton node={users} selected={sel === "users"} onPick={pick} />
        <Conn />
        <div className={`cl-awsbox${sel === "aws" ? " sel" : ""}`}>
          <button
            type="button"
            className="cl-awstag"
            aria-pressed={sel === "aws"}
            onClick={() => pick("aws")}
          >
            <Ic name="cloud" size={14} />
            {t.aws.title} · {t.aws.sub}
          </button>
          <NodeButton node={web} selected={sel === "web"} onPick={pick} />
          <Conn />
          <NodeButton node={api} selected={sel === "api"} onPick={pick} />
          <Conn />
          <NodeButton node={db} selected={sel === "db"} onPick={pick} />
        </div>
      </div>
      <div className="cl-fpanel">
        <div className="cl-fpanel-in" key={sel}>
          <p className="cl-fpanel-k">
            <Ic name={selNode.icon} size={14} />
            <span>
              {selNode.title} — {selNode.sub}
            </span>
          </p>
          <p className="cl-fpanel-d">{selNode.desc}</p>
        </div>
        <span className="cl-fpanel-hint" aria-hidden="true">
          {t.hint}
        </span>
      </div>
    </div>
  );
}

/** Static hub-and-spoke map of the Golden Rastreamento integrations. */
export function IntegrationMap({ t }: { t: Dict["xp"]["hub"] }) {
  const centers = [44, 122, 200];
  return (
    <svg className="cl-hub" viewBox="0 0 380 244" role="img" aria-label={t.aria}>
      <path className="cl-spoke" d="M135 122 C 168 122, 172 44, 208 44" />
      <path className="cl-spoke" d="M135 122 H 208" />
      <path className="cl-spoke" d="M135 122 C 168 122, 172 200, 208 200" />

      <g className="cl-hub-ping">
        <circle cx="88" cy="122" r="47" />
      </g>
      <circle className="cl-hub-core" cx="88" cy="122" r="47" />
      <text className="cl-hub-title" x="88" y="119" textAnchor="middle">
        {t.center}
      </text>
      <text className="cl-hub-sub" x="88" y="137" textAnchor="middle">
        {t.centerSub}
      </text>

      {t.targets.map((label, i) => (
        <g key={label}>
          <rect className="cl-hub-node" x="208" y={centers[i] - 22} width="160" height="44" rx="12" />
          <circle className="cl-hub-dot" cx="224" cy={centers[i]} r="3" />
          <text className="cl-hub-label" x="236" y={centers[i] + 4}>
            {label}
          </text>
        </g>
      ))}
    </svg>
  );
}
