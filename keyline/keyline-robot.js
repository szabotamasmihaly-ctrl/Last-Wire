/* Keyline robot for your computer.
   It lets the Keyline robot think with Claude, using your own Claude subscription through Claude Code.
   Start it with:  node keyline-robot.js   and keep the window open while you play.
   It prints a robot code. Type that code once in Keyline (the robot button at the top of the start page).

   How it works: the game sends the robot's turn (its team, its job, its words when its team may know them,
   and the clues so far) through the game's own database, the same one the phones use. This script asks Claude Code
   for one answer, with a system prompt that holds only the Keyline rules and no tools, and sends it back. */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os'), cp = require('child_process');

const DB = process.env.KEYLINE_DB || 'https://last-wire-default-rtdb.europe-west1.firebasedatabase.app';
/* fast model for giving clues; a smarter one for reading clues, where wordplay matters */
/* Smart (the default): the strongest model thinks briefly first. Fast: quicker models answer straight away. */
const MODEL = { smart: { clues: 'opus', code: 'opus', quiz: 'opus', words: 'opus', method: 'sonnet' }, fast: { clues: 'haiku', code: 'opus', quiz: 'opus', words: 'sonnet', method: 'sonnet' } };
const THINK = 'First think briefly in a few short lines: for each clue, list its links to all four words ' +
  '(meaning, phrases and compound words, culture such as songs or films, facts such as moon -> 28-day cycle), ' +
  'then use elimination, since the three numbers are all different. End with the JSON on the last line. ';
const THINK_GIVE = 'First think briefly in a few short lines: for each word, list a few candidate clues. Drop any that could point to ' +
  'one of your other words or that repeat an earlier clue. Then play the other side: they do not know your words and only see the earlier clues ' +
  'listed for each number. For each candidate, ask: would they put it in the right number from those earlier clues? If yes, it gives the code away. ' +
  'Make sure at least 2 of your 3 clues cannot be placed by the other side. The third clue may even stay very close to an earlier clue of its ' +
  'number: that tells them nothing new. Check that your teammate, who knows the words, can still find every clue. End with the JSON on the last line. ';
/* the tricks players use; the advanced ones only when nothing plain fits, or when this player is known to use them */
const TRICKS = 'Players also link clues by wordplay: compound words or phrases (WORD -> KEY, as in keyword; HIGH -> SKY, as in sky-high), ' +
  'song, film or book titles, famous people, and sounds. ';
const ADVANCED = 'Some players also use advanced tricks. Look for them only when no plain link fits well, or when this player is known to use them ' +
  '(see their methods and notebook below): ' +
  '(a) a letter added or changed as a hint: BIGS = BIG + S, a phrase with BALL (big ball) plus the S of BALLS; ' +
  '(b) the number of letters or the first letter; ' +
  '(c) a twisted form to throw the other side off: FISHY instead of the too obvious FISH, still meaning fish -> RIVER; ' +
  '(d) misspellings that sound like the word (P-TATOO -> POTATO). ' +
  'A clue that is not a normal English word is a strong sign of a trick: first find the real word inside it, then the extra letters. ';
function methods(t) {
  if (!Array.isArray(t) || !t.length) return '';
  const l = t.filter(function (x) { return typeof x === 'string'; }).slice(-20).map(function (x) { return '- ' + clean(x, 200); });
  return l.length ? '\nMethods this player has used before, so consider them like plain links:\n' + l.join('\n') + '\n' : '';
}
const SELF_URL = 'https://raw.githubusercontent.com/szabotamasmihaly-ctrl/Last-Wire/main/keyline/keyline-robot.js';
const DIR = path.join(os.homedir(), '.keyline-robot');
const MAX_AT_ONCE = 3;
const ALPH = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

