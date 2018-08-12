<template>
	<div class="pure-control-group">
		<label :for="inputId">{{ label }}</label>
		<input :id="inputId"
			:placeholder="placeholder"
			type="text"
			v-model="userValue"
			@input="onInput($event.target.value)">
		<span v-if="required" class="pure-form-message-inline">required</span>
	</div>
</template>

<script>
import _uniqueId from 'lodash/uniqueId';
const idPrefix = 'pureInput';

export default {
	name: "PureDateInput",
	data() {
		return {
			inputId: _uniqueId(idPrefix)
		}
	},
	props: {
		label: {
			type: String,
			default: 'Label'
		},
		placeholder: {
			type: String,
			default: ''
		},
		required: {
			type: Boolean,
			default: false
		},
		value: {
			type: [String, Number]
		},
		validate: {
			type: Function
		}
	},
	computed: {
		userValue: {
			get() { return this.value },
			set(newValue) {
				//this.userValue = newValue;
			}
		}
	},
	methods: {
		onInput(value) {
			console.log(' * onInput : ', value);

		}
	}
}
</script>

<style scoped>
label {
	cursor: pointer;
}
</style>
