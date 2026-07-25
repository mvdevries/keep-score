/* Keep Score - service worker
   Strategie: network-first met cache-fallback.
   - Online: haalt altijd de nieuwste versie op en ververst de cache.
     Betekent dat een nieuwe deploy meteen zichtbaar is, geen "vastzitten
     op oude versie"-probleem.
   - Offline: valt terug op de laatst succesvol opgehaalde versie.

   CACHE_NAME alleen ophogen als de lijst app-shell bestanden verandert
   (nieuw icoon, nieuw bestand); niet nodig bij gewone inhoudswijzigingen
   in index.html, die worden toch altijd vers opgehaald zodra er netwerk is. */
const CACHE_NAME = "keepscore-shell-v1";
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png",
  "./icons/favicon-32.png"
];

self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)));
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(names => Promise.all(names.filter(n => n !== CACHE_NAME).map(n => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  if(event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request).then(response => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
      return response;
    }).catch(() =>
      caches.match(event.request).then(cached => cached || caches.match("./index.html"))
    )
  );
});
