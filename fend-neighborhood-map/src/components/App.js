import React, { Component, Fragment } from 'react';
import Map from './Map';
import Menu from './Menu';
import { defaultLocations, apiKeys } from '../settings';

class App extends Component {
	componentDidMount() {
		/*
		Once the app is loaded, grab images of the selected addresses from Foursquare.
		Note: I pre-cached the location IDs because foursquare has an extremely
		limited free API and considers location lookups 'premium'
		*/
		this.getFoursquareData();
	}

	state = {
		locations: defaultLocations,
		map: [],
		markerArray: [],
		markerInfoArray: [],
		searchKey: ''
	};

	getFoursquareData() {
		/*
		This function makes an array of image URLs for all locations.
		Once this is complete, the image URLs are added to state.
		*/

		this.state.locations.forEach((location, index) => {
			this.getFoursquareImage(location.id, 150).then(result => {
				/*
				Because we can not modify state objects directly,
				clone the state and reset it with our new data.
				*/
				let updatedLocations = this.state.locations;
				updatedLocations[index].image = result;
				this.setState({
					locations: updatedLocations
				});
			});
		});
	}

	getFoursquareImage = (venueID, maxWidth) => {
		/*
		Requests and image form venueID at a certain width.
		When found, it returns an URL for that image.
		*/
		return fetch(`https://api.foursquare.com/v2/venues/${venueID}/photos?client_id=${apiKeys.foursquareClient}&client_secret=${apiKeys.foursquareSecret}&v=${apiKeys.foursquareVersion}&limit=1`)
		//`https://api.foursquare.com/v2/venues/search?client_id=${this.fsApiCfg.id}&client_secret=${this.fsApiCfg.secret}&v=${this.fsApiCfg.versionDate}&ll=${lat},${lng}&limit=1&query=${query}`

			.then(result => result.json())
			.then(json => {
				const newImage = json.response.photos.items[0];
				const imageString = `${newImage.prefix}width${maxWidth}${
					newImage.suffix
				}`;
				return imageString;
			})
			.catch(error => {
				console.error(error);
				return `https://dummyimage.com/150x150/000000/FFF&text=Image+not+found.`;
			});
	};

	updateSearchKey = searchTerm => {
		/* Simply updates the search state for components to read. */
		this.setState({
			searchKey: searchTerm
		});
	};

	getFilteredLocations = () => {
		/*
		Take text written in the search box and automatically filter locations by name.
		It ignores any input outside of alphanumeric characters.
		If search box is blank it displays the full list.
		*/
		let filteredLocations;
		if (
			typeof this.state.searchKey === 'string' &&
			this.state.searchKey !== ''
		) {
			filteredLocations = this.state.locations.filter(string =>
				string.name
					.toLowerCase()
					.replace(/[^0-9a-z]/gi, '')
					.includes(
						this.state.searchKey.toLowerCase().replace(/[^0-9a-z]/gi, '')
					)
			);
		} else {
			filteredLocations = this.state.locations;
		}
		return filteredLocations;
	};

	menuLocationClick = markerName => {
		/*
		When a menu item is clicked, center the map on it, reveal it's info box,
		and animate it on the map to make it easier to see. After a set amount
		of time, disable the animation.
		*/

		//Find the marker in the marker array.
		const theMarker = this.state.markerArray.find(
			marker => marker.title === markerName
		);

		// Center the map view on it's position.
		const markerPosition = theMarker.getPosition();
		this.state.map[0].setCenter(markerPosition);

		// Close all infoWindows except the selected marker.
		this.state.markerInfoArray.forEach((markerInfo, index) =>
			this.state.markerInfoArray[index].close()
		);
		this.state.markerInfoArray[this.state.markerArray.indexOf(theMarker)].open(
			this.state.map[0],
			theMarker
		);

		// Animate the marker and set the timeout to be disabled.
		theMarker.setAnimation(window.google.maps.Animation.BOUNCE);
		setTimeout(() => {
			theMarker.setAnimation(null);
		}, 1500);
	};

	render() {
		return (
			<Fragment>
				<div id="header">
					<h1>
						<span role="img" aria-label="Noodles">
							🍜
						</span>
						Ybor Eats
						<span role="img" aria-label="Noodles">
							🍜
						</span>
					</h1>
				</div>
				<Menu
					locations={this.getFilteredLocations}
					updateSearchKey={this.updateSearchKey}
					menuLocationClick={this.menuLocationClick}
				/>
				<Map
					locations={this.getFilteredLocations}
					map={this.state.map}
					markerArray={this.state.markerArray}
					markerInfoArray={this.state.markerInfoArray}
				/>
				<div id="footer">
					<p className="notice">
						All information here is presented as opinion only. It just happens
						that it is the right opinion.
					</p>
				</div>
			</Fragment>
		);
	}
}

export default App;