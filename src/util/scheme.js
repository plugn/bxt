import _get from 'lodash/get';
import {ISBN} from './isbn';

const validateStringProp = (obj, propName, maxLength) => {
	const prop = _get(obj, propName, '');
	return prop && prop.length && prop.length <= maxLength;
};
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
			return 'string' === typeof val &&
				val.length > 0 &&
				val.length <= 30;
		}
	},
	{
		name: 'authors',
		type: Array,
		required: true,
		validate(val) {
			if (!Array.isArray(val) || !val.length) return false;

			return val.every(author => {
				const isOkFirst = validateStringProp(author, 'firstName', 20);
				const isOkLast = validateStringProp(author, 'lastName', 20);
				return isOkFirst && isOkLast;
			});
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
		validate(val) {
			return (typeof val === 'string') && val.length && val.length <= 30
		}
	},
	{
		name: 'pubYear',
		type: Number,
		required: false,
		validate(val) {
			return (typeof val === 'number') && val >= 1800 && val < Number(NOW.getFullYear());
		}
	},
	{
		name: 'releaseDate',
		type: String,
		required: false,
		validate(val) {
			return (new Date(val) >= MIN_RELEASE_DATE);
		}
	},
	{
		name: 'ISBN',
		type: String,
		required: false,
		validate(val) {
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
