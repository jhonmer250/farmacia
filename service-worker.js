// Instalación del Service Worker y caching de recursos esenciales
self.addEventListener('install', event => {
  console.log('Service Worker instalándose.');
  event.waitUntil(
    caches.open('farmacia-cache').then(cache => {
      return cache.addAll([
        './index.html',
        './manifest.json',
        './assets/logo.png',
        'https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css',
        'https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js',
        'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css'
      ]);
    })
  );
});

// Intercepción de peticiones y respuesta desde el cache en caso de estar disponible
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});