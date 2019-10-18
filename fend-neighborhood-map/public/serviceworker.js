// Reference Udacity FEND Project 5

'use strict';

// Load initial data.
let cacheName = 'MapCache';
let cacheFiles = ['/', 'index.html'];

// Cache static assets.
self.addEventListener('install', event => {
	event.waitUntil(
		caches
			.open(cacheName)
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
		caches
			.match(event.request)
			.then(response => {
				// A matching cache is found, return it.
				if (response) {
					//console.log(`Cache found.`);
					return response;
				}

				// Not found in cache attempt to store it, then return it.
				return fetch(event.request.clone()) //, { mode: 'no-cors' })
					.then(response => {
						// Cache and return.
						//console.log(`Cache not found. Caching and returning.`);
						caches
							.open(cacheName)
							.then(cache => cache.put(event.request, response.clone()))
							.catch(error => console.error(`Cache attempt failed:`, error));
						return response.clone();
					});
			})

			.catch(error => {
				//console.error(`Fetch failed (Connection offline.)`);
				return new Response('Content not available.', {
					status: 404,
					statusText: error.message
				});
			})
	);
});
