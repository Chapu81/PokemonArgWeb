<template>
<div>
	<v-carousel :show-arrows="false" cycle>
		<v-carousel-item
			v-for="i in 3"
			:key="i"
			:src="`${route_img}/${i}.webp`"
		></v-carousel-item>
	</v-carousel>
</div>
</template>

<script>
export default {
	name: 'Home',
	
	computed: {
		mobile() {
            return this.$store.getters.mobile;
        },

		route_img() {
			let file = this.mobile ? 'mobile' : 'pc';
			return `/img/banner/${file}`;
		}
	}
}
</script>

<style scoped>

</style>