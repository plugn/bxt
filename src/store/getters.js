export default {
	getOrderBy: state => state.settings.orderBy,
	getReport: state => name => state.reports[name],
	getReportsAsList: state => Object.keys(state.reports).map(name => ({...state.reports[name], name})),
	getBook: state => id => state.books.find(book => book.id === id)
};
