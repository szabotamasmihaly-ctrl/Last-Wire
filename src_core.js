
/* ===== Last Wire: the learning path ======================================================
   A course is six CEFR levels (A1 to C2) of 50 grammar stations each, grouped into units of five.
   Every station is a small bomb. Its puzzles are always the same four kinds; only what they teach changes:
     gap    – the bomb shows a sentence with a hole, the helper has the words behind three colours
     listen – the helper reads a sentence aloud, the bomb builds it from word tiles (wrong forms mixed in)
     fix    – the bomb finds the wrong word, the helper has the words that could replace it
     match  – the bomb has sentence beginnings, the helper has the endings
   Course files call LWC(language, level, text). The text is one line per thing:
     # unit title (en | hu | da)
     @ station title (en | hu | da)
     = a model sentence for the helper, the point in [brackets]
     - an item: a sentence with one [right|wrong|wrong] gap ("—" means "no word here")
     ~ a beginning | its ending
*/
var CEFR = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
var COURSES = ['en', 'es'];
var COURSE = {};
var GLOSS = {};
function lwTrim(s) { return String(s == null ? '' : s).replace(/^\s+|\s+$/g, ''); }
function lwTri(s) { var p = String(s).split('|').map(lwTrim); return { en: p[0], hu: p[1] || p[0], da: p[2] || p[0] }; }
function joinGap(pre, w, post) {
  if (w === '—') {
    var a = pre.replace(/\s+$/, ''), b = post.replace(/^\s+/, '');
    if (!a) return b.charAt(0).toUpperCase() + b.slice(1);
    return a + (/^[.,!?;:…]/.test(b) || !b ? '' : ' ') + b;
  }
  return pre + w + post;
}
function lwItem(s) {
  var m = s.match(/^(.*?)\[([^\]]+)\](.*)$/); if (!m) return null;
  var opts = m[2].split('|').map(lwTrim).filter(Boolean);
  if (opts.length < 2) return null;
  return { pre: m[1], post: m[3], opts: opts, full: joinGap(m[1], opts[0], m[3]) };
}
function LWC(lang, lv, text) {
  var C = COURSE[lang] || (COURSE[lang] = []), L = C[lv - 1] = { units: [], list: [] }, unit = null, st = null;
  String(text).split('\n').forEach(function (raw) {
    var line = lwTrim(raw); if (!line) return;
    var c = line.charAt(0), body = lwTrim(line.slice(1));
    if (c === '#') { unit = { t: lwTri(body), st: [] }; L.units.push(unit); return; }
    if (c === '@') {
      if (!unit) { unit = { t: lwTri(''), st: [] }; L.units.push(unit); }
      st = { t: lwTri(body), ex: [], items: [], pairs: [], lang: lang, lv: lv, n: L.list.length + 1, u: L.units.length };
      unit.st.push(st); L.list.push(st); return;
    }
    if (!st) return;
    if (c === '=') st.ex.push(body);
    else if (c === '-') { var it = lwItem(body); if (it) st.items.push(it); }
    else if (c === '~') { var p = body.split('|'); if (p.length === 2) st.pairs.push([lwTrim(p[0]), lwTrim(p[1])]); }
  });
}
/* word meanings for tap-to-translate: "word=hu;da" for English, "palabra=en;hu;da" for Spanish */
function LWG(lang, text) {
  var G = GLOSS[lang] || (GLOSS[lang] = {}), cols = lang === 'en' ? ['hu', 'da'] : ['en', 'hu', 'da'];
  String(text).split('\n').forEach(function (raw) {
    var line = lwTrim(raw), at = line.indexOf('='); if (at < 1) return;
    var k = line.slice(0, at).toLowerCase(), v = line.slice(at + 1).split(';'), e = {};
    cols.forEach(function (c, j) { if (v[j] && lwTrim(v[j])) e[c] = lwTrim(v[j]); });
    G[k] = e;
  });
}
function wordKey(w) { return String(w).toLowerCase().replace(/[’‘]/g, "'").replace(/^[¿¡"«“„(\[']+|[.,!?;:"»”)\]…]+$/g, ''); }
function glossFor(lang, ui, w) { var G = GLOSS[lang], e = G && G[wordKey(w)]; return e && ui !== lang ? (e[ui] || '') : ''; }

