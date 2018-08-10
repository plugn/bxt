<template>
<div>
	<h3>List</h3>

	<table class="pure-table pure-table-bordered">
		<thead><tr>
			<th>title</th>
			<th>authors</th>
			<th>pages</th>
			<th>published</th>
			<th>image</th>
		</tr></thead>

		<tbody>
			<tr v-for="book in books">
				<td>{{ book.title }}</td>
				<td>{{ previewAuthors(book.authors) }}</td>
				<td>{{ book.pagesCount }}</td>
				<td>{{ book.pubYear }}</td>
				<td> - </td>
			</tr>
		</tbody>
	</table>
</div>

</template>

<script>
import {mapState, mapGetters, mapMutations} from 'vuex'

export default {
	name: 'List',
	components: {
	},
	data () {
		return {
			msg: 'title'
		}
	},
	computed: {
		...mapState([
			'books'
		])
		// ...mapGetters([
		// ])
	},
	methods: {
		previewAuthors(authors) {
			return !authors.length
				? 'Unknown'
				: authors.map(
				({firstName, lastName}) => ([firstName, lastName].join(' '))
			).join(', ');
		}
	}
};
</script>
