<template>
<div class="wrapper">
	<div class="pure-control-group" v-for="(author, index) in innerValue"
		 @mouseenter="hovered=index" @mouseleave="hovered=-1"
		 :class="{'failed-row': isRowFailed(index) }"
	>

		<label v-if="index===0">{{ label }}
			<span v-if="scheme.required" class="label-required"> * </span>
		</label>
		<label v-else>&nbsp;</label>

		<input type="text" placeholder="First Name"
		   :value="author.firstName"
		   @input="onItemInput('firstName', index, $event.target.value)"
		>
		<input type="text" placeholder="Last Name"
		   :value="author.lastName"
		   @input="onItemInput('lastName', index, $event.target.value)"
		>

		<span v-if="hovered===index" class="pure-form-message-inline">
			<button class="button" @click.prevent="removeField(index)" title="remove item"> - </button>
		</span>

	</div>
	<div class="pure-control-group">
		<label for="newInput">
			(fill to add)
		</label>

		<input id="newInput" type="text" placeholder="First Name" v-model="newAuthor.firstName" >
		<input type="text" placeholder="Last Name" v-model="newAuthor.lastName" >
	</div>

</div>

</template>

<script>
import {mapMutations, mapState, mapGetters} from 'vuex';
import _debounce from 'lodash/debounce';
import { BookScheme, validateAuthor } from "@/util/scheme";
const emptyAuthor = {firstName:'', lastName: ''};

export default {
	name: 'AuthorsField',
	props: {
		label: {
			type: String,
			default: 'Label'
		},
		scheme: {
			type: Object,
			default: () => {}
		},
		value: {
			type: [Array]
		}
	},

	data() {
		return {
			innerValue: [],
			newAuthor: {...emptyAuthor},
			hovered: -1,
			// list of item IDs failed validation
			failedItemIds:[]
		}
	},

	created() {
		this.innerValue = this.value.slice();
	},

	mounted() {
		this.$watch('newAuthor', _debounce(this.authorWatcher, 1000), {deep: true});
		this.$watch('innerValue', this.listWatcher);
	},

	methods: {
		...mapMutations([
			'updateReport'
		]),
		// watch for changes in authors list
		listWatcher(list) {
			// console.log(' * listWatcher() list: ', JSON.stringify(list));
			// collect failed IDs
			const report = list.map(validateAuthor);
			const failedIds = report.reduce((acc, result, index) => {
				if (!result) { acc.push(index); }
				return acc;
			}, []);

			// replace reactive list with new value
			this.failedItemIds.splice(0, this.failedItemIds.length, ...failedIds);

			// console.log(' * this.updateReport: ', this.updateReport);
			const newValue = list.slice();
			this.updateReport({
				name: this.scheme.name,
				// required: this.scheme.required,
				// faster way than scheme.validate()
				// valid: ! failedIds.length,
				valid: this.scheme.validate(newValue),
				value: newValue
			});

		},

		// add new author fields watcher
		authorWatcher(author) {
			if (validateAuthor(author)) {
				this.addField({...author});
				// console.log(' * this.innerValue : ', JSON.stringify(this.innerValue));

				this.newAuthor = {...emptyAuthor};
			}
		},

		// for setting HTML class
		isRowFailed(index) {
			return this.failedItemIds.includes(index);
		},

		onItemInput(key, index, value) {
			// console.log(' * onItemInput() : ', {key, index, value} );
			this.$set(this.innerValue, index, {...this.innerValue[index], [key]: value});
			// console.log(' * this.innerValue: ', JSON.stringify( this.innerValue) );
		},

		addField(author = {...emptyAuthor}) {
			this.innerValue.splice(this.innerValue.length, 0, author);
		},

		removeField(index) {
			// console.log(' * removeField() ', index);
			this.innerValue.splice(index, 1);
		}
	}
};
</script>

<style scoped>
@import './form/field.css';
.wrapper {
	background-color: azure;
}
.failed-row input {
	color: firebrick;
	background-color: rgba(178, 6, 29, 0.23);
}
</style>
