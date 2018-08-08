/**
 *
 * @param str
 * @returns String[]
 */
export const ISBN10 = {
	/**
	 * splits ISBN10 string into chunks
	 * @param str
	 * @returns {string[]}
	 */
	parse(str) {
		let list = String(str).split(''),
			count = list.length;

		if (! [9, 10].includes(Number(count))) { throw new Error(' (!) ISBN10::parse() chunks count !== 10'); }


		return list;
	},

	replaceX(lastItem) {
		return lastItem.toLowerCase() === 'x' ? '10' : lastItem;
	},

	calcCheckDigit(parsedList) {
		// work with a clone to avoid side-effects
		let list = [].concat(parsedList),
			givenCheckDigit = '';

		if (list.length === 10) {
			givenCheckDigit = list.pop();
		}

		if (list.length !== 9) {
			throw new Error(' (!) calcCheckDigit() ILLEGAL list.length: ' + list.length);
		}

		const reducer = (acc, chunk, index) => {
			acc += (10 - index) * Number(chunk);
			return acc;
		};

		return  list.reduce(reducer, 0)


	}
};

