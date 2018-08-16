<template>
	<div class="pure-control-group">
		<label :for="inputId">{{ label }}
			<span v-if="scheme.required" class="label-required"> * </span>
		</label>
		<input :id="inputId"
			type="date"
			:min="min"
			:max="max"
			v-model="innerValue"
			:class="{'need-correction': !isValid}"
		>
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
