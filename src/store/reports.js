import { BookScheme } from "@/util/scheme";
import { emptyModel} from "@/util/helpers";

export const emptyReport = {
	valid: true,
	value: undefined,
	required: false
};

// console.log(' * report BookScheme: ', BookScheme);
export const defaultReports = model => BookScheme.reduce((acc, field) => {
	acc[field.name] = {
		...emptyReport,
		required: field.required,
		value: model[field.name]
	};
	return acc;
}, {});
