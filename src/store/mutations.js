// import _uniqueId from 'lodash/uniqueId'
import _findIndex from 'lodash/findIndex'
import {defaultReports} from './reports';

export default {
	updateListSorting(state, {name, direction}) {
		state.settings.orderBy = {name, direction};
	},

	updateReport(state, {name, ...report}) {
		const data = state.reports[name];
		state.reports[name] = {...data, ...report};
	},

	resetReport(state, model) {
		state.reports = {...defaultReports(model)};
	},

	addBook(state, payload) {
		// const bookId = _uniqueId('book_');
		const bookIds = state.books.map(({id}) => id);
		const bookId = Math.max(...bookIds) + 1;
		const newBook = {...payload, id: bookId};

		console.log('addBook()', newBook);

		state.books.push(newBook);
	},

	updateBook(state, {id, ...payload}) {
		const bookIndex = _findIndex(state.books, {id});
		if (bookIndex !== -1) {
			// avoid losing `id`
			state.books.splice(bookIndex, 1, {...payload, id})
		}
	},

	removeBook(state, id) {
		const bookIndex = _findIndex(state.books, {id});
		if (bookIndex !== -1) {
			state.books.splice(bookIndex, 1);
		}
	}
};
