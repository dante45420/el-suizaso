/* Reference images load only after the visitor opts into the visual preview. */
(() => {
  const button = document.getElementById('toggle-photo-examples');
  if (!button) return;
  const photos = Array.from(document.querySelectorAll('.photo'));
  const notice = document.getElementById('photo-example-notice');
  const original = photos.map(photo => ({label: photo.getAttribute('aria-label'), caption: photo.querySelector('.photo-label').innerHTML}));
  let enabled = false;
  function choose(label) {
    if (/desayuno|café|canasta/.test(label)) return 'desayuno';
    if (/anfitriones|amigos|huéspedes|compartid|personas/.test(label)) return 'amigos';
    if (/habitación|interior/.test(label)) return 'habitacion';
    if (/terraza|exterior|acceso|rincón|espacio/.test(label)) return 'terraza';
    return 'paisaje';
  }
  button.addEventListener('click', () => {
    enabled = !enabled;
    button.setAttribute('aria-pressed', String(enabled));
    button.textContent = enabled ? 'Volver a «Poner foto»' : 'Ver fotos de ejemplo ↗';
    notice.hidden = !enabled;
    document.body.classList.toggle('show-example-photos', enabled);
    photos.forEach((photo, index) => {
      let img = photo.querySelector('.photo-example');
      if (enabled && !img) {
        img = document.createElement('img');
        img.className = 'photo-example'; img.alt = ''; img.width = 1200; img.height = 800;
        img.loading = index === 0 ? 'eager' : 'lazy'; img.decoding = 'async';
        img.src = 'assets/referencias/' + choose(original[index].label) + '.webp';
        photo.prepend(img);
      }
      photo.setAttribute('aria-label', enabled ? 'Fotografía de referencia, no corresponde al hostal: ' + choose(original[index].label) : original[index].label);
      photo.querySelector('.photo-label').innerHTML = enabled ? 'Referencia visual · no es el hostal' : original[index].caption;
    });
  });
})();
