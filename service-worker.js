// service-worker.js

// Nome della cache (la "memoria" per l'offline)
const CACHE_NAME = 'ruota-cache-v1';
// File da salvare subito
const urlsToCache = [
    '/',
    '/index.html',
    '/frasi.js',
    '/manifest.json',
    '/suono-ruota.mp3', // Aggiunto file audio
    '/icon-192.png',     // Aggiunta icona da manifest
    '/icon-512.png'      // Aggiunta icona da manifest
];

// 1. Evento "install"
// Quando l'app viene installata, salva i file principali
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache aperta');
                return cache.addAll(urlsToCache);
            })
    );
});

// 2. Evento "fetch"
// Intercetta le richieste: se il file è in cache, lo usa.
// Altrimenti lo scarica. Questo la fa funzionare offline.
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response; // Trovato in cache
                }
                return fetch(event.request); // Non in cache, scarica
            }
        )
    );
});