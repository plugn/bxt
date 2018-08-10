<template>
	<div class="pure-control-group">
		<label :for="inputId">{{ label }}</label>
		<input :id="inputId" :placeholder="localPlaceholder" :value="value" type="text">
		<span v-if="required" class="pure-form-message-inline">required</span>
	</div>
</template>

<script>
import _uniqueId from 'lodash/uniqueId';

const idPrefix = 'pureInput';

export default {
	name: "PureInput",
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
			type: String
		}
	},
	computed: {
		localPlaceholder() {
			return this.placeholder || this.label;
		}
	}
}
</script>

<style scoped>
label {
	cursor: pointer;
}
</style>
