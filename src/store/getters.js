export default {
	getBooks: state => state.books,
	getBook: state => id => state.books.find(book => book.id === id)
};
