import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

const SRC = path.resolve(__dirname, 'src');
const PAGES = path.resolve(SRC, 'pages');

// Injeta o conteúdo dos SVGs de src/icons/ diretamente no HTML, evitando
// requisições extras e permitindo colorir o ícone via `currentColor`.
// Uso: <svg-load name="whatsapp" />
const htmlSvgPlugin = () => {
  return {
    name: 'html-svg-plugin',
    transformIndexHtml(html) {
      return html.replace(
        /<svg-load\s+name="([^"]+)"\s*\/>/g,
        (match, fileName) => {
          try {
            const filePath = path.resolve(SRC, 'icons', `${fileName}.svg`);
            let svgContent = fs.readFileSync(filePath, 'utf-8');
            svgContent = svgContent.replace(/<\?xml.*?\?>/, '');

            // Todo ícone aqui é decorativo — sempre acompanha um rótulo de
            // texto ou um aria-label no elemento pai. Sem aria-hidden o leitor
            // de tela pode anunciar o gráfico, e focusable="false" evita que
            // o IE/Edge legado insira o SVG na ordem de tabulação.
            svgContent = svgContent.replace(
              /<svg\b/,
              '<svg aria-hidden="true" focusable="false"'
            );

            return svgContent;
          } catch (error) {
            console.error(
              `Erro: Ícone "${fileName}" não encontrado em src/icons/`
            );
            return match;
          }
        }
      );
    },
  };
};

// Inclui partials HTML reutilizáveis (header, footer) em cada página do
// site multi-página, evitando duplicar a marcação em cada index.html.
// Uso: <html-include name="header" data-active="sobre" />
const htmlIncludePlugin = () => {
  return {
    name: 'html-include-plugin',
    transformIndexHtml(html) {
      return html.replace(
        /<html-include name="([^"]+)"( data-active="([^"]*)")? \/>/g,
        (match, fileName, _attr, activeSlug) => {
          try {
            const filePath = path.resolve(SRC, 'partials', `${fileName}.html`);
            let partial = fs.readFileSync(filePath, 'utf-8');

            if (activeSlug) {
              partial = partial.replace(
                new RegExp(`data-nav="${activeSlug}"`, 'g'),
                (navMatch) => `${navMatch} aria-current="page"`
              );
            }

            return partial;
          } catch (error) {
            console.error(
              `Erro: Partial "${fileName}" não encontrado em src/partials/`
            );
            return match;
          }
        }
      );
    },
  };
};

// As páginas usam "@/js/main.js" como entry. No build o Rollup resolve o
// alias sozinho; no dev server o atributo chegaria cru ao navegador (e seria
// resolvido relativo à URL da página), então aqui reescrevemos para /@fs/.
const htmlAliasDevPlugin = () => {
  return {
    name: 'html-alias-dev-plugin',
    apply: 'serve',
    transformIndexHtml(html) {
      return html.replace(
        /(src|href)="@\/([^"]+)"/g,
        (_match, attr, rest) => `${attr}="/@fs/${SRC.replace(/\\/g, '/')}/${rest}"`
      );
    },
  };
};

// Sitemap: cada página é uma pasta em src/pages/ com um index.html, o que
// gera URLs limpas (/sobre-a-clinica/). A home é o index.html da raiz.
const pages = [
  'index.html',
  'sobre-a-clinica/index.html',
  'implantes-e-proteses/index.html',
  'estetica-e-harmonizacao/index.html',
  'ortodontia/index.html',
  'clinica-geral-e-prevencao/index.html',
  'cirurgias-e-especialidades/index.html',
  'contato-e-localizacao/index.html',
];

export default defineConfig({
  // A raiz do Vite é src/pages/ para que a estrutura de pastas das páginas
  // vire exatamente a estrutura de URLs em dist/ (sem prefixo src/pages/).
  root: PAGES,
  publicDir: path.resolve(__dirname, 'public'),
  plugins: [htmlIncludePlugin(), htmlSvgPlugin(), htmlAliasDevPlugin()],
  resolve: {
    alias: {
      // Referencia src/ de qualquer página: "@/js/main.js", "@/scss/main.scss"
      '@': SRC,
    },
  },
  server: {
    // As páginas ficam em src/pages/, mas importam de src/js e src/scss,
    // que estão acima da raiz do dev server.
    fs: { allow: [path.resolve(__dirname)] },
  },
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
    // CSS/JS ficam em arquivos hasheados compartilhados entre as 8 páginas
    // (cacheáveis pelo navegador ao navegar entre elas) em vez de inline —
    // vite-plugin-singlefile não suporta múltiplos entry points (multi-page).
    minify: 'terser',
    rollupOptions: {
      input: Object.fromEntries(
        pages.map((page) => [
          page.replace(/\/index\.html$/, '') || 'index',
          path.resolve(PAGES, page),
        ])
      ),
    },
  },
});
