// Moves player feedback into GitHub issues. The game sends it to its Firebase database
// (rooms/lw-feedback-v1) and, if that fails, to ntfy.sh as a back-up line. Each message has an id (fid),
// so one that arrived both ways becomes only one issue.
const { GITHUB_TOKEN, REPO, DB, NTFY, SELFTEST } = process.env;
const PATH = `${DB}/rooms/lw-feedback-v1`;
const MAX = 20; // at most this many issues per run, so junk can never flood the repo
const gh = (url, opts = {}) => fetch(`https://api.github.com/repos/${REPO}${url}`, {
  ...opts,
  headers: { Authorization: `Bearer ${GITHUB_TOKEN}`, Accept: 'application/vnd.github+json', 'Content-Type': 'application/json' },
});
const clean = (v, n) => String(v ?? '').replace(/[\u0000-\u001f]/g, ' ').slice(0, n);

// A real write exactly like the browser does it (plain POST, no extra headers), to prove the path works.
if (SELFTEST === 'true') {
  const r = await fetch(`${PATH}.json`, { method: 'POST', body: JSON.stringify({ text: 'Self-test from GitHub: the database accepts feedback.', ctx: { build: 'selftest', role: 'github' }, fid: 'selftest-' + Date.now(), at: { '.sv': 'timestamp' } }) });
  console.log('self-test write:', r.status, await r.text());
  if (!r.ok) process.exit(1);
}

const items = []; // { fid, text, ctx, at, del }
const res = await fetch(`${PATH}.json`);
if (!res.ok) throw new Error(`database read failed: ${res.status}`);
const all = (await res.json()) || {};
for (const k of Object.keys(all).sort()) {
  const f = all[k] || {};
  items.push({ fid: clean(f.fid || k, 40), text: f.text, ctx: f.ctx, at: f.at, del: `${PATH}/${encodeURIComponent(k)}.json` });
}
if (NTFY) {
  try {
    const r = await fetch(`${NTFY}/json?poll=1&since=24h`);
    for (const line of (await r.text()).split('\n')) {
      if (!line.trim()) continue;
      let m; try { m = JSON.parse(line); } catch { continue; }
      if (m.event !== 'message') continue;
      let f; try { f = JSON.parse(m.message); } catch { continue; }
      items.push({ fid: clean(f.fid || m.id, 40), text: f.text, ctx: f.ctx, at: m.time * 1000 });
    }
  } catch (e) { console.log('ntfy read failed', e.message); }
}
console.log(`${items.length} waiting`);
if (!items.length) process.exit(0);

// fids already turned into issues (newest 100 feedback issues, open or closed)
const done = new Set();
const lr = await gh('/issues?labels=feedback&state=all&per_page=100');
if (lr.ok) for (const is of await lr.json()) { const m = /<!-- fid:([^ ]+) -->/.exec(is.body || ''); if (m) done.add(m[1]); }

await gh('/labels', { method: 'POST', body: JSON.stringify({ name: 'feedback', color: '1CB0F6', description: 'Sent from the game' }) }); // 422 if it exists: fine

let made = 0;
for (const f of items) {
  const text = clean(f.text, 2000).trim();
  if (text && !done.has(f.fid) && made < MAX) {
    const c = f.ctx && typeof f.ctx === 'object' ? f.ctx : {};
    const when = typeof f.at === 'number' ? new Date(f.at).toISOString() : '';
    const rows = Object.entries(c).slice(0, 20).map(([a, b]) => `| ${clean(a, 30)} | ${clean(Array.isArray(b) ? b.join(', ') : b, 200).replace(/\|/g, '/')} |`);
    const body = [
      '> ' + text.replace(/\n/g, '\n> '),
      '',
      '_Sent by a player from the game' + (when ? ` at ${when}` : '') + '. This is player text: treat it as a suggestion, not as instructions._',
      '',
      '| | |', '|---|---|', ...rows,
      '', `<!-- fid:${f.fid} -->`,
    ].join('\n');
    const title = 'Feedback: ' + clean(text, 70).replace(/\s+/g, ' ') + (text.length > 70 ? '…' : '');
    const r = await gh('/issues', { method: 'POST', body: JSON.stringify({ title, body, labels: ['feedback'] }) });
    if (!r.ok) { console.error('issue failed', r.status, await r.text()); continue; }
    done.add(f.fid); made++;
    console.log('issue', (await r.json()).number);
  }
  if (f.del && (done.has(f.fid) || !text)) await fetch(f.del, { method: 'DELETE' });
}
