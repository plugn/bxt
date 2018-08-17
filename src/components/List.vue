<template>
<div>
	<h3>List of Books</h3>

	<table class="pure-table pure-table-bordered">
		<thead><tr>
			<th>title
				<SortArrow :current="isCurrentSorting('title')" name="title"
						:direction="getArrowDirection('title')" @changed="sortList"></SortArrow>
			</th>
			<th>authors</th>
			<th>pages</th>
			<th>year
				<SortArrow :current="isCurrentSorting('pubYear')" name="pubYear"
						:direction="getArrowDirection('pubYear')" @changed="sortList"></SortArrow>
			</th>
			<th>image</th>
			<th></th>
		</tr></thead>

		<tbody>
			<tr v-for="book in sortedBooks">
				<td><router-link title="Edit" :to="`/edit/${ book.id }`">{{ book.title }}</router-link></td>
				<td>{{ previewAuthors(book.authors) }}</td>
				<td>{{ book.pagesCount }}</td>
				<td>{{ book.pubYear }}</td>
				<td>
					<span v-if="book.image" class="hand"
						  @mouseenter="currentImage=book.image"
						  @mouseleave="currentImage=''"
						>show image</span></td>
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
import SortArrow from './SortArrow'
import _orderBy from 'lodash/orderBy'

export default {
	name: 'List',
	components: {
		SortArrow
	},
	data () {
		return {
			currentImage: ''
		}
	},
	computed: {
		...mapState([
			'books',
		]),
		...mapGetters([
			'getOrderBy'
		]),
		sortedBooks() {
			let list = this.books.slice();
			const sortConf = this.getOrderBy;

			return _orderBy(list, [sortConf.name], [sortConf.direction.toLowerCase()])
		}
	},
	methods: {
		...mapMutations([
			'removeBook',
			'updateListSorting'
		]),
		previewAuthors(authors) {
			return !authors.length
				? 'Unknown'
				: authors.map(
				({firstName, lastName}) => ([firstName, lastName].join(' '))
			).join(', ');
		},
		sortList(val) {
			this.updateListSorting(val);
		},
		isCurrentSorting(name) {
			return this.getOrderBy.name === name;
		},
		getArrowDirection(name) {
			return this.isCurrentSorting(name) ? this.getOrderBy.direction : '';
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