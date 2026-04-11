const CACHE = 'monsouclou-v1';
const ASSETS = ['./', './index.html',
  'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Fraunces:ital,wght@0,700;0,900;1,700&display=swap'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS).catch(()=>{})));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));
});
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request)
      .then(resp => { const c = resp.clone(); caches.open(CACHE).then(ca=>ca.put(e.request,c)); return resp; })
      .catch(() => caches.match('./index.html'))
    )
  );
});
