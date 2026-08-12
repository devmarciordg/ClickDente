function isInternalNavigableLink(link) {
  if (!link || link.target === '_blank' || link.hasAttribute('download')) {
    return false;
  }

  let url;
  try {
    url = new URL(link.href, window.location.href);
  } catch {
    return false;
  }

  if (url.origin !== window.location.origin) return false;
  if (url.pathname === window.location.pathname && url.hash) return false;

  return true;
}

export function initPageTransition() {
  const loader = document.getElementById('page-loader');

  if (!loader) return;

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href]');

    if (isInternalNavigableLink(link)) {
      loader.classList.add('is-active');
    }
  });

  window.addEventListener('pageshow', () => {
    loader.classList.remove('is-active');
  });
}
