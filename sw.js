self.addEventListener("install", function (event) {
  console.log("Service Worker installed!");
  event.waitUntil(
    caches.open("fruit-game-cache").then(function (cache) {
      return cache.addAll([
        "./",
        "./index.html",
        "./fruit.css",
        "./fruit.js",
        "./icon.png",
        "./bg-music.mp3",
        "./manifest.json"
      ]);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});