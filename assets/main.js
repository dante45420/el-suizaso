
  const roomSelect = document.getElementById('roomtype');
  const checkin = document.getElementById('checkin');
  const checkout = document.getElementById('checkout');
  const roomsInput = document.getElementById('rooms');

  const sumRoom = document.getElementById('sum-room');
  const sumNights = document.getElementById('sum-nights');
  const sumRooms = document.getElementById('sum-rooms');
  const sumPerNight = document.getElementById('sum-perNight');
  const sumTotal = document.getElementById('sum-total');
  const guestsInput = document.getElementById('guests');
  const roomsWrap = document.getElementById('roomsWrap');



  const form = document.getElementById('booking-form');
  const button = document.getElementById('openWhatsapp');
  const money = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });
  function localDate() {
    const parts = new Intl.DateTimeFormat('en-CA', {timeZone:'America/Santiago',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
    const part = type => parts.find(p => p.type === type).value;
    return `${part('year')}-${part('month')}-${part('day')}`;
  }
  function nextDate(value) { return new Date(Date.parse(value + 'T00:00:00Z') + 86400000).toISOString().slice(0,10); }
  function nightsBetween() {
    if (!checkin.value || !checkout.value) return 0;
    return Math.max(0, (Date.parse(checkout.value + 'T00:00:00Z') - Date.parse(checkin.value + 'T00:00:00Z')) / 86400000);
  }
  function recalc() {
    [checkin, checkout].forEach(input => input.setAttribute('data-empty', String(!input.value)));
    checkin.min = localDate();
    checkout.min = nextDate(checkin.value >= checkin.min ? checkin.value : checkin.min);
    const opt = roomSelect.selectedOptions[0];
    const multi = opt.dataset.multi === 'true';
    const perPerson = opt.dataset.mode === 'person';
    roomsWrap.hidden = !multi;
    roomsWrap.style.display = multi ? 'flex' : 'none';
    roomsInput.disabled = !multi;
    const guests = Number(guestsInput.value);
    const rooms = multi ? Number(roomsInput.value) : 1;
    const quantity = perPerson ? guests : rooms;
    const nights = nightsBetween();
    const total = Number(opt.value) * quantity * nights;
    sumRoom.textContent = opt.dataset.name;
    sumNights.textContent = nights;
    sumRooms.textContent = perPerson ? `${guests || 0} persona(s)` : `${rooms || 0} habitación(es)`;
    sumPerNight.textContent = money.format(Number(opt.value)) + (perPerson ? ' / persona' : ' / habitación');
    sumTotal.textContent = Number.isFinite(total) ? money.format(total) : '—';
    button.disabled = !(nights > 0 && checkin.validity.valid && checkout.validity.valid && guestsInput.validity.valid && roomsInput.validity.valid);
    return total;
  }
  form.addEventListener('input', recalc);
  checkin.addEventListener('change', () => {
    if (checkin.value && checkout.value && checkout.value <= checkin.value) checkout.value = nextDate(checkin.value);
    recalc();
  });
  window.addEventListener('pageshow', recalc);
  form.addEventListener('submit', event => {
    event.preventDefault();
    const total = recalc();
    if (button.disabled || !form.reportValidity()) return;
    const opt = roomSelect.selectedOptions[0];
    const name = document.getElementById('name').value.trim();
    let message = 'Hola, me interesa reservar en El Suizaso.';
    if (name) message += ` Mi nombre es ${name}.`;
    message += ` Habitación: ${opt.dataset.name}. Llegada: ${checkin.value}. Salida: ${checkout.value}. Huéspedes: ${guestsInput.value}.`;
    if (opt.dataset.multi === 'true') message += ` Habitaciones: ${roomsInput.value}.`;
    message += ` Total referencial: ${money.format(total)} por ${nightsBetween()} noche(s). ¿Me confirman disponibilidad y tarifa final?`;
    window.open('https://wa.me/56981591765?text=' + encodeURIComponent(message), '_blank', 'noopener,noreferrer');
  });
  recalc();
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.getElementById('menu');
  function closeMenu() { toggle.setAttribute('aria-expanded', 'false'); menu.classList.remove('is-open'); }
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open)); menu.classList.toggle('is-open', open);
  });
  menu.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { closeMenu(); toggle.focus(); } });
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), {threshold: .08});
    document.querySelectorAll('.section-head, .room-card, .place-layout, .faq details').forEach(el => {el.classList.add('reveal-ready'); observer.observe(el);});
  }
