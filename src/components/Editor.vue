<template>
<div>
	<h4>{{ bookId ? 'Edit ' + bookModel.title : 'Create book' }}</h4>
	<form class="pure-form pure-form-aligned"><fieldset>
		<PureInput label="Title" :value="bookModel.title" required ></PureInput>

		<PureInput label="Year" :value="bookModel.pubYear" placeholder="1970" required ></PureInput>

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

	export default {
		name: 'Editor',
		components: {
			PureInput
		},
		data() {
			return {
				// book: null
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
			}

		},
		mounted() {
			console.log(' * this.$route.params : ', this.$route.params);
			console.log(' * this.bookModel: ', this.bookModel);
				// this.getBook(this.$route.params.id));

		}
	};
</script>

<style scoped>

</style>
