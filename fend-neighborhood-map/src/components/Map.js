import React, { Component } from 'react';
import { mapStyle, apiKeys } from '../settings';

class Map extends Component {
	mapLoaded = false;

	componentDidMount() {
		this.drawMap();
	}

	componentDidUpdate() {
		if (this.mapLoaded) {
			this.updateMarkers();
		}
	}

	drawMap = () => {
		/* Build the map script line. */
		const mapScript = window.document.createElement('script');
		mapScript.setAttribute(
			'src',
			`https://maps.googleapis.com/maps/api/js?key=${apiKeys.google}&callback=initMap`
		);
		mapScript.async = true;
		mapScript.defer = true;

		/* Attach the map script to the window. */
		const scriptLoc = window.document.getElementsByTagName('script')[0];
		scriptLoc.parentNode.insertBefore(mapScript, scriptLoc);

		/* Callback is used here so this fixes the scope. */
		window.initMap = this.initMap;
	};

	initMap = () => {
		/* Draws the initial map and focuses on the area of interest. */
		this.props.map[0] = new window.google.maps.Map(
			document.getElementById('map'),
			{
				center: { lat: 27.960118, lng: -82.440815 },
				zoom: 16,
				styles: mapStyle
			}
		);

		this.mapLoaded = true;
		this.updateMarkers();
	};

	updateMarkers = () => {

		// Clear all markers and infoWindows from map.
		this.props.markerArray.forEach((marker, index) => {
			this.props.markerArray[index].setMap(null);
			this.props.markerInfoArray[index].setMap(null);
		});

		// Draw a maker for each location.
		this.props.locations().forEach((location, index) => {
			const pos = { lat: Number(location.lat), lng: Number(location.lng) };
			const targetMap = this.props.map[0];
			const placeName = location.name;
			const description = location.name + '<br>' + location.address;

			// Attach and infoWindow
			this.props.markerInfoArray[index] = new window.google.maps.InfoWindow({
				content: description
			});

			// Add the marker to the state array.
			this.props.markerArray[index] = new window.google.maps.Marker({
				position: pos,
				map: targetMap,
				title: placeName
			});

			// Add a listener to show the infoWindow when clicked.
			this.props.markerArray[index].addListener('click', () =>
				this.props.markerInfoArray[index].open(
					this.props.map[0],
					this.props.markerArray[index]
				)
			);
		});
	};

	render() {
		return <div id="map" role="application"/>;
	}
}

export default Map;
