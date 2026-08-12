Atue como um Engenheiro Front-End Sênior e Especialista em CRO. Sua tarefa é redigir um documento de diretrizes técnicas e operacionais chamado `claude.md`. 

Este arquivo servirá como o "System Prompt" e o guia absoluto para o desenvolvimento da infraestrutura de vendas da clínica odontológica "Click Dente". O objetivo do projeto é entregar um site de altíssima performance (Web Core Vitals), focado em conversão de tráfego pago e código limpo.

Escreva o conteúdo do arquivo `claude.md` estruturado com as seguintes regras e fases de execução:

# DIRETRIZES TÉCNICAS E DE NEGÓCIO (Para o claude.md)

1. ARQUITETURA E PERFORMANCE (Mandatório)
- O projeto deve seguir rigorosamente as diretrizes documentadas no arquivo local `SETUP-RDG.md`.
- Stack: Vite JS, HTML5 Semântico, SCSS (BEM + Componentes Globais) e JavaScript Vanilla.
- Proibido o uso de bibliotecas de terceiros (como jQuery, Swiper, Bootstrap).
- Foco extremo em tempo de carregamento (Load < 1s), utilizando Preload crítico e Lazy Loading nativo para imagens abaixo da dobra.

2. SISTEMA DE DESIGN E UI
- Identidade Visual Base: Primária (#51257c), Secundária (#1abaca) e Fundo (Branco).
- Tipografia: 'Montserrat' para títulos (autoridade) e 'Inter' ou 'Roboto' para parágrafos (leitura).
- Tema Premium (Easter Egg): O SCSS deve conter um tema escuro/dourado, mas ele SÓ deve ser ativado via parâmetro na URL (ex: `?theme=premium`). A interface principal não deve conter nenhum botão de troca de tema para evitar pontos de fuga na conversão.
- Interatividade Mobile: Todos os carrosséis e comportamentos responsivos devem ser construídos via CSS (scroll-snap) ou Vanilla JS puro.

3. GERENCIAMENTO DE MÍDIA
- Abordagem Iterativa: Na geração inicial do HTML, utilize apenas `divs` semânticas com textos descritivos como placeholders (ex: `[Foto ampla e iluminada da recepção]`). As imagens reais serão inseridas posteriormente.
- O vídeo de referência da clínica serve apenas para ditar o tom da copy (acolhedor, sem imagens de dor/sangue), e não deve ser renderizado no Hero para não destruir a performance.

4. TRACKING E SEO (Data Engineering)
- Proibido hardcodar `dataLayer.push` no JavaScript.
- A estrutura deve estar pronta para o GTM. Todo botão, CTA e link externo deve obrigatoriamente possuir um `id` único, `aria-label` e o atributo `data-tracking="nome-do-evento"` (ex: `data-tracking="whatsapp-hero-home"`).

# FASES DE EXECUÇÃO (Para o claude.md)

O desenvolvimento será guiado pelo usuário através de interações no chat, respeitando a seguinte ordem de fases:

- FASE 0: Geração do `plan.md`
  Antes de escrever qualquer código, você (a IA) deverá gerar e salvar um arquivo `plan.md`. Este arquivo consolidará o sitemap, as variáveis CSS globais, a arquitetura de pastas e as regras de negócio deste documento. Ele servirá como "Save State" para sessões futuras.

- FASE 1: Setup Global
  Configuração do ambiente Vite, estruturação das pastas, injeção das variáveis SCSS (cores e tipografia) e lógica de temas via URL.

- FASE 2: Componentes Core
  Desenvolvimento isolado do Header, Footer, botões e classes utilitárias tipográficas.

- FASE 3: Construção Iterativa (Páginas)
  Construção progressiva das páginas seguindo o Sitemap (iniciando pela Home, depois Sobre, Tratamentos, etc.). O conteúdo deve espelhar as copies e gatilhos mentais fornecidos nos arquivos `.md` individuais de cada página.

- FASE 4: Interatividade e Tracking
  Injeção do Vanilla JS para comportamentos de UI e validação final dos atributos `data-tracking` em toda a estrutura.

Por favor, gere agora o conteúdo completo e formatado do arquivo `claude.md` baseado nestas instruções.