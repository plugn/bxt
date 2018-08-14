export default {
	getReports: state => state.reports,
	getReport: state => name => state.reports[name],
	getBooks: state => state.books,
	getBook: state => id => state.books.find(book => book.id === id)
};
