<template>
	<div class="hello">
		<h1>{{ msg }}</h1>
		<input type="file" @change="readFile($event)"><br>
		<img :src="imgData" height="200" title="Image preview..." v-if="imgData">
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
		readFile($event) {
      console.log(' * $event: ', $event);
      const fileInput = $event && $event.target;
      console.log(' * fileInput : ', fileInput);
      let file = fileInput && fileInput.files && fileInput.files.length && fileInput.files[0];
      // if (!file) { return; }

		  let reader = new FileReader();
      reader.onloadend = () => {
        console.log(' * reader.result: ', reader.result);
        this.imgData = reader.result;
      };
      console.log(' * reader: ', reader);
      console.log(' * file: ', file);
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
</style>
