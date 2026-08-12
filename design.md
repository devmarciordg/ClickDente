# Design — Click Dente

Sistema travado deste projeto. Todo redesenho de página lê este arquivo antes de emitir código. Não regenere por página — estenda ou emende este arquivo quando o sistema precisar crescer.

> **Fonte autoritativa dos valores:** `src/scss/_variables.scss`. Os valores em OKLCH abaixo são a documentação perceptual da mesma paleta, para portabilidade. Se divergirem, o SCSS ganha.

## Genre

**editorial** — restrição, hairlines em vez de bordas pesadas, hierarquia carregada pela tipografia. Escolhido porque o pilar de marca é "atendimento humanizado / quebra do medo", e o verniz de SaaS trabalharia contra isso.

## Famílias de macroestrutura

| Tipo de página | Rotas | Família | O que varia |
|---|---|---|---|
| **Landing de tratamento** | `/implantes-e-proteses/` `/estetica-e-harmonizacao/` `/ortodontia/` `/clinica-geral-e-prevencao/` `/cirurgias-e-especialidades/` | **09 · Quote-Led** | só o miolo — ver Variantes |
| **Institucional** | `/` `/sobre-a-clinica/` | Marquee Hero (atual, não redesenhado) | — |
| **Conversão local** | `/contato-e-localizacao/` | Conversational FAQ (atual, não redesenhado) | — |

### Por que Quote-Led nas landing pages

Essas cinco rotas são o destino do tráfego pago — é nelas que a mídia aterrissa, e o paciente que chega ali pode nunca ver a home. A barreira da categoria é medo e desconfiança, e nesse cenário credibilidade emprestada vence declaração de marca. A página abre com a fala de um paciente real, não com uma promessa da clínica.

### Variantes — o miolo segue o eixo da decisão

A moldura é idêntica nas cinco. O miolo muda por um motivo declarado, nunca por variedade.

**Moldura travada:**

1. Hero Quote-Led — fala real + nome + procedência + CTA primário
2. Barra de confiança compacta — avaliações, endereço, horário
3. **Miolo** ← varia
4. Quebra de objeção
5. CTA final

| Variante | Rotas | Miolo | Razão |
|---|---|---|---|
| **Urgência** | cirurgias · clínica geral | **06 · Conversational FAQ** (reusa `.accordion-item`) | decisão em horas; barreira é medo e dúvida imediata |
| **Consideração** | implantes · estética · ortodontia | **14 · Narrative Workflow** (`.stage-list`) | decisão em semanas; barreira é prazo, etapas e o que acontece em cada visita |

## Tema

Paleta de marca preservada. Não introduzir cor nova sem emendar este arquivo.

| Token | Hex (autoritativo) | OKLCH (documentação) | Papel |
|---|---|---|---|
| `--color-primary` | `#51257c` | `oklch(35% 0.13 305)` | roxo de marca — títulos de CTA, texto de link |
| `--color-secondary` | `#1abaca` | `oklch(69% 0.11 202)` | turquesa — preenchimento de botão primário |
| `--color-secondary-dark` | `#157f8a` | `oklch(52% 0.08 203)` | acento que carrega texto — 4,74:1 no branco |
| `--color-secondary-deep` | `#10646d` | `oklch(45% 0.07 204)` | hover/press do CTA — 6,85:1 |
| `--color-bg` | `#ffffff` | `oklch(100% 0 0)` | papel |
| `--color-bg-alt` | `#faf8fc` | `oklch(98% 0.005 305)` | papel alternado entre seções |
| `--color-text` | `#22202a` | `oklch(23% 0.015 300)` | tinta |
| `--color-text-muted` | `#6b6673` | `oklch(50% 0.02 305)` | tinta secundária |
| `--color-border` | `#e8e4ee` | `oklch(92% 0.012 300)` | hairline |

