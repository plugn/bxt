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

export const BookScheme = [
	{
		name: 'title',
		required: true,
		validate(val) {
			return 'string' === typeof val &&
				val.length > 0 &&
				val.length <= 30;
		}
	},
	{
		name: 'authors',
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
		required: false,
		validate(val) {
			return 'number' === typeof val && val > 0 && val <= 10000;
		}
	},
	{
		name: 'publisher',
		required: false,
		validate(val) {
			return (typeof val === 'string') && val.length && val.length <= 30
		}
	},
	{
		name: 'pubYear',
		required: false,
		validate(val) {
			return (typeof val === 'number') && val >= 1800 && val < Number(NOW.getFullYear());
		}
	},
	{
		name: 'releaseDate',
		required: false,
		inputAttrs: {
			min: buildDateString(MIN_RELEASE_DATE),
			max: buildDateString(NOW)
		},
		validate(val) {
			return (typeof val === 'number') && (val >= Number(MIN_RELEASE_DATE));
		}
	},
	{
		name: 'ISBN',
		required: false,
		validate(val) {
			return ISBN.validate(val);
		}
	},
	{
		name: 'image',
		required: false,
		validate(val) {
			return typeof val === 'string';
		}
	}

];
