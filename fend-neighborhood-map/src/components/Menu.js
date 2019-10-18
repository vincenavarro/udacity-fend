import React, { Component } from 'react';
import MenuItem from './MenuItem';

class Menu extends Component {
	// Simple menu component just passes along props.
	render() {
		return (
			<div id="menu">
				<h1>Search:</h1>
				<form role="search" aria-label="Filter Locations"
					onChange={event => {
						this.props.updateSearchKey(event.target.value);
					}}
				>
					<input
						type="text"
						className="search"
						ref={this.props.updateSearchKey}
						required
					/>
				</form>
				<div role="menu">
				{this.props.locations().map((location, index) => (
					<MenuItem
						key={index}
						menuLocationClick={this.props.menuLocationClick}
						{...location}
					/>
				))}
				</div>
			</div>
		);
	}
}

export default Menu;
