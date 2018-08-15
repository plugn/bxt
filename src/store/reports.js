import { BookScheme } from "@/util/scheme";

export const emptyReport = {
	valid: true,
	value: undefined,
	required: false
};

// console.log(' * report BookScheme: ', BookScheme);
export const defaultReports = BookScheme.reduce((acc, field) => {
	acc[field.name] = { ...emptyReport, required: field.required };
	return acc;
}, {});
