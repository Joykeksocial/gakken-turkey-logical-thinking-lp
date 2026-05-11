# Gakken Turkey — Logical Thinking & 5 Webinar Paketi LP (Aşama 1 Preview)

Pure HTML + Tailwind CDN + vanilla JS landing page. **Aşama 1 statik preview** olarak GitHub Pages üzerinde yayınlanır; Gakken (İrem → Seki Bey) görsel/içerik onayı sonrası **Aşama 2 Wix Studio** rebuild edilecek.

- **Müşteri:** Gakken Turkey İnovatif Eğitim A.Ş.
- **Joykek proje klasörü:** `projeler/gakken_turkiye/logical_thinking_lp/`
- **GitHub repo:** [`Joykeksocial/gakken-turkey-logical-thinking-lp`](https://github.com/Joykeksocial/gakken-turkey-logical-thinking-lp)
- **Preview URL:** [https://joykeksocial.github.io/gakken-turkey-logical-thinking-lp/](https://joykeksocial.github.io/gakken-turkey-logical-thinking-lp/)
- **Status:** Aşama 1 build tamamlandı · Yunus repo açacak + push + GitHub Pages aktive
- **Naming zorunlu:** "Gakken Turkey" (Türkçe karşılığı **YASAK** — tüm copy + meta + alt).

---

## Mimari (Aşama 1)

| Katman | Teknoloji | Not |
|---|---|---|
| Markup | Pure HTML5 | 10 bölüm semantic — `<section>`/`<article>`/`<blockquote>`/`<dl>` |
| Styling | Tailwind CSS via CDN (`cdn.tailwindcss.com`) | Inline `tailwind.config` (design_system §10 preset) + `styles/custom.css` |
| Yazı tipi | Google Fonts: Poppins + IBM Plex Sans | `preconnect` + `preload` + `display=swap` |
| Etkileşim | 5 vanilla JS modülü (defer) | `cta.js` · `form.js` · `modal.js` · `reveal.js` · `sticky-cta.js` |
| Form | Formspree.io free tier (50 submit/ay) | Endpoint placeholder — Yunus deploy sonrası doldurur |
| Görseller | WebP (1280w) + JPG fallback | 15MB → 2.5MB (%83 küçülme, ffmpeg) |
| İkonografi | Inline SVG (Lucide pattern) | currentColor, aria-hidden decorative |
| Hosting | GitHub Pages (public repo, $0, HTTPS otomatik) | A kaydı / DNS dokunulmuyor |
| Analytics | YOK (ilk yayın — Yunus 2026-05-11 kararı) | GA4 / GTM / Pixel / Clarity post-launch |

---

## Klasör Yapısı

```
.
├── index.html                                   ← 10 bölüm + 3 modal + footer + sticky CTA
├── styles/
│   └── custom.css                               ← Reveal pattern, modal, skip link, form input
├── scripts/
│   ├── cta.js                                   ← Smooth scroll + modal trigger
│   ├── modal.js                                 ← Aç/kapa + focus trap + body scroll lock
│   ├── form.js                                  ← Validasyon + Formspree submit + thank-you
│   ├── reveal.js                                ← SSR progressive enhancement (3sn safety)
│   └── sticky-cta.js                            ← Mobil bottom CTA bar (lg-altı)
├── assets/
│   ├── logo-gakken-turkey.svg / .png            ← Header + footer
│   ├── favicon.svg                              ← Monogram "G+T"
│   ├── hero-{640,1280,1920}.webp + hero-1280.jpg ← LCP element (eager + preload)
│   ├── logos/wall/                              ← 10 PLACEHOLDER SVG (Wix Media replace pending)
│   │   ├── sumitomo.svg
│   │   ├── yanmar.svg
│   │   ├── marubeni.svg
│   │   ├── dunlop.svg
│   │   ├── hms.svg
│   │   ├── smc.svg
│   │   ├── mitsubishi.svg
│   │   ├── artience.svg
│   │   ├── anadolu-isuzu.svg
│   │   └── nisshun-seifun.svg
│   ├── cases/
│   │   ├── yanmar/ (hero + 4 portre/an)
│   │   └── dunlop/ (hero-group)
│   ├── trust/
│   │   ├── certificate-handover.webp            ← Bölüm 7 sertifika trust
│   │   └── conference-corporate.webp            ← Bölüm 5 kurumsal foto
│   ├── webinars/
│   │   ├── mantiksal-dusunme-yanmar.webp        ← Bölüm 9 BİRİNCİL kart
│   │   ├── horenso-zaman-yonetimi.webp
│   │   └── genel-egitim-sinif.webp
│   └── programs/
│       ├── sessa-takuma-japon-felsefe.webp      ← Bölüm 6.1
│       ├── kok-neden-analizi.webp               ← Bölüm 6.2
│       └── kaizen-canli-sunum.webp
├── README.md
├── LICENSE                                       ← Müşteri marka asset koruması
└── .gitignore
```

**Toplam:** 43 dosya · 2.5 MB asset · 89 KB index.html (Tailwind class verbose ama gzip ~12 KB)

---

## Lokal Geliştirme

```powershell
# Python http.server (Windows + macOS + Linux)
python -m http.server 8765
# Tarayıcı → http://127.0.0.1:8765/
```

ya da Node:

```powershell
npx serve -p 8765 .
```

---

## 4 Eylem Bekleyen Yunus İçin

1. **GitHub repo aç** — `Joykeksocial` organizasyonu altında `gakken-turkey-logical-thinking-lp` adıyla **public** repo. README/`.gitignore`/license **boş bırak** (lokalde zaten var); init seçeneklerini işaretleme.
2. **Formspree.io hesap aç** — free tier; form oluştur, hedef `gakkentr@gmail.com`. Endpoint ID'yi `index.html` içindeki **2 yerde** `{{FORMSPREE_ID}}` placeholder ile değiştir (inline form + modal form).
3. **10 Partner Logo SVG indir** — Wix Editor → Media Manager → Partner Logos klasörü → 10 SVG (sumitomo, yanmar, marubeni, dunlop, hms, smc, mitsubishi, artience, anadolu-isuzu, nisshun-seifun) → `assets/logos/wall/` altına aynı isimde kopyala (PLACEHOLDER SVG'ler üzerine yaz).
4. **GitHub Pages aktive et** — Repo Settings → Pages → Source `Deploy from a branch` → Branch `main` / `/ (root)` → Save. ~1 dk sonra `https://joykeksocial.github.io/gakken-turkey-logical-thinking-lp/` canlı olur.

---

## Push Komutları (Yunus repo açtıktan sonra Claude çalıştırır)

```bash
cd /d/AI/gakken-turkey-logical-thinking-lp
git remote add origin git@github.com:Joykeksocial/gakken-turkey-logical-thinking-lp.git
git branch -M main
git push -u origin main
```

---

## Browser Canlı Test Checklist (Yunus + Claude birlikte)

> **Joykek dersi:** "Build PASS ≠ görsel PASS" — Lighthouse skoru görsel onayını ikame etmez (`feedback_browser_canli_kontrol_zorunlu`). Aşağıdakileri canlı browser'da elle doğrula.

### Desktop (1280–1920w)
- [ ] Hero başlık 2 satırda render olur (text-balance), CTA "Bilgi Al" yeşil görünür
- [ ] "Bilgi Al" tıkla → smooth scroll Bölüm 10'a, form ilk input'a focus
- [ ] Bölüm 4 (dark) "Bilgi Alın" → modal açılır, ESC ile kapanır
- [ ] Bölüm 6 "Görüşme Planlayın" → modal aynı template
- [ ] Bölüm 8 vaka kartları: Yanmar (Birincil rozet) + Dunlop (GPTW rozet)
- [ ] 10 logo wall grayscale default + hover renkli geçişi
- [ ] 5 webinar grid: Mantıksal Düşünme BİRİNCİL ring vurgusu
- [ ] Form: 3 input + KVKK checkbox; submit boş alanlarla → validasyon errors
- [ ] KVKK link → modal açılır, scroll'lu metin

### Mobile (375–414w iPhone / Android)
- [ ] Hero görsel başlık altına stack olur
- [ ] Trust stat 2x2 grid olur (4'ten 2x2'ye)
- [ ] Sticky CTA bottom bar görünür (Hero geçildikten sonra)
- [ ] Form bölümüne gelince sticky CTA gizlenir
- [ ] Modal full-screen render olur
- [ ] Logo wall 2-col × 5-row stack
- [ ] Safari notch → safe-area-inset-bottom CTA görünür

### Erişilebilirlik (manuel + axe DevTools)
- [ ] Tab + Enter ile tüm sayfa dolaşılabilir (mouse'suz)
- [ ] Modal Tab focus trap (Shift+Tab + Tab — yalnız modal içi)
- [ ] Modal kapanışta tetikleyici butona focus döner
- [ ] axe DevTools → 0 critical issue, 0 contrast error
- [ ] Lighthouse Accessibility ≥ 95
- [ ] Skip link "İçeriğe geç" Tab basınca görünür

### Web Vitals (Lighthouse mobil + desktop)
- [ ] LCP ≤ 2.5s (hedef — Hero görsel WebP + preload)
- [ ] INP < 200ms
- [ ] CLS < 0.1 (tüm görsel width/height attribute)
- [ ] Performance skor ≥ 90 (mobile), ≥ 95 (desktop)

### Brand kontrol (Seki Bey görsel yön review için kritik)
- [ ] "Gakken Türkiye" string hiçbir yerde geçmiyor (sadece "Gakken Turkey")
- [ ] Brand renkler: primary `#00a651`, dark `#057f44`, mint `#92e884` doğru kullanılıyor
- [ ] Tipografi: heading Poppins, form/quote IBM Plex Sans
- [ ] Klişe Japon teması YOK (pagoda/sakura/kanji)
- [ ] Modern global ofis Hero görseli (whiteboard collaboration A2 alternatifi)

---

## Aşama 2'ye Geçiş Disiplini

> **Cutover Pre-Check Gate (Joykek Root):** Aşama 1 → Aşama 2 cutover öncesi smoke test PASS kanıtı `session-state.md` "H.4 SMOKE PASS" formatında yazılmalı; Aşama 2 Wix Studio kurulumu başlamadan Aşama 1 preview kapatılmaz (yarı-aktif paralel yasak).

Aşama 2 cutover sırası (project_brief.md Bağımlılık Sırası §5):

1. Wix Studio'da yeni sayfa aç (gakkenturkey.com altında, path İrem ile)
2. Wix Site Style: palette (8 renk) + fonts (Poppins + IBM Plex Sans) + logo SVG
3. 10 bölüm Wix Studio editor'de bu repo'daki HTML referansından **rebuild**
4. Wix Forms native (3 alan + KVKK checkbox) → submit destination `gakkentr@gmail.com`
5. Velo: smooth scroll + 3 modal + sticky mobil CTA + KVKK enforcement (bu repo'daki vanilla JS Velo'ya port)
6. Wix Media → Partner Logos klasör (zaten orada)
7. KVKK aydınlatma metni FİNAL versiyonu (Gakken hukuk birimi onaylı) — `index.html` placeholder ile değiştir
8. TR meta + OG image + sitemap
9. Aşama 1 GitHub Pages **kapat** (Repo Settings → Pages → None)
10. Debug QA Mod 4 modifiye (Lighthouse + axe + manuel akış + parity check)

---

## Açık Maddeler (Aşama 1 preview yayında bırakılabilir)

| # | Konu | Sahibi | BLOKER mi? |
|---|---|---|---|
| 1 | Formspree endpoint ID (placeholder → gerçek) | Yunus | 🟡 Aşama 1 preview için form ÇALIŞMIYOR, smoke gösterir |
| 2 | 10 Partner Logo gerçek SVG (Wix Media) | Yunus | 🟢 Placeholder kabul edilebilir (görsel demo için yeter) |
| 3 | KVKK aydınlatma metni FİNAL (Gakken hukuk birimi) | İrem | 🟡 Aşama 1'de Joykek standart şablon görünür; Aşama 2 ÖNCESİ zorunlu |
| 4 | Hero görseli son onay (A2 whiteboard / alternatif) | Yunus + İrem + Seki Bey | 🟢 Mevcut görsel acceptable (modern global ofis) |
| 5 | OG image yarat (1200×630) | Designer (Aşama 2 ek tur) | 🟢 Aşama 2'de eklenir, Aşama 1'de hero image OG'ye yüklenir |
| 6 | Eğitmen portreleri (5 kişi, opsiyonel) | Kurulumcu (PDF crop) | 🟢 Default OFF (Designer kararı); webinar kart isim metni yeter |

---

## Joykek-AI Ana Repo'daki İlgili Dosyalar

- [project_brief.md](../../projeler/gakken_turkiye/logical_thinking_lp/project_brief.md) — Mimar Tur 2 brief
- [session-state.md](../../projeler/gakken_turkiye/logical_thinking_lp/session-state.md) — proje state log
- [open_questions.md](../../projeler/gakken_turkiye/logical_thinking_lp/open_questions.md) — açık madde durumu
- [design/](../../projeler/gakken_turkiye/logical_thinking_lp/design/) — Designer çıktıları (design_system, components, layout, accessibility, assets/README)
- [copy/](../../projeler/gakken_turkiye/logical_thinking_lp/copy/) — web_yazici çıktıları (lp_sections, microcopy, seo_meta)
- [research/](../../projeler/gakken_turkiye/logical_thinking_lp/research/) — 8 araştırma dosyası

---

## Tarih ve Sürüm

- **2026-05-11** — Kurulumcu Aşama 1 build tamamlandı (Tailwind CDN + 5 JS modülü + 18 görsel optimize + 10 logo placeholder + favicon + index.html 989 satır).
- **Sıradaki** — Yunus repo açar + Formspree ID + GitHub Pages aktive; **Debug QA hafif mod** Aşama 1 preview'i lokal olarak doğrular.
- **Aşama 2 cutover** — Seki Bey görsel/içerik onayı sonrası Wix Studio'da rebuild.

---

## İletişim

- **Joykek (engineering):** Yunus Emre Gündüz — social@joykek.com
- **Gakken Turkey:** İrem Gökçen (birincil iletişim) · Yoshiki Seki (yönetim/onay)
- **Acil teknik (LP sonrası):** 0530 443 00 89 (İrem Hanım)
