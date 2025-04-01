// Service Worker básico
self.addEventListener('install', (event) => {
    console.log('Service Worker instalado');
  });
  
  self.addEventListener('activate', (event) => {
    console.log('Service Worker activado');
  });
  
  // Esto es para que funcione con vite-plugin-pwa
  self.__WB_MANIFEST;
  
  // Caché de recursos estáticos
  const CACHE_NAME = 'capacitapp-v1';
  const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
  ];
  
  // Evento de instalación
  self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then((cache) => {
          console.log('Caché abierta');
          return cache.addAll(urlsToCache);
        })
    );
  });
  
  // Estrategia stale-while-revalidate
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          // Usa la respuesta en caché si está disponible
          if (response) {
            // Intentamos actualizar la caché en segundo plano
            fetch(event.request)
              .then((newResponse) => {
                // Si la petición fue exitosa, actualizamos la caché
                if (newResponse && newResponse.status === 200) {
                  caches.open(CACHE_NAME)
                    .then((cache) => {
                      cache.put(event.request, newResponse);
                    });
                }
              });
            return response;
          }
  
          // Si no hay respuesta en caché, la solicitamos a la red
          return fetch(event.request)
            .then((response) => {
              // Verificamos que sea una respuesta válida
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }
  
              // Clonamos la respuesta para poder almacenarla en caché
              const responseToCache = response.clone();
  
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                });
  
              return response;
            });
        })
    );
  });
  
  // Eliminar cachés antiguas cuando se activa una nueva versión
  self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });