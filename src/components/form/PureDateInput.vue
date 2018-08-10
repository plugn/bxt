<template>
	<div class="pure-control-group">
		<label :for="inputId">{{ label }}</label>
		<input :id="inputId" :value="value" type="date" :min="min" :max="max">
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
