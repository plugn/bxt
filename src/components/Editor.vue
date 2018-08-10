<template>
<div>
	<h4>{{ bookId ? 'Edit ' + bookModel.title : 'Create book' }}</h4>
	<form class="pure-form pure-form-aligned"><fieldset>
		<PureInput label="Title" :value="bookModel.title" required ></PureInput>

		<PureInput label="Year" :value="bookModel.pubYear" required ></PureInput>

		<PureInput label="Pages Count" :value="bookModel.pagesCount" ></PureInput>

		<PureInput label="Publisher" :value="bookModel.publisher"></PureInput>

		<PureDateInput label="Release Date" :value="bookModel.releaseDate"></PureDateInput>

		<div class="pure-controls">
			<label for="cb" class="pure-checkbox">
				<input id="cb" type="checkbox"> I've read the terms and conditions
			</label>

			<button type="submit" class="pure-button pure-button-primary">Submit</button>
		</div>
	</fieldset></form>
</div>
</template>

<script>
	import {mapGetters} from 'vuex';
	import PureInput from './form/PureInput';
	import PureDateInput from './form/PureDateInput';
	import { BookScheme } from "@/util/scheme";

	export default {
		name: 'Editor',
		components: {
			PureInput,
			PureDateInput
		},
		data() {
			return {
				releaseDate: null
			}
		},
		computed: {
			...mapGetters([
				'getBook'
			]),
			bookId() {
				return Number(this.$route.params.id);
			},
			bookModel() {
				console.log(' * getter this.bookId: ', this.bookId);
				return this.bookId && this.getBook(this.bookId) || {};
			},


		},
		methods: {
			getReleaseDate() {
				const releaseDate = BookScheme.find(field => field.name === 'releaseDate');
				if (releaseDate) {
					console.log(' * releaseDate.inputAttrs : ', releaseDate.inputAttrs);
				}

				return releaseDate;
			}
		},
		mounted() {
			this.releaseDate = this.getReleaseDate()
		}


	};
</script>

<style scoped>

</style>
