/* Horror Stories page: scroll reveal, click-to-load YouTube, lightbox. */
(function () {
  'use strict';

  /* scroll reveal (home.css hides .reveal only when html.js is set) */
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  /* YouTube facade: thumbnail first, iframe only after click */
  document.querySelectorAll('.video[data-yt]').forEach(function (box) {
    var id = box.dataset.yt;
    box.style.backgroundImage = 'url("https://i.ytimg.com/vi/' + id + '/hqdefault.jpg")';
    var btn = box.querySelector('button');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var f = document.createElement('iframe');
      f.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0';
      f.title = box.dataset.title || 'Video';
      f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      f.allowFullscreen = true;
      box.innerHTML = '';
      box.appendChild(f);
    });
  });

  /* lightbox for stills */
  var lb = document.getElementById('lb');
  if (!lb) return;
  var img = lb.querySelector('img');
  var cap = lb.querySelector('.lb-cap');
  document.querySelectorAll('[data-full]').forEach(function (b) {
    b.addEventListener('click', function () {
      img.src = b.dataset.full;
      img.alt = b.querySelector('img') ? b.querySelector('img').alt : '';
      cap.textContent = b.dataset.cap || '';
      lb.showModal();
    });
  });
  lb.querySelector('.lb-close').addEventListener('click', function () { lb.close(); });
  lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });
})();
