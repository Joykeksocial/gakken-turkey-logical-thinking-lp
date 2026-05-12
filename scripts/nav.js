/* nav.js — Mobile drawer toggle (anchor menü mobile için) */
(function () {
  'use strict';

  const toggle = document.getElementById('mobile-menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const iconOpen = document.getElementById('menu-icon-open');
  const iconClose = document.getElementById('menu-icon-close');
  if (!toggle || !menu) return;

  function open() {
    menu.classList.add('is-open');
    menu.classList.remove('hidden');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Menüyü kapat');
    if (iconOpen) iconOpen.classList.add('hidden');
    if (iconClose) iconClose.classList.remove('hidden');
  }
  function close() {
    menu.classList.remove('is-open');
    menu.classList.add('hidden');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Menüyü aç');
    if (iconOpen) iconOpen.classList.remove('hidden');
    if (iconClose) iconClose.classList.add('hidden');
  }

  toggle.addEventListener('click', function () {
    if (menu.classList.contains('is-open')) close(); else open();
  });

  // Menüden bir anchor link tıklanırsa drawer kapansın
  // (cta.js scroll davranışını ayrıca yapacak — burada sadece drawer state)
  document.addEventListener('click', function (e) {
    const link = e.target.closest('[data-close-menu]');
    if (link && menu.classList.contains('is-open')) close();
  });

  // ESC ile kapat
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      close();
      toggle.focus();
    }
  });

  // Breakpoint lg+ (≥1024px) olunca drawer auto-close (resize)
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 1024 && menu.classList.contains('is-open')) close();
  });
})();