**Regra de acento:** `--color-secondary` (#1abaca) **nunca carrega texto nem preenche superfície com texto** — rende 2,36:1 contra o branco. Ele existe para bordas de destaque e detalhes. Toda superfície com texto usa `--color-secondary-dark` (4,74:1); hover e press usam `--color-secondary-deep` (6,85:1).

**Tema premium** (`?theme=premium`) reescreve os mesmos tokens em `:root[data-theme='premium']`. Todo componente novo tem de funcionar nos dois — não hardcode cor.

## Tipografia

- **Display:** Montserrat, peso 700, roman. Italic em heading é proibido.
- **Body:** Inter, peso 400.
- **Terceira família:** não existe. O teto é 2.

Escala de título — a correção que este redesenho introduz:

```
.hero__title     clamp(2.25rem, 5vw, 3.25rem)   line-height 1.1
.section-title   clamp(1.75rem, 3vw, 2.5rem)    line-height 1.2
```

Antes desta versão o H1 usava `.section-title` e ficava do mesmo tamanho de todo H2 da página — não existia hierarquia. `.hero__title` é obrigatório em todo `<h1>`.

Medida de leitura: 45–75 caracteres. `.section-subtitle` está em `60ch`.

## Espaçamento

Escala nomeada de 4pt em `_variables.scss`. Páginas usam token (`var(--space-md)`), nunca valor cru.

Ritmo vertical entre seções: **não uniforme**. `.section` é o padrão; `.section--tight` e `.section--loose` existem para quebrar a cadência. Todas as seções com o mesmo padding lê como template.

## Motion

- Curvas: `--ease-out` `cubic-bezier(0.16, 1, 0.3, 1)` · `--ease-in` · `--ease-in-out`. `ease` do browser é proibido.
- Durações: `--dur-micro` 120ms · `--dur-short` 220ms · `--dur-long` 420ms.
- Reveal: uma entrada orquestrada por página (`.reveal` + IntersectionObserver). Nada mais.
- `prefers-reduced-motion`: movimento espacial colapsa em opacidade ≤150ms. Loaders funcionais viram estado estático.

## Microinterações

- Sucesso silencioso. Nenhum toast comemorativo.
- Um sinal por elemento no hover — nunca elevação + sombra + borda + zoom juntos.
- Hover sempre sob `@media (hover: hover)`; toque não fica com estado preso.
- Anel de foco instantâneo, nunca em transição.
- Só o que é clicável reage a ponteiro. `.card` estático não tem hover; `a.card--link` tem.

## Voz de CTA

- **Primário:** `.btn--primary`, pílula preenchida, ícone do WhatsApp + verbo e objeto. **Sem "via WhatsApp" no rótulo** — o ícone já diz, e o texto extra empurra o botão para duas linhas no mobile.
- **Secundário:** âncora tipográfica para o miolo da própria página. Existe para segurar quem ainda não está pronto a agendar, sem competir com o primário.
- Rótulo de no máximo ~18 caracteres. "Agendar avaliação", "Falar agora", "Ver as etapas".
- Todo CTA tem `id` único, `aria-label` e `data-tracking`. `dataLayer.push` hardcoded é proibido — a estrutura só fica pronta para o GTM ler.

## Honestidade de conteúdo

Regra dura, sem exceção: **nenhum número, depoimento ou selo inventado.**

- Os depoimentos são avaliações reais do Google, com nome real e português preservado como escrito. Não editar, não polir, não criar novos.
- Nota agregada **confirmada pelo cliente: 5,0 cravado**. O **total de avaliações** segue sem confirmação — não preencher com estimativa.
- Nenhuma página menciona preço, prazo médio ou taxa de sucesso sem dado do cliente.

## O que as páginas DEVEM compartilhar

- O logotipo e o wordmark.
- A paleta e a posição do acento (≤5% do viewport).
- Montserrat + Inter.
- A voz de CTA — forma do botão, raio, ritmo de padding.
- O componente `.card` e seus dois modos (estático / navegável).
- O rodapé.

## O que as páginas PODEM diferir

- O miolo, dentro das duas variantes declaradas acima.
- O header: landing pages usam a variante reduzida (`header-lp`); institucional e contato usam o header completo.
- A imagem de hero.

## Permissões por tipo de página

- Landing de tratamento: foto real de hero, sem enriquecimento decorativo.
- Institucional: foto real, carrossel de equipe.
- Nenhuma página usa ilustração gerada, blob, gradiente de fundo ou moldura de UI redesenhada.

## Pendências do sistema

- Total de avaliações do Google (a nota 5,0 já está confirmada e aplicada).
- ~~Contraste do `.btn--primary`~~ — resolvido: o preenchimento passou de `--color-secondary` (2,36:1) para `--color-secondary-dark` (4,74:1) após o Lighthouse reprovar. O turquesa claro segue na marca, mas nunca mais carrega texto.
- Objeção de preço/parcelamento não endereçada em nenhuma rota.
- Home e Sobre ainda carregam seis grids de três colunas iguais e a maioria dos eyebrows do site.
