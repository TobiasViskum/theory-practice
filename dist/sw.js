const cacheName = "version-1.1.9";
const contentToCache = ["/"];

self.addEventListener("install", (e) => {
  e.waitUntil(async () => {
    const cache = await caches.open(cacheName);

    await cache.addAll(contentToCache);
  });
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async () => {
      const cache = await caches.open(cacheName);
      try {
        const response = await fetch(e.request);
        await cache.delete(e.request);
        await cache.put(e.request, response.clone());
        return response;
      } catch (err) {
        const r = await caches.match(e.request);
        if (r) {
          return r;
        }
      }
    })()
  );
});

self.addEventListener("push", function (event) {
  event.waitUntil(
    self.registration.showNotification("This is the title", {
      body: "This is the body",
      tag: "Notification",
    })
  );
});
