const version = "1.0.1";
const cacheName = `pwatips-${version}`;

self.addEventListener('install', e => {
  console.log("Instalando Service Worker...");
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        `/`,
        `/index.html`,
        `/src/tips.json`,
        `/src/css/app.css`,
        `/src/js/app.js`,
        `/src/images/pwa-tips.png`
      ])
          .then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('activate', event => {
  console.log("Service Worker Ativado!");
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(event.request, {ignoreSearch: true}))
      .then(response => {
      return response || fetch(event.request);
    })
  );
});