import type { ReactNode } from "react";
import { localPath } from "@/site-config";

export default function InformationPage({ title, children }: { title: string; children: ReactNode }) {
  return <>
    <header className="wrap information-header"><a className="btn" href={localPath("/")}>← Voltar à demonstração</a></header>
    <main id="conteudo" className="wrap information-page" tabIndex={-1}>
      <p className="eyebrow">Proposta independente · 7 de novembro de 2026</p>
      <h1>{title}</h1>
      {children}
    </main>
    <footer className="wrap information-footer"><nav aria-label="Informações sobre a demonstração">
      <a href={localPath("/privacidade/")}>Privacidade e cookies</a>
      <a href={localPath("/termos/")}>Condições de uso</a>
      <a href={localPath("/")}>Página inicial</a>
    </nav></footer>
  </>;
}
