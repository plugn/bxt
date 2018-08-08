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
		let list = String(str).replace(/^ISBN|[\s-:]+/gi, '').split(''),
			count = list.length;

		if (! [9, 10].includes(Number(count))) { throw new Error(' (!) ISBN10::parse() chunks count !== 10'); }


		return list;
	},

	calcCheckDigit(list) {
		const reducer = (acc, chunk, index) => {
			acc += (10 - index) * Number(chunk);
			return acc;
		};
		const sum = list.reduce(reducer, 0);
		const remain = 11 - (sum % 11);
		
		return remain === 10 ? 'x' : String(remain);
	},
	
	validate(str) {
		try {
			const chunks = this.parse(str);
			// console.log(' * validate() chunks: ', chunks);
			if (chunks.length !== 10) {
				return false;
			}

			const givenCheckDigit = chunks.pop();
			const checkDigit = this.calcCheckDigit(chunks);

			return givenCheckDigit.toLowerCase() === checkDigit;

		} catch (e) {
			console.warn(' (!) ISBN10::validate(' + str + ') failed: ' + e.message);

			return false;
		}


	}
	
};

