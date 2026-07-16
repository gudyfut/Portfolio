import type { CSSProperties, ReactNode } from "react";

export type IconName =
  | "mail"
  | "phone"
  | "github"
  | "linkedin"
  | "copy"
  | "check"
  | "up-right"
  | "down"
  | "globe"
  | "terminal"
  | "monitor"
  | "server"
  | "database"
  | "cloud"
  | "users"
  | "zap"
  | "pin"
  | "clock"
  | "spark"
  | "layers"
  | "code"
  | "compass"
  | "command"
  | "menu"
  | "x"
  | "chat"
  | "workflow"
  | "search"
  | "cap"
  | "bot"
  | "printer"
  | "coffee"
  | "home";

type IconDef = { node: ReactNode; filled?: boolean };

const ICONS: Record<IconName, IconDef> = {
  mail: {
    node: (
      <>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m2 7 10 6 10-6" />
      </>
    ),
  },
  phone: {
    node: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    ),
  },
  github: {
    filled: true,
    node: (
      <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.57.1.78-.25.78-.55v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.79 2.73 1.27 3.4.97.1-.76.41-1.27.74-1.56-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.41-5.25 5.69.42.36.79 1.08.79 2.18v3.23c0 .31.21.66.79.55A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
    ),
  },
  linkedin: {
    filled: true,
    node: (
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    ),
  },
  copy: {
    node: (
      <>
        <rect x="9" y="9" width="13" height="13" rx="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </>
    ),
  },
  check: { node: <path d="M20 6 9 17l-5-5" /> },
  "up-right": {
    node: (
      <>
        <path d="M7 17 17 7" />
        <path d="M8 7h9v9" />
      </>
    ),
  },
  down: {
    node: (
      <>
        <path d="M12 5v14" />
        <path d="m19 12-7 7-7-7" />
      </>
    ),
  },
  globe: {
    node: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </>
    ),
  },
  terminal: {
    node: (
      <>
        <path d="m4 17 6-6-6-6" />
        <path d="M12 19h8" />
      </>
    ),
  },
  monitor: {
    node: (
      <>
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8" />
        <path d="M12 17v4" />
      </>
    ),
  },
  server: {
    node: (
      <>
        <rect x="2" y="2" width="20" height="8" rx="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" />
        <path d="M6 6h.01" />
        <path d="M6 18h.01" />
      </>
    ),
  },
  database: {
    node: (
      <>
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
      </>
    ),
  },
  cloud: {
    node: <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />,
  },
  users: {
    node: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
  },
  zap: { node: <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" /> },
  pin: {
    node: (
      <>
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),
  },
  clock: {
    node: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </>
    ),
  },
  spark: {
    filled: true,
    node: <path d="M12 2 14 10 22 12 14 14 12 22 10 14 2 12 10 10 12 2Z" />,
  },
  layers: {
    node: (
      <>
        <path d="m12 2 9 5-9 5-9-5 9-5Z" />
        <path d="m3 12 9 5 9-5" />
        <path d="m3 17 9 5 9-5" />
      </>
    ),
  },
  code: {
    node: (
      <>
        <path d="m8 6-6 6 6 6" />
        <path d="m16 6 6 6-6 6" />
      </>
    ),
  },
  compass: {
    node: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="m16 8-4 8-4-4 8-4Z" />
      </>
    ),
  },
  command: {
    node: <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />,
  },
  menu: {
    node: (
      <>
        <path d="M4 6h16" />
        <path d="M4 12h16" />
        <path d="M4 18h16" />
      </>
    ),
  },
  x: {
    node: (
      <>
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </>
    ),
  },
  chat: {
    node: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
  },
  workflow: {
    node: (
      <>
        <rect x="3" y="3" width="6" height="6" rx="1" />
        <rect x="15" y="15" width="6" height="6" rx="1" />
        <path d="M9 6h6a2 2 0 0 1 2 2v7" />
      </>
    ),
  },
  search: {
    node: (
      <>
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </>
    ),
  },
  cap: {
    node: (
      <>
        <path d="M22 10 12 5 2 10l10 5 10-5z" />
        <path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5" />
      </>
    ),
  },
  bot: {
    node: (
      <>
        <path d="M12 8V4H8" />
        <rect x="4" y="8" width="16" height="12" rx="2" />
        <path d="M2 14h2" />
        <path d="M20 14h2" />
        <path d="M15 13v2" />
        <path d="M9 13v2" />
      </>
    ),
  },
  printer: {
    node: (
      <>
        <path d="M6 9V2h12v7" />
        <rect x="6" y="14" width="12" height="8" />
        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      </>
    ),
  },
  coffee: {
    node: (
      <>
        <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
        <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
        <path d="M6 2v3" />
        <path d="M10 2v3" />
        <path d="M14 2v3" />
      </>
    ),
  },
  home: {
    node: (
      <>
        <path d="m3 10.5 9-7.5 9 7.5" />
        <path d="M5 10v10h5v-6h4v6h5V10" />
      </>
    ),
  },
};

export function Ic({
  name,
  size = 18,
  className,
  style,
}: {
  name: IconName;
  size?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const def = ICONS[name];
  const paint = def.filled
    ? { fill: "currentColor", stroke: "none" as const }
    : {
        fill: "none" as const,
        stroke: "currentColor",
        strokeWidth: 1.7,
        strokeLinecap: "round" as const,
        strokeLinejoin: "round" as const,
      };
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
      {...paint}
    >
      {def.node}
    </svg>
  );
}
