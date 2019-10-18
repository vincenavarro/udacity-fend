import React, { Component } from 'react';

class Book extends Component {
	getThumb = () => {
		let thumbLoc = this.props.book.imageLinks;
		return thumbLoc
			? thumbLoc.thumbnail
			: 'http://www.utoledo.edu/engineering/ecore/images/blank%20photo%20of%20head.jpg';
	};

	render() {
		return (
			<div className="book">
				<div className="book-top">
					<div
						className="book-cover"
						style={{
							width: 128,
							height: 193,
							backgroundImage: `url("${this.getThumb()}")`
						}}
					/>
					<div className="book-shelf-changer">
						<select
							onChange={event =>
								this.props.changeShelf(this.props.book, event.target.value)
							}
							value={this.props.checkShelf(this.props.book)}
						>
							<option value="move" disabled>
								Move to...
							</option>
							<option value="currentlyReading">Currently Reading</option>
							<option value="wantToRead">Want to Read</option>
							<option value="read">Read</option>
							<option value="none">None</option>
						</select>
					</div>
				</div>
				<div className="book-title">{this.props.book.title}</div>
				<div className="book-authors">{this.props.book.authors}</div>
			</div>
		);
	}
}

export default Book;
