<template>
<div>
	<div class="pure-control-group" v-for="(author, index) in userValue">
		<label v-if="index===0">{{ label }}<span v-if="scheme.required" class="label-required"> * </span></label>
		<label v-else>&nbsp;</label>

		<input type="text" placeholder="First Name" :value="author.firstName" >
		<input type="text" placeholder="Last Name" :value="author.lastName" >

		<span v-if="index===0" class="pure-form-message-inline">
			<button @click.prevent="addField"> + </button>
			<button @click.prevent="removeField"> - </button>
		</span>
	</div>
	<div class="pure-control-group" v-if="isListFilled">
		<label for="newInput">(fill to add)</label>

		<input id="newInput" type="text" placeholder="First Name" v-model="newAuthor.firstName" >
		<input type="text" placeholder="Last Name" v-model="newAuthor.lastName" >
	</div>

</div>

</template>

<script>
import _debounce from 'lodash/debounce';
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
			innerValue: undefined,
			newAuthor: {...emptyAuthor}
		}
	},

	computed: {
		userValue: {
			get: function() { return this.innerValue || [...this.value]; },
			set: function(newValue) {
				console.log(' * userValue newValue : ', newValue);
				this.innerValue = newValue;
			}
		},
		isListFilled() {
			return this.isListValid(this.value);
		}
	},
	mounted() {
		console.log(' *  AuthorsField', this.value);

		this.$watch('newAuthor', _debounce(this.authorWatcher, 1000), {
			deep: true
		});


	},
	methods: {
		authorWatcher(author) {
			console.log(' * newAuthor author : ', JSON.stringify(author) );
			const filled = this.isListValid([author]);
			console.log(' * filled: ', filled);
			if (filled) {
				console.log('push to ', this.userValue);

				this.userValue.push({...author});

				console.log(' * this.userValue : ', this.userValue);

				this.newAuthor = {...emptyAuthor};
			}
		},

		isListValid(value) {
			return value.every(({firstName, lastName}) => (String(firstName).trim() && String(lastName).trim()) )
		},
		addField() {
			console.log(' * addField() ');
		},
		removeField() {
			console.log(' * removeField() ');
			this.userValue.splice(-1, 1);
		}
	}
};
</script>

<style scoped>
@import './form/field.css';
</style>
