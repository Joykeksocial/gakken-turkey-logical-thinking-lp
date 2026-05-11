/* modal.js — Modal aç/kapa + focus trap + body scroll lock */
(function () {
  'use strict';

  let activeModal = null;
  let previousFocus = null;

  function trapFocus(modal, e) {
    if (e.key !== 'Tab') return;
    const focusables = modal.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  window.openModal = function (id, opts) {
    opts = opts || {};
    const modal = document.getElementById(id);
    if (!modal) return;
    if (activeModal) window.closeModal();

    previousFocus = (opts.trigger) || document.activeElement;
    activeModal = modal;

    modal.classList.remove('hidden');
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('is-modal-open');

    // Source attribute (modal A/B/C ayırt)
    const sourceInput = modal.querySelector('input[name="lead_source"]');
    if (sourceInput && opts.source) sourceInput.value = opts.source;

    // İlk focusable input'a focus
    setTimeout(function () {
      const firstInput = modal.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([tabindex="-1"]), button:not([data-action="close-modal"])');
      if (firstInput) firstInput.focus({ preventScroll: true });
    }, 50);

    // Tab trap
    modal._trapHandler = function (e) { trapFocus(modal, e); };
    modal.addEventListener('keydown', modal._trapHandler);
  };

  window.closeModal = function () {
    if (!activeModal) return;
    const modal = activeModal;
    modal.classList.remove('is-open');
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('is-modal-open');
    if (modal._trapHandler) {
      modal.removeEventListener('keydown', modal._trapHandler);
      modal._trapHandler = null;
    }
    if (previousFocus && typeof previousFocus.focus === 'function') {
      previousFocus.focus({ preventScroll: true });
    }
    activeModal = null;
    previousFocus = null;
  };
})();
