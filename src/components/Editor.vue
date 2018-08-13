<template>
<div>
	<h4>{{ bookId ? 'Edit ' + bookModel.title : 'Create book' }}</h4>
	<form class="pure-form pure-form-aligned"><fieldset>
		<PureInput label="Title"
			:value="bookModel.title"
			:scheme="schemeByName.title"
		></PureInput>

		<PureInput label="Year"
			:value="bookModel.pubYear"
			:scheme="schemeByName.pubYear"
		></PureInput>

		<PureInput label="Pages Count"
			:value="bookModel.pagesCount"
			:scheme="schemeByName.pagesCount"
		></PureInput>

		<PureInput label="Publisher"
			:value="bookModel.publisher"
			:scheme="schemeByName.publisher"
		></PureInput>

		<PureDateInput label="Release Date"
			:value="bookModel.releaseDate"
			:scheme="schemeByName.releaseDate"
			:min="dateInputParams.min"
			:max="dateInputParams.max"
		></PureDateInput>

		<PureInput label="ISBN"
			:value="bookModel.ISBN"
			:scheme="schemeByName.ISBN"
		></PureInput>

		<div class="pure-controls">
<!--
			<label for="cb" class="pure-checkbox">
				<input id="cb" type="checkbox"> I've read the terms and conditions
			</label>
-->

			<button type="submit" class="pure-button pure-button-primary">Submit</button>
		</div>
	</fieldset></form>
</div>
</template>

<script>
import {mapGetters} from 'vuex';
import PureInput from './form/PureInput';
import PureDateInput from './form/PureDateInput';
import { BookScheme, dateInputParams } from "@/util/scheme";

const schemeByName = BookScheme.reduce((acc, v) => {
		acc[v.name] = v;
		return acc
	}, {});

export default {
	name: 'Editor',
	components: {
		PureInput,
		PureDateInput
	},
	data() {
		return {
			dateInputParams,
			schemeByName
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
			return this.bookId && this.getBook(this.bookId) || {};
		}
	}


};
</script>

<style scoped>

</style>
