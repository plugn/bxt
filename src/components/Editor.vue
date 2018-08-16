<template>
<div>
	<h4>{{ bookId ? 'Edit ' + bookModel.title : 'Create new book' }}</h4>
	<form class="pure-form pure-form-aligned"><fieldset>
		<PureInput label="Title"
			:value="bookModel.title"
			:scheme="schemeByName.title"
		></PureInput>

		<AuthorsField label="Authors"
			:value="bookModel.authors"
			:scheme="schemeByName.authors"
		></AuthorsField>

		<PureInput label="Year"
			:value="bookModel.pubYear"
			:scheme="schemeByName.pubYear"
		></PureInput>

		<PureInput label="Pages"
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
			<button type="button"
				class="pure-button pure-button-primary"
				:disabled="!isFormDataValid"

			>Submit</button>
		</div>
	</fieldset></form>
</div>
</template>

<script>
import {mapGetters, mapState, mapMutations} from 'vuex';
import PureInput from './form/PureInput';
import PureDateInput from './form/PureDateInput';
import AuthorsField from './AuthorsField';
import { BookScheme, dateInputParams } from "@/util/scheme";
import { schemeByName, requiredFieldNames, emptyModel } from "@/util/helpers";
import { _debounce } from 'lodash/debounce';
import { _pick } from 'lodash/pick';

export default {
	name: 'Editor',
	components: {
		PureInput,
		PureDateInput,
		AuthorsField
	},
	data() {
		return {
			dateInputParams,
			schemeByName
		}
	},
	created() {
	},
	mounted() {
		this.resetReport(this.bookModel);
		console.log(' * requiredFieldNames: ', requiredFieldNames);

		this.$watch('reports', this.reportsWatcher, {deep: true});
	},
	computed: {
		// результаты работы mapState будут добавлены в уже существующий объект
		...mapState([
			'reports'
		]),
		...mapGetters([
			'getBook',
			'getReportsAsList'
		]),
		bookId() {
			return Number(this.$route.params.id);
		},
		bookModel() {
			return this.bookId ? this.getBook(this.bookId) : {...emptyModel};
		},
		isFormDataValid() {
			return this.getReportsAsList.every( v => v.valid );
		},
		formValues() {
			return this.getReportsAsList.reduce((acc, item) => {
				acc[item.name] = item.value;
				return acc;
			}, {});
		}
	},
	methods: {
		...mapMutations([
			'resetReport'
		]),

		// TODO: remove watcher
		reportsWatcher() {
			console.log(' * this.formValues : ', this.formValues);
			
		}
	}

};
</script>

<style scoped>

</style>
