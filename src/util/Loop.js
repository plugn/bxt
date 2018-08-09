export default class Loop {
	constructor(length) {
		this.length = length;
		this.counter = 0;
	}

	getNextIndex() {
		return (this.counter = (this.counter + 1) % this.length);
	}
}