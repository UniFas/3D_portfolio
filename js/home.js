/* ------------------------------------------------------------------
   Homepage extras. Safe to load next to script.js (it never touches
   the fog canvas or the compare slider).

   HOW TO ADD PROP PHOTOS
   1. Put the images in assets/Props/ (JPG or WEBP, around 1600px wide).
   2. Add an entry to PROPS below and save.
   Images that fail to load are skipped, and with an empty list the
   section shows a short "more on the way" note.
------------------------------------------------------------------- */

const PROPS = [
  // { src: 'assets/Props/barrel.jpg',  title: 'Rusty barrel',  note: 'Finishing touches' },
  // { src: 'assets/Props/lantern.jpg', title: 'Lantern',       note: 'Textures done, final render' },
];

/* ---------- props grid ---------- */

const propsGrid  = document.getElementById('propsGrid');
const propsEmpty = document.getElementById('propsEmpty');

function showEmptyIfNeeded() {
  if (propsEmpty && propsGrid && propsGrid.children.length === 0) propsEmpty.hidden = false;
}

if (propsGrid) {
  PROPS.forEach(p => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'thumb';
    btn.dataset.zoom = p.src;
    btn.dataset.caption = p.title + (p.note ? ': ' + p.note : '');

    const img = document.createElement('img');
    img.src = p.src;
    img.alt = p.title + (p.note ? ' (' + p.note + ')' : '');
    img.loading = 'lazy';
    img.addEventListener('error', () => { btn.remove(); showEmptyIfNeeded(); });

    const label = document.createElement('span');
    label.textContent = p.title;

    btn.append(img, label);
    propsGrid.appendChild(btn);
  });
  showEmptyIfNeeded();
}

/* ---------- lightbox for every [data-zoom] image ---------- */

const lightbox = document.getElementById('lightbox');

if (lightbox) {
  const lbImg   = lightbox.querySelector('img');
  const lbCap   = lightbox.querySelector('.lb-cap');
  const lbClose = lightbox.querySelector('.lb-close');

  document.addEventListener('click', e => {
    const trigger = e.target.closest('[data-zoom]');
    if (!trigger) return;

    const src = trigger.dataset.zoom;
    if (typeof lightbox.showModal !== 'function') { window.open(src, '_blank'); return; }

    const thumb = trigger.querySelector('img');
    lbImg.src = src;
    lbImg.alt = thumb ? thumb.alt : '';
    lbCap.textContent = trigger.dataset.caption || '';
    lightbox.showModal();
  });

  lbClose.addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', e => { if (e.target === lightbox) lightbox.close(); });
}

/* ---------- YouTube: load the player only when it is clicked ---------- */

document.querySelectorAll('.video[data-yt]').forEach(box => {
  const play = box.querySelector('button');
  if (!play) return;
  play.addEventListener('click', () => {
    const iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(box.dataset.yt) +
                 '?autoplay=1&rel=0';
    iframe.title = box.dataset.title || 'Video';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;
    box.replaceChildren(iframe);
  });
});

/* ---------- reveal sections as they scroll in ---------- */

const revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in'));
}
