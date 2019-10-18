import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from './BooksAPI';

class Search extends Component {
	state = {
		bookResults: [],
		query: ''
	};

	searchQuery = query => {
		this.setState({ query: query });
		this.foundBooks(query);
	};

	foundBooks = query => {
		if (query) {
			BooksAPI.search(query).then(booksFound => {
				if (!booksFound.error) {
					this.setState({ bookResults: booksFound });
				} else {
					this.setState({ bookResults: [] });
				}
			});
		} else {
			this.setState({ bookResults: [] });
		}
	};

	render() {
		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link to="/" className="close-search">
						Close
					</Link>
					<div className="search-books-input-wrapper">
						<input
							type="text"
							placeholder="Search by title or author"
							value={this.state.query}
							onChange={event => this.searchQuery(event.target.value)}
						/>
					</div>
				</div>
				<div className="search-books-results">
					<ol className="books-grid">
						{this.state.bookResults.map(book => (
							<li key={book.id}>
								<Book
									book={book}
									checkShelf={this.props.checkShelf}
									changeShelf={this.props.changeShelf}
								/>
							</li>
						))}
					</ol>
				</div>
			</div>
		);
	}
}

export default Search;
