<template>
<div>
	<h4>{{ bookId ? 'Edit ' + bookModel.title : 'Create new book' }}</h4>
	<form class="pure-form pure-form-aligned"><fieldset>
		<PureInput label="Title"
			:value="bookModel.title"
			:scheme="schemeByName.title"
			@validated="onFieldValidated"
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
			<button type="submit" class="pure-button pure-button-primary">Submit</button>
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
import { _debounce } from 'lodash/debounce';
import { _pick } from 'lodash/pick';

// TODO move to helpers :
const schemeByName = BookScheme.reduce((acc, v) => {
		acc[v.name] = v;
		return acc
	}, {});

const requiredFieldNames = BookScheme.filter( v => v.required ).map( v => v.name );

const emptyModel = {
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
// EOF

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
			schemeByName,
			canSave: false,
			merged: {}
		}
	},
	created() {
		this.resetReport();
	},
	mounted() {
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
		}
	},
	methods: {
		...mapMutations([
			'resetReport'
		]),

		reportsWatcher() {
			const changed = this.getReportsAsList.filter(v => 'undefined' !== typeof v.value);
			const changedNames = changed.map( v => v.name );
			const changesValid = changed.every( v => v.valid );
			// const changedMixin = _pick(this.reports, changedNames)
			// console.log(' * changedMixin: ', changedMixin);

			console.log(' * changed reports: ', changedNames, 'valid: ', changesValid);
			


			// TODO:
			// check whether all changes are valid

			// merge initial model and changes
			// this.merged = {...this.bookModel, ...changedMixin};

			// check required fields are filled
			

		},
		onFieldValidated(payload) {
			console.log(' * fieldValidated() payload ', payload);
		}
	}


};
</script>

<style scoped>

</style>
