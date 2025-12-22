const CACHE_NAME = "as-portfolio-v1";
const ASSETS = [
    "./",
    "./index.html",
    "./manifest.json",
    "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap",
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",
    "https://cdn-icons-png.flaticon.com/512/1006/1006771.png"
];

// Install
self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

// Activate
self.addEventListener("activate", (e) => {
    e.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});

// Fetch
self.addEventListener("fetch", (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            return response || fetch(e.request);
        })
    );
});
