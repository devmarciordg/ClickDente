# \_assets-fonte

Pasta **fora do build**. Nada aqui é copiado para `dist/` nem publicado — o Vite só empacota `src/pages/` e copia `public/`.

Serve como arquivo morto: material bruto do cliente e arquivos que saíram do site mas não devem ser perdidos.

| Pasta | O que é | Pode apagar? |
|---|---|---|
| `originais/` | Arquivos brutos recebidos do cliente (JPEG/PNG em resolução total, até 8,6 MB). Fonte para regerar qualquer recorte. | **Não.** É a única cópia dos originais. |
| `png-substituidos/` | PNGs que estavam sendo servidos no site. Substituídos por `.webp` + fallback `.jpg` de mesma dimensão (24,6 MB → 3,1 MB). | Sim, se as versões em `public/images/` estiverem validadas. |
| `nao-utilizadas/` | Imagens já tratadas que não são referenciadas por nenhuma página (ex.: `fachada-clickdente-mobile.*`, variações de logo). | Sim. Movidas para cá em vez de apagadas caso voltem a ser usadas. |
| `logos/` | Variações da marca não usadas no site (`logo-escrita`, `logo-icon`, `logo-tipo2`). O logo em uso é `public/images/logotipo.svg`. | Não — material de marca. |

## Como tratar uma imagem nova

1. Solte o original em `originais/`.
2. Gere as variantes em `public/images/` — `.webp` (qualidade 92 em 1x, 88 em 2x) e `.jpg` progressivo de mesma dimensão como fallback, ambos em 1x e `@2x`.
3. No HTML use sempre `<picture>` com `<source type="image/webp">` + `<img>` `.jpg`, com `width`/`height` explícitos.
4. Imagem acima da dobra: `fetchpriority="high"` + `<link rel="preload" as="image" imagesrcset="...">` no `<head>`. Abaixo da dobra: `loading="lazy"`.
