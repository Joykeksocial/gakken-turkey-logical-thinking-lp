/* sticky-cta.js — Hem mobile sticky bottom CTA hem desktop floating CTA (v6 Yunus 2026-05-22).
 * Davranış: Hero çıktıktan sonra görünür, form input ekrana gelene veya footer'a kadar görünür kalır.
 * 2026-05-13: Hedef #kayit (tüm Blok 11) → #lead-form-inline (sadece form).
 * 2026-05-22: Desktop floating CTA #floating-cta-desktop eklendi (paralel davranış).
 */
(function () {
  'use strict';

  const stickyMobile = document.getElementById('sticky-mobile-cta');
  const floatingDesktop = document.getElementById('floating-cta-desktop');
  if (!stickyMobile && !floatingDesktop) return;

  const heroEl = document.getElementById('hero');
  const formEl = document.getElementById('lead-form-inline');
  const footerEl = document.querySelector('footer');

  if (!heroEl || !formEl) return;
  if (!('IntersectionObserver' in window)) return;

  let heroVisible = true;
  let formVisible = false;
  let footerVisible = false;

  function isLg() { return window.innerWidth >= 1024; }

  function update() {
    const shouldShow = !heroVisible && !formVisible && !footerVisible;

    // Mobile sticky bottom — sadece <lg ekranda göster
    if (stickyMobile) {
      if (shouldShow && !isLg()) stickyMobile.classList.add('is-visible');
      else stickyMobile.classList.remove('is-visible');
    }

    // Desktop floating right-bottom — sadece lg+ ekranda göster
    if (floatingDesktop) {
      if (shouldShow && isLg()) floatingDesktop.classList.add('is-visible');
      else floatingDesktop.classList.remove('is-visible');
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
