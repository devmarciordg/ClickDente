# SETUP-RDG: Arquitetura e Diretrizes de Alta Performance

**Contexto do Projeto:** Desenvolvimento de uma landing page para uma doceria. O objetivo principal é construir uma infraestrutura de vendas limpa e rápida, com foco absoluto em CRO, Core Web Vitals e rastreamento preciso.

## 1. Stack Tecnológico
* **Ambiente & Bundler:** Vite JS
* **Estrutura:** HTML5 Semântico
* **Estilização:** Sass (SCSS) compilado para CSS
* **Interatividade:** JavaScript Vanilla (ES6+), evitando bibliotecas de terceiros para garantir máxima velocidade.

## 2. Arquitetura de Pastas (Padrão Vite)
```text
/
├── public/
│   ├── images/          # Imagens otimizadas (WebP/AVIF)
│   ├── fonts/           # Fontes locais (.woff2)
│   └── favicon.ico
├── src/
│   ├── scss/
│   │   ├── _variables.scss  # Variáveis da doceria (cores, tipografia css custom properties)
│   │   ├── _base.scss       # Reset e estilos globais (html, body, ::selection)
│   │   ├── _components.scss # Componentes globais (.container, .btn, .card, .section-title)
│   │   └── main.scss        # Entry point SCSS
│   └── js/
│       ├── main.js          # Core logic e integrações de UI
├── index.html               # Marcação principal
├── vite.config.js           # Build optimization
└── package.json
```

## 3. Metodologia CSS (BEM + Componentes Globais)
* As estilizações devem mesclar **Componentes Globais** para estruturas repetitivas com **BEM (Block, Element, Modifier)** para isolamento de seções.
* As variáveis de cor e espaçamento devem ser injetadas no `:root` do CSS final.
* **Exemplo de marcação esperada:**
  ```html
  <section class="products" id="produtos">
    <div class="products__container container">
      <h2 class="products__title section-title">Nossos Doces</h2>
      <div class="products__card card">...</div>
    </div>
  </section>
  ```

## 4. Otimização de Performance (Core Web Vitals)
* **Preload Crítico:** Utilizar `<link rel="preload">` no `<head>` com `fetchpriority="high"` para a imagem de LCP (Hero) e para as fontes principais WOFF2.
* **Otimização de Imagens:** Todas as imagens abaixo da dobra devem conter `loading="lazy"` e ter atributos explícitos de `width` e `height` para evitar Cumulative Layout Shift (CLS).
* **Execução Assíncrona:** Toda a carga de scripts de rastreamento pesados deve ser inicializada após interações do usuário (scroll, mousemove) ou via `requestIdleCallback` / `setTimeout` para manter o load inicial abaixo de 1 segundo.

## 5. CRO e Engenharia de Dados (Tracking)
* Semântica HTML rigorosa para o SEO técnico ler as informações facilmente.
* Todo botão de compra ou CTA deve conter `id` único e atributos de `aria-label` para facilitar o tagueamento do Data Layer ou envio Server-Side (CAPI).
* Exemplo: `<a href="#" id="cta-whatsapp-hero" class="btn btn--primary">Fazer Pedido</a>`