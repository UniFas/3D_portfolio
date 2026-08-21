  // nav background on scroll
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });

  // cursor glow
  const glow = document.getElementById('glow');
  window.addEventListener('pointermove', (e) => {
    glow.style.setProperty('--mx', e.clientX + 'px');
    glow.style.setProperty('--my', e.clientY + 'px');
  });
  document.documentElement.style.setProperty('--mx','50%');
  document.documentElement.style.setProperty('--my','40%');

  // reveal slider
  const range = document.getElementById('vpRange');
  const viewport = document.getElementById('viewport');
  range.addEventListener('input', () => {
    viewport.style.setProperty('--reveal', range.value + '%');
  });

  // project grid filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card[data-category]');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const filter = btn.dataset.filter;

      cards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('is-filtered-out', !match);
      });
    });
  });

  // ambient fog / particle canvas in hero
  const canvas = document.getElementById('fog');
  const ctx = canvas.getContext('2d');
  let w, h, particles = [];

  function resize(){
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const count = reduceMotion ? 0 : 46;

  for(let i=0;i<count;i++){
    particles.push({
      x: Math.random()*w,
      y: Math.random()*h,
      r: Math.random()*1.6 + 0.4,
      vy: -(Math.random()*0.18 + 0.04),
      vx: (Math.random()-0.5)*0.06,
      a: Math.random()*0.5 + 0.15
    });
  }

  function tick(){
    ctx.clearRect(0,0,w,h);
    ctx.fillStyle = 'rgba(234,234,234,1)';
    for(const p of particles){
      ctx.globalAlpha = p.a;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fill();
      p.y += p.vy;
      p.x += p.vx;
      if(p.y < -10){ p.y = h+10; p.x = Math.random()*w; }
    }
    ctx.globalAlpha = 1;
    if(!reduceMotion) requestAnimationFrame(tick);
  }
  tick();
