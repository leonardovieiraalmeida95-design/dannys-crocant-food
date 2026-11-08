# Danny's Crocant Food — Frango crocante, história de família

Next.js + TypeScript + Tailwind CSS + GSAP. As animações de entrada e rolagem ficam em `src/components/site-interactions.tsx`, com ScrollTrigger e limpeza das animações ao desmontar o componente ou mudar os breakpoints. A preferência por movimento reduzido desativa a abertura e os efeitos. O conteúdo continua disponível sem JavaScript.

## Desenvolvimento

`npm install` e `npm run dev`. Abra http://localhost:3000/dannys-crocant-food/.

## Publicação

A branch main compila a exportação estática via GitHub Actions e atualiza os arquivos do Pages. A Vercel usa a raiz do domínio ao detectar seu ambiente de build. Edite os arquivos em src, não o index.html gerado.
