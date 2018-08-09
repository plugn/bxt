<template>
<div>
	<h3>Hi</h3>
	<div>form goes here</div>
	<form class="pure-form pure-form-aligned"><fieldset>
		<PureInput label="Title" required />
		<PureInput label="Blabel" placeholder="Enter here..." required />

		<div class="pure-controls">
			<label for="cb" class="pure-checkbox">
				<input id="cb" type="checkbox"> I've read the terms and conditions
			</label>

			<button type="submit" class="pure-button pure-button-primary">Submit</button>
		</div>
	</fieldset></form>
</div>
</template>

<script>
	import PureInput from './form/PureInput';

	export default {
		name: 'Editor',
		components: {
			PureInput
		},
		data() {
			return {};
		}
	};
</script>

<style scoped>

</style>
