import _ from 'lodash';
import {ISBN} from './isbn';

const validateStringProp = (obj, propName, maxLength) => {
	const prop = _.get(obj, propName, '');
	return prop && prop.length && prop.length <= maxLength;
};

export const BookFields = [
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
			if (!Array.isArray(val) || val.length > 0) return false;

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
			return 'number' === typeof val && val <= 10000;
		}
	},
	{
		name: 'publisher',
		required: false,
		validate(val) {
			return (typeof val === 'string') && (val.length <= 30)
		}
	},
	{
		name: 'ISBN',
		required: false,
		validate(val) {
			return ISBN.validate(val);
		}
	}

];
