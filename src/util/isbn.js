import Loop from './Loop';

/**
 *
 * @param str
 * @returns String[]
 */
export const ISBN = {
	/**
	 * splits ISBN10 string into chunks
	 * @param str
	 * @returns {string[]}
	 */
	parse(str) {
		return String(str).replace(/^ISBN|[\s:-]+/gi, '').split('');
	},

	calcCheckDigit10(list) {
		const reducer = (acc, chunk, index) => {
			acc += (10 - index) * Number(chunk);

			return acc;
		};
		const sum = list.reduce(reducer, 0);
		const remain = 11 - (sum % 11);
		
		return remain === 10 ? 'X' : String(remain);
	},

	calcCheckDigit13(list) {
		const rates = [1, 3];
		const loop = new Loop(rates.length);

		const reducer = (acc, chunk) => {
			const rate = rates[ loop.getNextIndex() ];
			acc += (rate * Number(chunk));

			return acc;
		};

		const sum = list.reduce(reducer, 0);
		const remain = 10 - (sum % 10);

		return String(remain);
	},
	
	validate(str) {
		const chunks = this.parse(str);
		if (! [10, 13].includes(chunks.length)) {
			return false;
		}
		const isType10 = chunks.length === 10;
		const givenCheckDigit = chunks.pop();
		const checkDigit = isType10
			? this.calcCheckDigit10(chunks)
			: this.calcCheckDigit13(chunks);

		return givenCheckDigit.toUpperCase() === checkDigit;
	}
	
};

