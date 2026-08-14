/* legal-year.js — Yasal alt banttaki telif yılı (sayfa açılışında güncellenir).
 * 2027'de otomatik "2027" yazar; elle güncelleme gerekmez.
 */
(function () {
  'use strict';

  var el = document.getElementById('lp-legal-year');
  if (!el) return;
  el.textContent = String(new Date().getFullYear());
})();
