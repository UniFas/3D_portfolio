/* ------------------------------------------------------------------
   Gallery: renders Sketchfab embeds from the list below.

   HOW TO ADD A MODEL
   1. Open the model on Sketchfab.
   2. The ID is the long string of letters and numbers at the end of the
      URL: sketchfab.com/3d-models/royale-mashine-<THIS-PART>
      (or use Share > Embed and copy it from the iframe src).
   3. Add an entry to MODELS and save. Nothing else to edit.

   Entries whose id still starts with "PASTE" are skipped.
------------------------------------------------------------------- */

const MODELS = [
  {
    id: '3d201bfa51e44da0bb8633e9db623f05',
    title: 'Developer Computer',
    note: 'School project prop: a developer workstation modeled and textured in Blender.',
    tags: ['Blender', 'Prop', 'School Project'],
    tris: '',
    textures: ''
  },
  {
    id: '5ac86f3e2780448a8d5c0a54513daa86',
    title: 'Wizard\u2019s Laboratory',
    note: 'Low-poly environment built for my game.',
    tags: ['Low-Poly', 'Environment', 'Game Asset'],
    tris: '',      // e.g. '12.4k'
    textures: ''   // e.g. '2K PBR'
  },
  {
    id: '0f266fe6a8994180865d41ea5d71ffe0',
    title: 'Powerbound CLA Supplement Bottle',
    note: 'Product visual made for a supplements brand advertisement.',
    tags: ['Product', 'Advertisement', 'Commercial'],
    tris: '',
    textures: ''
  },
];

/* ---------- render ---------- */

const grid = document.getElementById('galleryGrid');
const empty = document.getElementById('galleryEmpty');

const live = MODELS.filter(m => m.id && !m.id.startsWith('PASTE'));

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

live.forEach(m => {
  const card = el('article', 'model-card');

  const frame = el('div', 'model-frame');
  const iframe = document.createElement('iframe');
  iframe.title = m.title + ' - interactive 3D model';
  iframe.loading = 'lazy';
  iframe.allowFullscreen = true;
  iframe.setAttribute('allow', 'autoplay; fullscreen; xr-spatial-tracking');
  iframe.src = 'https://sketchfab.com/models/' + encodeURIComponent(m.id) +
    '/embed?autospin=0.3&ui_theme=dark&dnt=1';
  frame.appendChild(iframe);

  const info = el('div', 'model-info');
  info.appendChild(el('h2', '', m.title));
  if (m.note) info.appendChild(el('p', '', m.note));

  if (m.tris || m.textures) {
    const meta = el('div', 'model-meta');
    if (m.tris) {
      const s = el('span', '', 'Tris ');
      s.appendChild(el('b', '', m.tris));
      meta.appendChild(s);
    }
    if (m.textures) {
      const s = el('span', '', 'Textures ');
      s.appendChild(el('b', '', m.textures));
      meta.appendChild(s);
    }
    info.appendChild(meta);
  }

  if (m.tags && m.tags.length) {
    const row = el('div', 'tag-row');
    m.tags.forEach(t => row.appendChild(el('span', 'tag', t)));
    info.appendChild(row);
  }

  const link = el('a', 'model-link', 'Open on Sketchfab ↗');
  link.href = 'https://sketchfab.com/models/' + encodeURIComponent(m.id);
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  info.appendChild(link);

  card.appendChild(frame);
  card.appendChild(info);
  grid.appendChild(card);
});

if (live.length === 0) empty.hidden = false;

/* ---------- nav + cursor glow (same behaviour as the home page) ---------- */

const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.addEventListener('mousemove', e => {
    document.documentElement.style.setProperty('--mx', e.clientX + 'px');
    document.documentElement.style.setProperty('--my', e.clientY + 'px');
  }, { passive: true });
}
