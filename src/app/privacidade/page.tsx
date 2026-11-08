import type { Metadata } from "next";
import InformationPage from "@/components/information-page";
import { localPath } from "@/site-config";

export const metadata: Metadata = {
  title: "Privacidade e cookies",
  description: "Como esta demonstração independente funciona, quais serviços externos pode carregar e quais definições ainda são necessárias antes de um lançamento oficial.",
};

export default function PrivacyPage() {
  return <InformationPage title="Privacidade e cookies">
    <p className="information-lede">Este aviso descreve esta demonstração independente de site, desenvolvida para apresentação à Danny’s. Não é a política de privacidade da empresa nem substitui as políticas dos serviços de pedidos.</p>
    <h2>O que a demonstração faz</h2>
    <p>O site não possui cadastro, formulário de contato, lista de e-mails, checkout ou processamento de pagamentos. Não instalamos Google Analytics, pixels de publicidade nem cookies próprios para medir sua navegação. As fontes, as imagens e o vídeo ilustrativo são servidos junto com o site. O vídeo não contém áudio e pode ser pausado; uma imagem estática é usada quando a reprodução está indisponível ou o navegador indica preferência por movimento reduzido ou economia de dados.</p>
    <h2>Dados técnicos da hospedagem</h2>
    <p>A entrega das páginas envolve dados técnicos, como endereço IP, navegador, horário e recurso solicitado. A versão neste endereço é hospedada no GitHub Pages; os registros e a retenção administrados pela plataforma seguem sua <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener noreferrer">declaração de privacidade</a>. Não afirmamos que a navegação seja anônima nem controlamos os registros da plataforma.</p>
    <h2>Cardápio externo e cookies</h2>
    <p>O cardápio do Anota AI fica desativado nesta página até você selecionar “Carregar cardápio externo”. É possível continuar navegando sem carregá-lo. Ao ativá-lo, seu navegador se conecta ao serviço externo, que pode utilizar cookies, registros técnicos e outras tecnologias, conforme sua <a href="https://anota.ai/politicas/Politica_de_Privacidade.pdf" target="_blank" rel="noopener noreferrer">política de privacidade</a>.</p>
    <p>A escolha não é guardada em cookies nem no armazenamento local desta demonstração: o cardápio volta a ficar desativado ao recarregar. O botão “Desativar cardápio” remove a incorporação e impede novas solicitações originadas por ela, mas não apaga dados ou cookies já tratados pelo serviço externo. Para excluí-los, use as configurações do navegador ou os canais do próprio serviço.</p>
    <p>Você também pode abrir o cardápio em outra aba. Os links para Instagram e Google Maps só abrem esses serviços quando selecionados; as práticas de cada plataforma passam a se aplicar no destino.</p>
    <h2>Responsável e solicitações</h2>
    <p>A proposta foi desenvolvida por Leonardo. Ainda não foi definido um canal específico para solicitações sobre a demonstração. A identificação completa do responsável pelo tratamento e um canal de contato precisam ser definidos e publicados antes de apresentar esta versão como um site oficial ou iniciar qualquer coleta de dados.</p>
    <p>Se você recebeu o link diretamente de Leonardo, responda ao mesmo contato para assuntos sobre esta proposta. Não envie CPF, dados de pagamento, endereços ou outras informações sensíveis para a demonstração. Para pedidos ou dados já enviados ao Anota AI, utilize o atendimento informado na própria plataforma.</p>
    <h2>Próximas versões</h2>
    <p>A inclusão futura de formulários, ferramentas de medição ou publicidade exigirá uma nova avaliação das finalidades, bases legais, retenção, fornecedores e informações aos visitantes. Este aviso descreve apenas a versão atual.</p>
    <p><a href={localPath("/termos/")}>Leia também as condições desta demonstração →</a></p>
  </InformationPage>;
}
