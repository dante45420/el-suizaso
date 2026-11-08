/* Keep the booking action out of the way of the form, footer and mobile keyboard. */
(() => {
  const booking = document.getElementById('reservar');
  const footer = document.querySelector('footer');
  const floating = Array.from(document.querySelectorAll('.p-floating, .whatsapp-float'));
  let bookingVisible = false, footerVisible = false, editing = false;
  const update = () => floating.forEach(link => {link.hidden = bookingVisible || footerVisible || editing;});
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.target === booking) bookingVisible = entry.isIntersecting;
        if (entry.target === footer) footerVisible = entry.isIntersecting;
      });
      update();
    }, {threshold:0});
    if (booking) observer.observe(booking);
    if (footer) observer.observe(footer);
  }
  document.addEventListener('focusin', event => {
    editing = Boolean(event.target.closest('input, select, textarea'));
    update();
  });
  document.addEventListener('focusout', event => {
    editing = Boolean(event.relatedTarget && event.relatedTarget.closest('input, select, textarea'));
    update();
  });
  const menu = document.getElementById('menu');
  const toggle = document.querySelector('.menu-toggle');
  function closeMenu() {
    if (!menu || !toggle) return;
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }
  document.addEventListener('click', event => {
    if (menu && toggle && !menu.contains(event.target) && !toggle.contains(event.target)) closeMenu();
  });
  document.querySelectorAll('.plan-tabs [role="tab"]').forEach(tab => {
    tab.addEventListener('focus', () => {
      if (matchMedia('(max-width: 760px)').matches) tab.scrollIntoView({block:'nearest', inline:'nearest', behavior:'instant'});
    });
  });
  matchMedia('(min-width: 901px)').addEventListener('change', event => {if (event.matches) closeMenu();});
})();
