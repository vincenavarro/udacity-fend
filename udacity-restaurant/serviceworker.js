'use strict'

// If browser supports service worker, attempt to register it.
if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('/serviceworker.js')
			.then(response => console.log(`Service worker registered.`, response))
			.catch(error => console.error(`Service worker registration failed.`, error));
	});
}

// Load initial data.
let cacheName = 'RestaurantReviewsCache';
let cacheFiles = [
	'/',
	'/index.html',
	'/restaurant.html',
	'/js/dbhelper.js',
	'/js/main.js',
	'/js/restaurant_info.js',
	'/img/1.jpg',
	'/img/2.jpg',
	'/img/3.jpg',
	'/img/4.jpg',
	'/img/5.jpg',
	'/img/6.jpg',
	'/img/7.jpg',
	'/img/8.jpg',
	'/img/9.jpg',
	'/img/10.jpg',
	'/data/restaurants.json',
	'/css/styles.css',
	'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css'
];
for (let i = 1; i < 11; i++) cacheFiles.push(`/restaurant.html?id=${i}`);

// Cache static assets.
self.addEventListener('install', event => {
	event.waitUntil(
		caches.open(cacheName)
		.then(cache => cache.addAll(cacheFiles))
		.catch(error => console.error(`Error loading cache:`, error))
	);
});

/*
Check if request is in cache. If found return it.
If not attempt to cache it and then return it.
*/
self.addEventListener('fetch', event => {

	event.respondWith(
		caches.match(event.request)
		.then(response => {

			// A matching cache is found, return it.
			if (response) {
				console.log('Cache found.');
				return response;
			}


			// Not found in cache attempt to store it, then return it.
			return fetch(event.request.clone()) //, { mode: 'no-cors' })
				.then(response => {

					// Cache and return.
					console.log(`Cache not found. Caching and returning.`);
					caches.open(cacheName)
						.then(cache => cache.put(event.request, response.clone()))
						.catch(error => console.error(`Cache attempt failed:`, error));
					return response.clone();
				});
		})

		.catch(error => {
			console.error('Fetch failed.');
			return new Response('Content not available.', {
				status: 404,
				statusText: error.message
			});
		})
	);
});