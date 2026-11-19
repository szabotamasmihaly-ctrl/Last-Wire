/* Keyline robot: a tiny Cloudflare Worker that lets the game's robot think with Claude.
   It keeps the Anthropic API key secret (set it in Cloudflare as the secret ANTHROPIC_API_KEY),
   only answers the game's own page, only does the three Keyline jobs below, and limits how often
   one person can call it. Paste this whole file into a Cloudflare Worker and press Deploy. */

const MODEL = 'claude-haiku-5-5';
const ALLOWED = ['https://szabotamasmihaly-ctrl.github.io'];
const PER_MINUTE = 40;          /* requests one visitor may make each minute */
const hits = new Map();         /* visitor -> [minute, count] (kept per server, which is enough here) */

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

const CODE = { type: 'object', properties: { code: { type: 'string' } }, required: ['code'], additionalProperties: false };
const CLUES = { type: 'object', properties: { clues: { type: 'array', items: { type: 'string' } } }, required: ['clues'], additionalProperties: false };

/* The robot agent: it only knows the rules of Keyline. Each call tells it which team it plays for,
   its job this turn, its words (when its team knows them) and the clues so far. */
const RULES = 'You are a robot player in Keyline, a team word game for people learning English. ' +
  'You only play Keyline and only answer with the JSON asked for. Rules: Keyline is a team word game. A team has 4 secret words, numbered 1 to 4. Each round a secret 3-digit code ' +
  '(three different digits from 1 to 4) is drawn. The clue giver says one clue word per digit, in order, and their teammate, ' +
  'who knows the 4 words, must guess the code. The other side does not know the words and only sees all the clues so far, ' +
  'grouped by number; it tries to crack the code too.';

function build(b) {
  const lv = LEVEL[b.level] || LEVEL[1];
  const team = b.team === 'Orange' ? 'the Orange team' : (b.team === 'Blue' ? 'the Blue team' : 'the computer side');
  if (b.task === 'give') {
    if (!words(b.words, 4) || b.words.length !== 4 || !digits(b.code) || !cols(b.history)) return null;
    const order = b.code.split('').map(function (d) { return d + ' (' + b.words[+d - 1] + ')'; }).join(', ');
    return {
      schema: CLUES,
      prompt: 'You play for ' + team + '. This turn you are the clue giver. Your secret words:\n' +
        b.words.map(function (w, i) { return (i + 1) + '. ' + w + ' - clues used before: ' + list(b.history[i]); }).join('\n') +
        '\n\nThe code is ' + b.code + ', so give one clue for each of: ' + order + '.\n' +
        'Each clue must be ONE English word that your teammate can easily link to the right secret word ' +
        '(something it is, has, does, or is often found with). ' + lv + ' ' +
        'Never use a secret word, part of one, or a word with the same root. Never repeat a clue used before. ' +
        'Pick a different angle from the earlier clues so the other side cannot simply match them. ' +
        'Return {"clues": [three words in code order]}.'
    };
  }
  if (b.task === 'decode') {
    if (!words(b.words, 4) || b.words.length !== 4 || !words(b.clues, 3) || b.clues.length !== 3 || !cols(b.history)) return null;
    return {
      schema: CODE,
      prompt: 'You play for ' + team + '. This turn you are the teammate who guesses. Your team\'s secret words:\n' +
        b.words.map(function (w, i) { return (i + 1) + '. ' + w + ' - earlier clues: ' + list(b.history[i]); }).join('\n') +
        '\n\nYour clue giver just said, in order: ' + b.clues.join(', ') + '.\n' +
        'Match each clue to the secret word it most likely points to. The three numbers must be different. ' +
        'Return {"code": "three digits"}, for example {"code": "312"}.'
    };
  }
  if (b.task === 'crack') {
    if (!words(b.pool, 260) || b.pool.length < 4 || !words(b.clues, 3) || b.clues.length !== 3 || !cols(b.history)) return null;
    return {
      schema: CODE,
      prompt: 'You play for ' + team + '. This turn you are the other side, trying to crack the code. The 4 secret words were picked from this list: ' +
        b.pool.join(', ') + '.\n\nClues given before, by number:\n' +
        b.history.map(function (c, i) { return (i + 1) + ': ' + list(c); }).join('\n') +
        '\n\nNew clues, in order: ' + b.clues.join(', ') + '.\n' +
        'Work out which secret word is probably behind each number, then match each new clue to a number. ' +
        'The three numbers must be different. Return {"code": "three digits"}, for example {"code": "241"}.'
    };
  }
  return null;
}

function reply(body, status, origin) {
  return new Response(JSON.stringify(body), {
    status: status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Vary': 'Origin'
    }
  });
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    if (ALLOWED.indexOf(origin) < 0) return new Response('Not allowed', { status: 403 });
    if (request.method === 'OPTIONS') return reply({}, 204, origin);
    if (request.method !== 'POST') return reply({ error: 'post only' }, 405, origin);
    if (!env.ANTHROPIC_API_KEY) return reply({ error: 'no key' }, 503, origin);

    const who = request.headers.get('CF-Connecting-IP') || 'x', minute = Math.floor(Date.now() / 60000);
    const h = hits.get(who);
    if (h && h[0] === minute) { if (++h[1] > PER_MINUTE) return reply({ error: 'slow down' }, 429, origin); }
    else hits.set(who, [minute, 1]);
    if (hits.size > 5000) hits.clear();

    let b;
    try { const text = await request.text(); if (text.length > 6000) throw 0; b = JSON.parse(text); } catch (e) { return reply({ error: 'bad request' }, 400, origin); }
    const job = build(b || {});
    if (!job) return reply({ error: 'bad request' }, 400, origin);

    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-api-key': env.ANTHROPIC_API_KEY, 'anthropic-version': '2026-10-21' },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 1024,
        system: RULES,
        output_config: { effort: 'low', format: { type: 'json_schema', schema: job.schema } },
        messages: [{ role: 'user', content: job.prompt }]
      })
    });
    if (!r.ok) return reply({ error: 'claude ' + r.status }, 502, origin);
    const m = await r.json();
    const t = (m.content || []).filter(function (c) { return c.type === 'text'; }).map(function (c) { return c.text; }).join('');
    let out;
    try { out = JSON.parse(t); } catch (e) { return reply({ error: 'no answer' }, 502, origin); }
    if (job.schema === CODE) {
      const code = String(out.code || '').replace(/[^1-4]/g, '');
      return digits(code) ? reply({ code: code }, 200, origin) : reply({ error: 'no answer' }, 502, origin);
    }
    const clues = (out.clues || []).map(function (c) { return String(c).trim(); });
    return clues.length === 3 && clues.every(word) ? reply({ clues: clues }, 200, origin) : reply({ error: 'no answer' }, 502, origin);
  }
};
