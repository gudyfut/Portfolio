import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import UniversalBackButton from "../universal-back-button";
import Portfolio from "./portfolio";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--cl-font-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--cl-font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Murilo Monferrari — Fullstack Developer",
  description:
    "Fullstack developer and Computer Science student at UNIFEI — Python automations in production, complete web applications deployed on AWS, fluent English. Portfolio of Murilo R. F. Monferrari.",
};

export const viewport: Viewport = {
  themeColor: "#0a0806",
};

export default function ClaudePortfolioPage() {
  return (
    <>
      <UniversalBackButton />
      <Portfolio className={`${display.variable} ${mono.variable}`} />
    </>
  );
}
