import re, sys
import subprocess
src = subprocess.check_output(['git','show','origin/main:index.html']).decode('utf-8')
core = open('src_core.js', encoding='utf-8').read()
uiblk = open('src_ui.js', encoding='utf-8').read()
strs = open('src_str.js', encoding='utf-8').read()
css = open('src_css.css', encoding='utf-8').read()

def rep(old, new, count=1):
    global src
    n = src.count(old)
    if n != count:
        sys.exit('pattern count %d != %d: %r' % (n, count, old[:90]))
    src = src.replace(old, new)

# 1. core + strings at the end of the first script, course files after it
first_end = src.index('</script>\n<script>')
src = src[:first_end] + core + strs + src[first_end:]
COURSE_FILES = ['en-a1', 'en-a2', 'en-b1', 'en-b2', 'en-c1', 'en-c2', 'es-a1', 'es-a2', 'es-b1', 'es-b2', 'es-c1', 'es-c2', 'gloss-en', 'gloss-es']
tags = ''.join('<script src="courses/%s.js"></script>\n' % f for f in COURSE_FILES)
rep('</script>\n<script>\n\'use strict\';\n(function () {', '</script>\n' + tags + '<script>\n\'use strict\';\n(function () {')

# 2. ui block before part D
rep('  /* ===== part D: screens, events, start-up ===== */', uiblk + '\n  /* ===== part D: screens, events, start-up ===== */')

# 3. css
rep('</style>\n</head>', css + '</style>\n</head>')

# 4. state
rep("sel: { lang: 'hu', mission: 1, level: 2, calm: false },", "sel: { lang: 'hu', mission: 1, level: 2, calm: false, course: 'en', plv: 0 },\n    wopen: {}, wnew: null, sheet: null, fc: null, justOpen: null,")
rep("function tl() { return (S.spec && S.screen !== 'home' && S.screen !== 'join') ? S.spec.lang : S.sel.lang; }",
    "function tl() {\n    if (S.spec && (S.screen === 'bomb' || S.screen === 'helper' || S.screen === 'result')) return S.spec.lang;\n    if (S.screen === 'classic') return S.sel.lang;\n    if (S.screen === 'cards' && S.fc && S.fc.then) return parsePathCode(S.fc.then.code).lang;\n    return S.sel.course;\n  }")
rep("if (!(S.sel.level >= 1 && S.sel.level <= 3)) S.sel.level = 2;", "if (!(S.sel.level >= 1 && S.sel.level <= 3)) S.sel.level = 2;\n    if (COURSES.indexOf(S.sel.course) < 0) S.sel.course = 'en';")

# 5. voice for Spanish too
rep("dev: { da: null, en: null, hu: null }", "dev: { da: null, en: null, hu: null, es: null }")
rep("              LANGS.forEach(function (L) {\n                var re = new RegExp", "              LANGS.concat(['es']).forEach(function (L) {\n                var re = new RegExp")

# 6. specs
rep("function makeSpec(code) {\n  var p = parseCode(code);", "function makeSpec(code) {\n  if (/^P:/.test(String(code))) return makeStationSpec(code);\n  var p = parseCode(code);")
rep("function progKey(spec) { return spec.lang + '-' + spec.mission + '-' + spec.level; }", "function progKey(spec) { return spec.path ? spec.code : spec.lang + '-' + spec.mission + '-' + spec.level; }")
rep("function explode(why) { var g = S.game; if (g.over) return; g.over = 'boom'; g.why = why; sfx('boom'); finish(true); }",
    "function explode(why) { var g = S.game; if (g.over) return; g.over = 'boom'; g.why = why; sfx('boom'); if (S.spec.path) { pathLose(); save(); } finish(true); }")
