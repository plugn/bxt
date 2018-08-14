<template>
	<div class="pure-control-group">
		<label :for="inputId">{{ label }}</label>
		<input :id="inputId"
			type="date"
			:min="min"
			:max="max"
			v-model="innerValue"
			:class="{'need-correction': !isValid}"
		>
		<span v-if="scheme.required" class="pure-form-message-inline">required</span>
	</div>
</template>

<script>
import PureInput from './PureInput'

export default {
	name: "PureDateInput",
	mixins: [ PureInput ],
	props: {
		min: String,
		max: String
	}
}
</script>

<style scoped>
@import './field.css';
</style>
