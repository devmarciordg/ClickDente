# plan.md — Click Dente (Save State)

> Gerado na Fase 0. Este arquivo é a fonte de verdade do projeto: sitemap, variáveis globais, arquitetura de pastas e regras de negócio. Deve ser consultado no início de qualquer sessão futura.

## 1. Visão Geral

- **Cliente:** Click Dente — clínica odontológica em Governador Valadares (GV) - MG.
- **Endereço:** Rua Marechal Floriano, 1268 - Centro, Governador Valadares - MG.
- **Horário:** Seg–Sex 08h–18h, Sáb 08h–12h.
- **Canal de conversão único:** WhatsApp. Número: `5533999124420` (`https://wa.me/5533999124420?text=...`).
- **Objetivo:** site institucional de alta performance, multi-página, focado em CRO para tráfego pago e orgânico.
- **Pilar de marca recorrente:** "Atendimento Humanizado" — citado em todas as páginas como diferencial central.
- **Diretriz visual de copy:** nunca remeter a dor/sangue/agulhas/brocas. Sempre calma, acolhimento, confiança, controle do paciente.

## 2. Sitemap

| # | Página | Rota (clean URL) | Arquivo fonte de copy |
|---|---|---|---|
| 1 | Home | `/` | `docs/copy/page_home.md` |
| 2 | Sobre a Clínica | `/sobre-a-clinica/` | `docs/copy/page_aboutus.md` |
| 3 | Implantes e Próteses | `/implantes-e-proteses/` | `docs/copy/page_implantes-e-proteses.md` |
| 4 | Estética e Harmonização | `/estetica-e-harmonizacao/` | `docs/copy/page_estetica-e-harmonizacao.md` |
| 5 | Ortodontia | `/ortodontia/` | `docs/copy/page_ortodontia.md` |
| 6 | Clínica Geral e Prevenção | `/clinica-geral-e-prevencao/` | `docs/copy/page_clinica-geral-e-prevencao.md` |
| 7 | Cirurgias e Especialidades | `/cirurgias-e-especialidades/` | `docs/copy/page_cirurgias-e-especialidades.md` |
| 8 | Contato e Localização | `/contato-e-localizacao/` | `docs/copy/page_contato-e-localizacao.md` |

Navegação: Home, Sobre, **Tratamentos** (dropdown → páginas 3–7), Contato. CTA fixo de WhatsApp no header.

URLs limpas via build multi-página do Vite (cada rota é uma pasta com seu próprio `index.html`), decisão confirmada com o usuário.

## 3. Variáveis Globais (`src/scss/_variables.scss`)

```scss
:root {
  // Cores
  --color-primary: #51257c;
  --color-primary-dark: #3c1c5c;
  --color-secondary: #1abaca;
  --color-bg: #ffffff;
  --color-text: #22202a;
  --color-text-muted: #6b6673;
  --color-border: #e8e4ee;

  // Tipografia
  --font-heading: 'Montserrat', sans-serif;
  --font-body: 'Inter', sans-serif;

  // Espaçamento
  --space-section: clamp(3rem, 6vw, 6rem);
  --container-width: 1200px;

  // Radius / Shadow
  --radius: 12px;
  --shadow-card: 0 4px 20px rgba(81, 37, 124, 0.08);
}

// Tema Premium (Easter Egg) — ativado só via [data-theme="premium"] no <html>,
// setado por JS quando ?theme=premium está na URL. Sem toggle visível na UI.
[data-theme='premium'] {
  --color-primary: #1a1423;
  --color-secondary: #c9a227; // dourado
  --color-bg: #0f0c14;
  --color-text: #f2eee6;
  --color-text-muted: #b9b2c4;
  --color-border: #2a2333;
}
```

## 4. Arquitetura de Pastas

```text
/
├── public/                       # servido como está, na raiz do site
│   ├── images/                   # SOMENTE imagens tratadas e em uso (.webp + fallback .jpg)
│   ├── fonts/                    # Montserrat / Inter em .woff2 self-hosted
│   ├── documents/ · api/
│   ├── favicon.svg · robots.txt · sitemap.xml
├── src/
│   ├── pages/                    # ← raiz do Vite: a estrutura de pastas vira a de URLs
│   │   ├── index.html            # Home            → /
│   │   ├── sobre-a-clinica/index.html
│   │   ├── implantes-e-proteses/index.html
│   │   ├── estetica-e-harmonizacao/index.html
│   │   ├── ortodontia/index.html
│   │   ├── clinica-geral-e-prevencao/index.html
│   │   ├── cirurgias-e-especialidades/index.html
│   │   └── contato-e-localizacao/index.html
│   ├── partials/                 # header, footer, theme-init, page-loader, whatsapp-float
│   ├── icons/                    # SVGs de UI injetados inline via <svg-load name="..." />
│   ├── scss/
│   │   ├── _variables.scss · _base.scss · _components.scss
│   │   └── main.scss
│   └── js/
│       ├── main.js
│       └── modules/              # menu, faq, carousel, header-scroll, reveal, page-transition
├── docs/
│   └── copy/                     # page_*.md e site_map.md — copies e gatilhos de cada página
├── _assets-fonte/                # FORA do build — nada aqui é publicado
│   ├── originais/                # arquivos brutos recebidos do cliente
│   ├── png-substituidos/         # PNGs trocados por .webp + .jpg (24,6 MB → 3,1 MB)
│   ├── nao-utilizadas/           # tratadas mas sem uso em nenhuma página
│   └── logos/                    # variações de logo não usadas no site
├── vite.config.js
├── plan.md · CLAUDE.md · SETUP-RDG.md
└── package.json
```

