/* reveal.js — SSR progressive enhancement reveal pattern
   Bağlam: feedback_reveal_ssr_progressive_enhancement memory.
   Default: visible (CSS opacity:1). JS sonra `data-pending="true"` set → IO `is-visible` ekler. 3sn safety timer. */
(function () {
  'use strict';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Reduced motion: hiçbir şey yapma, default visible kalır
    return;
  }

  const els = document.querySelectorAll('.reveal-on-scroll');
  if (els.length === 0) return;

  // Pending state set
  els.forEach(function (el) { el.setAttribute('data-pending', 'true'); });

  if (!('IntersectionObserver' in window)) {
    // Fallback: hepsini hemen göster
    els.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -10% 0px' });

  els.forEach(function (el) { io.observe(el); });

  // 3sn safety timer — hala pending element varsa zorla reveal
  // (Lighthouse fullPage screenshot + crawler için kritik — feedback_reveal_ssr_progressive_enhancement)
  setTimeout(function () {
    els.forEach(function (el) {
      if (!el.classList.contains('is-visible')) {
        el.classList.add('is-visible');
        io.unobserve(el);
      }
    });
  }, 3000);

  // Window dışı force-reveal yardımcısı (screenshot tool için)
  window.__revealAll = function () {
    els.forEach(function (el) { el.classList.add('is-visible'); });
  };
})();
