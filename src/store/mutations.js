import _uniqueId from 'lodash/uniqueId'
import _findIndex from 'lodash/findIndex'

export default {
	updateReport(state, {name, ...report}) {
		const data = state.reports[name];
		state.reports[name] = {...data, ...report};
	},

	addBook(state, payload) {
		const bookId = _uniqueId('book_');
		state.books.push({...payload, id: bookId});
	},

	updateBook(state, {id, payload}) {
		const bookIndex = _findIndex(state.books, {id});
		if (bookIndex !== -1) {
			// avoid losing `id`
			state.books[bookIndex] = {...payload, id};
		}
	},

	removeBook(state, id) {
		const bookIndex = _findIndex(state.books, {id});
		if (bookIndex !== -1) {
			state.books.splice(bookIndex, 1);
		}
	}
};