function stationOf(lang, lv, n) { var C = COURSE[lang], L = C && C[lv - 1]; return (L && L.list[n - 1]) || null; }
function pathCode(lang, lv, n) { return 'P:' + lang + ':' + lv + ':' + n; }
function parsePathCode(code) {
  var m = /^P:([a-z]{2}):([1-6]):(\d{1,2})$/.exec(String(code || ''));
  return m ? { lang: m[1], lv: +m[2], n: +m[3] } : null;
}
/* every station in course order, for "what comes next" */
function courseList(lang) {
  var out = [], C = COURSE[lang] || [];
  for (var lv = 1; lv <= 6; lv++) { var L = C[lv - 1]; if (L) L.list.forEach(function (s) { out.push(pathCode(lang, lv, s.n)); }); }
  return out;
}

/* ---------- words of a sentence ---------- */
var LW_LEAD = /^[¿¡"«“„(]+/, LW_TAIL = /[.,!?;:"»”)…]+$/;
function lwWords(s) { return lwTrim(s).split(/\s+/).filter(Boolean); }
function lwCore(w) { return w.replace(LW_LEAD, '').replace(LW_TAIL, ''); }
/* capitalised words in the middle of a sentence are names; they keep their capital on the tiles */
var LW_NAMES = {};
function lwNames(lang) {
  if (LW_NAMES[lang]) return LW_NAMES[lang];
  var N = LW_NAMES[lang] = { I: 1 };
  (COURSE[lang] || []).forEach(function (L) {
    if (L) L.list.forEach(function (st) {
      st.items.forEach(function (it) { lwWords(it.full).forEach(function (w, k) { var c = lwCore(w); if (k > 0 && /^[A-ZÁÉÍÓÚÑ]/.test(c) && !/[.?!]$/.test(lwWords(it.full)[k - 1] || '')) N[c] = 1; }); });
    });
  });
  return N;
}
function lwTile(w, first, lang) {
  var c = lwCore(w); if (!c) return '';
  if (!first) return c;
  var N = lwNames(lang);
  if (N[c] || /^I'/.test(c)) return c;
  return c.charAt(0).toLowerCase() + c.slice(1);
}
function lwEnd(full) { var m = lwTrim(full).match(/[.?!…]+$/); return m ? m[0] : '.'; }
function lwStart(full) { var m = lwTrim(full).match(/^[¿¡]/); return m ? m[0] : ''; }

/* ---------- the four puzzles, built from a station's items ---------- */
function genGapP(r, items) {
  return items.map(function (it) {
    var opts = it.opts.slice(0, 3), perm = r.shuffle(opts.map(function (_, k) { return k; }));
    return { pre: it.pre, post: it.post, words: perm.map(function (k) { return opts[k]; }), ans: perm.indexOf(0), full: it.full };
  });
}
function genListenP(r, items, lang) {
  return items.map(function (it) {
    var ws = lwWords(it.full), ans = ws.map(function (w, k) { return lwTile(w, k === 0, lang); }).filter(Boolean);
    var have = {}; ans.forEach(function (x) { have[x.toLowerCase()] = 1; });
    var extra = [];
    it.opts.slice(1).forEach(function (o) {
      if (o === '—') return;
      lwWords(o).forEach(function (w, k) {
        var x = lwTile(w, ws.length && it.pre === '' && k === 0, lang); if (x && !have[x.toLowerCase()] && extra.indexOf(x) < 0) extra.push(x);
      });
    });
    return { full: it.full, ans: ans, tiles: r.shuffle(ans.concat(extra.slice(0, 3))), end: lwEnd(it.full), start: lwStart(it.full) };
  });
}
function lwSplitGap(pre, w, post) {
  var preT = lwWords(pre), postT, wT = w === '—' ? [] : lwWords(w), lead = '', tail = '';
  if (pre && !/\s$/.test(pre) && preT.length) lead = preT.pop();
  var m = post.match(/^(\S*)([\s\S]*)$/);
  if (m[1] && !/^\s/.test(post)) { tail = m[1]; postT = lwWords(m[2]); } else postT = lwWords(post);
  if (wT.length) { wT[0] = lead + wT[0]; wT[wT.length - 1] += tail; }
  else { if (lead) preT.push(lead); if (tail) { if (preT.length) preT[preT.length - 1] += tail; else postT.unshift(tail); } }
  return { toks: preT.concat(wT, postT), from: preT.length, n: wT.length };
}
function genFixP(r, items) {
  var out = [];
  items.forEach(function (it) {
    if (out.length >= 2) return;
    var right = it.opts[0], wrongs = it.opts.slice(1).filter(function (o) { return o !== '—'; });
    if (!wrongs.length) return;
    var wrong = r.pick(wrongs), sp = lwSplitGap(it.pre, wrong, it.post);
    if (!it.pre && sp.toks.length) sp.toks[0] = sp.toks[0].charAt(0).toUpperCase() + sp.toks[0].slice(1);
    var opts = it.opts.slice(0, 3), perm = r.shuffle(opts.map(function (_, k) { return k; }));
    var bad = []; for (var k = 0; k < sp.n; k++) bad.push(sp.from + k);
    out.push({ toks: sp.toks, bad: bad, words: perm.map(function (k) { return opts[k]; }), ans: perm.indexOf(0), full: it.full, right: right });
  });
  return out;
}
function genMatchP(r, pairs) {
  var pick = r.sample(pairs, Math.min(3, pairs.length)), order = r.shuffle(pick.map(function (_, k) { return k; }));
  return { left: pick.map(function (p) { return p[0]; }), right: order.map(function (k) { return pick[k][1]; }), ans: pick.map(function (_, k) { return order.indexOf(k) + 1; }), full: pick.map(function (p) { return p[0] + ' ' + p[1]; }) };
}
function makeStationSpec(code) {
  var p = parsePathCode(code); if (!p) return null;
  var st = stationOf(p.lang, p.lv, p.n), P = PACK[p.lang];
  if (!st || !P || st.items.length < 3) return null;
  var base = hashSeed('lwp:' + code), r = RU(mulberry32(base));
  var idx = r.shuffle(st.items.map(function (_, k) { return k; }));
  var gapI = idx.slice(0, 3), rest = idx.slice(3);
  var len = function (k) { return lwWords(st.items[k].full).length; };
  var listenI = rest.slice().sort(function (a, b) { return len(a) - len(b); }).slice(0, 2);
  if (!listenI.length) listenI = [gapI[0]];
  var fixI = rest.filter(function (k) { return listenI.indexOf(k) < 0; }).concat(gapI.slice().reverse());
  var at = function (list) { return list.map(function (k) { return st.items[k]; }); };
  var mods = [{ t: 'gap', data: { rounds: genGapP(r, at(gapI)), ex: st.ex } }, { t: 'listen', data: { rounds: genListenP(r, at(listenI), p.lang) } }];
  var fix = genFixP(r, at(fixI)), hasPairs = st.pairs.length >= 3;
  if (fix.length && (!hasPairs || p.lv >= 3)) mods.push({ t: 'fix', data: { rounds: fix, ex: st.ex } });
  if (hasPairs) mods.push({ t: 'match', data: genMatchP(r, st.pairs) });
  if (mods.length < 3 && fix.length) mods.push({ t: 'fix', data: { rounds: fix, ex: st.ex } });
  var secs = 40;
  mods.forEach(function (m) {
    if (m.t === 'gap') secs += 32 * m.data.rounds.length;
    else if (m.t === 'listen') m.data.rounds.forEach(function (x) { secs += 25 + 5 * x.ans.length; });
    else if (m.t === 'fix') secs += 45 * m.data.rounds.length;
    else secs += 90;
  });
  var r0 = RU(mulberry32(base ^ 0x5bd1e995));
  return {
    code: 'P:' + p.lang + ':' + p.lv + ':' + p.n, path: true, lang: p.lang, level: p.lv, station: p.n, mission: 0, st: st,
    serial: genSerial(r0, P), batteries: r0.int(4), modules: mods, time: Math.round(secs / 10) * 10, maxStrikes: 3
  };
}
/* every sentence a station uses: the words in it are the ones its flashcards look for */
function stationTexts(st) {
  var out = st.ex.map(function (s) { return s.replace(/[\[\]]/g, ''); });
  st.items.forEach(function (it) { out.push(it.full); });
  st.pairs.forEach(function (p) { out.push(p[0] + ' ' + p[1]); });
  return out;
}

/* ---------- Spanish: the bomb's own words ---------- */
var ES_ONES = ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve',
  'veinte', 'veintiuno', 'veintidós', 'veintitrés', 'veinticuatro', 'veinticinco', 'veintiséis', 'veintisiete', 'veintiocho', 'veintinueve'];
