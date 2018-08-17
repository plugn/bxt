<template>
	<div class="pure-menu pure-menu-horizontal">
		<ul class="pure-menu-list">
			<li class="pure-menu-item"><router-link to="/" class="pure-menu-link">List</router-link></li>
			<li class="pure-menu-item"><router-link v-if="$route.name!=='Edit'" to="/edit" class="pure-menu-link">Create</router-link></li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: 'Menu'
	};
</script>

<style scoped>
	.router-link-exact-active {
		text-decoration: none;
	}
</style>
