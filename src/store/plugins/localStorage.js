// TODO: add localStorage prefix as parameter
export const localStorage = store => {
	// called when the store is initialized
	store.subscribe((mutation, state) => {
		// called after every mutation.
		// The mutation comes in the format of `{ type, payload }`.
		console.log(' * localStoragePlugin: ' + mutation.type + ' : ' , mutation.payload);

	})
};

export default localStorage;
