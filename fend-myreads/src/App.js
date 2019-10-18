import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Search from './Search';
import Main from './Main';
import './App.css';

class BooksApp extends React.Component {
	state = {
		books: [],
		shelfOrder: {
			/*
			List of valid shelves, can be expanded to reorder later.
			*/
			currentlyReading: 'Currently Reading',
			wantToRead: 'Want to Read',
			read: 'Read'
		}
	};

	bookLoad = () => {
		/*
		Loads all books in array then refreshes UI
		*/
		BooksAPI.getAll().then(book => {
			this.setState({ books: book });
		});
	};

	changeShelf = (book, targetShelf) => {
		/*
    Allows book component to communicate with app.
    Be sure getAll waits for update to complete.
    */
		BooksAPI.update(book, targetShelf).then(() => this.bookLoad());
	};

	checkShelf = query => {
		/*
		Take any book and check if it has shelf or return none.
		Always check your shelf before your wreck your shelf.
		*/
		const foundBook = this.state.books.find(book => book.id === query.id);
		return foundBook ? foundBook.shelf : 'none';
	}

	render() {
		return (
			<div className="app">
				<Route
					exact path="/"
					render={() => (
						<Main
							bookLoad={this.bookLoad}
							changeShelf={this.changeShelf}
							checkShelf={this.checkShelf}
							shelfOrder={this.state.shelfOrder}
							books={this.state.books}
						/>
					)}
				/>

				<Route
					path="/search"
					render={() => (
					<Search
					changeShelf={this.changeShelf}
					checkShelf={this.checkShelf}
					books={this.state.books}
					/>
					)}
				/>
			</div>
		);
	}
}

export default BooksApp;
