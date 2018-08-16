<template>
	<div class="pure-control-group">
		<label :for="inputId">{{ label }}<span v-if="scheme.required" class="label-required"> * </span></label>
		<input :id="inputId"
			:placeholder="placeholder"
			:type="scheme.type === Number ? 'number' : 'text'"
			v-model="innerValue"
			:class="{'need-correction': !isValid}"
		>
	</div>
</template>

<script>
import {mapMutations} from 'vuex';
import _uniqueId from 'lodash/uniqueId';
import _get from 'lodash/get';
const idPrefix = 'pureInput';

export default {
	name: "PureInput",
	data() {
		return {
			isValid: true,
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

	created() {
		this.innerValue = this.value;
	},

	mounted() {
		this.$watch('innerValue', this.valueWatcher);
	},

	methods: {
		...mapMutations([
			'updateReport'
		]),
		valueWatcher(value) {
			const validate = this.scheme.validate;
			this.isValid = validate(value);

			const report = {
				name: this.scheme.name,
				valid: this.isValid,
				value: this.innerValue
			};

			this.updateReport(report);
		}

	}
}
</script>

<style scoped>
@import './field.css';
</style>
