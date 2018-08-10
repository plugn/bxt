export const state = {
	books: [
		{
			id: 1,
			title: 'Tom Sawyer',
			authors: [{firstName:'Mark', lastName: 'Twain'}],
			pagesCount: 300,
			publisher: 'Hartford, Conn.',
			pubYear: 1876
		},
		{
			id: 2,
			title: 'Tarzan of the Apes',
			authors: [{firstName:'Edgar', lastName: 'Burroughs'}],
			pagesCount: 250,
			publisher: 'Hartford, Conn.',
			pubYear: 1876
		},
		{
			id: 3,
			title: 'Carrie',
			authors: [{firstName:'Stephen', lastName: 'King'}],
			pagesCount: 199,
			publisher: 'Doubleday',
			pubYear: 1974,
			ISBN: '0385086954'
		},
		{
			id: 4,
			title: 'Rage',
			authors: [{firstName:'Stephen', lastName: 'King'}],
			pagesCount: 211,
			publisher: 'Signet Books',
			pubYear: 1977,
			ISBN: '978-0-451-07645-8'
		},
		{
			id: 5,
			title: 'Roadwork',
			authors: [{firstName:'Stephen', lastName: 'King'}],
			pagesCount: 274,
			publisher: 'Signet Books',
			pubYear: 1981,
			ISBN: '978-0-451-09668-5'
		}
	]
};
