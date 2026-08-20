const CACHE = "walk-in-truth-v6";
const FILES = ["./" ,"./index.html","./styles.css","./data.js","./engine.js","./app.js","./manifest.json","./icon.svg"];
self.addEventListener("install", function (event) {
  event.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(FILES); }));
  self.skipWaiting();
});
self.addEventListener("activate", function (event) {
  event.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }));
  self.clients.claim();
});
self.addEventListener("fetch", function (event) {
  event.respondWith(caches.match(event.request).then(function (hit) {
    return hit || fetch(event.request).then(function (res) {
      var copy = res.clone();
      caches.open(CACHE).then(function (c) { c.put(event.request, copy); });
      return res;
    }).catch(function () { return caches.match("./index.html"); });
  }));
});
