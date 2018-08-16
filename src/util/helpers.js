import { BookScheme, dateInputParams } from "@/util/scheme";

export const schemeByName = BookScheme.reduce((acc, v) => {
	acc[v.name] = v;
	return acc
}, {});

export const requiredFieldNames = BookScheme.filter( v => v.required ).map( v => v.name );

export const emptyModel = {
	// id: -1,
	title: '',
	authors: [],
	pagesCount: '',
	publisher: '',
	pubYear: '',
	releaseDate: '',
	ISBN: '',
	image: ''
};