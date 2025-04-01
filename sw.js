self.addEventListener("install", (t) => {
  console.log("Service Worker instalado");
});
self.addEventListener("activate", (t) => {
  console.log("Service Worker activado");
});
const n = "capacitapp-v1", r = [
  "/",
  "/index.html",
  "/manifest.json"
];
self.addEventListener("install", (t) => {
  t.waitUntil(
    caches.open(n).then((a) => (console.log("Caché abierta"), a.addAll(r)))
  );
});
self.addEventListener("fetch", (t) => {
  t.respondWith(
    caches.match(t.request).then((a) => a ? (fetch(t.request).then((e) => {
      e && e.status === 200 && caches.open(n).then((c) => {
        c.put(t.request, e);
      });
    }), a) : fetch(t.request).then((e) => {
      if (!e || e.status !== 200 || e.type !== "basic")
        return e;
      const c = e.clone();
      return caches.open(n).then((i) => {
        i.put(t.request, c);
      }), e;
    }))
  );
});
self.addEventListener("activate", (t) => {
  const a = [n];
  t.waitUntil(
    caches.keys().then((e) => Promise.all(
      e.map((c) => {
        if (a.indexOf(c) === -1)
          return caches.delete(c);
      })
    ))
  );
});