const RULES = 'You are a robot player in Keyline, a team word game for people learning English. ' +
  'You only play Keyline. You have no tools. Always end your answer with the JSON object asked for. ' +
  'Rules: each team has 4 secret words, numbered 1 to 4. Each round a secret 3-digit code ' +
  '(three different digits from 1 to 4) is drawn. The clue giver says one clue word per digit, in order, and the teammate, ' +
  'who knows the 4 words, must guess the code. The other side does not know the words and only sees all the clues so far, ' +
  'grouped by number; it tries to crack the code too. Clues are single English words.';

const LEVEL = {
  1: 'Use only very simple, everyday English words that a beginner learner (level A1-A2) knows.',
  2: 'Use common English words that an intermediate learner (level B1) knows.',
  3: 'Use clear English words that an upper-intermediate learner (level B2) knows. Avoid rare or academic words.'
};

/* a clue may hold letters, digits and a few signs (9-5, 007, R&B) */
function word(s) { return typeof s === 'string' && /^[\p{L}\p{N}' .,&!?+\/-]{1,24}$/u.test(s.trim()) && /[\p{L}\p{N}]/u.test(s); }
function words(a, n) { return Array.isArray(a) && a.length <= n && a.every(word); }
function digits(s) { return typeof s === 'string' && /^[1-4]{3}$/.test(s) && new Set(s).size === 3; }
function cols(h) { return Array.isArray(h) && h.length === 4 && h.every(function (c) { return words(c, 12); }); }
/* the notebook the player's phone keeps about them: their own words about how they link clues to words */
function clean(x, n) { return String(x == null ? '' : x).replace(/[\r\n]+/g, ' ').replace(/"/g, "'").trim().slice(0, n); }
function notebook(me) {
  if (!Array.isArray(me) || !me.length) return '';
  const lines = me.slice(-30).map(function (o) {
    if (!o || typeof o !== 'object') return '';
    const c = clean(o.c, 24).toUpperCase(), w = clean(o.w, 24).toUpperCase(), g = clean(o.g, 24).toUpperCase(), y = clean(o.y, 160);
    if (!c || !w) return '';
    if (o.k === 'good') return '- Your clue ' + c + ' for ' + w + ' worked very well: your teammate got it and the other side did not.';
    if (o.k === 'misread') return '- You clued ' + w + ' with ' + c + ', but they read it as ' + g + '. Their thinking: "' + y + '"';
    if (o.k === 'ok') return '- They clued ' + w + ' with ' + c + ' and agreed with this reading: "' + y + '"';
    if (o.k === 'bad') return '- They clued ' + w + ' with ' + c + '. Their real link: "' + y + '"';
    return '- They clued ' + w + ' with ' + c + (g ? ' (you guessed ' + g + ')' : '') + '. Their link: "' + y + '"';
  }).filter(Boolean);
  return lines.length ? '\nYour notebook about your human teammate, in their own words (newest last). Use it to understand how they think and which links they know:\n' + lines.join('\n') + '\n' : '';
}
const DIFF = {
  1: 'Make every clue very easy and direct: the first word most people would say for that secret word.',
  2: '',
  3: 'Make the clues a little indirect and clever, so the other side cannot easily crack them, but keep one clear, fair link your teammate can find.'
};
/* how strong the robot's clues are, 1 to 10 */
function strength(b) { const n = parseInt(b.lvl, 10); if (n >= 1 && n <= 10) return n; return b.diff === 1 ? 2 : (b.diff === 3 ? 8 : 5); }
/* the player's notebook is kept for good in a file on this computer (it survives restarts and updates);
   phones add to it, and only a Clear button on a phone removes things */
const PROFILE = path.join(DIR, 'profile.json');
function readProfile() { try { return JSON.parse(fs.readFileSync(PROFILE, 'utf8')); } catch (e) { try { return JSON.parse(fs.readFileSync(PROFILE + '.bak', 'utf8')); } catch (x) { return null; } } }
function union(a, b, key) { const seen = new Set(), out = []; (Array.isArray(a) ? a : []).concat(Array.isArray(b) ? b : []).forEach(function (x) { const k = key(x); if (x && !seen.has(k)) { seen.add(k); out.push(x); } }); return out; }
function noteKey(o) { return o && [o.k, o.c, o.w, o.y].join('|'); }
function saveProfile(p, replace) {
  const old = readProfile() || {};
  const n = replace ? p : {
    me: union(old.me, p.me, noteKey),
    tech: union(old.tech, p.tech, String).slice(-50),
    tips: Array.isArray(p.tips) ? p.tips : old.tips,
    quiz: old.quiz || p.quiz ? 1 : 0
  };
  try { fs.mkdirSync(DIR, { recursive: true }); if (fs.existsSync(PROFILE)) fs.copyFileSync(PROFILE, PROFILE + '.bak'); fs.writeFileSync(PROFILE + '.tmp', JSON.stringify(n, null, 1)); fs.renameSync(PROFILE + '.tmp', PROFILE); } catch (e) {}
}
function list(a) { return a.length ? a.join(', ') : '(none yet)'; }

/* the message for one turn: which team the robot plays for, its job, what it may know */
function build(b) {
  const lv = LEVEL[b.level] || LEVEL[1];
  /* tips the player gave about the robot's clues; they matter most when giving clues */
  const tips = Array.isArray(b.tips) ? b.tips.filter(function (x) { return typeof x === 'string'; }).slice(-6).map(function (x) { return x.replace(/[\r\n]+/g, ' ').slice(0, 120); }) : [];
  const tipText = tips.length ? '\nYour human teammate gave you these tips about your clues (newest last). Follow them, but never break the rules of the game:\n- ' + tips.join('\n- ') + '\n' : '';
  const lvl = strength(b);
  const pf = (b.task === 'crack' || b.task === 'rival' || b.task === 'words' || b.task === 'method') ? null : readProfile();
  if (pf) { b.me = union(pf.me, b.me, noteKey); b.tech = union(pf.tech, b.tech, String); }
  const book = notebook(b.me) + methods(b.tech), diff = DIFF[lvl <= 3 ? 1 : (lvl >= 7 ? 3 : 2)] || '';
  const team = b.team === 'Orange' ? 'the Orange team' : (b.team === 'Blue' ? 'the Blue team' : 'the computer side');
  if (b.task === 'give') {
    if (!words(b.words, 4) || b.words.length !== 4 || !digits(b.code) || !cols(b.history)) return null;
    const order = b.code.split('').map(function (d) { return d + ' (' + b.words[+d - 1] + ')'; }).join(', ');
    return { kind: 'clues', prompt: 'You play for ' + team + '. This turn you are the clue giver. Your secret words:\n' +
      b.words.map(function (w, i) { return (i + 1) + '. ' + w + ' - clues used before: ' + list(b.history[i]); }).join('\n') +
      '\n\nThe code is ' + b.code + ', so give one clue for each of: ' + order + '.\n' +
      'Each clue must be ONE English word that your teammate can easily link to the right secret word ' +
      '(something it is, has, does, or is often found with). Prefer plain, common links by meaning that most people ' +
      'would think of; avoid puns, compound-word tricks, rhymes and names. ' + lv + ' ' +
      'Never use a secret word, part of one, or a word with the same root. Never repeat a clue used before. ' +
      'Pick a different angle from the earlier clues so the other side cannot simply match them. ' + diff + ' ' + tipText + book +
      (b.smart ? THINK_GIVE + 'JSON: ' : 'Answer only: ') + '{"clues": ["word", "word", "word"]} in code order.',
      sim: (lvl >= 3 && words(b.pool, 260) && b.pool.length >= 4) ? { pool: b.pool, history: b.history, code: b.code, team: b.team, lvl: lvl, words: b.words, me: b.me, tech: b.tech, level: b.level } : null };
  }
  if (b.task === 'decode') {
    if (!words(b.words, 4) || b.words.length !== 4 || !words(b.clues, 3) || b.clues.length !== 3 || !cols(b.history)) return null;
    return { kind: 'code', prompt: 'You play for ' + team + '. This turn you are the teammate who guesses. Your team\'s secret words:\n' +
      b.words.map(function (w, i) { return (i + 1) + '. ' + w + ' - earlier clues: ' + list(b.history[i]); }).join('\n') +
      '\n\nYour clue giver just said, in order: ' + b.clues.join(', ') + '.\n' +
      'Match each clue to the secret word it most likely points to. ' + TRICKS + ADVANCED +
      'Check every clue against all four words, then choose the best overall match. ' +
      'The three numbers must be different. ' + book +
      (b.smart ? THINK + 'JSON: ' : 'Answer only: ') + '{"code": "three digits", "why": ["link", "link", "link"]}, where each "why" is a very short reason (at most 6 words, ' +
      'for example "shoplift" or "Dr House, a TV doctor"), for example {"code": "312", "why": ["...", "...", "..."]}.' };
  }
  if (b.task === 'words') {
    if (!words(b.pool, 260) || b.pool.length < 4 || !cols(b.history)) return null;
    return { kind: 'words', prompt: 'The game is over: you cracked the other team\'s code. Bonus: guess their 4 secret words. ' +
      'They were picked from this list: ' + b.pool.join(', ') + '.\n\nThe clues they gave, by number:\n' +
      b.history.map(function (c, i) { return (i + 1) + ': ' + list(c); }).join('\n') +
      '\n\nFor each number pick the word from the list that best fits all its clues; use 4 different words. ' +
      (b.smart ? 'First think briefly in a few short lines. End with the JSON on the last line. JSON: ' : 'Answer only: ') +
      '{"words": ["word 1", "word 2", "word 3", "word 4"]}.' };
  }
  if (b.task === 'quiz') {
    if (!words(b.words, 10) || b.words.length < 4 || !words(b.clues, 3) || b.clues.length !== 3) return null;
    return { kind: 'quiz', prompt: 'This is practice, so you can learn how your human teammate thinks. The words:\n' +
      b.words.map(function (w, i) { return (i + 1) + '. ' + w; }).join('\n') +
      '\n\nThey gave 3 different clues: ' + b.clues.join(', ') + '. For each clue on its own, say which word it was for. ' +
      TRICKS + ADVANCED + 'Check each clue against all the words. ' + book +
      (b.smart ? 'First think briefly in a few short lines. End with the JSON on the last line. JSON: ' : 'Answer only: ') +
      '{"n": [number, number, number], "why": ["short reason", "short reason", "short reason"]}, one number (1-' + b.words.length + ') and one short, simple reason for each clue, in order.' };
  }
  /* turn a player's explanation into a method the robot can use later */
  if (b.task === 'method') {
    if (!word(b.clue) || !word(b.word) || typeof b.why !== 'string') return null;
    return { kind: 'method', prompt: 'A player of a word-clue game linked the clue ' + clean(b.clue, 24).toUpperCase() + ' to the word ' +
      clean(b.word, 24).toUpperCase() + ' and explained: "' + clean(b.why, 160) + '". ' +
      'If this shows a reusable way of linking beyond a plain meaning link (for example adding a letter as a hint, a phrase or compound word, ' +
      'a title or famous person, a sound, the number of letters, or a twisted word to fool the other side), describe that method in one short, general ' +
      'sentence and add this example in brackets. If it is a plain meaning link, answer with an empty method. Answer only: {"method": "..."}' };
  }
  if (b.task === 'crack' || b.task === 'rival') {
    if (!words(b.pool, 260) || b.pool.length < 4 || !words(b.clues, 3) || b.clues.length !== 3 || !cols(b.history)) return null;
    return { kind: 'code', prompt: 'You play for ' + team + '. This turn you are the other side, trying to crack the code. ' +
      'The 4 secret words were picked from this list: ' + b.pool.join(', ') + '.\n\nClues given before, by number:\n' +
      b.history.map(function (c, i) { return (i + 1) + ': ' + list(c); }).join('\n') +
      '\n\nNew clues, in order: ' + b.clues.join(', ') + '.\n' +
      'Work out which secret word is probably behind each number, then match each new clue to a number. ' + 'Players also link clues by wordplay: compound words or phrases (WORD -> KEY, as in keyword), song, film or book titles, famous people, sounds, spelling, or misspellings (P-TATOO -> POTATO). ' +
      'Check every clue against all four words in all these ways, then choose the best overall match. ' +
      'The three numbers must be different. ' + (b.smart ? THINK + 'JSON: ' : 'Answer only: ') + '{"code": "three digits"}, for example {"code": "241"}.' };
  }
  return null;
}

/* find Claude Code on this computer */
function findClaude() {
  if (process.env.KEYLINE_CLAUDE) return { cmd: process.env.KEYLINE_CLAUDE, pre: [] };
  if (process.platform !== 'win32') return { cmd: 'claude', pre: [] };
  const exe = path.join(os.homedir(), '.local', 'bin', 'claude.exe');
  if (fs.existsSync(exe)) return { cmd: exe, pre: [] };
  /* installed with npm: read where the package's own program is */
  try {
    const root = cp.execSync('npm root -g', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
    const dir = path.join(root, '@anthropic-ai', 'claude-code');
    const pkg = JSON.parse(fs.readFileSync(path.join(dir, 'package.json'), 'utf8'));
    const bin = typeof pkg.bin === 'string' ? pkg.bin : (pkg.bin || {}).claude;
    if (bin) {
      const f = path.join(dir, bin);
      if (fs.existsSync(f) && /\.(c?js|mjs)$/i.test(f)) return { cmd: process.execPath, pre: [f] };
      if (fs.existsSync(f) && /\.exe$/i.test(f)) return { cmd: f, pre: [] };
    }
  } catch (e) {}
  /* last try: whatever "claude" means in this window */
  try {
    const where = cp.execSync('where claude', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).split(/\r?\n/).filter(Boolean);
    const e2 = where.find(function (w) { return /\.exe$/i.test(w); });
    if (e2) return { cmd: e2, pre: [] };
    if (where.length) return { cmd: 'claude', pre: [], shell: true };
  } catch (e) {}
  return null;
}

function quote(a) { return '"' + String(a).replace(/"/g, "'") + '"'; }
function askClaude(claude, prompt, model) {
  return new Promise(function (resolve, reject) {
    let args = claude.pre.concat(['-p', '--model', model || MODEL.fast.clues, '--system-prompt', RULES, '--tools', '', '--no-session-persistence']);
    if (claude.shell) args = args.map(quote);
    const p = cp.spawn(claude.cmd, args, { cwd: DIR, windowsHide: true, shell: !!claude.shell });
    let out = '', err = '';
    const timer = setTimeout(function () { p.kill(); reject(new Error('Claude took too long')); }, 55000);
    p.stdout.on('data', function (d) { out += d; });
    p.stderr.on('data', function (d) { err += d; });
    p.on('error', function (e) { clearTimeout(timer); reject(e); });
    p.on('close', function (c) { clearTimeout(timer); if (c === 0) resolve(out); else reject(new Error((err || out).trim().split('\n').slice(-3).join(' ') || ('exit ' + c))); });
    p.stdin.end(prompt);
  });
}

/* play the rivals for real: give them the new clues and every clue they have seen, and count how many digits they get */
async function rivalCheck(claude, sim, clues) {
  const j = build({ task: 'rival', team: sim.team === 'Orange' ? 'Blue' : 'Orange', pool: sim.pool, history: sim.history, clues: clues, smart: 0 });
  if (!j) return null;
  /* the same model the real rivals use on this difficulty */
  const r = parse('code', await askClaude(claude, j.prompt, sim.lvl >= 6 ? 'opus' : 'sonnet'));
  if (!r) return null;
  const hit = [0, 1, 2].filter(function (i) { return r.code[i] === sim.code[i]; });
  return { guess: r.code, hit: hit };
}
/* and play the teammate: would someone who knows the words read all three right? */
async function mateCheck(claude, sim, clues) {
  const j = build({ task: 'decode', team: sim.team, words: sim.words, history: sim.history, clues: clues, me: sim.me, tech: sim.tech, level: sim.level, smart: 0 });
  if (!j) return null;
  const r = parse('code', await askClaude(claude, j.prompt, 'opus'));
  if (!r) return null;
  return { miss: [0, 1, 2].filter(function (i) { return r.code[i] !== sim.code[i]; }) };
}
/* test one set of clues on the rivals and on the teammate at the same time */
async function testSet(claude, sim, clues) {
  let both; try { both = await Promise.all([rivalCheck(claude, sim, clues), mateCheck(claude, sim, clues)]); } catch (e) { return null; }
  if (!both[0]) return null;
  const hit = both[0].hit.length, miss = both[1] ? both[1].miss.length : 0;
  console.log('  test: ' + clues.join(', ') + ' -> rivals would get ' + hit + ' of 3, teammate ' + (3 - miss) + ' of 3');
  return { clues: clues, hit: both[0].hit, miss: both[1] ? both[1].miss : [], score: hit + 2 * miss };
}
function parseSets(text) {
  const out = [], all = String(text).match(/\[[^\[\]]*\]/g) || [];
  all.forEach(function (x) { let a; try { a = JSON.parse(x); } catch (e) { return; } if (Array.isArray(a) && a.length === 3 && a.every(word)) out.push(a.map(function (c) { return String(c).trim(); })); });
  return out.slice(-4);
}
const SETS = '\n\nPlay it safe: the other side may already guess your words from the earlier clues. So give 3 DIFFERENT sets of clues to choose from. ' +
  'In each set, at least 2 clues should link to their word through a different meaning or angle than the earlier clues for that number ' +
  '(for example NURSE -> SHARK, as in nurse shark, when the earlier clues were doctor and care), or fit two of your words about equally for an outsider, ' +
  'while your teammate, who knows the exact words, can still find every one. ' +
  'First think briefly. End with the JSON on the last line: {"sets": [["word", "word", "word"], ["word", "word", "word"], ["word", "word", "word"]]} in code order.';
/* give clues: make a few sets, test each on a pretend rival and a pretend teammate, keep the safest one */
async function giveClues(claude, job, model) {
  const t0 = Date.now();
  if (!job.sim) return parse('clues', await askClaude(claude, job.prompt, model));
  let sets = parseSets(await askClaude(claude, job.prompt + SETS, model));
  if (!sets.length) return parse('clues', await askClaude(claude, job.prompt, model));
  /* stronger robots test more and accept less: level 3-5 one round, 6-8 two, 9-10 three and nothing the rival can place */
  const L = job.sim.lvl, rounds = L >= 9 ? 3 : (L >= 6 ? 2 : 1), allow = L >= 9 ? 0 : 1, cap = L >= 9 ? 120000 : 80000;
  let best = null;
  for (let round = 0; round < rounds; round++) {
    const res = (await Promise.all(sets.map(function (c) { return testSet(claude, job.sim, c); }))).filter(Boolean);
    res.forEach(function (x) { if (!best || x.score < best.score) best = x; });
    if (!best) return { clues: sets[0] };
    if ((best.hit.length <= allow && !best.miss.length) || round === rounds - 1 || Date.now() - t0 > cap) break;
    /* none was safe: show the robot what went wrong and ask for new sets */
    const notes = res.map(function (x) { return x.clues.join(', ') + ': the other side placed ' + (x.hit.map(function (i) { return x.clues[i]; }).join(' and ') || 'none') +
      (x.miss.length ? '; your teammate could misread ' + x.miss.map(function (i) { return x.clues[i]; }).join(' and ') : ''); }).join('\n');
    sets = parseSets(await askClaude(claude, job.prompt + SETS + '\n\nWe already tested these sets:\n' + notes + '\nMake 3 new sets that avoid these problems.', model));
    if (!sets.length) break;
  }
  return { clues: best.clues };
}
function parse(kind, text) {
  const all = String(text).match(/\{[^{}]*\}/g) || [];
  for (let i = all.length - 1; i >= 0; i--) {
    let o; try { o = JSON.parse(all[i]); } catch (e) { continue; }
    if (kind === 'code' && o.code !== undefined) { const c = String(o.code).replace(/[^1-4]/g, ''); if (digits(c)) { const r = { code: c }; if (Array.isArray(o.why) && o.why.length === 3) r.why = o.why.map(function (x) { return clean(x, 60); }); return r; } }
    if (kind === 'words' && Array.isArray(o.words) && o.words.length === 4 && o.words.every(word)) return { words: o.words.map(function (w) { return clean(w, 24); }) };
    if (kind === 'quiz' && Array.isArray(o.n) && o.n.length === 3) { const n = o.n.map(function (x) { return parseInt(x, 10); }); if (n.every(function (x) { return x >= 1 && x <= 10; })) return { n: n, why: (Array.isArray(o.why) ? o.why : []).slice(0, 3).map(function (x) { return clean(x, 140); }) }; }
    if (kind === 'method' && typeof o.method === 'string') return { method: clean(o.method, 200) };
    if (kind === 'clues' && Array.isArray(o.clues)) { const cl = o.clues.map(function (c) { return String(c).trim(); }); if (cl.length === 3 && cl.every(word)) return { clues: cl }; }
  }
  return null;
}

function dbUrl(ch) { return DB + '/rooms/' + ch + '.json'; }
function send(ch, obj) {
  return fetch(dbUrl(ch), { method: 'POST', body: JSON.stringify({ m: JSON.stringify(obj), f: 'robot', t: { '.sv': 'timestamp' } }) }).catch(function () {});
}

function robotCode() {
  fs.mkdirSync(DIR, { recursive: true });
  const f = path.join(DIR, 'code.txt');
  try { const c = fs.readFileSync(f, 'utf8').trim(); if (/^[A-Z2-9]{8}$/.test(c)) return c; } catch (e) {}
  let c = ''; const b = require('crypto').randomBytes(8);
  for (let i = 0; i < 8; i++) c += ALPH[b[i] % ALPH.length];
  fs.writeFileSync(f, c);
  return c;
}

/* keep this program up to date: if a newer version is online, save it and start that one instead */
let RETIRED = false;
async function update(running) {
  if (process.env.KEYLINE_NO_UPDATE || (!running && process.env.KEYLINE_FRESH)) return false;
  try {
    const r = await fetch(SELF_URL, { cache: 'no-store' });
    if (!r.ok) return false;
    const fresh = await r.text(), me = fs.readFileSync(__filename, 'utf8');
    if (fresh === me || fresh.indexOf('KEYLINE ROBOT') < 0) return false;
    fs.writeFileSync(__filename, fresh);
    console.log('\n  Updated the robot to the newest version. Starting it...');
    RETIRED = true;
    cp.spawn(process.execPath, [__filename], { stdio: 'inherit', env: Object.assign({}, process.env, { KEYLINE_FRESH: '1' }) }).on('close', function (c) { process.exit(c || 0); });
    return true;
  } catch (e) { return false; }
}

async function main() {
  if (await update()) return;
  const code = robotCode();
  /* a fresh channel every day (UTC), the same one the game uses, so it never grows big */
  function channel() { return 'keyline-bot-' + code.toLowerCase() + '-' + new Date().toISOString().slice(0, 10).replace(/-/g, ''); }
  const claude = findClaude();
  console.log('\n  KEYLINE ROBOT\n');
  if (!claude) { console.log('  I could not find Claude Code. Install it first:  npm install -g @anthropic-ai/claude-code\n'); process.exit(1); }
  process.stdout.write('  Checking Claude Code... ');
  try { parse('code', await askClaude(claude, 'Answer only: {"code": "123"}')); console.log('OK'); }
  catch (e) { console.log('it did not answer.\n  ' + e.message + '\n  Open PowerShell, type  claude  and sign in, then start me again.\n'); process.exit(1); }
  console.log('\n  Robot code:  ' + code.slice(0, 4) + '-' + code.slice(4) + '\n');
  console.log('  Type this code in Keyline: the robot button at the top of the start page.');
  console.log('  Keep this window open while you play. Close it to stop the robot.\n');

  const start = Date.now(); let busy = 0, topic = channel();
  const seen = new Set(), queue = [];
  function next() {
    while (busy < MAX_AT_ONCE && queue.length) {
      const job = queue.shift(); busy++;
      const t0 = Date.now();
      const model = MODEL[job.smart ? 'smart' : 'fast'][job.kind];
      (job.kind === 'clues' ? giveClues(claude, job, model) : askClaude(claude, job.prompt, model).then(function (txt) { return parse(job.kind, txt); })).then(function (r) {
        if (!r) throw new Error('no clear answer');
        r.a = job.id; send(topic, r);
        console.log('  ' + new Date().toLocaleTimeString() + '  robot move done (' + ((Date.now() - t0) / 1000).toFixed(1) + 's)');
      }).catch(function (e) {
        send(topic, { a: job.id, err: 1 });
        console.log('  ' + new Date().toLocaleTimeString() + '  robot could not answer: ' + e.message);
      }).then(function () { busy--; next(); });
    }
  }
  setInterval(function () { if (!RETIRED && !busy && !queue.length) update(true); }, 20 * 60000);
  function take(key, v) {
    if (RETIRED || !v || typeof v.m !== 'string' || seen.has(key)) return;
    seen.add(key);
    if ((v.t || 0) < start - 60000 || v.f === 'robot') return;
    let e; try { e = JSON.parse(v.m); } catch (x) { return; }
    if (!e) return;
    if (e.ping) { send(topic, { pong: e.ping }); console.log('  ' + new Date().toLocaleTimeString() + '  Keyline connected'); return; }
    if (!e.q) return;
    /* the player's notebook, kept on this computer so every phone with this robot code shares it */
    if (e.task === 'load') { send(topic, { a: e.q, profile: readProfile() }); return; }
    if (e.task === 'save') { if (e.profile && typeof e.profile === 'object') saveProfile(e.profile, !!e.replace); send(topic, { a: e.q, ok: 1 }); return; }
    const job = build(e);
    if (!job) { send(topic, { a: e.q, err: 1 }); return; }
    job.id = e.q; job.smart = !!e.smart; queue.push(job); next();
  }
  function event(block) {
    let name = '', data = '';
    block.split('\n').forEach(function (l) { if (l.indexOf('event:') === 0) name = l.slice(6).trim(); else if (l.indexOf('data:') === 0) data += l.slice(5).trim(); });
    if (name !== 'put' && name !== 'patch') return;
    let d; try { d = JSON.parse(data); } catch (x) { return; }
    if (!d || !d.data) return;
    if (d.path === '/') Object.keys(d.data).forEach(function (k) { take(k, d.data[k]); });
    else if (/^\/[^\/]+$/.test(d.path)) take(d.path.slice(1), d.data);
  }
  /* one long open stream from the database; it moves to the new channel when the day changes */
  for (;;) {
    topic = channel();
    const stop = new AbortController();
    const dayCheck = setInterval(function () { if (channel() !== topic) stop.abort(); }, 60000);
    try {
      const r = await fetch(dbUrl(topic), { headers: { Accept: 'text/event-stream' }, signal: stop.signal });
      if (!r.ok) { console.log('  The database said ' + r.status + '. Trying again soon.'); throw 0; }
      const reader = r.body.getReader(), dec = new TextDecoder();
      let buf = '';
      for (;;) {
        const part = await reader.read();
        if (part.done) break;
        buf += dec.decode(part.value, { stream: true }).replace(/\r/g, '');
        const blocks = buf.split('\n\n'); buf = blocks.pop();
        blocks.forEach(event);
      }
    } catch (e) {}
    clearInterval(dayCheck);
    await new Promise(function (ok) { setTimeout(ok, 3000); });
  }
}
main();
