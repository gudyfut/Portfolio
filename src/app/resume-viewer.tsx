"use client";

import { useRef } from "react";

const resumeUrl = "/CV%20Murilo.pdf";

export default function ResumeViewer() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  function openResume() {
    dialogRef.current?.showModal();
  }

  function closeResume() {
    dialogRef.current?.close();
  }

  return (
    <>
      <button
        aria-haspopup="dialog"
        className="resume-preview"
        onClick={openResume}
        type="button"
      >
        <span className="resume-preview-paper" aria-hidden="true">
          <span className="resume-preview-name">MURILO R. F. MONFERRARI</span>
          <span className="resume-preview-contact" />
          <span className="resume-preview-heading">SOBRE</span>
          <span className="resume-preview-line resume-preview-line-long" />
          <span className="resume-preview-line" />
          <span className="resume-preview-heading">EXPERIÊNCIA</span>
          <span className="resume-preview-columns">
            <span />
            <span />
          </span>
          <span className="resume-preview-heading">HABILIDADES</span>
          <span className="resume-preview-line resume-preview-line-long" />
          <span className="resume-preview-line" />
        </span>
        <span className="resume-preview-action">
          <span>
            <strong>CV Murilo.pdf</strong>
            <small>PDF · 1 página</small>
          </span>
          <span aria-hidden="true">Visualizar →</span>
        </span>
      </button>

      <dialog
        aria-labelledby="resume-dialog-title"
        className="resume-dialog"
        ref={dialogRef}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closeResume();
          }
        }}
      >
        <div className="resume-dialog-header">
          <div>
            <p id="resume-dialog-title">Currículo de Murilo Monferrari</p>
            <span>PDF · 1 página</span>
          </div>
          <div>
            <a href={resumeUrl} target="_blank" rel="noreferrer">
              Nova aba
            </a>
            <button aria-label="Fechar currículo" onClick={closeResume} type="button">
              Fechar
            </button>
          </div>
        </div>
        <object
          aria-label="Currículo de Murilo Monferrari em PDF"
          data={resumeUrl}
          type="application/pdf"
        >
          <div className="resume-dialog-fallback">
            <p>Seu navegador não exibiu o PDF dentro da página.</p>
            <a href={resumeUrl} target="_blank" rel="noreferrer">
              Abrir currículo em uma nova aba
            </a>
          </div>
        </object>
      </dialog>
    </>
  );
}