**Nota de build:** a raiz do Vite é `src/pages/`, com `publicDir` e `outDir` apontando para `public/` e `dist/` na raiz do projeto — assim `src/pages/ortodontia/index.html` vira `dist/ortodontia/index.html` (URL limpa `/ortodontia/`), sem prefixo. Como as páginas ficam acima de `src/js` e `src/scss`, o entry é declarado como `@/js/main.js`: o Rollup resolve o alias no build e o plugin `html-alias-dev-plugin` reescreve para `/@fs/` no dev server.

**Nota de mídia:** imagens em `public/images/` **não** passam pelo pipeline de assets do Vite — continuam como arquivos externos, cacheáveis entre páginas e compatíveis com `loading="lazy"` nativo. Toda foto é servida por `<picture>` com `<source type="image/webp">` e `<img>` `.jpg` como fallback, sempre com `width`/`height` explícitos (zero CLS).

## 5. Regras de Negócio (resumo operacional)

1. **Stack:** Vite + HTML5 semântico + SCSS (BEM + componentes globais) + JS Vanilla. Proibido jQuery/Swiper/Bootstrap/libs de terceiros.
2. **Performance:** preload crítico (hero image + fontes), `loading="lazy"` + `width`/`height` explícitos em toda imagem abaixo da dobra, scripts de tracking pesados adiados (`requestIdleCallback`/interação do usuário).
3. **Mídia:** HTML inicial usa `<div>` semânticas com texto descritivo como placeholder de imagem (ex: `[Foto ampla e iluminada da recepção]`). Substituição por fotos reais é etapa posterior.
4. **Tema Premium:** só ativa via `?theme=premium` na URL (seta `data-theme="premium"` no `<html>` via JS lido antes do primeiro paint, sem FOUC). Nenhum botão de troca de tema na UI.
5. **Tracking:** todo CTA/botão/link externo tem `id` único, `aria-label` e `data-tracking="nome-evento"`. Proibido `dataLayer.push` hardcoded no JS — estrutura só precisa estar pronta para o GTM capturar via seletores/atributos.
6. **Carrosséis/responsividade:** CSS `scroll-snap` ou JS Vanilla puro, nunca libs externas.

## 6. Fases de Execução — Status

- [x] **Fase 0** — `plan.md` (este arquivo)
- [x] **Fase 1** — Setup global (Vite multi-page, pastas, variáveis SCSS, tema via URL)
- [x] **Fase 2** — Componentes core (Header, Footer, botões, tipografia, card)
- [x] **Fase 3** — Construção iterativa das páginas — 8/8 páginas do sitemap concluídas
- [x] **Fase 4** — Interatividade final + auditoria de `data-tracking` (todo CTA de WhatsApp nas 8 páginas tem `id`, `aria-label` e `data-tracking` correspondentes — auditado via grep)

### Notas de implementação (ajustes em relação à arquitetura original da Fase 1)

- O tema premium não usa um módulo `theme.js` separado — é ativado por um `<script>` inline síncrono em `src/partials/theme-init.html`, incluído no `<head>` de cada página. Isso evita FOUC (o atributo `data-theme="premium"` precisa estar setado antes do primeiro paint), o que um ES module com `defer` não garante.
- **`vite-plugin-singlefile` foi removido.** Esse plugin exige `output.inlineDynamicImports: true`, que o Rollup não permite com múltiplos entry points — inviável para um site multi-página de 8 rotas (ele serve para landers de página única, como a doceria do `SETUP-RDG.md`). O build agora usa o multi-page padrão do Vite: um `main.css`/`main.js` hasheados e **compartilhados** entre as 8 páginas, cacheados pelo navegador ao navegar entre elas — o que atende melhor à meta de Core Web Vitals do que reempacotar tudo inline em cada página.
- `<link rel="canonical">` usa URL absoluta com domínio placeholder (`https://www.clickdente.com.br/...`, marcado como TODO) em vez de caminho raiz-relativo. Caminhos como `href="/sobre-a-clinica/"` colidem com o nome de pastas reais do projeto e quebravam o build (`EISDIR`, o plugin de HTML do Vite tentava ler o diretório como arquivo).

### Placeholders pendentes (atualizado)

Além do CNPJ, redes sociais e depoimentos (seção 7 abaixo), falta confirmar o **domínio real de produção** para os `<link rel="canonical">` de todas as 8 páginas (hoje `https://www.clickdente.com.br/`, um placeholder).

## 7. Placeholders pendentes (marcar claramente no código até virem dados reais)

- CNPJ da clínica (footer)
- Handles reais de redes sociais (footer)
- Depoimentos reais de pacientes (seção de prova social da Home) — usar exemplos ilustrativos claramente marcados como placeholder até serem substituídos por avaliações reais
- Fotos reais (todas as seções indicadas nos arquivos `docs/copy/page_*.md`)
