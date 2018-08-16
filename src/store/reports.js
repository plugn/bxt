import { BookScheme } from "@/util/scheme";
import { emptyModel} from "@/util/helpers";

export const defaultReports = model => BookScheme.reduce((acc, field) => {
	const modelValue = model[field.name];
	const value = typeof modelValue === 'undefined'
		? (Array.isArray(field.type) ? [] : '')
		: modelValue;
	const valid = field.validate(value);

	acc[field.name] = {
		required: field.required,
		value,
		valid
	};

	return acc;
}, {});
