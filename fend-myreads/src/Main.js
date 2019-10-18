import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Shelf from './Shelf';

class Main extends Component {
	componentDidMount() {
		this.props.bookLoad();
	}

	render() {
		return (
			<div>
				<div className="list-books" />
				<div className="list-books-title">
					<h1>MyReads</h1>
				</div>
				<div className="list-books-content">
					{/*
					Go through each shelf option and send only those books per shelf.
					header: name of the shelf
					books: applicable books for that shelf
					changeShelf: passes changeShelf method
					key: react shelf key
					*/
					Object.keys(this.props.shelfOrder).map(shelf => (
						<Shelf
							header={this.props.shelfOrder[shelf]}
							books={this.props.books.filter(book => book.shelf === shelf)}
							changeShelf={this.props.changeShelf}
							checkShelf={this.props.checkShelf}
							key={shelf}
						/>
					))}
				</div>
				<div className="open-search">
					<Link to="/search">Add a book</Link>
				</div>
			</div>
		);
	}
}

export default Main;
