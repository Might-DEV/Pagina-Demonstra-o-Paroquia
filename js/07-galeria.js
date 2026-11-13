/* ============================================================
   js/07-galeria.js
   GALERIA: visualizador em tela cheia das fotos (setas, ESC e clique fora).
   ============================================================ */

(() => {
  // Cards da galeria: cada <button class="gallery-item"> contém uma <img> e uma legenda <span>
  const cards = [...document.querySelectorAll('.gallery-grid .gallery-item')];
  // Elementos do visualizador em tela cheia (markup no fim do index.html)
  const modal = document.getElementById('moment-gallery-viewer');
  const img = document.getElementById('moment-gallery-full-image');
  const cap = document.getElementById('moment-gallery-full-caption');

  // Sem galeria ou sem visualizador na página: não há nada a fazer
  if (!modal || !cards.length) return;

  // Índice da foto exibida no momento
  let idx = 0;

  // Mostra a foto de índice n (circular: depois da última volta à primeira)
  function show(n) {
    idx = (n + cards.length) % cards.length;
    const c = cards[idx];
    const im = c.querySelector('img');
    img.src = im.currentSrc || im.src;
    img.alt = im.alt || '';
    cap.textContent = c.querySelector('span')?.textContent || im.alt || '';
  }

  // Abre o visualizador na foto n e bloqueia a rolagem da página
  function open(n) {
    show(n);
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  // Fecha o visualizador e libera a rolagem
  function close() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    img.removeAttribute('src');
  }

  // Clique em uma miniatura abre a foto correspondente
  cards.forEach((c, i) => c.addEventListener('click', e => { e.preventDefault(); open(i); }));

  // Botões do visualizador: fechar, anterior e próxima
  modal.querySelector('.moment-gallery-close').addEventListener('click', close);
  modal.querySelector('.moment-gallery-prev').addEventListener('click', () => show(idx - 1));
  modal.querySelector('.moment-gallery-next').addEventListener('click', () => show(idx + 1));

  // Clique no fundo escuro (fora da foto) fecha
  modal.addEventListener('click', e => { if (e.target === modal) close(); });

  // Teclado: ESC fecha; setas esquerda/direita navegam
  document.addEventListener('keydown', e => {
    if (!modal.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(idx - 1);
    if (e.key === 'ArrowRight') show(idx + 1);
  });
})();
