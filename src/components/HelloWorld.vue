<template>
	<div class="hello">
		<h1>{{ msg }}</h1>
		<input type="file" @change="readFile($event)" @focus="clearImageData" accept="image/*">
    <button @click="clearImageData" v-if="imgData">x</button>
		<br>
		<img v-if="imgData" :src="imgData" title="Image Preview">
	</div>
</template>

<script>
let reader = new FileReader();
export default {
	name: 'HelloWorld',
	data () {
		return {
			msg: 'title',
			imgData: ''
		}
	},
	methods: {
	  clearImageData() {
	    this.imgData = '';
    },
		readFile($event) {
			const fileInput = $event && $event.target;
			// console.log(' * fileInput : ', fileInput);
			let file = fileInput && fileInput.files && fileInput.files.length && fileInput.files[0];
			let reader = new FileReader();
			reader.onloadend = () => {
				this.imgData = reader.result;
			};
			// console.log(' * reader: ', reader, ' * file: ', file);
			if (file) {
				reader.readAsDataURL(file);
			}
			else {
				this.imgData = '';
			}
		}
	}
}
</script>

<style scoped>
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
