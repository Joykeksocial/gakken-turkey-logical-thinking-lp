/* cta.js — CTA buton davranışları: smooth scroll + modal trigger */
(function () {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const scrollBehavior = reducedMotion ? 'auto' : 'smooth';

  document.addEventListener('click', function (e) {
    const trigger = e.target.closest('[data-action]');
    if (!trigger) return;
    const action = trigger.dataset.action;

    if (action === 'scroll') {
      e.preventDefault();
      const sel = trigger.dataset.target || trigger.getAttribute('href');
      if (!sel) return;
      const target = document.querySelector(sel);
      if (!target) return;
      target.scrollIntoView({ behavior: scrollBehavior, block: 'start' });
      // Scroll bittikten sonra form ilk input'a focus (UX standart)
      const focusEl = target.querySelector('input:not([type="hidden"]):not([type="checkbox"]), textarea');
      if (focusEl) {
        setTimeout(function () {
          focusEl.focus({ preventScroll: true });
        }, reducedMotion ? 0 : 500);
      }
    } else if (action === 'open-modal') {
      e.preventDefault();
      const modalId = trigger.dataset.modal;
      const source = trigger.dataset.source || '';
      if (window.openModal) window.openModal(modalId, { source: source, trigger: trigger });
    } else if (action === 'close-modal') {
      e.preventDefault();
      if (window.closeModal) window.closeModal();
    }
  });

  // ESC global → modal kapatır
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && window.closeModal) window.closeModal();
  });
})();
