/* Gakken LP — Wix Custom Element POC v2 (Joykek)
 * Wix Velo dosyasi olarak: public/custom-elements/ altina. Tag: gakken-poc
 * Amaç: mekanizmayi DE-RISK et. Test: (1) CANLI render, (2) gercek DOM mu iframe mi,
 *       (3) genislik %100 override, (4) harici fetch (Faz2 form buna dayanacak).
 * ÖNEMLI: SADECE YAYINLANMIS canli sayfa URL'inde dogrula — Preview iframe yaniltir.
 * Bu DENEME — tam wrapper Faz1'de gelir, bu silinir.
 */
class GakkenPoc extends HTMLElement {
  connectedCallback() {
    if (this._done) return;
    this._done = true;

    // Genislik override (Wix bazen sabit pixel dayatir)
    this.style.display = 'block';
    this.style.width = '100%';
    if (this.parentElement) this.parentElement.style.width = '100%';

    // Render ortami: top window (gercek DOM = canli) mi, iframe (Preview sandbox) mi?
    var realDom = false;
    try { realDom = (window.self === window.top); } catch (e) { realDom = false; }
    try { document.documentElement.setAttribute('data-gakken-poc', realDom ? 'topdom' : 'iframe'); } catch (e) {}
    var ortam = realDom
      ? 'Render ortam&#305;: GER&Ccedil;EK DOM (canl&#305;) &#10003;'
      : 'Render ortam&#305;: IFRAME (Preview/edit&ouml;r &mdash; CANLI yay&#305;nda tekrar bak)';
    var ortamRenk = realDom ? '#92e884' : '#ffd479';

    this.innerHTML =
      '<div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;' +
      'background:linear-gradient(135deg,#0B1A12 0%,#057f44 100%);color:#fff;' +
      'padding:56px 24px;border-radius:16px;text-align:center;box-shadow:0 20px 50px -20px rgba(0,0,0,.4);">' +
        '<p style="letter-spacing:.18em;text-transform:uppercase;font-size:12px;font-weight:700;' +
          'color:#92e884;margin:0 0 14px;">Custom Element POC v2 &middot; Joykek</p>' +
        '<h2 style="font-size:clamp(26px,5vw,44px);line-height:1.05;margin:0 0 14px;font-weight:800;">' +
          '&Ouml;zel &Ouml;ge &ccedil;al&#305;&#351;&#305;yor &#10003;</h2>' +
        '<p style="opacity:.88;font-size:16px;max-width:560px;margin:0 auto 22px;line-height:1.5;">' +
          'Bu kutu Wix sayfas&#305;na bir Web Component olarak yerle&#351;ti. Render + DOM ortam&#305; + geni&#351;lik + harici y&uuml;kleme testi.</p>' +
        '<p id="gakken-poc-env" style="font-size:14px;font-weight:600;margin:0 0 8px;color:' + ortamRenk + ';">' + ortam + '</p>' +
        '<p id="gakken-poc-ext" style="font-size:14px;opacity:.75;margin:0;">Harici fetch testi: y&uuml;kleniyor&hellip;</p>' +
      '</div>';

    // Harici fetch testi — Faz2 form gonderimi (fetch) bu mekanizmaya dayanacak
    var self = this;
    fetch('https://joykeksocial.github.io/gakken-turkey-logical-thinking-lp/index.html', { method: 'HEAD' })
      .then(function (r) {
        var el = self.querySelector('#gakken-poc-ext');
        if (el) el.textContent = 'Harici fetch testi: BASARILI (HTTP ' + r.status + ')';
      })
      .catch(function (e) {
        var el = self.querySelector('#gakken-poc-ext');
        if (el) el.textContent = 'Harici fetch testi: HATA — ' + (e && e.message ? e.message : e);
      });
  }
}

if (!customElements.get('gakken-poc')) {
  customElements.define('gakken-poc', GakkenPoc);
}