var ES_TENS = [null, null, null, 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
var ES_HUND = [null, 'ciento', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];
function esNum(n) {
  if (n < 30) return ES_ONES[n];
  if (n < 100) return ES_TENS[Math.floor(n / 10)] + (n % 10 ? ' y ' + ES_ONES[n % 10] : '');
  if (n === 100) return 'cien';
  return ES_HUND[Math.floor(n / 100)] + (n % 100 ? ' ' + esNum(n % 100) : '');
}
PACK.es = {
  id: 'es', bcp: 'es-ES', name: 'Español', title: 'Último Cable',
  letters: ['á', 'é', 'í', 'ó', 'ú', 'ñ', 'ü', '¿', '¡'], alphabet: 'a b c d e f g h i j k l m n ñ o p q r s t u v w x y z'.split(' '),
  serial: 'ABCDEFGHJKLMNPRSTVXYZ', vowels: 'AEIOU',
  colors: [{ k: 'rojo', e: 'rojos' }, { k: 'azul', e: 'azules' }, { k: 'amarillo', e: 'amarillos' }, { k: 'verde', e: 'verdes' }, { k: 'blanco', e: 'blancos' }, { k: 'negro', e: 'negros' }],
  ord: ['primero', 'segundo', 'tercero', 'cuarto', 'quinto', 'sexto'], last: 'último',
  mod: { gap: 'Hueco', listen: 'Escucha', fix: 'Corrige', match: 'Une' },
  plate: { danger: 'Peligro', bomb: 'Bomba de idiomas', front: 'Frente', back: 'Detrás', under: 'Base', up: 'Este lado arriba', serial: 'Número de serie', bat: 'Pilas', clock: 'Reloj', strikes: 'Fallos' },
  win: '¡Desactivada!', boom: '¡Bum!', hello: '¡Hola! ¿Me oyes? La bomba espera.',
  num: esNum
};
PACK.en.mod.gap = 'Gap'; PACK.en.mod.listen = 'Listen'; PACK.en.mod.fix = 'Fix it'; PACK.en.mod.match = 'Match';
PACK.da.mod.gap = 'Hul'; PACK.da.mod.listen = 'Lyt'; PACK.da.mod.fix = 'Ret'; PACK.da.mod.match = 'Par';
PACK.hu.mod.gap = 'Hiány'; PACK.hu.mod.listen = 'Hallgasd'; PACK.hu.mod.fix = 'Javítsd'; PACK.hu.mod.match = 'Párosítsd';
var ES_PHRASES = [
  ['¿Me oyes?', 'Can you hear me?', 'Hallasz?', 'Kan du høre mig?'],
  ['¿Puedes repetirlo?', 'Can you say it again?', 'Megismételnéd?', 'Kan du sige det igen?'],
  ['Más despacio, por favor.', 'Slower, please.', 'Lassabban, kérlek.', 'Langsommere, tak.'],
  ['¿Qué color?', 'Which colour?', 'Melyik szín?', 'Hvilken farve?'],
  ['Pulsa el rojo.', 'Press red.', 'Nyomd meg a pirosat.', 'Tryk på den røde.'],
  ['¿Cuál es la frase?', 'What is the sentence?', 'Mi a mondat?', 'Hvad er sætningen?'],
  ['Te leo la frase.', "I'll read you the sentence.", 'Felolvasom a mondatot.', 'Jeg læser sætningen op for dig.'],
  ['Creo que es esta.', 'I think it is this one.', 'Szerintem ez az.', 'Jeg tror, det er den her.'],
  ['¡Lo tengo!', 'Got it!', 'Megvan!', 'Jeg har den!'],
  ['No estoy seguro.', "I'm not sure.", 'Nem vagyok biztos benne.', 'Jeg er ikke sikker.'],
  ['¡Rápido!', 'Quick!', 'Gyorsan!', 'Hurtigt!'],
  ['¡Bien hecho!', 'Well done!', 'Szép munka!', 'Godt gået!']
];
