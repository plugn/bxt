<template>
	<div class="pure-control-group">
		<label :for="inputId">{{ label }}
			<span v-if="scheme.required" class="label-required"> * </span>
		</label>

		<span class="field pure-form-message-inline">
			<input :id="inputId"
				type="file"
				accept="image/*"
				@change="readFile($event)"
				:class="{'need-correction': !isValid}"
			>
			<button v-if="innerValue"
				type="button"
				@click.prevent="innerValue=''"
				title="remove image"
				class="remove-button">x</button>
		</span>

		<span v-if="innerValue" class="preview pure-form-message-inline">
			<img :src="innerValue">
		</span>
	</div>
</template>

<script>
import PureInput from './PureInput'

export default {
	name: "PureFileInput",
	mixins: [ PureInput ],

	methods: {
		readFile($event) {
			const fileInput = $event && $event.target;
			const file = fileInput && fileInput.files && fileInput.files.length && fileInput.files[0];
			const reader = new FileReader();

			reader.onloadend = () => {
				this.innerValue = reader.result;
			};

			if (file) {
				reader.readAsDataURL(file);
			}
			else {
				this.innerValue = '';
			}
		}
	}
}
</script>

<style scoped>
@import './field.css';

.field {
	position: relative;
}

.remove-button {
	position: absolute;
	top: 0;
	right: 0;
	font-weight: bold;
	font-size: larger;
	color: black;
}

.preview img {
	max-height: 180px;
	max-width: 120px;
}

</style>
