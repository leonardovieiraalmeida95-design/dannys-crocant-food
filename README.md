# Danny's Crocant Food — Frango crocante, história de família

Next.js + TypeScript + Tailwind CSS + GSAP. As animações de entrada e rolagem ficam em `src/components/site-interactions.tsx`, com ScrollTrigger e limpeza das animações ao desmontar o componente ou mudar os breakpoints. A preferência por movimento reduzido desativa a abertura e os efeitos. O conteúdo continua disponível sem JavaScript.

## Desenvolvimento

`npm install` e `npm run dev`. Abra http://localhost:3000/dannys-crocant-food/.

## Publicação

A branch main compila a exportação estática via GitHub Actions e atualiza os arquivos do Pages. A Vercel usa a raiz do domínio ao detectar seu ambiente de build. Edite os arquivos em src, não o index.html gerado.

## Demonstração e privacidade

Esta versão é uma proposta independente, ainda sem autorização de lançamento oficial da Danny’s. Ela inclui avisos visíveis, metadados noindex/nofollow e informações de privacidade e uso. Noindex não restringe acesso: o endereço e o repositório continuam públicos.

O Anota AI só é incorporado após ativação explícita e pode ser desativado. Fontes e imagens são locais. Não há Analytics, formulário, cadastro ou checkout próprio. Canal do responsável, autorização da marca e validação das informações continuam pendentes; consulte AUDITORIA.md.

## Verificação

Após `npm run build`, execute `node --test scripts/audit-site.test.mjs`. Com o preview rodando, defina `AUDIT_BASE_URL=http://127.0.0.1:3000/dannys-crocant-food` para incluir a verificação HTTP das páginas e do 404. A publicação no GitHub também executa a auditoria do resultado estático.

Os cabeçalhos de vercel.json só valem na Vercel. O GitHub Pages não permite configurar esses cabeçalhos pelo repositório; a CSP em meta e as diretivas de indexação continuam presentes no HTML.
