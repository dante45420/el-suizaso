/* Lightweight carousels with pause controls and reduced-motion support. */
(() => {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  function autoAdvance(root, button, advance, delay, onState = () => {}) {
    let paused = motion.matches, hover = false, focused = false, visible = true, timer;
    function stop() { clearTimeout(timer); timer = undefined; }
    function schedule() {
      stop();
      button.textContent = paused ? '▶' : 'Ⅱ';
      button.setAttribute('aria-pressed', String(paused));
      button.setAttribute('aria-label', paused ? 'Reanudar presentación automática' : 'Pausar presentación automática');
      onState(paused || hover || focused || !visible || document.hidden);
      if (!paused && !hover && !focused && visible && !document.hidden) {
        timer = setTimeout(() => { advance(); schedule(); }, delay);
      }
    }
    button.addEventListener('click', () => { paused = !paused; schedule(); });
    root.addEventListener('mouseenter', () => {hover = true; schedule();});
    root.addEventListener('mouseleave', () => {hover = false; schedule();});
    root.addEventListener('focusin', () => {focused = true; schedule();});
    root.addEventListener('focusout', event => {
      if (!event.relatedTarget || !root.contains(event.relatedTarget)) {focused = false; schedule();}
    });
    document.addEventListener('visibilitychange', schedule);
    motion.addEventListener('change', () => { if (motion.matches) paused = true; schedule(); });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(entries => {visible = entries[0].isIntersecting; schedule();}, {threshold:.15}).observe(root);
    }
    schedule();
  }
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
  autoAdvance(carousel, carousel.querySelector('[data-hero-play]'), () => show(current + 1), 5500,
    paused => count.setAttribute('aria-live', paused ? 'polite' : 'off'));
  const comfort = document.querySelector('.comfort-strip');
  const comfortViewport = comfort.querySelector('.comfort-viewport');
  const comfortItems = Array.from(comfort.querySelectorAll('.comfort-item'));
  function scrollComfort(direction) {
    const width = comfortItems[0].getBoundingClientRect().width;
    if (width <= 0) return;
    const visible = Math.max(1, Math.round(comfortViewport.clientWidth / width));
    const maxIndex = Math.max(0, comfortItems.length - visible);
    const currentIndex = Math.round(comfortViewport.scrollLeft / width);
    let next = currentIndex + direction;
    if (next > maxIndex) next = 0;
    if (next < 0) next = maxIndex;
    comfortViewport.scrollTo({left:next * width, behavior: motion.matches ? 'instant' : 'smooth'});
  }
  comfort.querySelector('[data-comfort-prev]').addEventListener('click', () => scrollComfort(-1));
  comfort.querySelector('[data-comfort-next]').addEventListener('click', () => scrollComfort(1));
  comfortViewport.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault(); scrollComfort(event.key === 'ArrowRight' ? 1 : -1);
    }
  });
  autoAdvance(comfort, comfort.querySelector('[data-comfort-play]'), () => scrollComfort(1), 4200);
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
