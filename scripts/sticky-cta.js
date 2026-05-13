/* sticky-cta.js — Mobil sticky bottom CTA bar: Hero geçilince görün, form yakını gizlen */
(function () {
  'use strict';

  const sticky = document.getElementById('sticky-mobile-cta');
  if (!sticky) return;

  // lg breakpoint (≥1024px) gizle — Tailwind lg:hidden zaten yapıyor; ek koruma
  function isMobile() { return window.innerWidth < 1024; }

  const heroEl = document.getElementById('hero');
  const formEl = document.getElementById('kayit');
  const footerEl = document.querySelector('footer');

  if (!heroEl || !formEl) return;
  if (!('IntersectionObserver' in window)) return;

  let heroVisible = true;
  let formVisible = false;
  let footerVisible = false;

  function update() {
    if (!isMobile()) {
      sticky.classList.remove('is-visible');
      return;
    }
    // Görünür: Hero çıkmış + form henüz görünmüyor + footer da görünmüyor
    if (!heroVisible && !formVisible && !footerVisible) {
      sticky.classList.add('is-visible');
    } else {
      sticky.classList.remove('is-visible');
    }
  }

  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.target === heroEl) heroVisible = entry.isIntersecting;
      if (entry.target === formEl) formVisible = entry.isIntersecting;
      if (entry.target === footerEl) footerVisible = entry.isIntersecting;
    });
    update();
  }, { threshold: 0.05 });

  io.observe(heroEl);
  io.observe(formEl);
  if (footerEl) io.observe(footerEl);

  window.addEventListener('resize', update);
  update();
})();
