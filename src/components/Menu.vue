<template>
	<div><ul class="menu">
		<li><router-link to="/">Home</router-link></li>
		<li><router-link to="/list">List</router-link></li>
		<li><router-link to="/edit">Create</router-link></li>
	</ul></div>

</template>

<script>
	export default {
		name: 'Menu'
	};
</script>

<style scoped>
	.menu {
		text-align: center;
	}

	.router-link-exact-active {
		text-decoration: none;
	}

	h1, h2 {
		font-weight: normal;
	}
	ul {
		list-style-type: none;
		padding: 0;
	}
	li {
		display: inline-block;
		margin: 0 10px;
	}
	a {
		color: #42b983;
	}
	img {
		height: 200px;
	}
</style>
