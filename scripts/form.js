/* form.js — Lead form validasyon + Formspree submit + teşekkür modal */
(function () {
  'use strict';

  // Tüm form'lar için ortak validasyon
  function validate(form) {
    let valid = true;
    const errors = [];
    const fields = [
      { name: 'ad_soyad', errMsg: 'Lütfen ad ve soyadınızı girin (en az 2 karakter).', check: function (v) { return v.trim().length >= 2; } },
      { name: 'telefon', errMsg: 'Lütfen geçerli bir telefon numarası girin (örn. 0 5XX XXX XX XX).', check: function (v) {
          const clean = v.replace(/\s|-/g, '');
          return /^(\+90|0)?5\d{9}$/.test(clean) || /^\+?\d{10,15}$/.test(clean);
        } },
      { name: 'email', errMsg: 'Lütfen geçerli bir e-posta adresi girin.', check: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); } },
      { name: 'kvkk_onay', errMsg: 'Formu göndermek için KVKK Aydınlatma Metni\'ni onaylamanız gerekir.', check: function (v, el) { return el.checked; } }
    ];
    let firstErrorField = null;
    fields.forEach(function (f) {
      const el = form.querySelector('[name="' + f.name + '"]');
      if (!el) return;
      const val = el.type === 'checkbox' ? el.checked : el.value;
      const ok = f.check(val, el);
      const errEl = form.querySelector('#' + el.id + '-error') || form.querySelector('[data-error-for="' + f.name + '"]');
      if (!ok) {
        valid = false;
        if (!firstErrorField) firstErrorField = el;
        el.classList.add('has-error');
        el.setAttribute('aria-invalid', 'true');
        if (errEl) {
          errEl.textContent = f.errMsg;
          errEl.classList.add('is-visible');
        }
      } else {
        el.classList.remove('has-error');
        el.removeAttribute('aria-invalid');
        if (errEl) {
          errEl.textContent = '';
          errEl.classList.remove('is-visible');
        }
      }
    });
    if (firstErrorField) firstErrorField.focus({ preventScroll: false });
    return valid;
  }

  // Honeypot kontrolü (bot dolduruyorsa submit'i sessizce başarılı görünüştür ama atma)
  function isBot(form) {
    const honey = form.querySelector('[name="_gotcha"]');
    return honey && honey.value.trim() !== '';
  }

  async function submitForm(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const idleLabel = submitBtn.querySelector('[data-state="idle"]');
    const loadingLabel = submitBtn.querySelector('[data-state="loading"]');
    const banner = form.querySelector('[data-error-banner]');

    if (banner) banner.classList.remove('is-visible');
    submitBtn.disabled = true;
    if (idleLabel && loadingLabel) {
      idleLabel.classList.add('hidden');
      loadingLabel.classList.remove('hidden');
    }

    const formData = new FormData(form);
    const endpoint = form.getAttribute('action');
    // n8n webhook: urlencoded gönder (simple request -> CORS preflight YOK) + source/page metadata
    const params = new URLSearchParams();
    formData.forEach(function (v, k) { params.append(k, v); });
    if (!params.has('source')) params.append('source', form.dataset.source || '');
    params.append('page', (typeof location !== 'undefined' && location.href) || '');

    try {
      // GÜVENLİK: endpoint gerçek bir http(s) URL değilse (placeholder / eski-cache / hatalı embed)
      // ASLA sessizce "teşekkürler" gösterme — görünür hata ver. Aksi halde kullanıcı "gönderdim" sanır ama mail gitmez.
      if (!endpoint || !/^https?:\/\//i.test(endpoint) || endpoint.indexOf('{{') !== -1 || endpoint.indexOf('REPLACE_ME') !== -1) {
        console.error('[form] Gecersiz endpoint, gonderilmedi:', endpoint);
        showError(banner, 'Form şu anda gönderilemiyor. Lütfen info@gakkenturkey.com adresine yazın ya da birazdan tekrar deneyin.');
        return;
      }

      const res = await fetch(endpoint, {
        method: 'POST',
        body: params,
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        onSuccess(form);
      } else {
        const data = await res.json().catch(function () { return null; });
        const msg = (data && data.errors && data.errors[0] && data.errors[0].message) || 'Talebiniz gönderilemedi. Lütfen tekrar deneyin veya info@gakkenturkey.com adresine yazın.';
        showError(banner, msg);
      }
    } catch (err) {
      console.error('[form] submit error', err);
      showError(banner, 'Ağ hatası. Lütfen internet bağlantınızı kontrol edip tekrar deneyin.');
    } finally {
      submitBtn.disabled = false;
      if (idleLabel && loadingLabel) {
        idleLabel.classList.remove('hidden');
        loadingLabel.classList.add('hidden');
      }
    }
  }

  function showError(banner, msg) {
    if (!banner) return;
    banner.textContent = msg;
    banner.classList.add('is-visible');
  }

  function onSuccess(form) {
    // Form modal açık ise kapat
    if (window.closeModal) window.closeModal();
    // Inline form ise gizle
    if (form.id === 'lead-form-inline') {
      form.style.display = 'none';
    }
    form.reset();
    // Teşekkür modal aç
    setTimeout(function () {
      if (window.openModal) window.openModal('thank-you-modal', { source: form.dataset.source || 'success' });
    }, 100);
  }

  document.addEventListener('submit', function (e) {
    const form = e.target.closest('[data-form="lead"]');
    if (!form) return;
    e.preventDefault();
    if (isBot(form)) {
      console.warn('[form] honeypot triggered — silent reject');
      onSuccess(form); // bot'un fark etmemesi için success göster
      return;
    }
    if (!validate(form)) return;
    submitForm(form);
  });

  // Realtime: input değişince error temizle (UX)
  document.addEventListener('input', function (e) {
    const el = e.target;
    if (!el.matches('input, textarea')) return;
    if (el.classList.contains('has-error')) {
      el.classList.remove('has-error');
      el.removeAttribute('aria-invalid');
      const errEl = el.id && document.getElementById(el.id + '-error');
      if (errEl) {
        errEl.classList.remove('is-visible');
        errEl.textContent = '';
      }
    }
  });
})();
