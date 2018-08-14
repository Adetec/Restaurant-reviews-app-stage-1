let versionOfCache = "restaurants-v1";

self.addEventListener('fetch' , event => {
    event.respondWith(
        caches.match(event.request).then(response => {  // Check caches
            if (response) return response;
            return response || fetch(event.request).then(fetchResponse =>
                caches.open(versionOfCache).then(cache => { // Put file in cache next time
                    cache.put(event.request, fetchResponse.clone());
                    return fetchResponse;
                })
            ).catch(error => {  // Logging errors if ther's a problem
                console.log('Oops! Files are not cached, network problem', error);
            });
        })
    );
});

self.addEventListener('install' , event => { // Install cache files
    event.waitUntil(
        caches.open(versionOfCache).then(cache=> {
            cache.addAll( // Add images to cache without passing promise
                [
                    './img/1.jpg',
                    './img/2.jpg',
                    './img/3.jpg',
                    './img/4.jpg',
                    './img/5.jpg',
                    './img/6.jpg',
                    './img/7.jpg',
                    './img/8.jpg',
                    './img/9.jpg',
                    './img/10.jpg'
                ]                
            );
            return cache.addAll( // Add principal files to cache
                [
                    './',
                    './index.html',
                    './restaurant.html',
                    './css/styles.css',
                    './js/dbhelper.js',
                    './js/main.js',
                    './js/restaurant_info.js',
                    './sw-register.js',
                    './data/restaurants.json'
                ]
            );
        })
    );
});

self.addEventListener('activate' , event => { // Handle old cached version
    event.waitUntil(
        caches.keys().then(cacheStored => {
            return Promise.all(
             cacheStored.map(thisCache => {
                 if (versionOfCache !== thisCache) {
                    return caches.delete(thisCache);
                 }
             })
            )
        }

        )
    );
});