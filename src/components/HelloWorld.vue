<template>
	<div class="hello">
		<h3>{{ msg }}</h3>
		<input type="file" @change="readFile($event)" @focus="clearImageData($event)" accept="image/*">
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
		clearImageData($event) {
			const fileInput = $event && $event.target;
			this.imgData = '';
		},
		readFile($event) {
			const fileInput = $event && $event.target;
			// console.log(' * fileInput : ', fileInput);
			let file = fileInput && fileInput.files && fileInput.files.length && fileInput.files[0];
			let reader = new FileReader();
			reader.onloadend = () => {
				this.imgData = reader.result;
				console.log(' * this.imgData: ', this.imgData);
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
