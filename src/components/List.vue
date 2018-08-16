<template>
<div>
	<h3>List</h3>

	<table class="pure-table pure-table-bordered">
		<thead><tr>
			<th>title</th>
			<th>authors</th>
			<th>pages</th>
			<th>year</th>
			<th>image</th>
			<th></th>
		</tr></thead>

		<tbody>
			<tr v-for="book in books">
				<td><router-link title="Edit" :to="`/edit/${ book.id }`">{{ book.title }}</router-link></td>
				<td>{{ previewAuthors(book.authors) }}</td>
				<td>{{ book.pagesCount }}</td>
				<td>{{ book.pubYear }}</td>
				<td>
					<span class="hand"
						  @mouseenter="currentImage=book.image"
						  @mouseleave="currentImage=''"
						>{{ book.image ? 'show image' : ''}}</span> </td>
				<td>
					<button class="button" @click.prevent="removeBook(book.id)" title="remove item"> remove </button>
				</td>
			</tr>
		</tbody>
	</table>
	<div class="previewImage" v-if="currentImage">
		<img :src="currentImage" title="Image Preview">
	</div>
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
			msg: 'title',
			currentImage: ''
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
		...mapMutations([
			'removeBook'
		]),
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

<style scoped>
	.hand {
		cursor: pointer;
	}
	.previewImage {
		padding: 30px;
	}
	.previewImage img {
		height: 300px;
	}
</style>