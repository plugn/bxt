<template>
	<div class="pure-control-group">
		<label :for="inputId">{{ label }}</label>
		<input :id="inputId"
			type="date"
			:min="min"
			:max="max"
			v-model="userValue"
			@input="onInput($event.target.value)"
		>
		<span v-if="required" class="pure-form-message-inline">required</span>
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
label {
	cursor: pointer;
}
</style>
