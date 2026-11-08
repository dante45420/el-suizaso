/* Manual carousel: no timers, no autoplay, no tracking. */
(() => {
  const carousel = document.querySelector('.hero-slider');
  if (!carousel) return;
  const slides = Array.from(carousel.querySelectorAll('[data-slide]'));
  const dots = Array.from(carousel.querySelectorAll('[data-slide-to]'));
  const count = carousel.querySelector('.slider-count');
  let current = 0;
  function show(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => { slide.hidden = i !== current; });
    dots.forEach((dot, i) => dot.setAttribute('aria-pressed', String(i === current)));
    count.textContent = `${String(current + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
  }
  carousel.querySelector('[data-slide-prev]').addEventListener('click', () => show(current - 1));
  carousel.querySelector('[data-slide-next]').addEventListener('click', () => show(current + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => show(i)));
  carousel.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault(); show(current + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  let startX = 0, startY = 0;
  carousel.addEventListener('touchstart', event => {startX = event.changedTouches[0].clientX; startY = event.changedTouches[0].clientY;}, {passive:true});
  carousel.addEventListener('touchend', event => {
    const dx = event.changedTouches[0].clientX - startX;
    const dy = event.changedTouches[0].clientY - startY;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5) show(current + (dx < 0 ? 1 : -1));
  }, {passive:true});
  const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
  function selectTab(index, focus = false) {
    tabs.forEach((tab, i) => {
      const selected = i === index;
      tab.setAttribute('aria-selected', String(selected)); tab.tabIndex = selected ? 0 : -1;
      document.getElementById(tab.getAttribute('aria-controls')).hidden = !selected;
    });
    if (focus) tabs[index].focus();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectTab(index));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) {event.preventDefault(); selectTab(next, true);}
    });
  });
  const track = document.querySelector('.moment-track');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  function scrollGallery(direction) {
    const card = track.querySelector('figure');
    track.scrollBy({left: direction * (card.getBoundingClientRect().width + 18), behavior: reducedMotion.matches ? 'instant' : 'smooth'});
  }
  document.querySelector('[data-gallery-prev]').addEventListener('click', () => scrollGallery(-1));
  document.querySelector('[data-gallery-next]').addEventListener('click', () => scrollGallery(1));
})();
