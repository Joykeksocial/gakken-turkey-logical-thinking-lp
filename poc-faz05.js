/* Gakken LP — Faz 0.5 mini-LP ara-POC (Joykek)
 * Faz 1 tekniklerini MINI olcekte + fix'ler baked-in test eder:
 *  (1) CSS scope (.gakken-lp -> Wix'e sizmamali)
 *  (2) fixed eleman body'ye PORTAL (transform'lu Wix container disina)
 *  (3) body scroll-lock-PRESERVE (modal acilinca sayfa ziplamamali)
 *  (4) ID cakisma tespiti (id="hero" Wix ile cakisiyor mu)
 * Tag: gakken-poc (POC ile AYNI -> Yunus sadece Server URL'i degistirir).
 */
(function () {
  if (typeof window === 'undefined' || typeof HTMLElement === 'undefined' || typeof customElements === 'undefined') return;
  if (customElements.get('gakken-poc')) return;

  class GakkenFaz05 extends HTMLElement {
    connectedCallback() {
      if (this._done) return;
      this._done = true;
      var self = this;

      // (1) SCOPED CSS — tum kurallar .gakken-lp altinda (Wix DOM'una sizmamali)
      if (!document.getElementById('gakken-lp-style')) {
        var st = document.createElement('style');
        st.id = 'gakken-lp-style';
        st.textContent =
          '.gakken-lp *{box-sizing:border-box;}' +
          '.gakken-lp{font-family:system-ui,-apple-system,Segoe UI,sans-serif;color:#0B1A12;}' +
          '.gakken-lp h2{font-size:30px;margin:0 0 12px;color:#fff;}' +
          '.gakken-lp .btn{background:#057f44;color:#fff;border:0;border-radius:10px;padding:14px 22px;font-size:16px;cursor:pointer;}' +
          '.gakken-lp-badge{position:fixed;right:20px;bottom:20px;z-index:99999;background:#0B1A12;color:#fff;padding:12px 18px;border-radius:999px;font-size:14px;font-family:system-ui;box-shadow:0 8px 24px rgba(0,0,0,.35);}' +
          '.gakken-lp-modal{position:fixed;inset:0;z-index:99998;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,.6);font-family:system-ui;}' +
          '.gakken-lp-modal.open{display:flex;}' +
          '.gakken-lp-modal .box{background:#fff;border-radius:16px;padding:32px;max-width:440px;text-align:center;}';
        document.head.appendChild(st);
      }

      // Icerik (uzun -> scroll) + cakisabilir ID (#hero) + rapor kutusu
      this.innerHTML =
        '<div class="gakken-lp" style="padding:40px 24px;">' +
          '<div id="hero" style="background:linear-gradient(135deg,#0B1A12,#057f44);border-radius:16px;padding:48px 24px;text-align:center;">' +
            '<p style="letter-spacing:.18em;text-transform:uppercase;font-size:12px;color:#92e884;margin:0 0 10px;">Faz 0.5 mini-LP &middot; Joykek</p>' +
            '<h2>&Ccedil;ak&#305;&#351;ma testi</h2>' +
            '<p style="color:rgba(255,255,255,.88);max-width:520px;margin:0 auto 18px;">A&#351;a&#287;&#305; kayd&#305;r: sa&#287;-alt rozet sabit kalmal&#305;. Butona bas: modal a&ccedil;&#305;l&#305;nca arka plan Z&#304;PLAMAMALI; kapat&#305;nca ayn&#305; yere d&ouml;nmeli.</p>' +
            '<button class="btn" id="gk-open">Modal A&ccedil; (scroll-lock testi)</button>' +
          '</div>' +
          '<div style="height:1500px;display:flex;align-items:center;justify-content:center;color:#717070;font-size:14px;">&#8595; uzun i&ccedil;erik &mdash; kayd&#305;r ve sa&#287;-alt rozeti izle &#8595;</div>' +
          '<pre id="gk-report" style="font-size:13px;background:#f5f5f5;padding:16px;border-radius:10px;white-space:pre-wrap;margin:0;"></pre>' +
        '</div>';

      // (2) FIXED badge -> body'ye PORTAL
      var badge = document.createElement('div');
      badge.className = 'gakken-lp-badge';
      badge.id = 'gk-badge';
      badge.textContent = 'FIXED rozet (sabit kalmali)';
      document.body.appendChild(badge);

      // (3) MODAL -> body'ye portal + scroll-lock-PRESERVE
      var modal = document.createElement('div');
      modal.className = 'gakken-lp-modal';
      modal.id = 'gk-modal';
      modal.innerHTML = '<div class="box"><h2 style="color:#0B1A12;">Modal a&ccedil;&#305;ld&#305;</h2><p style="color:#404040;">Arka plan zaplamamal&#305;. Kapat&#305;nca ayn&#305; scroll noktas&#305;na d&ouml;nmeli.</p><button class="btn" id="gk-close">Kapat</button></div>';
      document.body.appendChild(modal);

      var lockedY = 0;
      function lock() {
        lockedY = window.scrollY || window.pageYOffset || 0;
        document.body.style.position = 'fixed';
        document.body.style.top = (-lockedY) + 'px';
        document.body.style.width = '100%';
        window.__faz05.lockedY = lockedY;
      }
      function unlock() {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, lockedY);
      }
      document.addEventListener('click', function (e) {
        var t = e.target;
        if (t && t.id === 'gk-open') { lock(); modal.classList.add('open'); }
        else if (t && (t.id === 'gk-close' || t === modal)) { modal.classList.remove('open'); unlock(); }
      });

      // (4) ID cakisma + scope-query testi
      var ourHero = self.querySelector('#hero');        // component-root scope (dogru)
      var globalHero = document.getElementById('hero');  // global (Wix ile cakisabilir)
      var idCollision = (ourHero !== globalHero);

      // CSS sizinti kontrolu icin: enjekte ettigimiz style'da bare (scope'suz) element selektoru var mi?
      var styleText = (document.getElementById('gakken-lp-style') || {}).textContent || '';
      var rules = styleText.split('}').map(function (r) { return r.split('{')[0].trim(); }).filter(Boolean);
      var unscopedRules = rules.filter(function (sel) { return sel && sel.indexOf('.gakken-lp') === -1; });

      window.__faz05 = window.__faz05 || {};
      window.__faz05.scopedStyleInjected = !!document.getElementById('gakken-lp-style');
      window.__faz05.unscopedRules = unscopedRules;            // BOS olmali (sizinti yok)
      window.__faz05.badgePortaled = (badge.parentElement === document.body);
      window.__faz05.modalPortaled = (modal.parentElement === document.body);
      window.__faz05.idCollision = idCollision;
      document.documentElement.setAttribute('data-faz05', 'ready');

      var rep = self.querySelector('#gk-report');
      if (rep) rep.textContent =
        'data-faz05 = ready\n' +
        '1) scoped style injected : ' + window.__faz05.scopedStyleInjected + '\n' +
        '   unscoped (sizan) kural : ' + (unscopedRules.length === 0 ? 'YOK (temiz)' : unscopedRules.join(', ')) + '\n' +
        '2) badge body-portal      : ' + window.__faz05.badgePortaled + '\n' +
        '3) modal body-portal      : ' + window.__faz05.modalPortaled + '\n' +
        '4) id="hero" Wix cakisma  : ' + idCollision + (idCollision ? ' (var -> Faz1 scope-query ile cozulur)' : ' (yok)');
    }
  }

  customElements.define('gakken-poc', GakkenFaz05);
})();
