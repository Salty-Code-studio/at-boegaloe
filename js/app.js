(() => {
  const WA = "5997827566";
  const wa = text => "https://wa.me/" + WA + "?text=" + encodeURIComponent(text);
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const L = {
    nl: { reserve: "Reserveer", save: "Bewaar", saved: "Bewaard", ask: "Vraag de prijs", count: n => n === 1 ? "1 stuk bewaard" : n + " stukken bewaard", send: "Stuur lijstje via WhatsApp", clear: "Wis", empty: "Nog niets in deze categorie.",
      oneMsg: n => `Hoi At Boegaloe! Ik wil graag reserveren: ${n}. Is dit nog beschikbaar?`,
      listMsg: items => "Hoi At Boegaloe! Ik heb interesse in deze stukken:\n" + items.map(i => "• " + i).join("\n") + "\nZijn ze nog beschikbaar?",
      type: "Soort", colour: "Kleur velvet", size: "Maat", head: "Hoofdbord", with: "Met hoofdbord", without: "Zonder hoofdbord", velvetBed: "Velvet bed", boxspring: "Boxspring",
      bedSend: "Vraag prijs via WhatsApp", bedMsg: (t, c, s, h) => `Hoi At Boegaloe! Ik wil graag een prijs voor:\n• ${t}\n• Kleur: ${c}\n• Maat: ${s}\n• ${h}\nWat is de prijs en levertijd?`,
      view: "Bekijk op Instagram" },
    en: { reserve: "Reserve", save: "Save", saved: "Saved", ask: "Ask for price", count: n => n === 1 ? "1 piece saved" : n + " pieces saved", send: "Send list on WhatsApp", clear: "Clear", empty: "Nothing in this category yet.",
      oneMsg: n => `Hi At Boegaloe! I'd like to reserve: ${n}. Is it still available?`,
      listMsg: items => "Hi At Boegaloe! I'm interested in these pieces:\n" + items.map(i => "• " + i).join("\n") + "\nAre they still available?",
      type: "Type", colour: "Velvet colour", size: "Size", head: "Headboard", with: "With headboard", without: "Without headboard", velvetBed: "Velvet bed", boxspring: "Box spring",
      bedSend: "Ask for a price on WhatsApp", bedMsg: (t, c, s, h) => `Hi At Boegaloe! I'd like a price for:\n• ${t}\n• Colour: ${c}\n• Size: ${s}\n• ${h}\nWhat's the price and delivery time?`,
      view: "View on Instagram" }
  };
  let lang = "nl", cat = "all";
  let list = store.get("atb-list", []);
  const owner = store.get("atb-owner-items", []);
  const products = () => owner.concat(window.ATB_PRODUCTS);
  const byId = id => products().find(p => p.id === id);

  /* ---------- catalog ---------- */
  function renderChips() {
    const used = new Set(products().map(p => p.cat));
    document.getElementById("chips").innerHTML = window.ATB_CATS.filter(c => c.id === "all" || used.has(c.id))
      .map(c => `<button type="button" role="tab" aria-selected="${c.id === cat}" data-cat="${c.id}">${c[lang]}</button>`).join("");
  }
  function renderGrid() {
    const t = L[lang], items = products().filter(p => cat === "all" || p.cat === cat);
    const grid = document.getElementById("catGrid");
    if (!items.length) { grid.innerHTML = `<p class="cat-empty">${t.empty}</p>`; return; }
    grid.innerHTML = items.map(p => {
      const name = p[lang] || p.nl, st = window.ATB_STATUS[p.status] || window.ATB_STATUS.stock, inList = list.includes(p.id);
      return `<article class="prod">
        <div class="prod-img"><img src="${esc(p.img)}" alt="${esc(name)}" loading="lazy"><span class="badge b-${esc(p.status || "stock")}">${st[lang]}</span>
          <button type="button" class="heart" data-save="${esc(p.id)}" aria-pressed="${inList}" aria-label="${inList ? t.saved : t.save}"><svg viewBox="0 0 24 24"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg></button></div>
        <div class="prod-body"><h3>${esc(name)}</h3><p>${p.price ? "$" + esc(p.price) : t.ask}</p>
          <a class="reserve" href="${wa(t.oneMsg(name))}" target="_blank" rel="noopener">${t.reserve}</a></div>
      </article>`;
    }).join("");
  }
  function renderList() {
    const t = L[lang], bar = document.getElementById("listbar");
    list = list.filter(byId); store.set("atb-list", list);
    bar.classList.toggle("show", list.length > 0); document.body.classList.toggle("has-list", list.length > 0);
    document.getElementById("lbThumbs").innerHTML = list.slice(0, 4).map(id => `<img src="${esc(byId(id).img)}" alt="">`).join("");
    document.getElementById("lbText").textContent = t.count(list.length);
    document.getElementById("lbClear").textContent = t.clear;
    const send = document.getElementById("lbSend");
    send.textContent = t.send;
    send.href = wa(t.listMsg(list.map(id => byId(id)[lang] || byId(id).nl)));
  }
  document.addEventListener("click", e => {
    const chip = e.target.closest("[data-cat]");
    if (chip) { cat = chip.dataset.cat; renderChips(); renderGrid(); return; }
    const h = e.target.closest("[data-save]");
    if (h) {
      const id = h.dataset.save;
      list = list.includes(id) ? list.filter(x => x !== id) : list.concat(id);
      store.set("atb-list", list); renderGrid(); renderList(); return;
    }
    if (e.target.id === "lbClear") { list = []; store.set("atb-list", list); renderGrid(); renderList(); }
  });

  /* ---------- bed picker ---------- */
  const SIZES = ["140 × 200", "160 × 200", "180 × 200", "180 × 210", "200 × 200"];
  const bed = store.get("atb-bed", { type: "velvet", colour: 6, size: 2, head: true });
  function shade(hex, f) {
    const n = parseInt(hex.slice(1), 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255;
    const m = v => Math.max(0, Math.min(255, Math.round(v * f)));
    return `rgb(${m(r)},${m(g)},${m(b)})`;
  }
  function renderBed() {
    const t = L[lang], c = window.ATB_VELVET[bed.colour];
    const seg = (id, opts, cur, key) => document.getElementById(id).innerHTML = opts.map(o =>
      `<button type="button" data-bed="${key}" data-val="${o.v}" aria-pressed="${String(o.v) === String(cur)}">${o.l}</button>`).join("");
    document.getElementById("lblType").textContent = t.type;
    document.getElementById("lblColour").textContent = t.colour + ": " + c[lang];
    document.getElementById("lblSize").textContent = t.size + " (cm)";
    document.getElementById("lblHead").textContent = t.head;
    seg("optType", [{ v: "velvet", l: t.velvetBed }, { v: "box", l: t.boxspring }], bed.type, "type");
    seg("optSize", SIZES.map((s, i) => ({ v: i, l: s })), bed.size, "size");
    seg("optHead", [{ v: "true", l: t.with }, { v: "false", l: t.without }], String(bed.head), "head");
    document.getElementById("optColour").innerHTML = window.ATB_VELVET.map((v, i) =>
      `<button type="button" data-bed="colour" data-val="${i}" aria-pressed="${i === bed.colour}" style="--c:${v.hex}" title="${v[lang]}" aria-label="${v[lang]}"></button>`).join("");
    // preview
    const w = 300 + bed.size * 35, x = (520 - w) / 2;
    const set = (id, a) => { const el = document.getElementById(id); for (const k in a) el.setAttribute(k, a[k]); };
    set("bBase", { x: x - 10, width: w + 20, fill: c.hex, height: bed.type === "box" ? 112 : 100, y: bed.type === "box" ? 192 : 200 });
    set("bShade", { x: x - 10, width: w + 20 });
    set("bHead", { x, width: w, fill: shade(c.hex, 0.92) });
    document.getElementById("bHead").style.display = bed.head ? "" : "none";
    document.getElementById("bHeadLines").style.display = bed.head ? "" : "none";
    set("throw", { fill: shade(c.hex, 0.75) });
    const typeName = bed.type === "box" ? t.boxspring : t.velvetBed;
    document.getElementById("bedLabel").textContent = `${typeName} · ${c[lang]} · ${SIZES[bed.size]} cm · ${bed.head ? t.with : t.without}`;
    const send = document.getElementById("bedSend");
    send.textContent = t.bedSend;
    send.href = wa(t.bedMsg(typeName, c[lang], SIZES[bed.size] + " cm", bed.head ? t.with : t.without));
    store.set("atb-bed", bed);
  }
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-bed]");
    if (!b) return;
    const k = b.dataset.bed, v = b.dataset.val;
    bed[k] = k === "head" ? v === "true" : (k === "type" ? v : Number(v));
    renderBed();
  });

  /* ---------- instagram feed ---------- */
  function renderFeed() {
    const t = L[lang];
    document.getElementById("feedGrid").innerHTML = window.ATB_FEED.map(p =>
      `<a class="post" href="https://instagram.com/atboegaloe" target="_blank" rel="noopener" aria-label="${t.view}">
        <img src="${esc(p.img)}" alt="" loading="lazy"><span class="cap">${esc(p[lang])}</span></a>`).join("");
  }

  window.ATB_onLang = l => { lang = l; renderChips(); renderGrid(); renderList(); renderBed(); renderFeed(); };
})();
