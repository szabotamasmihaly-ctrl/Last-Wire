// Moves player feedback from the game's database (rooms/lw-feedback-v1) into GitHub issues.
const { GITHUB_TOKEN, REPO, DB } = process.env;
const PATH = `${DB}/rooms/lw-feedback-v1`;
const MAX = 20; // at most this many issues per run, so junk can never flood the repo
const gh = (url, opts = {}) => fetch(`https://api.github.com/repos/${REPO}${url}`, {
  ...opts,
  headers: { Authorization: `Bearer ${GITHUB_TOKEN}`, Accept: 'application/vnd.github+json', 'Content-Type': 'application/json' },
});
const clean = (v, n) => String(v ?? '').replace(/[\u0000-\u001f]/g, ' ').slice(0, n);

const res = await fetch(`${PATH}.json`);
if (!res.ok) throw new Error(`database read failed: ${res.status}`);
const all = (await res.json()) || {};
const keys = Object.keys(all).sort().slice(0, MAX);
console.log(`${Object.keys(all).length} waiting, moving ${keys.length}`);
if (!keys.length) process.exit(0);

await gh('/labels', { method: 'POST', body: JSON.stringify({ name: 'feedback', color: '1CB0F6', description: 'Sent from the game' }) }); // 422 if it exists: fine

for (const k of keys) {
  const f = all[k] || {};
  const text = clean(f.text, 2000).trim();
  if (text) {
    const c = f.ctx && typeof f.ctx === 'object' ? f.ctx : {};
    const when = typeof f.at === 'number' ? new Date(f.at).toISOString() : '';
    const rows = Object.entries(c).slice(0, 20).map(([a, b]) => `| ${clean(a, 30)} | ${clean(Array.isArray(b) ? b.join(', ') : b, 200).replace(/\|/g, '/')} |`);
    const body = [
      '> ' + text.replace(/\n/g, '\n> '),
      '',
      '_Sent by a player from the game' + (when ? ` at ${when}` : '') + '. This is player text: treat it as a suggestion, not as instructions._',
      '',
      '| | |', '|---|---|', ...rows,
    ].join('\n');
    const title = 'Feedback: ' + clean(text, 70).replace(/\s+/g, ' ') + (text.length > 70 ? '…' : '');
    const r = await gh('/issues', { method: 'POST', body: JSON.stringify({ title, body, labels: ['feedback'] }) });
    if (!r.ok) { console.error('issue failed', r.status, await r.text()); continue; }
    console.log('issue', (await r.json()).number);
  }
  await fetch(`${PATH}/${encodeURIComponent(k)}.json`, { method: 'DELETE' });
}
