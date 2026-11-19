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
const MODEL = 'haiku';
const DIR = path.join(os.homedir(), '.keyline-robot');
const MAX_AT_ONCE = 3;
const ALPH = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

const RULES = 'You are a robot player in Keyline, a team word game for people learning English. ' +
  'You only play Keyline. You have no tools. Answer with only the JSON object asked for, nothing else. ' +
  'Rules: each team has 4 secret words, numbered 1 to 4. Each round a secret 3-digit code ' +
  '(three different digits from 1 to 4) is drawn. The clue giver says one clue word per digit, in order, and the teammate, ' +
  'who knows the 4 words, must guess the code. The other side does not know the words and only sees all the clues so far, ' +
  'grouped by number; it tries to crack the code too. Clues are single English words.';

const LEVEL = {
  1: 'Use only very simple, everyday English words that a beginner learner (level A1-A2) knows.',
  2: 'Use common English words that an intermediate learner (level B1) knows.',
  3: 'Use clear English words that an upper-intermediate learner (level B2) knows. Avoid rare or academic words.'
};

function word(s) { return typeof s === 'string' && /^[A-Za-z' -]{1,24}$/.test(s.trim()); }
function words(a, n) { return Array.isArray(a) && a.length <= n && a.every(word); }
function digits(s) { return typeof s === 'string' && /^[1-4]{3}$/.test(s) && new Set(s).size === 3; }
function cols(h) { return Array.isArray(h) && h.length === 4 && h.every(function (c) { return words(c, 12); }); }
function list(a) { return a.length ? a.join(', ') : '(none yet)'; }

/* the message for one turn: which team the robot plays for, its job, what it may know */
function build(b) {
  const lv = LEVEL[b.level] || LEVEL[1];
  const team = b.team === 'Orange' ? 'the Orange team' : (b.team === 'Blue' ? 'the Blue team' : 'the computer side');
  if (b.task === 'give') {
    if (!words(b.words, 4) || b.words.length !== 4 || !digits(b.code) || !cols(b.history)) return null;
    const order = b.code.split('').map(function (d) { return d + ' (' + b.words[+d - 1] + ')'; }).join(', ');
    return { kind: 'clues', prompt: 'You play for ' + team + '. This turn you are the clue giver. Your secret words:\n' +
      b.words.map(function (w, i) { return (i + 1) + '. ' + w + ' - clues used before: ' + list(b.history[i]); }).join('\n') +
      '\n\nThe code is ' + b.code + ', so give one clue for each of: ' + order + '.\n' +
      'Each clue must be ONE English word that your teammate can easily link to the right secret word ' +
      '(something it is, has, does, or is often found with). ' + lv + ' ' +
      'Never use a secret word, part of one, or a word with the same root. Never repeat a clue used before. ' +
      'Pick a different angle from the earlier clues so the other side cannot simply match them. ' +
      'Answer only: {"clues": ["word", "word", "word"]} in code order.' };
  }
  if (b.task === 'decode') {
    if (!words(b.words, 4) || b.words.length !== 4 || !words(b.clues, 3) || b.clues.length !== 3 || !cols(b.history)) return null;
    return { kind: 'code', prompt: 'You play for ' + team + '. This turn you are the teammate who guesses. Your team\'s secret words:\n' +
      b.words.map(function (w, i) { return (i + 1) + '. ' + w + ' - earlier clues: ' + list(b.history[i]); }).join('\n') +
      '\n\nYour clue giver just said, in order: ' + b.clues.join(', ') + '.\n' +
      'Match each clue to the secret word it most likely points to. The three numbers must be different. ' +
      'Answer only: {"code": "three digits"}, for example {"code": "312"}.' };
  }
  if (b.task === 'crack') {
    if (!words(b.pool, 260) || b.pool.length < 4 || !words(b.clues, 3) || b.clues.length !== 3 || !cols(b.history)) return null;
    return { kind: 'code', prompt: 'You play for ' + team + '. This turn you are the other side, trying to crack the code. ' +
      'The 4 secret words were picked from this list: ' + b.pool.join(', ') + '.\n\nClues given before, by number:\n' +
      b.history.map(function (c, i) { return (i + 1) + ': ' + list(c); }).join('\n') +
      '\n\nNew clues, in order: ' + b.clues.join(', ') + '.\n' +
      'Work out which secret word is probably behind each number, then match each new clue to a number. ' +
      'The three numbers must be different. Answer only: {"code": "three digits"}, for example {"code": "241"}.' };
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
function askClaude(claude, prompt) {
  return new Promise(function (resolve, reject) {
    let args = claude.pre.concat(['-p', '--model', MODEL, '--system-prompt', RULES, '--tools', '', '--no-session-persistence']);
    if (claude.shell) args = args.map(quote);
    const p = cp.spawn(claude.cmd, args, { cwd: DIR, windowsHide: true, shell: !!claude.shell });
    let out = '', err = '';
    const timer = setTimeout(function () { p.kill(); reject(new Error('Claude took too long')); }, 45000);
    p.stdout.on('data', function (d) { out += d; });
    p.stderr.on('data', function (d) { err += d; });
    p.on('error', function (e) { clearTimeout(timer); reject(e); });
    p.on('close', function (c) { clearTimeout(timer); if (c === 0) resolve(out); else reject(new Error((err || out).trim().split('\n').slice(-3).join(' ') || ('exit ' + c))); });
    p.stdin.end(prompt);
  });
}

function parse(kind, text) {
  const m = String(text).match(/\{[\s\S]*\}/);
  if (!m) return null;
  let o; try { o = JSON.parse(m[0]); } catch (e) { return null; }
  if (kind === 'code') { const c = String(o.code || '').replace(/[^1-4]/g, ''); return digits(c) ? { code: c } : null; }
  const cl = (o.clues || []).map(function (c) { return String(c).trim(); });
  return cl.length === 3 && cl.every(word) ? { clues: cl } : null;
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

async function main() {
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
      askClaude(claude, job.prompt).then(function (txt) {
        const r = parse(job.kind, txt);
        if (!r) throw new Error('no clear answer');
        r.a = job.id; send(topic, r);
        console.log('  ' + new Date().toLocaleTimeString() + '  robot move done (' + ((Date.now() - t0) / 1000).toFixed(1) + 's)');
      }).catch(function (e) {
        send(topic, { a: job.id, err: 1 });
        console.log('  ' + new Date().toLocaleTimeString() + '  robot could not answer: ' + e.message);
      }).then(function () { busy--; next(); });
    }
  }
  function take(key, v) {
    if (!v || typeof v.m !== 'string' || seen.has(key)) return;
    seen.add(key);
    if ((v.t || 0) < start - 60000 || v.f === 'robot') return;
    let e; try { e = JSON.parse(v.m); } catch (x) { return; }
    if (!e) return;
    if (e.ping) { send(topic, { pong: e.ping }); console.log('  ' + new Date().toLocaleTimeString() + '  Keyline connected'); return; }
    if (!e.q) return;
    const job = build(e);
    if (!job) { send(topic, { a: e.q, err: 1 }); return; }
    job.id = e.q; queue.push(job); next();
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
