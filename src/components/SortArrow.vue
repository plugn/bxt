<template>
	<span @click="onClick" class="sort-arrow" :class="{'current': current}">{{ value }}</span>
</template>

<script>
const arrowSymbols = {
	up: String.fromCharCode(9650),
	down: String.fromCharCode(9660)
};

export default {
	name: "SortArrow",
	data() {
		return {
			innerDirection: 'ASC'
		};
	},
	props: {
		name: {
			type: String,
			required: true
		},
		direction: {
			type: String,
			default: 'ASC'
		},
		current: {
			type: Boolean,
			default: false
		}
	},
	created() {
		this.innerDirection = this.direction;
	},
	computed: {
		value() {
			return this.innerDirection.toUpperCase() === 'DESC' ? arrowSymbols.down : arrowSymbols.up;
		}
	},
	methods: {
		onClick() {
			this.innerDirection = this.innerDirection === 'DESC' ? 'ASC' : 'DESC';

			this.$emit('changed', {
				name: this.name,
				direction: this.innerDirection
			});
		}
	}

}
</script>

<style scoped>
.sort-arrow {
	cursor: pointer;
	float: right;
	color: #aaa;
}
.current {
	color: #333;
}

</style>