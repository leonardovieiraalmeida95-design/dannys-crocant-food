# Revisão técnica e de apresentação — Danny’s

Data: 7 de novembro de 2026. Escopo: demonstração independente hospedada no GitHub Pages, exportação estática do Next.js e referências da lista de 20 itens enviada por Leonardo.

## Situação principal

Leonardo confirmou que o projeto ainda é uma demonstração para apresentar à empresa. Não foi confirmada autorização da Danny’s para lançamento oficial nem definido um canal público do responsável. Esta revisão não é parecer jurídico, teste de invasão ou certificação de conformidade com a LGPD; não garante ausência de reclamações ou processos.

Foram incluídos avisos visíveis, inclusive na imagem de compartilhamento, e metadados noindex/nofollow. Isso reduz a possibilidade de confusão com um canal oficial, mas não concede direitos sobre a marca, não restringe acesso e não torna o site ou o repositório privados. A proteção de marca deve ser considerada separadamente; consulte o art. 129 da [Lei de Propriedade Industrial](https://www.gov.br/aeb/pt-br/acesso-a-informacao/institucional/legislacao/L9279.pdf).

## Lista recebida

| Item | Resultado nesta demonstração |
| --- | --- |
| 1. Erro 404 personalizado | Implementado, com retorno ao início e informações da proposta. HTTP 404 verificado no servidor local. |
| 2. Título em cada página | Títulos distintos para início, privacidade, condições e 404. |
| 3. Descrição em cada página | Presente nas páginas informativas e de entrada; verificada na exportação. |
| 4. Ação no topo | Link para o cardápio externo presente no cabeçalho. Não há checkout próprio. |
| 5. Favicon | SVG da marca e ícone Apple PNG 180×180. A marca continua dependendo de autorização. |
| 6. robots.txt | Gerado. As páginas recebem noindex/nofollow. Não se bloqueia o rastreamento que permite ler noindex. No Pages de projeto, robots.txt fica no subdiretório; não é um controle do arquivo robots.txt da raiz do domínio. |
| 7. Sitemap | Não publicado nesta fase: todas as páginas são demonstrações com noindex. Preparar sitemap e política de indexação após autorização e definição do endereço oficial. |
| 8. Imagem de compartilhamento | PNG 1200×630, cerca de 50 KB, com indicação de proposta independente. Metadados Open Graph e Twitter incluídos. A atualização da prévia no WhatsApp depende também do cache da plataforma. |
| 9. Texto alternativo | Imagens com alt; SVG principal com título e descrição. Descrição incorreta sobre mascote foi corrigida. |
| 10. Versão móvel | Layout e páginas informativas verificados em 320, 390, 768 e 1440 px nesta revisão, sem transbordamento nos blocos examinados. Não é teste físico de todos os aparelhos/navegadores. |
| 11. WhatsApp fixo | Não adicionado: não há número comercial confirmado. O botão fixo existente aponta para o cardápio externo. Um botão específico de WhatsApp não é exigência geral para um site. |
| 12. Carregamento | Abertura animada, opção de pular, limite de duração, estado de carregamento do cardápio e mensagem após 12 s. Abertura pulada em links diretos às seções e com movimento reduzido. |
| 13. Erro em formulário | Não se aplica: não há formulário, cadastro ou recebimento próprio de pedidos. |
| 14. Obrigado | Não se aplica: não há envio de formulário ou conclusão de compra dentro da demonstração. |
| 15. Privacidade | Aviso factual publicado para a demonstração, incluindo hospedagem, serviços externos e pendência de responsável/contato. Ainda não é política aprovada da empresa. |
| 16. Termos | Página informa natureza da proposta, marca, dados ilustrativos, links e funcionamento externo dos pedidos. Não cria suposta aprovação nem dispensa direitos legais. |
| 17. Cookies | Sem banner genérico de “aceitar tudo”. A incorporação externa fica desativada por padrão e exige escolha explícita; há explicação e opção de desativar. Não há cookies/armazenamento próprios para lembrar essa escolha. Não foi feita auditoria interna dos cookies ou da adequação do Anota AI. |
| 18. Google Analytics | Não instalado. Não é obrigatório; acrescentá-lo exige finalidade definida e nova avaliação de privacidade. |
| 19. Contato real | PENDENTE. Leonardo não definiu contato a publicar. Não foram inventados e-mail, telefone, CNPJ ou identificação de controlador. Endereços de rua não confirmados foram retirados dos cartões e das buscas de mapa. |
| 20. Imagens otimizadas | Logo vetorial, PNGs de compartilhamento/ícone dimensionados e compactados. Fontes WOFF2 locais Latin/Latin Extended, com licenças OFL, cerca de 341 KB no conjunto. |

## Privacidade e segurança verificadas

- O HTML inicial não contém iframe nem carrega scripts, imagens ou folhas de estilo remotos. As fontes foram transferidas para arquivos locais com suas licenças, eliminando a conexão automática ao Google Fonts.
- O Anota AI só é solicitado depois de “Carregar cardápio externo”. A ativação e a remoção do iframe foram verificadas no navegador; o serviço exibiu o nome da loja. A opção é reiniciada a cada carregamento da página.
- “Desativar” interrompe novas solicitações originadas pela incorporação removida; não apaga cookies ou dados previamente tratados pelo terceiro. O visitante é informado sobre essa limitação.
- Não há Analytics, pixel de publicidade, formulário, banco de dados, autenticação ou processamento de pagamentos próprios. A hospedagem ainda trata dados técnicos: o [GitHub informa que registra IPs de visitantes por segurança](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages#data-collection).
- A opção de adiar serviços externos segue a preocupação da ANPD com cookies não necessários e escolhas reais do titular; não é declaração de que todas as obrigações da LGPD estejam atendidas. Referência: [guia da ANPD sobre cookies](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia_orientativo_cookies_e_protecao_de_dados_pessoais).
- Links em nova aba usam noopener/noreferrer. O site declara no-referrer e uma CSP que limita scripts e recursos aos arquivos locais e à incorporação escolhida do Anota AI. O Next.js exportado requer scripts/estilos inline; essa CSP não elimina todos os riscos de injeção.
- Cabeçalhos adicionais estão em vercel.json para uma eventual hospedagem Vercel. Eles não são aplicados pelo GitHub Pages. Não se atribui ao arquivo uma proteção que o host atual não oferece.
- A consulta ao endpoint oficial de avisos de segurança do npm não retornou advisories para as versões do package-lock revisado. Isso é uma consulta pontual, não garantia de ausência de vulnerabilidades.
- Busca limitada por padrões comuns de chaves e segredos em src, scripts, assets e .github não encontrou correspondências. Não foi feita revisão de todo o histórico Git, de contas conectadas ou de infraestrutura dos terceiros.
- Noindex deve ser lido pelo robô e não equivale a senha ou remoção imediata de resultados já existentes. Referência: [documentação de indexação do Google](https://developers.google.com/search/docs/crawling-indexing/block-indexing).

## Verificações executadas

Compilação de produção e TypeScript concluídos. Seis testes passaram em `node --test scripts/audit-site.test.mjs`, com AUDIT_BASE_URL apontando para o servidor local: metadados/noindex por página, ausência de carregamento externo automático no HTML, integridade de arquivos/links/fontes, alt e proteção de links, ausência de preços fixos e verificação HTTP das páginas, arquivos e 404. O mesmo conjunto está incluído na publicação (a etapa HTTP fica desativada quando não há servidor de preview).

No navegador: aviso de demonstração, fontes locais, ausência inicial de iframe, ativação e desativação do Anota AI, menu móvel, navegação para privacidade e condições, logo sem transformação e responsividade das telas revisadas. Não apareceram erros do código próprio antes de ativar o cardápio; o serviço externo registrou um erro de envio de evento analítico próprio, sem impedir a exibição da loja.

## Pendências antes de lançamento oficial

1. Obter autorização do titular da marca, inclusive para a versão redesenhada da logo, o conteúdo e a hospedagem. Um aviso de demonstração não substitui essa autorização.
2. A empresa validar história, nomes, datas, estatísticas, ingredientes/alergênicos, produtos, endereços e condições. Exemplos e resumos continuam ilustrativos; os preços fixos foram retirados.
3. Definir identificação e contato reais do responsável pelo tratamento, operação de atendimento a titulares e política aprovada. Informações de contato integram a transparência exigida ao responsável; veja [orientação da ANPD sobre direitos dos titulares](https://www.gov.br/anpd/pt-br/assuntos/titular-de-dados/direito-dos-titulares).
4. Revisar juridicamente autorização, materiais da marca, conteúdo, privacidade e eventuais contratos antes de divulgar o projeto como oficial. A revisão técnica não cobre essas decisões.
5. Para restringir efetivamente o acesso durante a negociação, usar prévia com controle de acesso. O endereço público atual, o repositório e eventuais cópias/cache não são protegidos por noindex. A visibilidade não foi alterada porque Leonardo havia solicitado publicação pública.
6. No lançamento aprovado: definir domínio, hospedagem, cabeçalhos, política de indexação/sitemap e processo de atualização. Reavaliar qualquer novo formulário, analytics, pixel, WhatsApp ou fluxo de compra antes de ativá-lo.
