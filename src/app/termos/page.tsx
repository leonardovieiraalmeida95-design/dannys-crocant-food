import type { Metadata } from "next";
import InformationPage from "@/components/information-page";
import { localPath, menuUrl } from "@/site-config";

export const metadata: Metadata = {
  title: "Condições desta demonstração",
  description: "Natureza independente da proposta, uso da marca, informações ilustrativas e links para os serviços externos da empresa.",
};

export default function TermsPage() {
  return <InformationPage title="Condições desta demonstração">
    <p className="information-lede">Esta é uma proposta independente de apresentação visual para a Danny’s. Ela ainda não foi aprovada pela empresa e não deve ser confundida com um site oficial, uma parceria ou um canal de atendimento.</p>
    <h2>Finalidade e marca</h2>
    <p>A proposta foi desenvolvida por Leonardo para apresentação à empresa. A marca e os sinais de identidade exibidos pertencem aos respectivos titulares; sua presença nesta demonstração não concede licença de uso a terceiros. A aprovação do titular da marca e a validação dos textos são etapas pendentes antes de um eventual lançamento oficial.</p>
    <h2>Informações ilustrativas</h2>
    <p>Os exemplos de produtos e a apresentação das unidades ilustram o layout. A história resume material público indicado como referência e ainda precisa de validação pela empresa. Confira diretamente com a Danny’s os ingredientes, alergênicos, endereços, horários, disponibilidade, preços, condições e área de entrega antes de decidir uma compra.</p>
    <h2>Pedidos e pagamentos</h2>
    <p>Esta demonstração não recebe pedidos, pagamentos, dados de entrega ou solicitações de reserva. O link <a href={menuUrl} target="_blank" rel="noopener noreferrer">“Abrir cardápio da empresa”</a> leva ao Anota AI, um serviço externo. Qualquer compra realizada no destino segue o fluxo e as condições apresentados naquele serviço e pelo estabelecimento.</p>
    <h2>Links e plataformas externas</h2>
    <p>Instagram, Google Maps e Anota AI são plataformas externas, com funcionamento e políticas próprios. A demonstração pode ser vista sem ativar o cardápio incorporado. A incorporação pode ficar indisponível por limitações do serviço ou do navegador; por isso, o link para outra aba permanece disponível.</p>
    <h2>Contato sobre a proposta</h2>
    <p>O canal público do responsável por esta demonstração ainda não foi definido. Se você recebeu o link de Leonardo, utilize o mesmo contato para tratar da proposta. Para assuntos do restaurante ou de compras, consulte os canais divulgados pela própria empresa.</p>
    <p><a href={localPath("/privacidade/")}>Ver informações de privacidade e cookies →</a></p>
  </InformationPage>;
}
