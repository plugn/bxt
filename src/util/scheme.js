import _get from 'lodash/get';
import {ISBN} from './isbn';

export function validateStringProp (obj, propName, maxLength) {
	const prop = _get(obj, propName, '').trim();
	return Boolean(prop.length && prop.length <= maxLength);
}

export function validateAuthor(author) {
	if (!(typeof author === 'object' && author)) return false;

	const isOkFirst = validateStringProp(author, 'firstName', 20);
	const isOkLast = validateStringProp(author, 'lastName', 20);
	return isOkFirst && isOkLast;
}

const NOW = new Date();
const MIN_RELEASE_DATE = new Date('1800-01-01');

export const buildDateString = date => (
	[
		date.getFullYear(),
		String(date.getMonth() + 1).padStart(2, '0'),
		String(date.getDate()).padStart(2, '0')
	].join('-')
);

export const dateInputParams = {
	min: buildDateString(MIN_RELEASE_DATE),
	max: buildDateString(NOW)
};

export const BookScheme = [
	{
		name: 'title',
		required: true,
		type: String,
		validate(val) {
			val = String(val).trim();
			return val.length > 0 && val.length <= 30;
		}
	},
	{
		name: 'authors',
		type: Array,
		required: true,
		validate(val) {
			if (!Array.isArray(val) || !val.length) return false;
			return val.every(validateAuthor);
		}
	},
	{
		name: 'pagesCount',
		type: Number,
		required: true,
		validate(val) {
			return 'number' === typeof val && val > 0 && val <= 10000;
		}
	},
	{
		name: 'publisher',
		type: String,
		required: false,
// TODO: NON REQIURED validation could be empty!
// NOTE type(validate(val)) -> validate(val)
		validate(val) {
			val = String(val).trim();
			return val.length <= 30
		}
	},
	{
		name: 'pubYear',
		type: Number,
		required: false,
		validate(val) {
			return (typeof val === 'number') && val >= 1800 && val <= Number(NOW.getFullYear());
		}
	},
	{
		name: 'releaseDate',
		type: String,
		required: false,
		validate(val) {
			const date = new Date( String(val).trim() );
			return (date >= MIN_RELEASE_DATE && date < NOW);
		}
	},
	{
		name: 'ISBN',
		type: String,
		required: false,
		validate(val) {
			val = String(val).trim();
			return ISBN.validate(val);
		}
	},
	{
		name: 'image',
		type: String,
		required: false,
		validate(val) {
			return typeof val === 'string';
		}
	}

];
