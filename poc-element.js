/* Gakken LP — Wix Custom Element POC v3 (Joykek)
 * v3 FIX: Wix kodu hem tarayicida hem SSR/sunucu baglaminda degerlendirir.
 *         SSR'de HTMLElement tanimsiz -> "ReferenceError: HTMLElement is not defined".
 *         Cozum: guard ile sar; tarayici-disi baglamda temiz cik.
 * Server URL ile baglanir. Tag: gakken-poc
 */
(function () {
  // Tarayici-disi (SSR/Node/worker) baglamda HTMLElement/customElements yok -> hata firlatma, sessiz cik.
  if (typeof window === 'undefined' || typeof HTMLElement === 'undefined' || typeof customElements === 'undefined') {
    return;
  }
  if (customElements.get('gakken-poc')) return;

  class GakkenPoc extends HTMLElement {
    connectedCallback() {
      if (this._done) return;
      this._done = true;

      this.style.display = 'block';
      this.style.width = '100%';
      if (this.parentElement) this.parentElement.style.width = '100%';

      var realDom = false;
      try { realDom = (window.self === window.top); } catch (e) { realDom = false; }
      try { document.documentElement.setAttribute('data-gakken-poc', realDom ? 'topdom' : 'iframe'); } catch (e) {}
      var ortam = realDom
        ? 'Render ortam&#305;: GER&Ccedil;EK DOM (canl&#305;) &#10003;'
        : 'Render ortam&#305;: IFRAME (Preview &mdash; CANLI yay&#305;nda tekrar bak)';
      var ortamRenk = realDom ? '#92e884' : '#ffd479';

      this.innerHTML =
        '<div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;' +
        'background:linear-gradient(135deg,#0B1A12 0%,#057f44 100%);color:#fff;' +
        'padding:56px 24px;border-radius:16px;text-align:center;box-shadow:0 20px 50px -20px rgba(0,0,0,.4);">' +
          '<p style="letter-spacing:.18em;text-transform:uppercase;font-size:12px;font-weight:700;color:#92e884;margin:0 0 14px;">Custom Element POC v3 &middot; Joykek</p>' +
          '<h2 style="font-size:clamp(26px,5vw,44px);line-height:1.05;margin:0 0 14px;font-weight:800;">&Ouml;zel &Ouml;ge &ccedil;al&#305;&#351;&#305;yor &#10003;</h2>' +
          '<p style="opacity:.88;font-size:16px;max-width:560px;margin:0 auto 22px;line-height:1.5;">Bu kutu Wix sayfas&#305;na bir Web Component olarak yerle&#351;ti. Render + DOM ortam&#305; + geni&#351;lik + harici y&uuml;kleme testi.</p>' +
          '<p id="gakken-poc-env" style="font-size:14px;font-weight:600;margin:0 0 8px;color:' + ortamRenk + ';">' + ortam + '</p>' +
          '<p id="gakken-poc-ext" style="font-size:14px;opacity:.75;margin:0;">Harici fetch testi: y&uuml;kleniyor&hellip;</p>' +
        '</div>';

      var self = this;
      fetch('https://joykeksocial.github.io/gakken-turkey-logical-thinking-lp/index.html', { method: 'HEAD' })
        .then(function (r) { var el = self.querySelector('#gakken-poc-ext'); if (el) el.textContent = 'Harici fetch testi: BASARILI (HTTP ' + r.status + ')'; })
        .catch(function (e) { var el = self.querySelector('#gakken-poc-ext'); if (el) el.textContent = 'Harici fetch testi: HATA — ' + (e && e.message ? e.message : e); });
    }
  }

  customElements.define('gakken-poc', GakkenPoc);
})();
