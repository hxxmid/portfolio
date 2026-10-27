(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const NS = 'http://www.w3.org/2000/svg';

  /* ---------- Hero name: split into letters ---------- */
  document.querySelectorAll('.name .word').forEach((word) => {
    const text = word.textContent;
    word.textContent = '';
    [...text].forEach((ch, i) => {
      const s = document.createElement('span');
      s.className = 'char';
      s.textContent = ch;
      s.setAttribute('aria-hidden', 'true');
      s.style.transitionDelay = `${0.15 + i * 0.045}s, 0s, 0s`;
      word.appendChild(s);
    });
  });
  requestAnimationFrame(() => requestAnimationFrame(() => document.body.classList.add('loaded')));
  // Remove entrance delays once played so hover feels instant
  setTimeout(() => document.querySelectorAll('.name .char').forEach((c) => (c.style.transitionDelay = '0s')), 1800);

  /* ---------- Pipeline ---------- */
  const svg = document.getElementById('pipe');
  const tip = document.getElementById('pipeTip');
  const COLORS = { raw: '#a9adc0', bronze: '#b4713a', silver: '#8796ab', gold: '#c99a1e', violet: '#4b1fd1', ink: '#18123a' };

  const NODES = {
    api: { label: 'API REST', kind: 'src', tip: '<b>Sources</b> : API REST, SharePoint, SQL Server et fichiers Excel, plus de 10 sources métiers chez FUZEO.' },
    sp: { label: 'SharePoint', kind: 'src', tip: '<b>Sources</b> : API REST, SharePoint, SQL Server et fichiers Excel, plus de 10 sources métiers chez FUZEO.' },
    sql: { label: 'SQL Server', kind: 'src', tip: '<b>Sources</b> : API REST, SharePoint, SQL Server et fichiers Excel, plus de 10 sources métiers chez FUZEO.' },
    xls: { label: 'Excel', kind: 'src', tip: '<b>Sources</b> : API REST, SharePoint, SQL Server et fichiers Excel, plus de 10 sources métiers chez FUZEO.' },
    adf: { label: 'Data Factory', kind: 'orch', tip: '<b>Azure Data Factory</b> orchestre l\'ingestion : pipelines, triggers, alertes. Latence de chargement réduite de 40 %.' },
    bronze: { label: 'Bronze', kind: 'bronze', tip: '<b>Bronze</b> : la donnée brute, stockée telle quelle sur ADLS Gen2 en Delta Lake, historisée.' },
    silver: { label: 'Silver', kind: 'silver', tip: '<b>Silver</b> : nettoyage, typage et dédoublonnage avec PySpark sur Databricks.' },
    gold: { label: 'Gold', kind: 'gold', tip: '<b>Gold</b> : tables métier en modèle en étoile, prêtes pour l\'analyse (Synapse, Azure SQL).' },
    bi: { label: 'Power BI', kind: 'out', tip: '<b>Power BI</b> : des rapports fiables, alimentés automatiquement, sous gouvernance RBAC.' },
  };
  const EDGES = [
    ['api', 'adf', 'raw'], ['sp', 'adf', 'raw'], ['sql', 'adf', 'raw'], ['xls', 'adf', 'raw'],
    ['adf', 'bronze', 'raw'], ['bronze', 'silver', 'bronze'], ['silver', 'gold', 'silver'], ['gold', 'bi', 'gold'],
  ];

  function layout(vertical) {
    if (!vertical) {
      return {
        vb: '0 0 1040 226', w: 120, h: 42,
        pos: {
          api: [0, 0], sp: [0, 60], sql: [0, 120], xls: [0, 180],
          adf: [240, 90], bronze: [420, 90], silver: [590, 90], gold: [760, 90], bi: [920, 90],
        },
        dir: 'h',
      };
    }
    return {
      vb: '0 0 340 600', w: 140, h: 44,
      pos: {
        api: [10, 0], sp: [190, 0], sql: [10, 60], xls: [190, 60],
        adf: [100, 160], bronze: [100, 260], silver: [100, 360], gold: [100, 460], bi: [100, 556],
      },
      dir: 'v',
    };
  }

  const nodeFill = (k) => ({ src: '#fff', orch: COLORS.ink, bronze: COLORS.bronze, silver: COLORS.silver, gold: COLORS.gold, out: COLORS.violet }[k]);
  const nodeText = (k) => (k === 'src' ? COLORS.ink : '#fff');

  let paths = {};
  let nodeEls = {};
  let particles = [];
  let particleLayer;

  function build() {
    const vertical = window.innerWidth < 700;
    const L = layout(vertical);
    svg.innerHTML = '';
    svg.setAttribute('viewBox', L.vb);
    paths = {}; nodeEls = {}; particles = [];

    const edgeLayer = document.createElementNS(NS, 'g');
    particleLayer = document.createElementNS(NS, 'g');
    const nodeLayer = document.createElementNS(NS, 'g');
    svg.append(edgeLayer, particleLayer, nodeLayer);

    EDGES.forEach(([a, b, c]) => {
      const [ax, ay] = L.pos[a], [bx, by] = L.pos[b];
      let d;
      if (L.dir === 'h') {
        const x1 = ax + L.w, y1 = ay + L.h / 2, x2 = bx, y2 = by + L.h / 2, mx = (x1 + x2) / 2;
        d = `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`;
      } else {
        const x1 = ax + L.w / 2, y1 = ay + L.h, x2 = bx + L.w / 2, y2 = by, my = (y1 + y2) / 2;
        d = `M${x1},${y1} C${x1},${my} ${x2},${my} ${x2},${y2}`;
      }
      const p = document.createElementNS(NS, 'path');
      p.setAttribute('d', d);
      p.setAttribute('fill', 'none');
      p.setAttribute('stroke', '#d9dae6');
      p.setAttribute('stroke-width', '2');
      p.setAttribute('stroke-dasharray', '4 6');
      p.classList.add('edge');
      edgeLayer.appendChild(p);
      paths[`${a}>${b}`] = { el: p, len: p.getTotalLength(), color: COLORS[c], to: b };
    });

    Object.entries(NODES).forEach(([id, n]) => {
      const [x, y] = L.pos[id];
      const g = document.createElementNS(NS, 'g');
      g.classList.add('pipe-node');
      g.setAttribute('tabindex', '0');
      g.setAttribute('role', 'button');
      g.setAttribute('aria-label', n.label);
      const r = document.createElementNS(NS, 'rect');
      r.setAttribute('x', x); r.setAttribute('y', y);
      r.setAttribute('width', L.w); r.setAttribute('height', L.h); r.setAttribute('rx', 12);
      r.setAttribute('fill', nodeFill(n.kind));
      r.setAttribute('stroke', n.kind === 'src' ? '#c6c8d8' : nodeFill(n.kind));
      r.setAttribute('stroke-width', '1.5');
      const t = document.createElementNS(NS, 'text');
      t.setAttribute('x', x + L.w / 2); t.setAttribute('y', y + L.h / 2 + 5);
      t.setAttribute('text-anchor', 'middle');
      t.setAttribute('fill', nodeText(n.kind));
      t.setAttribute('font-family', 'Instrument Sans, system-ui, sans-serif');
      t.setAttribute('font-size', '15');
      t.setAttribute('font-weight', '600');
      t.textContent = n.label;
      g.append(r, t);
      const show = () => {
        Object.values(nodeEls).forEach((e) => e.classList.remove('active'));
        g.classList.add('active');
        tip.innerHTML = n.tip;
        tip.classList.add('show');
      };
      const hide = () => { g.classList.remove('active'); tip.classList.remove('show'); };
      g.addEventListener('mouseenter', show);
      g.addEventListener('focus', show);
      g.addEventListener('click', show);
      g.addEventListener('mouseleave', hide);
      g.addEventListener('blur', hide);
      nodeLayer.appendChild(g);
      nodeEls[id] = g;
    });

    // Draw edges in on first build
    if (!reduce) {
      Object.values(paths).forEach((p, i) => {
        p.el.animate(
          [{ strokeDashoffset: p.len, opacity: 0 }, { strokeDashoffset: 0, opacity: 1 }],
          { duration: 900, delay: 1100 + i * 90, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'backwards' }
        );
      });
    }
  }

  function spawn() {
    const sources = ['api', 'sp', 'sql', 'xls'];
    const src = sources[Math.floor(Math.random() * sources.length)];
    const c = document.createElementNS(NS, 'circle');
    c.setAttribute('r', 4.5);
    particleLayer.appendChild(c);
    particles.push({ el: c, key: `${src}>adf`, t: 0, speed: 0.55 + Math.random() * 0.35 });
  }

  const nextKey = { adf: 'adf>bronze', bronze: 'bronze>silver', silver: 'silver>gold', gold: 'gold>bi' };
  let last = performance.now();
  let spawnAcc = 0;
  let visible = true;

  function tick(now) {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    if (visible) {
      spawnAcc += dt;
      if (spawnAcc > 0.32 && particles.length < 40) { spawn(); spawnAcc = 0; }
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        const path = paths[p.key];
        if (!path) { p.el.remove(); particles.splice(i, 1); continue; }
        p.t += (dt * p.speed * 180) / path.len;
        if (p.t >= 1) {
          const node = nodeEls[path.to];
          if (node) { node.classList.remove('pulse'); void node.getBBox(); node.classList.add('pulse'); }
          const nk = nextKey[path.to];
          if (!nk) { p.el.remove(); particles.splice(i, 1); continue; }
          p.key = nk; p.t = 0;
          continue;
        }
        const pt = path.el.getPointAtLength(p.t * path.len);
        p.el.setAttribute('cx', pt.x);
        p.el.setAttribute('cy', pt.y);
        p.el.setAttribute('fill', path.color);
      }
    }
    requestAnimationFrame(tick);
  }

  build();
  if (!reduce) {
    setTimeout(() => requestAnimationFrame((t) => { last = t; tick(t); }), 1400);
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(svg);
  }
  let rT;
  let lastVertical = window.innerWidth < 700;
  window.addEventListener('resize', () => {
    clearTimeout(rT);
    rT = setTimeout(() => {
      const v = window.innerWidth < 700;
      if (v !== lastVertical) { lastVertical = v; build(); }
    }, 150);
  });

  /* ---------- Marquee: duplicate for a seamless loop ---------- */
  const track = document.querySelector('.marquee-track');
  if (track) track.innerHTML += track.innerHTML;

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const siblings = [...e.target.parentElement.children].filter((c) => c.classList.contains('reveal'));
      e.target.style.transitionDelay = `${Math.max(0, siblings.indexOf(e.target)) * 0.08}s`;
      e.target.classList.add('in');
      io.unobserve(e.target);
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  /* ---------- Counters ---------- */
  const cio = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const to = +el.dataset.count, pre = el.dataset.prefix || '', suf = el.dataset.suffix || '';
      if (reduce) { el.textContent = pre + to + suf; cio.unobserve(el); return; }
      const start = performance.now(), dur = 1400;
      const step = (now) => {
        const k = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - k, 4);
        el.textContent = pre + Math.round(to * eased) + suf;
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      cio.unobserve(el);
    });
  }, { threshold: 0.6 });
  document.querySelectorAll('[data-count]').forEach((el) => cio.observe(el));

  /* ---------- Scroll: progress bar, nav, timeline fill ---------- */
  const bar = document.querySelector('.progress span');
  const nav = document.querySelector('.nav');
  const timeline = document.querySelector('.timeline');
  function onScroll() {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    bar.style.transform = `scaleX(${max > 0 ? h.scrollTop / max : 0})`;
    nav.classList.toggle('scrolled', h.scrollTop > 20);
    const r = timeline.getBoundingClientRect();
    const f = Math.min(Math.max((window.innerHeight * 0.7 - r.top) / r.height, 0), 1);
    timeline.style.setProperty('--fill', f.toFixed(3));
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Magnetic buttons ---------- */
  if (!reduce && window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.magnetic').forEach((b) => {
      b.addEventListener('mousemove', (e) => {
        const r = b.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2, y = e.clientY - r.top - r.height / 2;
        b.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
      });
      b.addEventListener('mouseleave', () => { b.style.transform = ''; });
    });

    const contact = document.querySelector('.contact');
    contact.addEventListener('mousemove', (e) => {
      const r = contact.getBoundingClientRect();
      contact.style.setProperty('--mx', `${e.clientX - r.left}px`);
      contact.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  }

  /* ---------- Copy e-mail ---------- */
  const copyBtn = document.getElementById('copyEmail');
  const hint = copyBtn.querySelector('.email-hint');
  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(copyBtn.dataset.email);
      hint.textContent = 'Adresse copiée';
    } catch {
      window.location.href = `mailto:${copyBtn.dataset.email}`;
      return;
    }
    copyBtn.classList.add('copied');
    setTimeout(() => { hint.textContent = 'Cliquer pour copier'; copyBtn.classList.remove('copied'); }, 2200);
  });
})();