rep("if (!(S.prog[key] >= stars)) { S.prog[key] = stars; save(); }", "if (!(S.prog[key] >= stars)) S.prog[key] = stars;\n    if (S.spec.path) pathWin(stars);\n    save();")
rep("function bombTag(spec) { var m", "function bombTag(spec) { if (spec.path) return CEFR[spec.level - 1] + '·' + spec.station; var m")
rep("cap(t('lang.' + spec.lang)) + ' ' + LEVELS[spec.level - 1] + '</p>' +\n      '<div class=\"man-code\">", "cap(t('lang.' + spec.lang)) + ' ' + (spec.path ? CEFR[spec.level - 1] + ' · ' + esc(spec.st.t[ui()] || spec.st.t.en) : LEVELS[spec.level - 1]) + '</p>' +\n      '<div class=\"man-code\">")
rep("    return '<div class=\"paper-wrap\">' + helpHTML() + '<div class=\"man-foot\"><button type=\"button\" class=\"pbtn\" data-a=\"rejoin\">' + t('help.other') + '</button></div></div>';",
    "    if (S.spec.path) return '<div class=\"paper-wrap\">' + helpHTML() + '<div class=\"man-foot\"><button type=\"button\" class=\"dbtn ok\" data-a=\"help-done\">' + t('p.hdone') + '</button><button type=\"button\" class=\"pbtn\" data-a=\"home\">' + t('p.path') + '</button></div></div>';\n    return '<div class=\"paper-wrap\">' + helpHTML() + '<div class=\"man-foot\"><button type=\"button\" class=\"pbtn\" data-a=\"rejoin\">' + t('help.other') + '</button></div></div>';")
rep("  function viewResult() {\n", "  function viewResult() {\n    if (S.spec.path) return viewPathResult();\n")

# 7. screens
rep("document.body.setAttribute('data-view', helperVisible() ? 'paper' : 'hard');", "document.body.setAttribute('data-view', helperVisible() || S.screen === 'home' || S.screen === 'cards' || S.screen === 'words' ? 'paper' : 'hard');")
rep("var h = S.screen === 'home' ? viewHome() : S.screen === 'bomb' ? viewBomb() : S.screen === 'helper' ? viewHelper() : viewResult();",
    "var h = S.screen === 'home' ? viewPath() : S.screen === 'classic' ? viewHome() : S.screen === 'cards' ? viewCards() : S.screen === 'words' ? viewWords() : S.screen === 'bomb' ? viewBomb() : S.screen === 'helper' ? viewHelper() : viewResult();")
rep("      if (S.view.intro && $('#bomb')) { S.view.intro = false; intro(); }\n    }",
    "      if (S.view.intro && $('#bomb')) { S.view.intro = false; intro(); }\n    }\n    if (S.screen === 'result') countUp();\n    if (S.screen === 'cards' && S.fc) S.fc.fresh = false;")
rep("function goHome() { stopLoop(); clearTimers(); document.body.classList.remove('boom'); S.game = null; S.screen = 'home'; S.solo = false; render(); window.scrollTo(0, 0); }",
    "function goHome() {\n    if (S.spec && S.spec.path && S.screen !== 'home' && S.screen !== 'classic') { goPath(); return; }\n    var back = S.spec && !S.spec.path && S.screen !== 'home' && S.screen !== 'classic' ? 'classic' : 'home';\n    stopLoop(); clearTimers(); document.body.classList.remove('boom'); S.game = null; S.spec = back === 'home' ? null : S.spec; S.screen = back; S.solo = false; S.fc = null; render(); window.scrollTo(0, 0);\n  }")
rep("if (!S.drawer) { el.innerHTML = ''; return; }", "if (!S.drawer) { el.innerHTML = S.sheet ? sheetHTML() : ''; return; }")
rep("if (S.drawer) { e.preventDefault(); S.drawer = null; renderDrawer(); }", "if (S.drawer) { e.preventDefault(); S.drawer = null; renderDrawer(); }\n      else if (S.sheet) { e.preventDefault(); closeSheet(); }")
rep("      '<ul class=\"phr\">' + PHRASES3.map(function (r) { var x = row3(r); return '<li><span>' + TT(x) + GL(tri(r)) + '</span>' + sayBtn(x, true) + '</li>'; }).join('') + '</ul>' +",
    "      '<ul class=\"phr\">' + (tl() === 'es' ? ES_PHRASES.map(function (r) { return { x: r[0], gl: { en: r[1], hu: r[2], da: r[3] } }; }) : PHRASES3.map(function (r) { return { x: row3(r), gl: tri(r) }; })).map(function (o) { return '<li><span>' + TT(o.x) + GL(o.gl) + '</span>' + sayBtn(o.x, true) + '</li>'; }).join('') + '</ul>' +")
