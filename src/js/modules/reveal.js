const SELECTOR =
  '.section-header, .card, .cta-banner, .testimonial-card, .image-placeholder, .info-list__item, .trust-bar__item, .split__list-item';

export function initReveal() {
  const targets = document.querySelectorAll(SELECTOR);

  if (!targets.length) return;

  if (!('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('reveal', 'is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach((el, index) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(index % 4) * 80}ms`;
    observer.observe(el);
  });
}
