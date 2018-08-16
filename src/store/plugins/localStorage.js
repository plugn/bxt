const defStoragePrefix = 'bxt';

export const localStoragePlugin = (prefix = defStoragePrefix) => store => {
	// called when the store is initialized
	store.subscribe((mutation, {reports, ...persistant}) => {
		// called after every mutation.
		// The mutation comes in the format of `{ type, payload }`.

		// no need to handle validation reports
		if (/^updateReport|resetReport$/.test(mutation.type)) { return; }

		const storageDump = JSON.stringify( persistant );

		window.localStorage.setItem(prefix, storageDump);
	})
};

export const stateResolver = (prefix = defStoragePrefix, initialState) => {
	const storageDump = window.localStorage.getItem(prefix);
	if (storageDump === null) {
		return initialState;
	}

	try {
		const state = JSON.parse( storageDump );
		return {...state, reports: {}};

	} catch (e) {
		console.log(' (!) store/plugins/localStorage : stateResolver()\n JSON.parse() stage error: ', e.message);

		return initialState;
	}
}
