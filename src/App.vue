<template>
	<div id="app">
		<Menu/>

		<router-view/>
	</div>
</template>

<script>
// PureCSS styles
import 'purecss/build/pure-min.css';

import Menu from './components/Menu'
export default {
	name: 'App',
	components: {
		Menu
	}
}
</script>
<style>
	body {
		font-size: .8rem;
	}
</style>
<style scoped>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
		margin: 10px 20px;
	}
</style>

