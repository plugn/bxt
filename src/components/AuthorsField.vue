<template>
<div>
	<div class="pure-control-group" v-for="(author, index) in value">
		<label v-if="index===0">{{ label }}<span v-if="scheme.required" class="label-required"> * </span></label>
		<label v-else>&nbsp;</label>

		<input type="text" placeholder="First Name" :value="author.firstName" >
		<input type="text" placeholder="Last Name" :value="author.lastName" >

		<span v-if="index===0" class="pure-form-message-inline"> <button> + </button> <button> - </button></span>
	</div>
	<div class="pure-control-group" v-if="isListFilled">
		<label for="newInput">(fill to add)&nbsp;</label>

		<input id="newInput" type="text" placeholder="First Name" v-model="newAuthor.firstName" >
		<input type="text" placeholder="Last Name" v-model="newAuthor.lastName" >
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
			return this.isListValid(this.value);
		}
	},
	mounted() {
		console.log(' *  AuthorsField', this.value);

		this.$watch('newAuthor', author => {
			console.log(' * newAuthor author : ', JSON.stringify(author) );
			const filled = this.isListValid([author]);
			console.log(' * filled: ', filled);
			if (filled) {
				this.value.push({...author});
				this.newAuthor = {firstName:'', lastName: ''}
			}
		}, {
			deep: true
		});


	},
	methods: {
		isListValid(value) {
			return value.every(({firstName, lastName}) => (String(firstName).trim() && String(lastName).trim()) )
		}
	},
	watch: {
		newFirstName(val) {
			console.log(' * newFirstName ', val);
		},
		newLastName(val) {
			console.log(' * newLastName ', val);
		}
	}
};
</script>

<style scoped>
@import './form/field.css';
</style>
