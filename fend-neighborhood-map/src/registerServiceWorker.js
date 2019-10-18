export default function registerServiceWorker() {
	// If browser supports service worker, attempt to register it.
	if ('serviceWorker' in navigator) {
		window.addEventListener('load', () => {
			navigator.serviceWorker
				.register('/serviceworker.js', {scope: '/'})
				.then(response => console.log(`Service worker registered.`, response))
				.catch(error =>
					console.error(`Service worker registration failed.`, error)
				);
		});
	}
};