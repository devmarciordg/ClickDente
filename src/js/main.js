import '../scss/main.scss';
import { initMenu } from './modules/menu.js';
import { initFaq } from './modules/faq.js';
import { initCarousels } from './modules/carousel.js';
import { initReveal } from './modules/reveal.js';
import { initHeaderScroll } from './modules/header-scroll.js';
import { initPageTransition } from './modules/page-transition.js';

initMenu();
initFaq();
initCarousels();
initReveal();
initHeaderScroll();
initPageTransition();

document.querySelectorAll('[data-year]').forEach((el) => {
  el.textContent = new Date().getFullYear();
});
