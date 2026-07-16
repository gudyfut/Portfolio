import type { Metadata } from "next";
import UniversalBackButton from "../universal-back-button";
import Portfolio from "./portfolio";
import "./portfolio.css";

export const metadata: Metadata = {
  title: "Murilo Monferrari | Fullstack Developer",
  description:
    "Fullstack developer building production automations, integrated systems, and cloud-deployed applications.",
};

export default function GptPortfolioPage() {
  return (
    <>
      <UniversalBackButton />
      <Portfolio />
    </>
  );
}
