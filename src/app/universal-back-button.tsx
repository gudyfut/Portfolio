"use client";

import Link from "next/link";
import type { MouseEvent } from "react";

export default function UniversalBackButton() {
  function handleBack(event: MouseEvent<HTMLAnchorElement>) {
    if (window.history.length <= 1) {
      return;
    }

    event.preventDefault();
    const currentUrl = window.location.href;
    window.history.back();

    // Some browsers report history entries that cannot actually be revisited.
    window.setTimeout(() => {
      if (window.location.href === currentUrl) {
        window.location.assign("/");
      }
    }, 400);
  }

  return (
    <Link
      aria-label="Voltar para a pagina anterior"
      className="universal-back-button"
      href="/"
      onClick={handleBack}
      title="Voltar"
    >
      <svg
        aria-hidden="true"
        fill="none"
        height="24"
        viewBox="0 0 24 24"
        width="24"
      >
        <path
          d="M15 18 9 12l6-6"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.4"
        />
      </svg>
    </Link>
  );
}
