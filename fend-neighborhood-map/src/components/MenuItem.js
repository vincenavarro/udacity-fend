import React, { Component } from 'react';

class MenuItem extends Component {
	// Simple menuitem component just displays props and allows user to click on an item.
	render() {
		return (
			<div className="location" tabIndex="0" role="menuitem" aria-label={this.props.name} onClick={() => this.props.menuLocationClick(this.props.name)}			>
				<h2>{this.props.name}</h2>
				<address>{this.props.address}</address>
				<figure>
				<img
					src={this.props.image}
					alt={`${this.props.name}` /* Unfortunately a better image description is not provided by Foursquare. */}
					className="photo"
				/>

				<figcaption>Image provided by Foursquare.</figcaption>
				</figure>
			</div>
		);
	}
}

export default MenuItem;
