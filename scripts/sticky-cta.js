/* sticky-cta.js — Mobil sticky bottom CTA bar: Hero geçilince görün, form yakını gizlen
 * 2026-05-13 fix: Hedef #kayit (tüm Blok 11) → #lead-form-inline (sadece form).
 * Eski davranışta Blok 11 ROI Outcome strip viewport'a girer girmez sticky
 * gizleniyordu (form çok aşağıda olmasına rağmen); yeni davranışta gerçek
 * form input'u ekrana gelene kadar sticky görünür kalır. */
(function () {
  'use strict';

  const sticky = document.getElementById('sticky-mobile-cta');
  if (!sticky) return;

  // lg breakpoint (≥1024px) gizle — Tailwind lg:hidden zaten yapıyor; ek koruma
  function isMobile() { return window.innerWidth < 1024; }

  const heroEl = document.getElementById('hero');
  const formEl = document.getElementById('lead-form-inline');
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
    // Görünür: Hero çıkmış + form input'u henüz görünmüyor + footer da görünmüyor
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
