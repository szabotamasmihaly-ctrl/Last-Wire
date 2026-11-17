
  /* ===== part P: the learning path ======================================================= */
  var P_COL = ['#D8263C', '#2F6FE4', '#F4C430', '#2FA35E'], P_SHAPE = ['●', '▲', '■', '◆'];
  var UNIT_COL = [['#58CC02', '#46A302'], ['#1CB0F6', '#1899D6'], ['#CE82FF', '#A568CC'], ['#FF9600', '#CC7800'], ['#FF4B4B', '#D33131'], ['#2B70C9', '#1F5AA6'], ['#00B5A3', '#008F81'], ['#E5527A', '#B83E60'], ['#8E6CEF', '#6E4FCC'], ['#E0A100', '#B07F00']];
  var DAILY_GOAL = 30, CARD_MAX = 6, BOX_GAP = [0, 1, 2, 4, 7], LEARNED = 5;

  /* ---------- progress: stars per station, XP, streak and how many bombs have been played ---------- */
  function px() {
    var x = S.prog._x;
    if (!x || typeof x !== 'object') x = S.prog._x = {};
    if (typeof x.xp !== 'number') x.xp = 0;
    if (typeof x.played !== 'number') x.played = 0;
    if (typeof x.streak !== 'number') x.streak = 0;
    return x;
  }
  function today() { var d = new Date(); return d.getFullYear() + '-' + (d.getMonth() < 9 ? '0' : '') + (d.getMonth() + 1) + '-' + (d.getDate() < 10 ? '0' : '') + d.getDate(); }
  function dayDiff(a, b) { if (!a || !b) return 99; return Math.round((new Date(b + 'T12:00:00') - new Date(a + 'T12:00:00')) / 864e5); }
  function streakNow() { var x = px(); return dayDiff(x.last, today()) <= 1 ? x.streak : 0; }
  function xpToday() { var x = px(); return x.day === today() ? (x.dayXp || 0) : 0; }
  function addXp(n) {
    var x = px(), d = today(), up = false;
    if (x.day !== d) { x.day = d; x.dayXp = 0; }
    x.dayXp += n; x.xp += n;
    if (x.last !== d) { x.streak = dayDiff(x.last, d) === 1 ? x.streak + 1 : 1; x.last = d; up = true; }
    return up;
  }
  function starsOf(code) { return S.prog[code] || 0; }
  /* where the path stands: the station after the furthest one played */
  function pathPos(lang) {
    var list = courseList(lang), far = -1;
    list.forEach(function (c, k) { if (starsOf(c)) far = k; });
    var cur = Math.min(far + 1, list.length - 1);
    return { list: list, far: far, cur: cur, code: list[cur] };
  }

  /* ---------- the words a player has tapped: they come back until they are learned ---------- */
  var WKEY = STORE + '-words', WDB = null;
  function wdb() {
    if (!WDB) { try { WDB = JSON.parse(localStorage.getItem(WKEY) || '{}') || {}; } catch (e) { WDB = {}; } }
    if (typeof WDB !== 'object') WDB = {};
    return WDB;
  }
  function wlang(L) { var d = wdb(); if (!d[L] || typeof d[L] !== 'object') d[L] = {}; return d[L]; }
  function wsave() { try { localStorage.setItem(WKEY, JSON.stringify(WDB)); } catch (e) {} }
  function wAdd(L, k, ctx, code) {
    var W = wlang(L), e = W[k], n = px().played;
    if (!e) e = W[k] = { k: k, ctx: ctx, code: code, box: 0, taps: 0, last: n, t: Date.now() };
    e.taps++; e.box = 0; e.last = n; if (ctx) e.ctx = ctx; if (code) e.code = code;
    wsave();
  }
  function wList(L) { var W = wlang(L), out = []; for (var k in W) if (W[k] && W[k].k) out.push(W[k]); return out; }
  function wLearning(L) { return wList(L).filter(function (e) { return e.box < LEARNED; }); }
  function wIsDue(e) { return e.box < LEARNED && px().played >= e.last + BOX_GAP[Math.min(e.box, BOX_GAP.length - 1)]; }
  function inReview(k) { var e = wlang(tl())[k]; return !!(e && e.box < LEARNED); }
  function hasWord(text, k) { return lwWords(text).some(function (w) { return wordKey(w) === k; }); }
  /* the cards before a station: due words first, and among them the ones this station uses, shown in its own sentence */
  function cardsFor(spec) {
    var L = spec.lang, texts = stationTexts(spec.st), list = wLearning(L).map(function (e) {
      var s = null; texts.forEach(function (x) { if (!s && hasWord(x, e.k)) s = x; });
      return { e: e, s: s, due: wIsDue(e) };
    }).filter(function (c) { return c.due || c.s; });
    list.sort(function (a, b) { return (b.s ? 1 : 0) - (a.s ? 1 : 0) || a.e.box - b.e.box || a.e.t - b.e.t; });
    return list.slice(0, CARD_MAX).map(function (c) { return { k: c.e.k, ctx: c.s || c.e.ctx, here: !!c.s }; });
  }
  /* after a bomb: a word met again without a tap gets stronger, a word tapped again starts over */
  function wordsAfter(spec, won) {
    var L = spec.lang, texts = stationTexts(spec.st), n = px().played, up = 0;
    wList(L).forEach(function (e) {
      if (e.box >= LEARNED || S.wopen[e.k]) return;
      if (won && texts.some(function (x) { return hasWord(x, e.k); })) { e.box++; e.last = n; if (e.box >= LEARNED) up++; }
    });
    wsave();
    return up;
  }

  /* ---------- tap a word: its meaning appears, it costs 3 seconds, and it goes on the word list ---------- */
  function wGloss(w) { return glossFor(tl(), ui(), w); }
  function TW(text, ctx) {
    ctx = ctx || text;
    return String(text).split(/(\s+)/).map(function (tok) {
      if (!tok || /^\s+$/.test(tok)) return tok;
      var lead = (tok.match(LW_LEAD) || [''])[0], rest = tok.slice(lead.length), tail = (rest.match(LW_TAIL) || [''])[0], core = rest.slice(0, rest.length - tail.length);
      var k = wordKey(core), g = core && wGloss(core);
      if (!g) return esc(tok);
      var open = !!S.wopen[k];
      return esc(lead) + '<button type="button" class="tw' + (open ? ' open' : '') + (!open && inReview(k) ? ' rv' : '') + '" data-a="wt" data-w="' + esc(k) + '" data-s="' + esc(ctx) + '"' + (open ? ' tabindex="-1"' : '') + '>' +
        '<span class="tw-w">' + esc(core) + '</span>' + (open ? '<span class="tw-g' + (S.wnew === k ? ' pop' : '') + '" lang="' + ui() + '">' + esc(g) + '</span>' : '') + '</button>' + esc(tail);
    }).join('');
  }
  function wordTap(k, ctx) {
    if (!k || S.wopen[k] || !wGloss(k)) return;
    S.wopen[k] = true; S.wnew = k;
    wAdd(tl(), k, ctx, S.spec ? S.spec.code : '');
    if (S.screen === 'bomb' && S.game && !S.game.over) penalty(3); else sfx('pen');
    if (helperVisible()) renderHelpBody();
    else if (S.screen === 'bomb' && S.view && S.view.focus != null) renderMod(S.view.focus);
    else render();
    S.wnew = null;
    var b = document.querySelector('.tw[data-w="' + k.replace(/["\\]/g, '\\$&') + '"]');
    if (b) { var f = document.createElement('span'); f.className = 'wd-pen'; f.setAttribute('aria-hidden', 'true'); f.textContent = t('pen', 3); b.appendChild(f); setTimeout(function () { if (f.parentNode) f.parentNode.removeChild(f); }, 1300); }
  }
  /* a model sentence with its point highlighted: the brackets become a mark */
  function exHTML(s) {
    var m = s.match(/^(.*?)\[([^\]]+)\](.*)$/), clean = s.replace(/[\[\]]/g, '');
    if (!m) return TW(clean, clean);
    return TW(m[1], clean) + '<mark>' + TW(m[2], clean) + '</mark>' + TW(m[3], clean);
  }
  function exBox(ex) { return ex && ex.length ? '<ul class="pex" lang="' + tl() + '">' + ex.map(function (s) { return '<li><i aria-hidden="true">✓</i><span>' + exHTML(s) + '</span></li>'; }).join('') + '</ul>' : ''; }
  function sizeCls(text) { var n = String(text).length; return n > 90 ? ' xs' : n > 60 ? ' sm' : ''; }
  function cBtns(i, n, pick) {
    var h = '<div class="cbtns n' + n + '">';
    for (var k = 0; k < n; k++) h += '<button type="button" class="cbtn c' + k + (pick === k ? ' on' : '') + '" data-a="m" data-i="' + i + '" data-k="c" data-v="' + k + '" aria-label="' + esc(PACK[tl()].colors[k].k) + '">' + kbd(k + 1) + '<span aria-hidden="true">' + P_SHAPE[k] + '</span></button>';
    return h + '</div>';
  }
  function cWords(words) {
    var C = PACK[tl()].colors;
    return '<ul class="cw" lang="' + tl() + '">' + words.map(function (w, k) {
      return '<li><span class="sw c' + k + '" aria-hidden="true">' + P_SHAPE[k] + '</span><span class="cw-c">' + esc(C[k].k) + '</span><b class="cw-w">' + (w === '—' ? '<span class="none">—</span>' : TW(w, w)) + '</b>' + (w !== '—' ? sayBtn(w, true) : '') + '</li>';
    }).join('') + '</ul>';
  }

  /* ---- gap: the bomb has the sentence, the helper has the words ---- */
  UI.gap = {
    init: function () { return { r: 0, fb: false }; },
    bomb: function (d, st, i) {
      var rd = d.rounds[st.r];
      return note([cnt('n.sentence', st.r + 1, d.rounds.length)]) +
        '<p class="gp-s' + sizeCls(rd.full) + '" lang="' + tl() + '">' + TW(rd.pre, rd.full) + '<span class="hole" aria-label="___"></span>' + TW(rd.post, rd.full) + '</p>' +
        cBtns(i, rd.words.length) + (st.fb ? fbBad('p.bad') : '');
    },
    on: function (k, v, d, st) {
      if (k !== 'c') return;
      var rd = d.rounds[st.r]; v = +v; if (!(v >= 0 && v < rd.words.length)) return;
      if (v !== rd.ans) { st.fb = true; return 'strike'; }
      st.r++; st.fb = false;
      return st.r >= d.rounds.length ? 'solved' : 'next';
    },
    key: function (e, d, st, i) { var n = digitOf(e); if (n >= 1 && n <= d.rounds[st.r].words.length) { modAct(i, 'c', n - 1); return true; } },
    keys: function () { return t('keys.col'); },
    done: function (d) { return learn(UI.gap.recap(d)); },
    recap: function (d) { return d.rounds.map(function (x) { return { tx: x.full }; }); },
    pos: function (d, st) { return st.r; },
    help: function (d, i, ms) {
      var p = Math.min(ms.step || 0, d.rounds.length - 1);
      return exBox(d.ex) + card(cnt('n.sentence', p + 1, d.rounds.length), '', cWords(d.rounds[p].words) + stepNav(i, p, d.rounds.length, null, null, true));
    },
    onHelp: function (k, v, d, ms) { if (stepMove(k, ms, d.rounds.length)) renderHelpBody(); else if (k === 'play') Voice.speak(v, 0.9); }
  };

  /* ---- listen: the helper reads, the bomb builds ---- */
  UI.listen = {
    init: function () { return { r: 0, placed: [], fb: false }; },
    bomb: function (d, st, i) {
      var rd = d.rounds[st.r];
      var h = note([cnt('n.sentence', st.r + 1, d.rounds.length)]);
      h += '<div class="build lb" role="group">' + (rd.start && st.placed.length ? '<span class="pz">' + rd.start + '</span>' : '') + (st.placed.length ? st.placed.map(function (ti, pos) {
        var x = rd.tiles[ti];
        return '<button type="button" class="tile in" data-a="m" data-i="' + i + '" data-k="rm" data-v="' + pos + '" lang="' + tl() + '">' + esc(pos === 0 ? cap(x) : x) + '</button>';
      }).join('') + '<span class="pz">' + esc(rd.end) + '</span>' : '<span class="build-empty">🎧</span>') + '</div>';
      h += '<div class="tray" role="group">' + rd.tiles.map(function (x, ti) {
        return st.placed.indexOf(ti) >= 0 ? '<span class="tile ghost" aria-hidden="true">' + esc(x) + '</span>' : '<button type="button" class="tile" data-a="m" data-i="' + i + '" data-k="add" data-v="' + ti + '" lang="' + tl() + '">' + esc(x) + '</button>';
      }).join('') + '</div>';
      h += '<div class="row">' + B(i, 'clear', null, t('order.clear'), '', !st.placed.length) + B(i, 'send', null, t('ck.check'), 'go wide', !st.placed.length) + '</div>';
      return h + (st.fb ? fbBad('p.bad') : '');
    },
    on: function (k, v, d, st) {
      var rd = d.rounds[st.r];
      if (k === 'add') { v = +v; if (v >= 0 && v < rd.tiles.length && st.placed.indexOf(v) < 0) st.placed.push(v); st.fb = false; return 're'; }
      if (k === 'rm') { st.placed.splice(+v, 1); st.fb = false; return 're'; }
      if (k === 'clear') { st.placed = []; st.fb = false; return 're'; }
      if (k === 'send') {
        if (!st.placed.length) return;
        var got = st.placed.map(function (ti) { return rd.tiles[ti].toLowerCase(); }).join(' '), want = rd.ans.map(function (x) { return x.toLowerCase(); }).join(' ');
        if (got === want) { st.r++; st.placed = []; st.fb = false; return st.r >= d.rounds.length ? 'solved' : 'next'; }
        st.fb = true; st.placed = []; return 'strike';
      }
    },
    key: function (e, d, st, i, onCtl) {
      if (e.key === 'Backspace') { if (st.placed.length) modAct(i, 'rm', st.placed.length - 1); return true; }
      if (e.key === 'Enter' && !onCtl && st.placed.length) { modAct(i, 'send'); return true; }
    },
    keys: function () { return ''; },
    done: function (d) { return learn(UI.listen.recap(d)); },
    recap: function (d) { return d.rounds.map(function (x) { return { tx: x.full }; }); },
    pos: function (d, st) { return st.r; },
    help: function (d, i, ms) {
      var p = Math.min(ms.step || 0, d.rounds.length - 1), rd = d.rounds[p], has = Voice.has();
      return card(cnt('n.sentence', p + 1, d.rounds.length), '', '<p class="card-big ls" lang="' + tl() + '">' + TW(rd.full, rd.full) + '</p>' +
        (has ? '<div class="row">' + HB(i, 'play', 's' + p, SPK + t('hear'), 'go') + HB(i, 'slow', 's' + p, t('hear.slow')) + '</div>' : '') +
        stepNav(i, p, d.rounds.length, null, null, true));
    },
    onHelp: function (k, v, d, ms, i) {
      if (stepMove(k, ms, d.rounds.length)) { Voice.stop(); renderHelpBody(); return; }
      helpCommon(k, v, ms, i, function (key) { var rd = d.rounds[+String(key).slice(1)]; return rd ? rd.full : null; });
    }
  };

  /* ---- fix: find the wrong word, then the helper's colour mends it ---- */
  UI.fix = {
    init: function () { return { r: 0, found: false, miss: [], fb: false }; },
    bomb: function (d, st, i) {
      var rd = d.rounds[st.r];
      var h = note([cnt('n.sentence', st.r + 1, d.rounds.length)]);
      h += '<div class="fx-s' + sizeCls(rd.toks.join(' ')) + '" lang="' + tl() + '">' + rd.toks.map(function (w, k) {
        var bad = rd.bad.indexOf(k) >= 0;
        if (st.found && bad) return '<span class="tile fx-bad">' + esc(w) + '</span>';
        if (st.miss.indexOf(k) >= 0) return '<span class="tile fx-miss">' + esc(w) + '</span>';
        return st.found ? '<span class="fx-w">' + esc(w) + '</span>' : '<button type="button" class="tile fx-t" data-a="m" data-i="' + i + '" data-k="tap" data-v="' + k + '">' + esc(w) + '</button>';
      }).join(' ') + '</div>';
      if (st.found) h += cBtns(i, rd.words.length);
      return h + (st.fb ? fbBad('p.bad') : '');
    },
    on: function (k, v, d, st) {
      var rd = d.rounds[st.r]; v = +v;
      if (k === 'tap' && !st.found) {
        if (rd.bad.indexOf(v) >= 0) { st.found = true; st.fb = false; return 'next'; }
        if (st.miss.indexOf(v) < 0) st.miss.push(v);
        st.fb = true; return 'strike';
      }
      if (k === 'c' && st.found) {
        if (!(v >= 0 && v < rd.words.length)) return;
        if (v !== rd.ans) { st.fb = true; return 'strike'; }
        st.r++; st.found = false; st.miss = []; st.fb = false;
        return st.r >= d.rounds.length ? 'solved' : 'next';
      }
    },
    key: function (e, d, st, i) { var n = digitOf(e); if (st.found && n >= 1 && n <= d.rounds[st.r].words.length) { modAct(i, 'c', n - 1); return true; } },
    keys: function () { return ''; },
    done: function (d) { return learn(UI.fix.recap(d)); },
    recap: function (d) { return d.rounds.map(function (x) { return { tx: x.full }; }); },
    pos: function (d, st) { return st.r; },
    help: function (d, i, ms) {
      var p = Math.min(ms.step || 0, d.rounds.length - 1);
      return exBox(d.ex) + card(cnt('n.sentence', p + 1, d.rounds.length), '', cWords(d.rounds[p].words) + stepNav(i, p, d.rounds.length, null, null, true));
    },
    onHelp: function (k, v, d, ms) { if (stepMove(k, ms, d.rounds.length)) renderHelpBody(); else if (k === 'play') Voice.speak(v, 0.9); }
  };

  /* ---- match: beginnings on the bomb, endings with the helper ---- */
  UI.match = {
    init: function (d) { return { set: d.left.map(function () { return 0; }), bad: [], fb: false }; },
    bomb: function (d, st, i) {
      var n = d.right.length;
      var h = '<ol class="mt" lang="' + tl() + '">' + d.left.map(function (s, k) {
        var v = st.set[k];
        return '<li class="' + (st.bad.indexOf(k) >= 0 ? 'bad' : '') + '"><span class="mt-s' + sizeCls(s) + '">' + TW(s, d.full[k]) + ' …</span>' +
          '<button type="button" class="mt-n" data-a="m" data-i="' + i + '" data-k="n" data-v="' + k + '" aria-label="' + (v || '?') + '">' + (v || '?') + '</button></li>';
      }).join('') + '</ol>';
      var ready = st.set.every(function (x) { return x > 0; });
      h += '<div class="row">' + B(i, 'send', null, t('ck.check'), 'go wide', !ready) + '</div>';
      return h + (st.fb ? fbBad('p.bad') : '') + '<span class="sr">' + n + '</span>';
    },
    on: function (k, v, d, st) {
      if (k === 'n') { v = +v; st.set[v] = st.set[v] % d.right.length + 1; st.bad = []; st.fb = false; return 're'; }
      if (k === 'send') {
        if (!st.set.every(function (x) { return x > 0; })) return;
        var bad = []; st.set.forEach(function (x, j) { if (x !== d.ans[j]) bad.push(j); });
        if (!bad.length) return 'solved';
        st.bad = bad; st.fb = true; return 'strike';
      }
    },
    keys: function () { return ''; },
    done: function (d) { return learn(UI.match.recap(d)); },
    recap: function (d) { return d.full.map(function (x) { return { tx: x }; }); },
    help: function (d) {
      return '<ol class="mt-r" lang="' + tl() + '">' + d.right.map(function (s, k) { return '<li><b>' + (k + 1) + '</b><span>… ' + TW(s, s) + '</span>' + sayBtn(s, true) + '</li>'; }).join('') + '</ol>';
    }
  };

  /* ---------- the path screen ---------- */
  var FLAG = { en: '🇬🇧', es: '🇪🇸' };
  var ICON_FIRE = '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M12 2c1 4 5 5.5 5 11a5 5 0 0 1-10 0c0-2.5 1.2-4 2.5-5 .2 2 1 3 2 3.5C11 9 11 5 12 2z" fill="currentColor"/></svg>';
  var ICON_BOLT = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M13 2 4 14h7l-1 8 9-12h-7z" fill="currentColor"/></svg>';
  var ICON_CARDS = '<svg viewBox="0 0 24 24" width="21" height="21" aria-hidden="true"><rect x="3" y="6" width="13" height="15" rx="2.5" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M8 3h10.5A2.5 2.5 0 0 1 21 5.5V17" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>';
  var ICON_HOME = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M3 11 12 3l9 8v10h-6v-6H9v6H3z" fill="currentColor"/></svg>';
  function ring(v, max) {
    var f = Math.max(0, Math.min(1, v / max)), c = 2 * Math.PI * 9;
    return '<svg class="ring" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-opacity=".2" stroke-width="3.5"/><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-dasharray="' + (c * f).toFixed(1) + ' 99" transform="rotate(-90 12 12)"/></svg>';
  }
  function statsBar() {
    var s = streakNow(), on = px().last === today(), learning = wLearning(S.sel.course).length;
    return '<div class="pstats">' +
      '<span class="pst fire' + (on ? ' on' : '') + '" title="' + esc(t('p.streak')) + '">' + ICON_FIRE + '<b>' + s + '</b><span class="sr">' + t('p.streak') + '</span></span>' +
      '<span class="pst xp" title="' + esc(t('p.goal', DAILY_GOAL)) + '">' + ring(xpToday(), DAILY_GOAL) + '<b>' + xpToday() + '</b><span class="sr">XP</span></span>' +
      '<button type="button" class="pst words" data-a="words" title="' + esc(t('p.words')) + '">' + ICON_CARDS + '<b>' + learning + '</b><span class="sr">' + t('p.words') + '</span></button></div>';
  }
  function levelDone(lang, lv) { var L = COURSE[lang] && COURSE[lang][lv - 1]; if (!L) return 0; var n = 0; L.list.forEach(function (s) { if (starsOf(pathCode(lang, lv, s.n))) n++; }); return n; }
  function viewPath() {
    var L = S.sel.course, C = COURSE[L] || [], pos = pathPos(L), lv = S.sel.plv;
    if (!(lv >= 1 && lv <= 6) || !C[lv - 1]) lv = S.sel.plv = pos.code ? parsePathCode(pos.code).lv : 1;
    var courses = COURSES.map(function (c) { return '<button type="button" data-a="course" data-v="' + c + '" aria-pressed="' + (L === c) + '" lang="' + c + '"><span aria-hidden="true">' + FLAG[c] + '</span>' + PACK[c].name + '</button>'; }).join('');
    var tabs = CEFR.map(function (name, k) {
      var Lv = C[k], n = Lv ? Lv.list.length : 0, d = Lv ? levelDone(L, k + 1) : 0;
      return '<button type="button" class="lvtab" data-a="plv" data-v="' + (k + 1) + '" aria-pressed="' + (lv === k + 1) + '"' + (Lv ? '' : ' disabled') + '><span>' + name + '</span><i><b style="width:' + (n ? Math.round(100 * d / n) : 0) + '%"></b></i></button>';
    }).join('');
    var h = '<div class="path"><div class="ptop"><div class="course" role="group" aria-label="' + esc(t('home.learn')) + '">' + courses + '</div>' + statsBar() + '</div>' +
      '<div class="lvtabs" role="group" aria-label="' + esc(t('home.level')) + '">' + tabs + '</div>';
    var Lv = C[lv - 1];
    if (!Lv) return h + '</div>';
    var off = [0, 1, 2, 1, 0, -1, -2, -1], gi = 0;
    Lv.units.forEach(function (u, ui) {
      var col = UNIT_COL[ui % UNIT_COL.length];
      h += '<section class="unit" style="--uc:' + col[0] + ';--ucd:' + col[1] + '"><header class="ubanner"><small>' + CEFR[lv - 1] + ' · ' + t('p.unit', ui + 1) + '</small><b>' + esc(u.t[ui_()] || u.t.en) + '</b></header><div class="nodes">';
      u.st.forEach(function (st) {
        var code = pathCode(L, lv, st.n), k = pos.list.indexOf(code), stars = starsOf(code), cur = k === pos.cur && !stars, lock = !stars && k > pos.cur;
        var x = off[gi++ % off.length] * 46;
        h += '<div class="node-w' + (cur ? ' cur' : '') + (S.justOpen === code ? ' fresh' : '') + '" style="--x:' + x + 'px" id="n-' + st.n + '">' +
          (cur ? '<span class="bubble">' + t('p.start') + '</span>' : '') +
          '<button type="button" class="node' + (stars ? ' done' : '') + (lock ? ' lock' : '') + (cur ? ' now' : '') + '" data-a="node" data-v="' + code + '" aria-label="' + esc(CEFR[lv - 1] + ' ' + st.n + ': ' + (st.t[ui_()] || st.t.en)) + '">' +
          (stars ? '<span aria-hidden="true">★</span>' : lock ? '<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><path d="M7 11V8a5 5 0 0 1 10 0v3" fill="none" stroke="currentColor" stroke-width="2.6"/><rect x="5" y="11" width="14" height="10" rx="2.5" fill="currentColor"/></svg>' : '<span aria-hidden="true">' + st.n + '</span>') + '</button>' +
          '<span class="nlabel">' + (stars ? '<span class="nst" aria-hidden="true">' + stars3(stars) + '</span>' : '') + '</span></div>';
      });
      h += '</div></section>';
    });
    if (lv < 6 && C[lv]) h += '<div class="lvnext"><button type="button" class="dbtn ghost" data-a="plv" data-v="' + (lv + 1) + '">' + CEFR[lv] + ' →</button></div>';
    h += '<p class="classic-l"><button type="button" class="link" data-a="classic">' + t('p.classic') + '</button></p></div>';
    return h;
  }
  function ui_() { return ui(); }
  function stars3(n) { var s = ''; for (var k = 0; k < 3; k++) s += k < n ? '★' : '☆'; return s; }
  function scrollToNode() {
    var cur = $('.node-w.fresh') || $('.node-w.cur');
    if (cur) { try { cur.scrollIntoView({ block: 'center', behavior: reduced() ? 'auto' : 'smooth' }); } catch (e) { cur.scrollIntoView(); } }
  }

  /* ---------- the station card that slides up from below ---------- */
  function sheetHTML() {
    var p = parsePathCode(S.sheet), st = p && stationOf(p.lang, p.lv, p.n); if (!st) return '';
    var stars = starsOf(S.sheet), due = cardsFor(makeStationSpec(S.sheet)).length;
    var ex = st.ex[0] || (st.items[0] && st.items[0].full) || '';
    return '<div class="scrim" data-a="sheet-close"></div><aside class="sheet" role="dialog" aria-modal="true" aria-labelledby="sh-t">' +
      '<p class="sh-tag">' + CEFR[p.lv - 1] + ' · ' + p.n + (stars ? ' <span class="nst">' + stars3(stars) + '</span>' : '') + '</p>' +
      '<h2 id="sh-t">' + esc(st.t[ui()] || st.t.en) + '</h2>' +
      '<p class="sh-ex" lang="' + p.lang + '">' + exHTML(ex) + '</p>' +
      (due ? '<p class="sh-due">' + ICON_CARDS + t('p.due', due) + '</p>' : '') +
      '<div class="sh-btns"><button type="button" class="dbtn go" data-a="play" data-v="bomb">' + t('role.bomb') + '</button>' +
      '<button type="button" class="dbtn" data-a="play" data-v="help">' + t('role.help') + '</button>' +
      '<button type="button" class="link" data-a="play" data-v="solo">' + t('p.solo') + '</button></div></aside>';
  }
  function openSheet(code) { S.sheet = code; renderDrawer(); var b = $('.sheet .dbtn'); if (b) { try { b.focus({ preventScroll: true }); } catch (e) {} } }
  function closeSheet() { S.sheet = null; renderDrawer(); }

  /* ---------- launching a station: the word cards first, then the bomb or the helper's page ---------- */
  function play(code, role) {
    var spec = makeSpec(code); if (!spec) return;
    S.sheet = null; renderDrawer();
    var cards = cardsFor(spec);
    if (cards.length) { S.fc = { list: cards, i: 0, flip: false, then: { code: code, role: role }, fresh: true, ok: 0 }; S.screen = 'cards'; render(); window.scrollTo(0, 0); return; }
    go(code, role);
  }
  function go(code, role) {
    var spec = makeSpec(code); if (!spec) return;
    S.wopen = {};
    if (role === 'help') {
      stopLoop(); clearTimers();
      S.spec = spec; S.code = spec.code; S.solo = false; S.game = null; S.man = {}; S.tab = 0; S.screen = 'helper';
      render(); window.scrollTo(0, 0); return;
    }
    launch(spec, role === 'solo');
  }
  function launch(spec, solo) {
    clearTimers();
    S.solo = !!solo; S.code = spec.code; S.spec = spec; S.wopen = S.wopen || {};
    S.game = {
      dur: spec.time * 1000, elapsed: 0, last: Date.now(), started: false, strikes: 0, hints: 0,
      solved: spec.modules.map(function () { return false; }),
      ms: spec.modules.map(function (m) { return UI[m.t].init(m.data); }),
      over: null, why: '', paused: false, calm: !!S.sel.calm, beeped: 0, quitAsk: false
    };
    S.view = freshView();
    S.man = {}; S.tab = 0; S.soloView = 'bomb'; S.screen = 'bomb';
    save(); sfx('arm'); render(); startLoop(); window.scrollTo(0, 0);
  }
  function nextCode(code) { var p = parsePathCode(code), list = courseList(p.lang), k = list.indexOf(code); return list[Math.min(k + 1, list.length - 1)]; }
  /* the result of a station: stars, XP, the streak, and words that got stronger */
  function pathWin(stars) {
    var g = S.game, x = px();
    g.xp = 10 + 5 * stars; g.streakUp = addXp(g.xp); x.played++;
    g.learned = wordsAfter(S.spec, true);
    S.justOpen = nextCode(S.spec.code);
  }
  function pathLose() { px().played++; wordsAfter(S.spec, false); }
  function helperDone() {
    var code = S.spec.code; if (!starsOf(code)) S.prog[code] = 1;
    addXp(10); px().played++; wordsAfter(S.spec, true); S.justOpen = nextCode(code);
    save(); sfx('win'); goPath();
  }
  function goPath() {
    stopLoop(); clearTimers(); document.body.classList.remove('boom');
    if (S.spec && S.spec.path) { S.sel.course = S.spec.lang; S.sel.plv = parsePathCode(S.justOpen || S.spec.code).lv; }
    S.game = null; S.screen = 'home'; S.solo = false; S.spec = null; save(); render();
    setTimeout(function () { scrollToNode(); setTimeout(function () { S.justOpen = null; }, 1500); }, 60);
  }

  /* ---------- flashcards ---------- */
  function hiWord(ctx, k) {
    return String(ctx).split(/(\s+)/).map(function (tok) {
      var core = lwCore(tok);
      if (!core || wordKey(core) !== k) return esc(tok);
      var at = tok.indexOf(core);
      return esc(tok.slice(0, at)) + '<mark>' + esc(core) + '</mark>' + esc(tok.slice(at + core.length));
    }).join('');
  }
  function viewCards() {
    var F = S.fc, n = F.list.length, c = F.list[F.i], back = F.flip, g = glossFor(tl(), ui(), c.k) || '…';
    var e = wlang(tl())[c.k] || { box: 0 };
    var pct = Math.round(100 * F.i / n);
    var h = '<div class="fc"><div class="fc-top"><div class="pbar"><i style="width:' + pct + '%"></i></div><button type="button" class="link" data-a="fc-skip">' + t(F.then ? 'fc.skip' : 'close') + '</button></div>' +
      '<p class="fc-h">' + t(F.then ? 'fc.title' : 'fc.title2') + '</p>' +
      '<div class="fc-card' + (F.fresh ? ' in' : '') + '"><div class="fc-in' + (back ? ' flip' : '') + '">' +
      '<div class="fc-face fc-front"><span class="fc-st">' + strength(e.box) + '</span><p class="fc-w" lang="' + tl() + '">' + esc(c.k) + '</p>' + sayBtn(c.k) +
      '<p class="fc-ctx" lang="' + tl() + '">' + (c.here ? '<span class="fc-tag">' + t('fc.next') + '</span>' : '') + hiWord(c.ctx, c.k) + '</p></div>' +
      '<div class="fc-face fc-back"><p class="fc-w" lang="' + tl() + '">' + esc(c.k) + '</p><p class="fc-g" lang="' + ui() + '">' + esc(g) + '</p><p class="fc-ctx" lang="' + tl() + '">' + hiWord(c.ctx, c.k) + '</p>' + sayBtn(c.ctx, true) + '</div>' +
      '</div></div>';
    h += back ? '<div class="fc-btns"><button type="button" class="dbtn bad" data-a="fc" data-v="0">' + t('fc.again') + '</button><button type="button" class="dbtn ok" data-a="fc" data-v="1">' + t('fc.know') + '</button></div>'
      : '<div class="fc-btns"><button type="button" class="dbtn go" data-a="fc-flip">' + t('fc.show') + '</button></div>';
    return h + '</div>';
  }
  function strength(box) { var h = '<span class="str" aria-label="' + box + '/' + LEARNED + '">'; for (var k = 0; k < LEARNED; k++) h += '<i' + (k < box ? ' class="on"' : '') + '></i>'; return h + '</span>'; }
  function fcAnswer(ok) {
    var F = S.fc, c = F.list[F.i], e = wlang(tl())[c.k];
    if (e) {
      if (ok) { if (!F.missed || !F.missed[c.k]) e.box = Math.min(LEARNED, e.box + 1); e.last = px().played; F.ok++; sfx('ok'); }
      else { e.box = Math.max(0, e.box - 1); e.last = px().played; F.missed = F.missed || {}; F.missed[c.k] = 1; if (F.list.filter(function (x) { return x.k === c.k; }).length < 2) F.list.push(c); sfx('strike'); }
      wsave();
    }
    F.i++; F.flip = false; F.fresh = true;
    if (F.i >= F.list.length) { fcDone(); return; }
    render();
  }
  function fcDone() { var F = S.fc; S.fc = null; if (F && F.then) go(F.then.code, F.then.role); else { S.screen = 'words'; render(); } }

  /* ---------- the word list ---------- */
  function viewWords() {
    var L = S.sel.course, all = wList(L).sort(function (a, b) { return a.box - b.box || b.t - a.t; }), learning = all.filter(function (e) { return e.box < LEARNED; });
    var h = '<div class="wl"><div class="wl-h"><button type="button" class="pbtn sm" data-a="home">← ' + t('back') + '</button><h1>' + t('p.words') + '</h1><span class="wl-n">' + FLAG[L] + ' ' + learning.length + '</span></div>';
    if (!all.length) return h + '<p class="wl-empty">' + t('w.empty') + '</p></div>';
    if (learning.length) h += '<button type="button" class="dbtn go" data-a="practise">' + t('w.practise') + '</button>';
    h += '<ul class="wlist">' + all.map(function (e) {
      return '<li class="' + (e.box >= LEARNED ? 'learned' : '') + '"><div class="wl-top"><b lang="' + L + '">' + esc(e.k) + '</b><span lang="' + ui() + '">' + esc(glossFor(L, ui(), e.k)) + '</span>' + strength(e.box) + '</div>' +
        (e.ctx ? '<p class="wl-ctx" lang="' + L + '">' + hiWord(e.ctx, e.k) + '</p>' : '') + '</li>';
    }).join('') + '</ul></div>';
    return h;
  }
  function practise() {
    var L = S.sel.course, list = wLearning(L).sort(function (a, b) { return (wIsDue(b) ? 1 : 0) - (wIsDue(a) ? 1 : 0) || a.box - b.box; }).slice(0, 10);
    if (!list.length) return;
    S.fc = { list: list.map(function (e) { return { k: e.k, ctx: e.ctx, here: false }; }), i: 0, flip: false, then: null, fresh: true, ok: 0 };
    S.screen = 'cards'; render(); window.scrollTo(0, 0);
  }

  /* ---------- the result of a station ---------- */
  function confetti() {
    if (reduced()) return '';
    var h = '<div class="confetti" aria-hidden="true">', cols = ['#58CC02', '#1CB0F6', '#FFC83D', '#FF4B4B', '#CE82FF', '#fff'];
    for (var k = 0; k < 46; k++) h += '<i style="left:' + ((k * 37) % 100) + '%;background:' + cols[k % cols.length] + ';animation-delay:' + ((k % 9) * 0.07).toFixed(2) + 's;animation-duration:' + (1.6 + (k % 5) * 0.3).toFixed(1) + 's;--r:' + ((k * 73) % 360) + 'deg;--dx:' + (((k * 29) % 120) - 60) + 'px"></i>';
    return h + '</div>';
  }
  function viewPathResult() {
    var g = S.game, spec = S.spec, P = PACK[spec.lang], ok = g.over === 'ok', st = spec.st;
    var stars = ok ? (g.strikes === 0 ? 3 : g.strikes === 1 ? 2 : 1) : 0, recap = '';
    var seen = {}, all = [];
    spec.modules.forEach(function (m, i) { UI[m.t].recap(m.data, g.ms[i]).forEach(function (row) { if (!seen[row.tx]) { seen[row.tx] = 1; all.push(row); } }); });
    if (all.length) recap = learn(all);
    var starH = ''; for (var k = 0; k < 3; k++) starH += '<i class="' + (k < stars ? 'on' : '') + '" style="animation-delay:' + (0.35 + k * 0.18) + 's">★</i>';
    var nxt = ok ? nextCode(spec.code) : null;
    return (ok ? confetti() : '') + '<div class="result pr ' + (ok ? 'won' : 'lost') + '"><div><p class="eyebrow">' + CEFR[spec.level - 1] + ' · ' + spec.station + ' · ' + esc(st.t[ui()] || st.t.en) + '</p>' +
      '<h1 data-fit lang="' + spec.lang + '">' + (ok ? P.win : P.boom) + '</h1>' +
      (ok ? '<div class="bigstars" role="img" aria-label="' + stars + ' / 3">' + starH + '</div>' : '<p class="lead">' + t(g.why === 'time' ? 'res.time' : 'res.mist') + '</p>') + '</div>' +
      (ok ? '<div class="chips"><span class="chip xp">' + ICON_BOLT + '<b data-count="' + g.xp + '">+' + g.xp + '</b> XP</span>' +
        '<span class="chip fire' + (g.streakUp ? ' up' : '') + '">' + ICON_FIRE + '<b>' + streakNow() + '</b> ' + t('p.days') + '</span>' +
        (g.learned ? '<span class="chip wd">' + ICON_CARDS + '<b>+' + g.learned + '</b> ' + t('p.learned') + '</span>' : '') + '</div>' : '') +
      '<div class="ctas">' + (ok ? '<button type="button" class="cta" data-a="pcont">' + t('p.cont') + '</button>' : '<button type="button" class="cta" data-a="again">' + t('res.retry') + '</button>') +
      (ok && nxt !== spec.code ? '<button type="button" class="hb big" data-a="pnext">' + t('res.next') + '</button>' : '') +
      (ok ? '<button type="button" class="hb big" data-a="again">' + t('res.again') + '</button>' : '<button type="button" class="hb big" data-a="pcont">' + t('p.path') + '</button>') + '</div>' +
      (recap ? '<div class="recap"><h2>' + t('res.recap') + '</h2><section>' + recap + '</section></div>' : '') + '</div>';
  }
  function countUp() {
    var b = $('.chip.xp b[data-count]'); if (!b || reduced()) return;
    var to = +b.getAttribute('data-count'), n = 0, iv = setInterval(function () { n = Math.min(to, n + Math.ceil(to / 14)); b.textContent = '+' + n; if (n >= to) clearInterval(iv); }, 45);
  }
