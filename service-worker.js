const CACHE_NAME = "slaylist-cache-v1";
const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./screenshots/screenshot.png",
  "./screenshots/screenshot1.png",

  // Books
  "./books/Crime and Punishment.txt",
  "./books/the idiot.txt",
  "./books/notes from underground.txt",
  "./books/frankenstein.txt",
  "./books/pride and prejudice.txt",
  "./books/meditations.txt",
  "./books/the brothers karamazov.txt",
];
// add other assets like images here

self.addEventListener("install", (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (evt) => {
  evt.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (evt) => {
  evt.respondWith(
    caches.match(evt.request).then((response) => response || fetch(evt.request))
  );
});
