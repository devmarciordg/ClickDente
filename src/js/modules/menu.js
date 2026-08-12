export function initMenu() {
  const toggle = document.querySelector('[data-menu-toggle]');
  const mobileNav = document.querySelector('[data-mobile-nav]');

  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  document.querySelectorAll('[data-dropdown-trigger]').forEach((trigger) => {
    const item = trigger.closest('.nav__item--dropdown');

    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      const isOpen = item.classList.toggle('is-open');
      trigger.setAttribute('aria-expanded', String(isOpen));
    });
  });

  document.addEventListener('click', (event) => {
    document.querySelectorAll('.nav__item--dropdown.is-open').forEach((item) => {
      if (!item.contains(event.target)) {
        item.classList.remove('is-open');
        item.querySelector('[data-dropdown-trigger]')?.setAttribute('aria-expanded', 'false');
      }
    });
  });
}
