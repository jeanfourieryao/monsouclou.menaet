// Ceci est le service worker « Page hors ligne ».
const CACHE = "pwabuilder-page";

// TODO : remplacer ce qui suit par la page de repli hors ligne correcte, par exemple : const offlineFallbackPage = "offline.html" ;
const offlineFallbackPage = "ToDo-remplacer-ce-nom.html";

self.addEventListener("message", (event) => {
  si (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
self.addEventListener('install', async (event) => {
  événement.attendre jusqu'à(
    caches.open(CACHE)
      .then((cache) => cache.add(offlineFallbackPage))
  );
});

si (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

self.addEventListener('fetch', (event) => {
  si (event.request.mode === 'navigate') {
    événement.répondreAvec((async () => {
      essayer {
        const preloadResp = await event.preloadResponse;

        si (preloadResp) {
          renvoyer preloadResp;
        }

        const networkResp = await fetch(event.request);
        renvoyer networkResp;
      } attraper (erreur) {

        const cache = await caches.open(CACHE);
        const cachedResp = await cache.match(offlineFallbackPage);
        renvoyer cachedResp;
      }
    })();
  }
});
