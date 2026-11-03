'use strict';

/* ============ EDIT ME ============ */
const birthdayConfig = {
  name: "Aditya",
  server: "McFleet",
  relationship: "Brother from another mother",
  birthdayDate: "",              // e.g. "12 March" — leave empty to hide
  introMessage: "Every great story starts somewhere.",
  personalMessage: [
    "Aditya, it's honestly crazy how we met.",
    "You were just a new player on McFleet, and I was simply helping someone get started. I never imagined that the person I met through a game would eventually become such an important friend.",
    "We've never met in real life, but you've still managed to become someone I genuinely consider my brother.",
    "I'm really glad that day happened, and I'm glad we started talking.",
    "I hope we continue making memories, having random conversations, playing games, laughing at stupid things, and staying connected for a long, long time.",
    "Thank you for being the person you are.",
    "Happy Birthday, brother."
  ],
  finalMessage: "Different worlds. Same brotherhood.",
  signature: "Your brother",
  signatureLine: "I helped you build a house in Minecraft. Little did I know, we'd end up building a brotherhood.",
  soundEnabledByDefault: false   // audio always needs a tap (browser rules + your request)
};
/* ================================== */

(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cfg = birthdayConfig;

  /* ---------- Procedural Minecraft-style SVG art ---------- */
  const C = { dark: '#101311', forest: '#101B16', stone: '#343A36', grass: '#647D55', wood: '#76543B', cream: '#E9E5D8', gold: '#C4A56B' };
  let uid = 0;
  const R = (x, y, w, h, f, e = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${f}" ${e}/>`;
  const rng = s => () => (s = s * 16807 % 2147483647) / 2147483647;

  const tree = (x, g) => R(x + 16, g - 96, 16, 96, '#5a4130') + R(x - 12, g - 130, 72, 36, '#46603d') + R(x - 4, g - 160, 56, 34, '#587349') + R(x + 8, g - 182, 32, 24, '#647D55') + R(x - 12, g - 112, 16, 12, '#3e5535');
  const house = (x, g) =>
    R(x, g - 70, 120, 70, C.wood) + R(x, g - 46, 120, 3, '#5c4130') + R(x, g - 24, 120, 3, '#5c4130') +
    R(x - 10, g - 90, 140, 20, C.stone) + R(x + 10, g - 110, 100, 20, '#3d443f') + R(x + 30, g - 126, 60, 16, C.stone) +
    R(x + 50, g - 44, 20, 44, '#3e2c1f') + R(x + 14, g - 54, 22, 20, C.gold, 'class="flick"') + R(x + 84, g - 54, 22, 20, C.gold, 'class="flick"');
  const lantern = (x, g) =>
    `<circle cx="${x + 25}" cy="${g - 47}" r="34" fill="#f1c98a" opacity=".14" class="flick"/>` +
    R(x + 6, g - 60, 6, 60, '#2b2f2c') + R(x + 6, g - 62, 22, 5, '#2b2f2c') + R(x + 18, g - 56, 14, 18, C.gold, 'class="flick"');
  const flower = (x, g, a) => R(x + 3, g - 12, 2, 12, '#46603d') + R(x, g - 18, 8, 8, a ? '#a8514a' : '#c4a56b');
  const player = (x, g, col, sil) => {
    const k = sil ? '#0b0e0c' : null;
    return `<g>${R(x + 6, g - 66, 20, 20, k || '#b98a68')}${R(x + 6, g - 66, 20, 6, k || '#3b2b21')}` +
      (k ? '' : R(x + 10, g - 56, 4, 4, '#222') + R(x + 18, g - 56, 4, 4, '#222')) +
      `${R(x, g - 46, 32, 26, k || col)}${R(x + 4, g - 22, 10, 22, k || '#2c3340')}${R(x + 18, g - 22, 10, 22, k || '#2c3340')}</g>`;
  };
  const BLUE = '#3d5a66', OLIVE = '#5a5a3a';

  function scene(o) {
    const W = 800, H = 450, g = 360, B = 20, r = rng(o.seed || 5), id = 's' + (++uid);
    let s = `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="${o.fit || 'xMidYMax slice'}" role="img" aria-label="${o.alt || ''}" xmlns="http://www.w3.org/2000/svg"><defs>` +
      `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">${o.sky.map((c, i) => `<stop offset="${i / (o.sky.length - 1)}" stop-color="${c}"/>`).join('')}</linearGradient>` +
      `<radialGradient id="${id}g"><stop offset="0" stop-color="#f1c98a" stop-opacity=".5"/><stop offset="1" stop-color="#f1c98a" stop-opacity="0"/></radialGradient></defs>` +
      R(0, 0, W, H, `url(#${id})`);
    if (o.stars) for (let i = 0; i < 45; i++) s += R(Math.round(r() * W / 4) * 4, Math.round(r() * 200 / 4) * 4, 4, 4, C.cream, `opacity="${.3 + r() * .6}" class="${r() < .3 ? 'twk' : ''}"`);
    if (o.sun) s += `<circle cx="${o.sun[0]}" cy="${o.sun[1]}" r="230" fill="url(#${id}g)"/>` + R(o.sun[0] - 24, o.sun[1] - 24, 48, 48, o.moon ? '#dfe3d8' : '#f3dca6');
    const op = o.stars ? .12 : .28;
    [[60, 70, 1], [330, 40, 2], [560, 95, 3]].forEach(([x, y, n]) => s += `<g class="cl" style="animation-delay:-${n * 9}s">` + R(x, y, 100, 18, C.cream, `opacity="${op}"`) + R(x + 20, y - 14, 60, 14, C.cream, `opacity="${op}"`) + R(x - 16, y + 18, 120, 12, C.cream, `opacity="${op * .7}"`) + '</g>');
    const mt = (base, amp, col, ph) => { let t = ''; for (let x = 0; x < W; x += B) { const h = Math.round((base + Math.sin(x * .011 + ph) * amp + Math.sin(x * .031 + ph * 2) * amp * .4) / B) * B; t += R(x, g - h, B, h, col); } return t; };
    const m = o.mt || ['#34413b', '#1f2b24'];
    s += mt(150, 50, m[0], o.seed || 5) + mt(80, 30, m[1], (o.seed || 5) + 2);
    s += R(0, g, W, H - g, '#5a4331');
    for (let x = 0; x < W; x += B) { for (let y = g + 10; y < H; y += B) if (r() < .28) s += R(x, y, B, B, '#4d392b'); s += R(x, g, B, 10, r() < .4 ? '#587349' : C.grass); }
    if (o.lake) s += R(o.lake[0], g, o.lake[1], 26, '#3b5a63', 'class="water"') + R(o.lake[0], g, o.lake[1], 5, '#8fb0b6', 'opacity=".45"');
    (o.trees || []).forEach(x => s += tree(x, g));
    if (o.house != null) s += house(o.house, g);
    (o.lanterns || []).forEach(x => s += lantern(x, g));
    (o.flowers || []).forEach((x, i) => s += flower(x, g, i % 2));
    (o.players || []).forEach(p => s += player(p[0], g, p[1] || BLUE, o.sil));
    return s + (o.extra || '') + '</svg>';
  }

  const SUNSET = ['#1d2a2c', '#5b4a43', '#c9824f', '#e8b57a'];
  const SCENES = {
    open: { alt: 'A pixel-block landscape at sunset with mountains, trees and a small house', sky: SUNSET, sun: [520, 250], house: 560, trees: [40, 170, 700], lanterns: [520], seed: 3 },
    hero: { alt: 'Two player silhouettes standing together at sunset near a small house', sky: SUNSET, sun: [400, 235], house: 90, trees: [20, 640, 720], sil: true, players: [[370, 0], [420, 0]], seed: 8 },
    c1: { alt: 'A lone new player at dawn on an empty grassy hill', sky: ['#1c2a2f', '#4d5f5a', '#b9a47a'], sun: [610, 260], trees: [60, 640], players: [[330, BLUE]], seed: 11 },
    c2: { alt: 'A small starter house surrounded by grass and trees, with two players beside it', sky: ['#2a3a3b', '#7c7a62', '#dcb27a'], sun: [130, 190], house: 300, trees: [30, 190, 640], lanterns: [440], flowers: [500, 520, 540], players: [[200, BLUE], [450, OLIVE]], seed: 14 },
    c3: { alt: 'A night scene with stars over a small house', sky: ['#0d1514', '#16241f', '#2a3a30'], stars: true, sun: [640, 90], moon: true, house: 120, trees: [20, 540, 700], lanterns: [300], mt: ['#1d2924', '#131c18'], seed: 17 },
    c4: { alt: 'Two players by a quiet lake at dusk', sky: ['#1a2427', '#4a4a4c', '#b57a55'], sun: [230, 270], lake: [420, 220], trees: [40, 700], flowers: [100, 120], players: [[260, BLUE], [305, OLIVE]], seed: 21 },
    c5: { alt: 'Two players in front of their house at golden hour', sky: SUNSET, sun: [620, 230], house: 470, trees: [30, 190], lanterns: [400], players: [[290, BLUE], [335, OLIVE]], seed: 25 },
    brother: { alt: 'Two players standing side by side beneath a warm sunset', sky: ['#17221f', '#6a4a3e', '#dd9a5c', '#f0c58a'], sun: [400, 250], trees: [60, 700], lanterns: [200], sil: true, players: [[368, 0], [402, 0]], seed: 31 },
    end: { alt: 'Two players looking toward the horizon as the sun sets', sky: ['#12191c', '#3b3846', '#a96a58', '#e0a56c'], sun: [400, 300], lake: [200, 400], trees: [20, 720], sil: true, players: [[370, 0], [404, 0]], seed: 37 }
  };

  /* lazy-render scenes when they approach the viewport */
  const sceneIO = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target; sceneIO.unobserve(el);
    const o = SCENES[el.dataset.scene]; if (o) el.innerHTML = scene(o);
  }), { rootMargin: '400px' });
  $$('[data-scene]').forEach(el => sceneIO.observe(el));

  /* ---------- Config -> DOM ---------- */
  $$('[data-name]').forEach(e => e.textContent = cfg.name);
  $$('[data-sig]').forEach(e => e.textContent = cfg.signature);
  $$('[data-line]').forEach(e => e.textContent = cfg.signatureLine);
  $$('[data-final]').forEach(e => e.textContent = cfg.finalMessage);
  $$('[data-intro]').forEach(e => e.textContent = cfg.introMessage);
  $('#letterBody').innerHTML = cfg.personalMessage.map((t, i, a) => `<p${i === a.length - 1 ? ' class="last"' : ''}></p>`).join('');
  $$('#letterBody p').forEach((p, i) => p.textContent = cfg.personalMessage[i]);
  if (cfg.birthdayDate) { const d = $('#dateLine'); d.hidden = false; d.textContent = cfg.birthdayDate; }
  document.title = `Happy Birthday, ${cfg.name} — A Friendship Built in Blocks`;

  /* ---------- Toast ---------- */
  let toastT;
  function toast(title, text) {
    const t = $('#toast');
    t.innerHTML = `<i></i><div><b></b><span></span></div>`;
    $('b', t).textContent = title; $('span', t).textContent = text;
    t.classList.add('show'); clearTimeout(toastT);
    toastT = setTimeout(() => t.classList.remove('show'), 3600);
  }

  /* ---------- Intro ---------- */
  const intro = $('#intro');
  $('#enter').addEventListener('click', () => {
    intro.classList.add('leaving');
    document.body.classList.remove('locked');
    window.scrollTo(0, 0);
    setTimeout(() => { intro.remove(); const h = $('#hero h1'); h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); }, reduce ? 20 : 1450);
  });

  /* ---------- Scroll progress / nav / back-to-top ---------- */
  const bar = $('#bar'), nav = $('#nav'), top = $('#toTop');
  let tick = false;
  const onScroll = () => {
    const h = document.documentElement.scrollHeight - innerHeight;
    bar.style.width = (h > 0 ? scrollY / h * 100 : 0) + '%';
    nav.classList.toggle('solid', scrollY > 60);
    top.classList.toggle('show', scrollY > 700);
    tick = false;
  };
  addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(onScroll); } }, { passive: true });
  top.addEventListener('click', () => scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }));

  const burger = $('#burger'), menu = $('#menu');
  const setMenu = open => { menu.classList.toggle('open', open); burger.setAttribute('aria-expanded', open); burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu'); };
  burger.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
  $$('a', menu).forEach(a => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

  /* ---------- Timeline ---------- */
  const chapters = $$('.chapter'), tl = $('#timeline'), seen = new Set();
  const chIO = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, i = chapters.indexOf(el);
    el.classList.add('active');
    tl.style.setProperty('--p', ((i + 1) / chapters.length).toFixed(2));
    if (!seen.has(i) && !document.body.classList.contains('locked')) { seen.add(i); toast('Advancement made!', el.dataset.adv); }
  }), { threshold: .5 });
  chapters.forEach(c => chIO.observe(c));

  /* ---------- Interactive world ---------- */
  const G = 360;
  const hs = (k, x, y, w, h, label) => `<rect class="hs" data-k="${k}" x="${x}" y="${y}" width="${w}" height="${h}" tabindex="0" role="button" aria-label="${label}"/>`;
  let pathBlocks = '';
  for (let x = 150; x < 450; x += 20) pathBlocks += R(x, G, 20, 10, (x / 20) % 2 ? '#8a7a5a' : '#7a6c4e');
  const gem = `<g class="gem locked" id="gem">${R(712, G - 52, 36, 36, C.gold)}${R(712, G - 52, 36, 6, '#e6cf98')}${R(724, G - 40, 12, 12, '#8a6a30')}${R(706, G - 16, 48, 16, C.stone)}</g>`;
  const worldExtra = pathBlocks + gem +
    hs('house', 290, 234, 140, 126, 'The starter house') + hs('path', 140, G - 6, 320, 26, 'The stone path') +
    hs('lantern1', 248, G - 70, 42, 74, 'A lantern') + hs('lantern2', 438, G - 70, 42, 74, 'Another lantern') +
    hs('flowers', 88, G - 30, 70, 34, 'Flowers') + hs('flowers', 478, G - 30, 42, 34, 'Flowers') +
    hs('lake', 520, G, 150, 28, 'The lake') + hs('block', 704, G - 60, 52, 62, 'The special block') +
    `<g id="walker" style="transform:translateX(60px)">${player(0, G, BLUE, false)}</g>`;
  const worldSvg = scene({ alt: 'Interactive Minecraft-style world', fit: 'xMidYMid meet', sky: SUNSET, sun: [400, 190], house: 300, trees: [20, 170], lanterns: [250, 440], lake: [520, 150], flowers: [96, 112, 128, 146, 486, 500], seed: 41, extra: worldExtra });
  const wb = $('#worldBox'); wb.innerHTML = worldSvg;
  const wsvg = $('svg', wb), walker = $('#walker', wb);
  const MSG = {
    house: ["This is where it started. A new player needed a place to build, and someone made some room. Every brotherhood has a first block."],
    path: ["Follow the path back through the story: a new player, a small kindness, a first chat, and a friendship that kept growing.", '#story', 'Read the story again'],
    lantern1: [`Happy birthday, ${cfg.name}. May this year bring you good luck, good loot, and no creepers behind you.`],
    lantern2: ["Another lantern, another wish: keep building things you're proud of. I'll keep building this friendship."],
    flowers: ["Small flowers by the path. Quiet little things that keep growing, like this friendship."],
    lake: ["Still water. We've never met in real life, and it never mattered."],
    block: ["The block hums with a warm gold light. Your final surprise is waiting.", '#final', 'Go to the final surprise']
  };
  const found = new Set();
  const mark = k => $$(`.hs[data-k="${k}"]`, wb).forEach(h => h.classList.add('done'));
  let wx = 60;
  const walkTo = x => { wx = Math.max(10, Math.min(740, x)); walker.style.transform = `translateX(${wx}px)`; };
  function discover(k, el) {
    if (el) { const b = el.getBBox(); walkTo(b.x + b.width / 2 - 16); }
    const act = $('#worldAction'); act.hidden = true;
    if (k === 'block' && !['house', 'path'].every(x => found.has(x)) || k === 'block' && !(found.has('lantern1') || found.has('lantern2'))) {
      $('#worldMsg').textContent = 'The block is silent for now. Find the house, the path and a lantern first.';
      return;
    }
    found.add(k); mark(k);
    const [text, href, label] = MSG[k];
    $('#worldMsg').textContent = text;
    if (href) { act.href = href; act.textContent = label; act.hidden = false; }
    $('#count').textContent = `Discovered ${found.size} / 7`;
    if (['house', 'path'].every(x => found.has(x)) && (found.has('lantern1') || found.has('lantern2')) && $('#gem').classList.contains('locked')) {
      $('#gem').classList.remove('locked'); toast('Something stirred', 'The special block is unlocked');
    }
    if (k === 'block') toast('Advancement made!', 'The Final Block');
  }
  wsvg.addEventListener('click', e => {
    const h = e.target.closest('.hs');
    if (h) return discover(h.dataset.k, h);
    const p = wsvg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY;
    walkTo(p.matrixTransform(wsvg.getScreenCTM().inverse()).x - 16);
  });
  wsvg.addEventListener('keydown', e => {
    const h = e.target.closest && e.target.closest('.hs');
    if (h && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); discover(h.dataset.k, h); }
  });
  wb.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { e.preventDefault(); walkTo(wx + 40); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); walkTo(wx - 40); }
  });

  /* ---------- Chest ---------- */
  const stage = $('#stage'), chest = $('#chest'), pts = $('#pts');
  const later = (fn, ms) => setTimeout(fn, reduce ? 0 : ms);
  function burst(n) {
    if (reduce) return;
    for (let i = 0; i < n; i++) {
      const p = document.createElement('span'); p.className = 'pt';
      const a = Math.random() * Math.PI - Math.PI, d = 70 + Math.random() * 170;
      p.style.setProperty('--dx', Math.cos(a) * d + 'px'); p.style.setProperty('--dy', Math.sin(a) * d - 20 + 'px');
      p.style.animationDelay = Math.random() * .5 + 's';
      p.style.background = Math.random() < .3 ? C.cream : C.gold;
      pts.appendChild(p); setTimeout(() => p.remove(), 2800);
    }
  }
  function confetti() {
    if (reduce) return;
    const cols = [C.gold, C.cream, C.grass, '#8a7344'];
    for (let i = 0; i < 70; i++) {
      const c = document.createElement('span'); c.className = 'conf';
      c.style.left = Math.random() * 100 + 'vw'; c.style.background = cols[i % cols.length];
      c.style.setProperty('--dx', (Math.random() * 120 - 60) + 'px'); c.style.setProperty('--rot', (Math.random() * 720) + 'deg');
      c.style.animationDuration = 3 + Math.random() * 3 + 's'; c.style.animationDelay = Math.random() * 1.2 + 's';
      document.body.appendChild(c); setTimeout(() => c.remove(), 7500);
    }
  }
  chest.addEventListener('click', () => {
    if (stage.classList.contains('open')) return;
    stage.classList.add('open'); chest.setAttribute('aria-label', 'Chest opened');
    later(() => burst(46), 500);
    later(() => { $('#r1').classList.add('show'); toast('Advancement made!', 'Treasure Hunter'); }, 1200);
    later(() => { $('#r2').classList.add('show'); confetti(); burst(30); }, 2800);
    later(() => $('#r2').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' }), 3000);
  });

  /* ---------- Audio (off by default, user-initiated) ---------- */
  const sBtn = $('#soundBtn'), vol = $('#vol');
  let on = false, el = null, ctx = null, master = null, synthStarted = false;
  const level = () => vol.value / 100;
  function startSynth() {
    if (synthStarted) { ctx && ctx.resume(); master && (master.gain.value = level() * .25); return; }
    const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
    synthStarted = true; ctx = new AC(); master = ctx.createGain(); master.gain.value = level() * .25;
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 700; master.connect(lp); lp.connect(ctx.destination);
    [110, 164.81, 220, 277.18, 329.63].forEach((f, i) => {
      const o = ctx.createOscillator(), gn = ctx.createGain(), l = ctx.createOscillator(), lg = ctx.createGain();
      o.type = 'sine'; o.frequency.value = f; gn.gain.value = .12;
      l.frequency.value = .05 + i * .03; lg.gain.value = .08; l.connect(lg); lg.connect(gn.gain);
      o.connect(gn); gn.connect(master); o.start(); l.start();
    });
  }
  function soundOn() {
    if (!el) {
      el = new Audio('assets/audio/ambient.mp3'); el.loop = true;
      el.addEventListener('error', () => { if (on) startSynth(); });
    }
    el.volume = level();
    const pr = el.play(); if (pr && pr.catch) pr.catch(() => { if (on) startSynth(); });
  }
  function soundOff() { el && el.pause(); ctx && ctx.suspend(); }
  function setSound(v) {
    on = v; sBtn.setAttribute('aria-pressed', v); $('#soundIcon').textContent = v ? '🔊' : '🔇';
    sBtn.setAttribute('aria-label', v ? 'Turn ambient sound off' : 'Turn ambient sound on');
    v ? soundOn() : soundOff();
  }
  sBtn.addEventListener('click', () => setSound(!on));
  vol.addEventListener('input', () => { if (el) el.volume = level(); if (master) master.gain.value = level() * .25; });
})();
