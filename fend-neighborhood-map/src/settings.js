/*
This file serves only the settings for the project and could be
excluded via .gitignore for safety after completion.
*/

export const apiKeys = {
	google: 'AIzaSyDO6oL9hPkhGwMfMsHAAgUuV0zB1HT5oT8',
	foursquareClient: 'WI4KPKO251LEQHDA143ZMH5HLUAS0RUR5WOYGCIISN1RT2HK',
	foursquareSecret: 'EIOTQ4O2ZGB2U3SYJDJ42VUUHP2URK4YQWCZFAFQYWN4CVML',
	foursquareVersion: 20180323
}

export const defaultLocations = [
	{
		name: 'The Blind Tiger Cafe',
		address: '1901 E 7th Ave, Tampa, FL 33605',
		web: 'https://www.blindtigercafe.com/',
		lat: '27.96017',
		lng: '-82.437894',
		id: '53cc6aa3498e5a7d7b0f18a7',
	},
	{
		name: 'New York New York Pizza',
		address: '1512 E 7th Ave, Tampa, FL 33605',
		lat: '27.960409',
		lng: '-82.442498',
		id: '4b1b365df964a520a4f923e3'
	},
	{
		name: 'Samurai Blue Sushi & Sake Bar',
		address: '1600 E 8th Ave, Tampa, FL 33605 (Top Floor)',
		lat: '27.960708',
		lng: '-82.441888',
		id: '4b131064f964a520979323e3'
	},
	{
		name: "Gaspar's Grotto",
		address: '1805 E 7th Ave, Tampa, FL 33605',
		lat: '27.9601',
		lng: '-82.438955',
		id: '4b0586c2f964a520bc6c22e3'
	},
	{
		name: "Carmine's Restaurant & Bar",
		address: '3808, 1802 E 7th Ave, Tampa, FL 33605',
		lat: '27.960462',
		lng: '-82.439013',
		id: '4b0586c5f964a520a46d22e3'
	},
	{
		name: 'Acropolis Greek Taverna',
		address: '3807, 1833 E 7th Ave, Tampa, FL 33605',
		lat: '27.960129',
		lng: '-82.438108',
		id: '4b97d3a3f964a520371835e3'
	},
	{
		name: 'The Bricks',
		address: '1327 E 7th Ave, Tampa, FL 33605',
		lat: '27.960024',
		lng: '-82.444401',
		id: '4bb6655e6edc76b07adf301c'
	},
	{
		name: 'Tampa Bay Brewing Company',
		address: '1600 E 8th Ave, Tampa, FL 33605 (Bottom Floor)',
		lat: '27.960708',
		lng: '-82.441888',
		id: '4af247a8f964a5201be721e3'
	},
	{
		name: 'Due Amici',
		address: '1724 E 7th Ave, Tampa, FL 33605',
		lat: '27.96039',
		lng: '-82.439655',
		id: '55c67637498e1003b1131921'
	},
	{
		name: "Hamburger Mary's",
		address: '1600 E 7th Ave, Tampa, FL 33605',
		lat: '27.96044306897833',
		lng: '-82.44159400463104',
		id: '4b22e3baf964a520a64f24e3'
	}
];

export const mapStyle = [
	{
		elementType: 'geometry',
		stylers: [
			{
				color: '#212121'
			}
		]
	},
	{
		elementType: 'labels.icon',
		stylers: [
			{
				visibility: 'off'
			}
		]
	},
	{
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#757575'
			}
		]
	},
	{
		elementType: 'labels.text.stroke',
		stylers: [
			{
				color: '#212121'
			}
		]
	},
	{
		featureType: 'administrative',
		elementType: 'geometry',
		stylers: [
			{
				color: '#757575'
			},
			{
				visibility: 'off'
			}
		]
	},
	{
		featureType: 'administrative.country',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#9e9e9e'
			}
		]
	},
	{
		featureType: 'administrative.land_parcel',
		stylers: [
			{
				visibility: 'off'
			}
		]
	},
	{
		featureType: 'administrative.locality',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#bdbdbd'
			}
		]
	},
	{
		featureType: 'poi',
		stylers: [
			{
				visibility: 'off'
			}
		]
	},
	{
		featureType: 'poi',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#757575'
			}
		]
	},
	{
		featureType: 'poi.park',
		elementType: 'geometry',
		stylers: [
			{
				color: '#181818'
			}
		]
	},
	{
		featureType: 'poi.park',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#616161'
			}
		]
	},
	{
		featureType: 'poi.park',
		elementType: 'labels.text.stroke',
		stylers: [
			{
				color: '#1b1b1b'
			}
		]
	},
	{
		featureType: 'road',
		elementType: 'geometry.fill',
		stylers: [
			{
				color: '#2c2c2c'
			}
		]
	},
	{
		featureType: 'road',
		elementType: 'labels.icon',
		stylers: [
			{
				visibility: 'off'
			}
		]
	},
	{
		featureType: 'road',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#8a8a8a'
			}
		]
	},
	{
		featureType: 'road.arterial',
		elementType: 'geometry',
		stylers: [
			{
				color: '#373737'
			}
		]
	},
	{
		featureType: 'road.highway',
		elementType: 'geometry',
		stylers: [
			{
				color: '#3c3c3c'
			}
		]
	},
	{
		featureType: 'road.highway.controlled_access',
		elementType: 'geometry',
		stylers: [
			{
				color: '#4e4e4e'
			}
		]
	},
	{
		featureType: 'road.local',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#616161'
			}
		]
	},
	{
		featureType: 'transit',
		stylers: [
			{
				visibility: 'off'
			}
		]
	},
	{
		featureType: 'transit',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#757575'
			}
		]
	},
	{
		featureType: 'water',
		elementType: 'geometry',
		stylers: [
			{
				color: '#000000'
			}
		]
	},
	{
		featureType: 'water',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#3d3d3d'
			}
		]
	}
];
