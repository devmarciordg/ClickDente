# Click Dente

Site institucional da Click Dente — clínica odontológica em Governador Valadares (MG). Multi-página, focado em conversão de tráfego pago, com WhatsApp como canal único.

## Rodar

```bash
npm install
npm run dev      # dev server
npm run build    # gera dist/
npm run preview  # serve o dist/
```

## Estrutura

```text
src/
├── pages/          ← raiz do Vite: a árvore de pastas vira a árvore de URLs
│   ├── index.html                        →  /
│   ├── implantes-e-proteses/index.html   →  /implantes-e-proteses/
│   └── … mais 6 páginas
├── partials/       header · footer · theme-init · page-loader · whatsapp-float
├── icons/          SVGs injetados inline no build
├── scss/           _variables · _base · _components · main
└── js/             main.js + modules/

public/             servido como está na raiz do site (imagens, fontes, SEO)
docs/copy/          copies e gatilhos mentais de cada página
_assets-fonte/      fora do build e fora do git — ver o README de lá
```

`vite.config.js` tem `root: src/pages`, com `publicDir` e `outDir` apontando para `public/` e `dist/` na raiz — assim `src/pages/ortodontia/index.html` vira `dist/ortodontia/index.html`, sem prefixo. Três plugins caseiros processam o HTML:

| Plugin | Uso no HTML | O que faz |
|---|---|---|
| `html-include-plugin` | `<html-include name="header" data-active="sobre" />` | injeta o partial e marca o item de nav ativo |
| `html-svg-plugin` | `<svg-load name="whatsapp" />` | injeta o SVG inline com `aria-hidden` |
| `html-alias-dev-plugin` | `<script src="@/js/main.js">` | resolve o alias `@` no dev server |

## Regras do projeto

Estão em [`CLAUDE.md`](CLAUDE.md) e detalhadas em [`plan.md`](plan.md), que é o save state — sitemap, tokens, arquitetura e decisões de implementação. **Leia o `plan.md` antes de mexer em qualquer coisa.**

Os pontos que mais pegam:

- **Zero bibliotecas de terceiros.** Sem jQuery, Swiper, Bootstrap. Carrossel é `scroll-snap` + JS vanilla.
- **Toda cor e fonte vem de token** (`src/scss/_variables.scss`). Hex solto no meio do CSS não passa.
- **Todo CTA tem `id` único, `aria-label` e `data-tracking`.** Nada de `dataLayer.push` hardcoded — a estrutura só fica pronta para o GTM ler.
- **Tema premium** só liga via `?theme=premium` na URL. Não existe botão de troca na interface, de propósito.
- **Imagem** sempre em `<picture>` com `<source type="image/webp">` e `.jpg` de fallback, com `width`/`height` explícitos.

## Pendências conhecidas

- **Contraste do `.btn--primary`.** Texto branco sobre `#1abaca` dá 2,36:1, contra os 4,5:1 exigidos. Corrigir exige escurecer o turquesa da marca — decisão do cliente.
- **Domínio de produção.** `https://www.clickdente.com.br/` é placeholder nos `<link rel="canonical">`, no `sitemap.xml` e no `robots.txt`. Todos marcados com `TODO`.
- **Redes sociais.** Os links do footer estão em `#` — faltam os handles reais.
- **Repetição estrutural.** Seis grids de três colunas idênticas nas páginas de tratamento, e 31 eyebrows no site. Levantado em auditoria, ainda não resolvido.
