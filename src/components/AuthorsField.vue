<template>
<div class="wrapper">
	<div class="pure-control-group" v-for="(author, index) in userValue"
		 @mouseenter="hovered=index" @mouseleave="hovered=-1">

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
			remove
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
			hovered: -1,
			isTouched: false,
			innerValue: [],
			newAuthor: {...emptyAuthor}
		}
	},

	computed: {
		userValue() {
			return this.isTouched ? this.innerValue : this.value;
		}
	},
	mounted() {
		// console.log(' *  AuthorsField', this.value);
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
				this.addField({...author});
				console.log(' * this.innerValue : ', JSON.stringify(this.innerValue));

				this.newAuthor = {...emptyAuthor};
			}
		},

		isListValid(value) {
			return value.every(({firstName, lastName}) => (String(firstName).trim() && String(lastName).trim()) )
		},

		onItemInput(key, index, value) {
			console.log(' * onItemInput() : ', {key, index, value} );
			this.$set(this.innerValue, index, {...this.innerValue[index], [key]: value});
			console.log(' * this.innerValue: ', JSON.stringify( this.innerValue) );
		},

		addField(author = {...emptyAuthor}) {
			console.log(' * addField() ', author);
			let initial = [];
			if (!this.isTouched) {
				this.isTouched = true;
				initial = this.value;
			}
			this.innerValue.splice(this.innerValue.length, 0, ...initial, author);
		},
		removeField(index) {
			console.log(' * removeField() ', index);
			let initial = [];
			if (!this.isTouched) {
				this.isTouched = true;
				// make initial array unlinked from original prop
				initial = this.value.slice();
				// remove element by index
				initial.splice(index, 0);
				// mutate .innerValue via splice() to achieve reactivity
				this.innerValue.splice(this.innerValue.length, 0, ...initial)
			}
			else {
				this.innerValue.splice(index, 1);
			}
		}
	}
};
</script>

<style scoped>
@import './form/field.css';
.wrapper {
	background-color: azure;
}
</style>
