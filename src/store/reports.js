import { BookScheme } from "@/util/scheme";
import { emptyModel} from "@/util/helpers";

// console.log(' * report BookScheme: ', BookScheme);
export const defaultReports = model => BookScheme.reduce((acc, field) => {
	const value = model[field.name];
	const valid = field.validate(value);

	acc[field.name] = {
		required: field.required,
		value,
		valid
	};

	return acc;
}, {});
