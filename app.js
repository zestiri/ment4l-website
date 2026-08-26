/* ============================================================================
   ment4l — render-laag. Bouwt de presentatie op uit data.js.
   ============================================================================ */
(function () {
  "use strict";
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };

  /* ---- jaartal ---- */
  $("#year").textContent = new Date().getFullYear();

  /* ---- coachingsdoelen ---- */
  const doelen = $("#doelen");
  COACHINGSDOELEN.forEach((d) => {
    doelen.appendChild(el("div", "doel reveal",
      `<span class="ic">${d.icon}</span><h4>${d.titel}</h4><p>${d.tekst}</p>`));
  });

  /* ---- 8-lessenboog ---- */
  const arc = $("#arc");
  BLOK_RUGGENGRAAT.forEach((l) => {
    const isExpert = !!l.expert;
    const isFinal = l.nr === 8;
    const step = el("div", "arc-step reveal" + (isExpert ? " is-expert" : "") + (isFinal ? " is-final" : ""));
    const badge = isExpert ? `<span class="badge">Expert</span>`
      : isFinal ? `<span class="badge">Showcase</span>` : "";
    step.innerHTML = `${badge}<span class="n">${l.nr}</span><h4>${l.fase}</h4><p>${l.thema}</p>`;
    arc.appendChild(step);
  });

  /* ---- thema-switcher: zelfde ruggengraat, wisselend thema ---- */
  const themaSwitch = $("#themaSwitch");
  function setActiveThema(p, chip) {
    arc.style.setProperty("--arc-accent", p.accent);
    document.querySelectorAll(".switch-chip").forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
  }
  PROGRAMMAS.forEach((p, i) => {
    const chip = el("button", "switch-chip", `<span class="dot"></span>${p.icoon} ${p.titel}`);
    chip.style.setProperty("--chip-accent", p.accent);
    chip.addEventListener("click", () => setActiveThema(p, chip));
    themaSwitch.appendChild(chip);
    if (i === 0) setActiveThema(p, chip);
  });

  /* ---- lesritueel ---- */
  const rit = $("#ritueel");
  RITUEEL.forEach((r) => {
    rit.appendChild(el("div", "ritueel-chip", `<b>${r.stap}</b><span>${r.duur}</span>`));
  });

  /* ---- programmacatalogus ---- */
  const catalog = $("#catalog");
  PROGRAMMAS.forEach((p) => {
    const card = el("button", "prog-card reveal");
    card.style.setProperty("--card-accent", p.accent);
    card.setAttribute("aria-label", `Open programma ${p.titel}`);
    card.innerHTML = `
      <span class="prog-ic">${p.icoon}</span>
      <h3>${p.titel}</h3>
      <p class="pitch">${p.pitch}</p>
      <div class="prog-meta">
        <span class="tag tag--accent">${p.vehikel}</span>
        <span class="tag">${p.doelgroep}</span>
        <span class="tag">8 lessen</span>
      </div>
      <span class="prog-open">Bekijk de 8-lessen-tijdlijn →</span>`;
    card.addEventListener("click", () => openDrawer(p));
    catalog.appendChild(card);
  });

  // 'open' kaart: elk nieuw thema draait op dezelfde ruggengraat
  const addCard = el("a", "prog-card prog-card--add reveal");
  addCard.href = "#contact";
  addCard.style.setProperty("--card-accent", "var(--brand-2)");
  addCard.innerHTML = `
    <span class="prog-ic">＋</span>
    <h3>Jullie eigen thema</h3>
    <p class="pitch">Een ander talent of onderwerp in gedachten? We bouwen het op exact dezelfde ruggengraat.</p>
    <span class="prog-open">Stem een thema af →</span>`;
  catalog.appendChild(addCard);

  /* ---- detail drawer (thema op de ruggengraat) ---- */
  const drawer = $("#drawer");
  const backdrop = $("#backdrop");
  const inner = $("#drawerInner");

  function openDrawer(p) {
    drawer.style.setProperty("--card-accent", p.accent);

    const lessen = BLOK_RUGGENGRAAT.map((l, i) => {
      const isExpert = !!l.expert;
      const isFinal = l.nr === 8;
      const cls = "tl-item" + (isExpert ? " expert" : "") + (isFinal ? " final" : "");
      const tag = isExpert ? `<span class="tl-expert-badge">Gastexpert</span>`
        : isFinal ? `<span class="tl-final-badge">${p.showcase.titel}</span>` : "";
      return `
        <div class="${cls}">
          <span class="tl-dot">${l.nr}</span>
          <div class="tl-fase">${l.fase}${tag}</div>
          <div class="tl-thema">${l.thema}</div>
          <div class="tl-doen">${p.lessen[i]}</div>
          <span class="tl-mijl">▸ ${p.mijlpalen[i]}</span>
        </div>`;
    }).join("");

    inner.innerHTML = `
      <button class="drawer-close" aria-label="Sluiten">×</button>
      <div class="drawer-head">
        <span class="d-ic">${p.icoon}</span>
        <h2 class="d-title">${p.titel}</h2>
        <p class="d-pitch">${p.pitch}</p>
        <div class="prog-meta">
          <span class="tag tag--accent">${p.vehikel}</span>
          <span class="tag">${p.doelgroep}</span>
        </div>
        <span class="d-haak">“${p.haak}”</span>
      </div>
      <div class="d-showcase">
        <span class="lbl">Er wordt naartoe gewerkt</span>
        <h4>🏁 ${p.showcase.titel}</h4>
        <p>${p.showcase.tekst}</p>
      </div>
      <div class="d-section-title">De vaste ruggengraat — ingevuld met dit thema</div>
      <div class="timeline">${lessen}</div>`;

    $(".drawer-close", inner).addEventListener("click", closeDrawer);

    drawer.classList.add("show");
    backdrop.removeAttribute("hidden");
    requestAnimationFrame(() => backdrop.classList.add("show"));
    drawer.setAttribute("aria-hidden", "false");
    drawer.scrollTop = 0;
    document.body.style.overflow = "hidden";
  }

  function closeDrawer() {
    drawer.classList.remove("show");
    backdrop.classList.remove("show");
    drawer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    setTimeout(() => backdrop.setAttribute("hidden", ""), 300);
  }

  backdrop.addEventListener("click", closeDrawer);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeDrawer(); });

  /* ---- scroll-reveal ---- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((n) => io.observe(n));

  /* ---- nav-achtergrond bij scrollen ---- */
  const nav = $("#nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 20);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
})();
