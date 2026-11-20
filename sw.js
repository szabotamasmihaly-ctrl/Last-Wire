/* Last Wire offline: keeps a copy of the game on the phone so it opens without internet.
   The page itself is fetched fresh when there is a connection, so updates still arrive. */
var CACHE = 'lastwire-v1';
var FILES = ["./", "./index.html", "./manifest.json", "./icon-192.png", "./icon-512.png", "./vendor/peerjs.min.js", "./courses/da-a1.js","./courses/da-a2.js","./courses/da-b1.js","./courses/da-b2.js","./courses/da-c1.js","./courses/da-c2.js","./courses/en-a1.js","./courses/en-a2.js","./courses/en-b1.js","./courses/en-b2.js","./courses/en-c1.js","./courses/en-c2.js","./courses/es-a1.js","./courses/es-a2.js","./courses/es-b1.js","./courses/es-b2.js","./courses/es-c1.js","./courses/es-c2.js","./courses/gloss-da.js","./courses/gloss-en.js","./courses/gloss-es.js","./courses/party.js","./courses/culture.js"];
self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(FILES); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) { return Promise.all(ks.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); })); }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  var req = e.request, url = new URL(req.url);
  if (req.method !== 'GET') return;
  /* the game's own files: try the network first, keep the newest copy, fall back to it offline */
  if (url.origin === location.origin) {
    e.respondWith(fetch(req).then(function (res) {
      if (res && res.ok) { var copy = res.clone(); caches.open(CACHE).then(function (c) { c.put(req, copy); }); }
      return res;
    }).catch(function () { return caches.match(req, { ignoreSearch: true }).then(function (m) { return m || caches.match('./index.html'); }); }));
    return;
  }
  /* fonts: keep a copy once loaded */
  if (/fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)) {
    e.respondWith(caches.match(req).then(function (m) { return m || fetch(req).then(function (res) { var copy = res.clone(); caches.open(CACHE).then(function (c) { c.put(req, copy); }); return res; }); }));
  }
});
