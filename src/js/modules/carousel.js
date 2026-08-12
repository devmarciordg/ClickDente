export function initCarousels() {
  document.querySelectorAll('[data-carousel]').forEach((carousel) => {
    const track = carousel.querySelector('[data-carousel-track]');
    const prevBtn = carousel.querySelector('[data-carousel-prev]');
    const nextBtn = carousel.querySelector('[data-carousel-next]');

    if (!track) return;

    const cardWidth = () => {
      const card = track.querySelector(':scope > *');
      const gap = parseFloat(getComputedStyle(track).gap || '0');
      return card ? card.getBoundingClientRect().width + gap : track.clientWidth;
    };

    const maxScroll = () => track.scrollWidth - track.clientWidth;

    const goNext = () => {
      const amount = cardWidth();
      const atEnd = track.scrollLeft >= maxScroll() - amount / 2;

      track.scrollTo({
        left: atEnd ? 0 : track.scrollLeft + amount,
        behavior: 'smooth',
      });
    };

    const goPrev = () => {
      const amount = cardWidth();
      const atStart = track.scrollLeft <= amount / 2;

      track.scrollTo({
        left: atStart ? maxScroll() : track.scrollLeft - amount,
        behavior: 'smooth',
      });
    };

    prevBtn?.addEventListener('click', goPrev);
    nextBtn?.addEventListener('click', goNext);
  });
}
