<template>
<div>
	<v-carousel :show-arrows="false" cycle height="auto">
		<v-carousel-item
			v-for="i in 3"
			:key="i"
			:src="`${route_img}/${i}.webp`"
		></v-carousel-item>
	</v-carousel>

	<horizontal-c title="Cartas" :products="cards_sale_pages" />
	<horizontal-c title="Mazos" :products="cards_sale_pages" />

</div>
</template>

<script>
import Horizontal from '../components/Horizontal'
export default {
	name: 'Home',

	components: {
		'horizontal-c': Horizontal,
	},
	
	data: () => ({
		loaded: false,
    }),

	created() {
		if(!this.cards_sale_pages.length) {
			this.get_cards_sale();
		}
		
    },

    methods: {
        async get_cards_sale() {
			try {
				await this.$store.dispatch('save_get_cards_sale');
                this.loaded = true;
			}catch (error) {
				console.log(error);
			}
		},
    },
	
	computed: {
		mobile() {
            return this.$store.getters.mobile;
        },

		cards_sale_pages() {
            return this.$store.getters.cards_sale_pages;
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