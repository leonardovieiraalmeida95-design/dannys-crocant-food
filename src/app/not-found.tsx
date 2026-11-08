import type { Metadata } from "next";
import InformationPage from "@/components/information-page";
import { localPath } from "@/site-config";

export const metadata: Metadata = { title: "Página não encontrada", description: "O endereço solicitado não existe nesta demonstração. Volte à página inicial para continuar." };

export default function NotFound() {
  return <InformationPage title="Essa página saiu da mesa.">
    <p className="information-lede">Erro 404 · Não encontramos o endereço solicitado. Você pode voltar à demonstração ou consultar as informações de privacidade.</p>
    <a className="btn btn-primary" href={localPath("/")}>Voltar ao início →</a>
  </InformationPage>;
}
