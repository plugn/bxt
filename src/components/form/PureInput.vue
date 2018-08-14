<template>
	<div class="pure-control-group">
		<label :for="inputId">{{ label }}<span v-if="scheme.required" class="label-required"> * </span></label>
		<input :id="inputId"
			:placeholder="placeholder"
			:type="scheme.type === Number ? 'number' : 'text'"
			v-model="userValue"
			@input="onInput($event.target.value)"
			:class="{'need-correction': needCorrection}"
		>
	</div>
</template>

<script>
import _uniqueId from 'lodash/uniqueId';
import _get from 'lodash/get';
const idPrefix = 'pureInput';

export default {
	name: "PureDateInput",
	data() {
		return {
			isValid: true,
			isTouched: false,
			innerValue: '',
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
		scheme: {
			type: Object,
			default: () => {}
		},
		value: {
			type: [String, Number]
		}
	},
	computed: {
		userValue: {
			get() { return this.isTouched ? this.innerValue : this.innerValue || this.value },
			set(newValue) { this.innerValue = newValue; }
		},
		needCorrection() {
			return this.isTouched && !this.isValid
		}
	},
	methods: {
		onInput(value) {
			this.isTouched = true;
			const validate = _get(this, 'scheme.validate');
			const type = _get(this, 'scheme.type');

			if (typeof validate === 'function') {
				this.isValid = validate(type(value));
			}

			this.$emit('validated', {name: this.scheme.name, isValid: this.isValid, value: this.innerValue});

		}


	}
}
</script>

<style scoped>
@import './field.css';
</style>
