// Service worker: lets the installed app open without a network connection.
// Network first with a timeout: online, the newest version from GitHub Pages is used; if the network fails or takes
// longer than NETWORK_TIMEOUT, the cached copy is shown and the new version, once it arrives, is used on the next launch.
const CACHE = 'camera-overlay-v3';
const FILES = ['./', './index.html', './manifest.webmanifest', './icons/apple-touch-icon.png', './icons/icon-192.png', './icons/icon-512.png'];
const NETWORK_TIMEOUT = 3000;

self.addEventListener('install', e => {
  // cache: 'reload' bypasses the browser's HTTP cache, so a new worker never stores an old copy
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES.map(f => new Request(f, {cache: 'reload'})))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

// One cache entry per file: query strings are ignored, so ./?source=pwa and ./ share an entry
const cacheKey = req => { const u = new URL(req.url); u.search = ''; return u.href; };

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  const navigate = req.mode === 'navigate';

  const network = fetch(req);
  // Store successful responses. Registered right away, so the worker stays alive until the cache is updated
  // even when the cached copy was already shown because the network was slow.
  e.waitUntil(network.then(res => {
    // Clone now, before the page reads the body
    if (res.ok && res.type === 'basic') { const copy = res.clone(); return caches.open(CACHE).then(c => c.put(cacheKey(req), copy)); }
  }).catch(() => {}));

  // Only page loads fall back to the app page; other missing files fail normally
  const cached = caches.match(cacheKey(req))
    .then(r => r || (navigate ? caches.match(cacheKey(new Request('./index.html'))) : undefined))
    .catch(() => undefined);

  e.respondWith(new Promise(resolve => {
    let done = false;
    const finish = r => { if (!done && r) { done = true; resolve(r); } };
    const timer = setTimeout(() => cached.then(finish), NETWORK_TIMEOUT);
    network.then(r => { clearTimeout(timer); finish(r); },
      () => { clearTimeout(timer); cached.then(r => finish(r || Response.error())); });
  }));
});
