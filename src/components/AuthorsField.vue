<template>
<div>
	<div class="pure-control-group" v-for="(author, index) in value">
		<label v-if="index===0">{{ label }}<span v-if="scheme.required" class="label-required"> * </span></label>
		<label v-else>&nbsp;</label>

		<input type="text" placeholder="First Name" :value="author.firstName" >
		<input type="text" placeholder="Last Name" :value="author.lastName" >
	</div>
	<div class="pure-control-group" v-if="isListFilled">
		<label for="newInput">(fill to add)&nbsp;</label>

		<input id="newInput" type="text" placeholder="First Name" :value="newAuthor.firstName" >
		<input type="text" placeholder="Last Name" :value="newAuthor.lastName" >
	</div>

</div>

</template>

<script>
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
			newAuthor: {
				firstName: '',
				lastName: ''
			}
		}
	},

	computed: {
		isListFilled() {
			return this.isFieldValid(this.value);
		}
	},
	mounted() {
		console.log(' *  AuthorsField', this.value);
	},
	methods: {
		isFieldValid(value) {
			return value.every(({firstName, lastName}) => (String(firstName).trim() && String(lastName).trim()) )
		}
	},
	watch: {

	}
};
</script>

<style scoped>
@import './form/field.css';
</style>