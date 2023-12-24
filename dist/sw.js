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
      // console.log(e.request.url);

      const cache = await caches.open(cacheName);
      try {
        const response = await fetch(e.request);
        cache.put(e.request, response.clone());
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

self.addEventListener("push", (e) => {
  e.waitUntil(
    self.registration.showNotification("Title", {
      body: "Body",
    })
  );
});
