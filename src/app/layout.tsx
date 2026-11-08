import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { localPath, siteUrl } from "@/site-config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(`${siteUrl}/`),
  title: { default: "Danny’s — Demonstração independente de site", template: "%s | Proposta Danny’s" },
  description: "Proposta independente de site para apresentação à Danny’s. Esta demonstração não é um canal oficial da empresa e não recebe pedidos ou pagamentos.",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false, noimageindex: true } },
  referrer: "no-referrer",
  icons: {
    icon: [{ url: localPath("/assets/danny-logo.svg"), type: "image/svg+xml" }],
    apple: [{ url: localPath("/assets/apple-touch-icon.png"), sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website", locale: "pt_BR",
    title: "Proposta de site para Danny’s · Demonstração independente",
    description: "Protótipo para apresentação. Não é um site oficial nem um canal de atendimento da empresa.",
    images: [{ url: `${siteUrl}/assets/compartilhamento.png`, width: 1200, height: 630, alt: "Proposta de site para Danny’s — demonstração independente" }],
  },
  twitter: {
    card: "summary_large_image", title: "Proposta de site para Danny’s",
    description: "Demonstração independente para apresentação à empresa.",
    images: [`${siteUrl}/assets/compartilhamento.png`],
  },
};
export const viewport: Viewport = { themeColor: "#260d10" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="pt-BR"><head>
    <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; media-src 'self'; font-src 'self'; connect-src 'self'; frame-src https://pedido.anota.ai; object-src 'none'; base-uri 'self'; form-action 'none'; upgrade-insecure-requests" />
    <link rel="stylesheet" href={localPath("/assets/fonts/fonts.css")} />
  </head><body>
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <aside className="demo-notice" aria-label="Sobre esta demonstração">
      <div className="wrap"><strong>Demonstração independente</strong>
        <span>Proposta para apresentação à Danny’s. Este não é o site oficial da empresa.</span>
        <a href={localPath("/termos/")}>Sobre a proposta ↗</a>
      </div>
    </aside>
    {children}
  </body></html>;
}
