<template>
	<div class="pure-control-group">
		<label x-for="name">{{ label }}</label>
		<input type="text" :placeholder="localPlaceholder">
		<span v-if="required" class="pure-form-message-inline">required</span>
	</div>
</template>

<script>
	export default {
		name: "PureInput",
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

</style>