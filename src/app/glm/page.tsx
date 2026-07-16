import type { Metadata } from "next";
import UniversalBackButton from "../universal-back-button";
import Portfolio from "./Portfolio";

export const metadata: Metadata = {
  title: "Murilo Monferrari — Fullstack Developer",
  description:
    "Murilo R. F. Monferrari — CS student at UNIFEI and fullstack developer. Python automation in production, fullstack apps and AWS deployments. Ready for international teams.",
  keywords: [
    "Murilo Monferrari",
    "fullstack developer",
    "Python automation",
    "AWS",
    "React",
    "Node.js",
    "UNIFEI",
    "portfolio",
  ],
  authors: [{ name: "Murilo R. F. Monferrari" }],
  openGraph: {
    title: "Murilo Monferrari — Fullstack Developer",
    description:
      "CS student @ UNIFEI building fullstack apps, Python automations and AWS deployments. Ready for international teams.",
    type: "website",
  },
};

export default function GlmPortfolioPage() {
  return (
    <>
      <UniversalBackButton />
      <Portfolio />
    </>
  );
}
