<template>
<carousel-c :perPageCustom="[[320, 1], [768, 2], [1200, 3]]">
    <template v-for="(card, key) in products">
        <slide-c :key="key">
            <card-c :card="card" />
        </slide-c>
    </template>
</carousel-c>
</template>

<script>
import Card from '../components/Card'
import { Carousel, Slide } from 'vue-carousel';
export default {
    name: 'horizontal',
    props: {
        products: {
            type: Array,
            default: []
        }
    },
    
    components: {
		'card-c': Card,
        'carousel-c': Carousel,
        'slide-c': Slide
    },
}
</script>

<style scoped>

</style>