# a home button in the top bar whenever we are away from the path
rep("'<button type=\"button\" class=\"bar-b\" data-a=\"drawer\" data-v=\"parlor\">' + t('bar.phrases') + '</button>' +",
    "(S.screen !== 'home' ? '<button type=\"button\" class=\"bar-b ico\" data-a=\"home\" aria-label=\"' + esc(t('bar.home')) + '\" title=\"' + esc(t('bar.home')) + '\">' + ICON_HOME + '</button>' : '') +\n      '<button type=\"button\" class=\"bar-b\" data-a=\"drawer\" data-v=\"parlor\">' + t('bar.phrases') + '</button>' +")
rep("      case 'brand': if (S.screen === 'bomb' && g && !g.over) { g.quitAsk = true; paintToolbar(); } else if (S.screen !== 'home') goHome(); break;",
    "      case 'brand': if (S.screen === 'bomb' && g && !g.over) { g.quitAsk = true; paintToolbar(); } else if (S.screen !== 'home') goHome(); break;\n" +
    "      case 'course': S.sel.course = ds.v; S.sel.plv = 0; save(); render(); scrollToNode(); break;\n" +
    "      case 'plv': S.sel.plv = +ds.v; save(); rerenderKeep('[data-a=\"plv\"][data-v=\"' + ds.v + '\"]'); window.scrollTo(0, 0); break;\n" +
    "      case 'node': openSheet(ds.v); break;\n" +
    "      case 'sheet-close': closeSheet(); break;\n" +
    "      case 'play': play(S.sheet, ds.v); break;\n" +
    "      case 'wt': wordTap(ds.w, ds.s); break;\n" +
    "      case 'fc-flip': S.fc.flip = true; render(); { var fb = $('.fc-btns .ok'); if (fb) { try { fb.focus({ preventScroll: true }); } catch (e6) {} } } break;\n" +
    "      case 'fc': fcAnswer(ds.v === '1'); break;\n" +
    "      case 'fc-skip': fcDone(); break;\n" +
    "      case 'words': S.screen = 'words'; render(); window.scrollTo(0, 0); break;\n" +
    "      case 'practise': practise(); break;\n" +
    "      case 'classic': S.screen = 'classic'; S.spec = null; render(); window.scrollTo(0, 0); break;\n" +
    "      case 'help-done': helperDone(); break;\n" +
    "      case 'pcont': goPath(); break;\n" +
    "      case 'pnext': { var nc = nextCode(S.spec.code); S.justOpen = null; play(nc, S.solo ? 'solo' : 'bomb'); break; }")
rep("      case 'next': S.sel.lang", "      case 'next': if (S.spec.path) { play(nextCode(S.spec.code), S.solo ? 'solo' : 'bomb'); break; } S.sel.lang")
rep("      case 'again': S.sel.lang", "      case 'again': if (S.spec.path) { launch(makeSpec(S.spec.code), S.solo); break; } S.sel.lang")
# keyboard: Enter flips a card
rep("    if (inField || S.drawer || !S.spec) return;", "    if (S.screen === 'cards' && S.fc && !inField && (e.key === 'Enter' || e.key === ' ') && !(el && el.tagName === 'BUTTON')) { e.preventDefault(); if (!S.fc.flip) act('fc-flip', {}); return; }\n    if (inField || S.drawer || !S.spec) return;")
# rejoin from a classic helper goes back to classic
rep("      case 'rejoin': goHome(); break;", "      case 'rejoin': S.spec = null; S.screen = 'classic'; render(); window.scrollTo(0, 0); break;")
open('index.html', 'w', encoding='utf-8').write(src)
print('ok', len(src))
