const CACHE_NAME = 'blockforge-suite-v1';
const ASSETS = [
    './',
    './index.html',
    './shared/styles.css',
    './shared/blockforge-core.js',
    './manifest.json',
    './public/icon.png',
    './studios/image/index.html',
    './studios/text/index.html'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(ASSETS))
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => response || fetch(event.request))
    );
});