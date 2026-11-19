/* Keyline robot for your computer.
   It lets the Keyline robot think with Claude, using your own Claude subscription through Claude Code.
   Start it with:  node keyline-robot.js   and keep the window open while you play.
   It prints a robot code. Type that code once in Keyline (the robot button at the top of the start page).

   How it works: the game sends the robot's turn (its team, its job, its words when its team may know them,
   and the clues so far) through the same free relay the phones already use. This script asks Claude Code
   for one answer, with a system prompt that holds only the Keyline rules and no tools, and sends it back. */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os'), cp = require('child_process');

const RELAY = process.env.KEYLINE_RELAY || 'https://ntfy.sh/';
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

/* find Claude Code on this computer, so it can run without a shell (safe for any text) */
function findClaude() {
  if (process.env.KEYLINE_CLAUDE) return { cmd: process.env.KEYLINE_CLAUDE, pre: [] };
  if (process.platform === 'win32') {
    const exe = path.join(os.homedir(), '.local', 'bin', 'claude.exe');
    if (fs.existsSync(exe)) return { cmd: exe, pre: [] };
    try {
      const root = cp.execSync('npm root -g', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
      const js = path.join(root, '@anthropic-ai', 'claude-code', 'cli.js');
      if (fs.existsSync(js)) return { cmd: process.execPath, pre: [js] };
    } catch (e) {}
    return null;
  }
  return { cmd: 'claude', pre: [] };
}

function askClaude(claude, prompt) {
  return new Promise(function (resolve, reject) {
    const args = claude.pre.concat(['-p', '--model', MODEL, '--system-prompt', RULES, '--tools', '', '--no-session-persistence']);
    const p = cp.spawn(claude.cmd, args, { cwd: DIR, windowsHide: true });
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

function send(topic, obj) {
  return fetch(RELAY + topic, { method: 'POST', body: JSON.stringify(obj) }).catch(function () {});
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
  const code = robotCode(), topic = 'keyline-bot-' + code.toLowerCase();
  const claude = findClaude();
  console.log('\n  KEYLINE ROBOT\n');
  if (!claude) { console.log('  I could not find Claude Code. Install it first:  npm install -g @anthropic-ai/claude-code\n'); process.exit(1); }
  process.stdout.write('  Checking Claude Code... ');
  try { parse('code', await askClaude(claude, 'Answer only: {"code": "123"}')); console.log('OK'); }
  catch (e) { console.log('it did not answer.\n  ' + e.message + '\n  Open PowerShell, type  claude  and sign in, then start me again.\n'); process.exit(1); }
  console.log('\n  Robot code:  ' + code.slice(0, 4) + '-' + code.slice(4) + '\n');
  console.log('  Type this code in Keyline: the robot button at the top of the start page.');
  console.log('  Keep this window open while you play. Close it to stop the robot.\n');

  let since = String(Math.floor(Date.now() / 1000) - 5), busy = 0;
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
  function take(m) {
    if (!m || m.event !== 'message' || seen.has(m.id)) return;
    seen.add(m.id); since = m.id;
    if (Date.now() / 1000 - (m.time || 0) > 60) return;
    let e; try { e = JSON.parse(m.message); } catch (x) { return; }
    if (!e) return;
    if (e.ping) { send(topic, { pong: e.ping }); console.log('  ' + new Date().toLocaleTimeString() + '  Keyline connected'); return; }
    if (!e.q) return;
    const job = build(e);
    if (!job) { send(topic, { a: e.q, err: 1 }); return; }
    job.id = e.q; queue.push(job); next();
  }
  for (;;) {
    try {
      const r = await fetch(RELAY + topic + '/json?poll=1&since=' + since);
      (await r.text()).split('\n').forEach(function (l) { if (l) { try { take(JSON.parse(l)); } catch (x) {} } });
    } catch (e) {}
    await new Promise(function (r) { setTimeout(r, 1200); });
  }
}
main();
