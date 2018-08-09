<template>
<div>
	<h3>Hi</h3>
	<div>form goes here</div>
	<form class="pure-form pure-form-aligned"><fieldset>
		<div class="pure-control-group">
			<label for="name">Username</label>
			<input id="name" type="text" placeholder="Username">
			<span class="pure-form-message-inline">This is a required field.</span>
		</div>
		<div class="pure-control-group">
			<label for="foo">Label</label>
			<input id="foo" type="text" placeholder="Enter something here...">
		</div>

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
	export default {
		name: 'Editor',
		data() {
			return {};
		}
	};
</script>

<style scoped>

</style>
