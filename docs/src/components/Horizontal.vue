<template>
<div>
    <h2 v-if="title && products.length">{{ title }}</h2>
    <!-- <carousel-c :perPageCustom="[[320, 1], [768, 2], [1200, 3]]" :paginationEnabled="false" @load="test"> -->
    <carousel-c :perPageCustom="[[320, 1], [768, 2], [1200, 3]]" :paginationPadding="5" :paginationSize="8">
        <template v-for="(card, key) in products">
            <slide-c :key="key">
                <card-c :card="card" />
            </slide-c>
        </template>
    </carousel-c>
</div>
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
        },
        
        title: {
            type: String,
            default: ''
        },
    },
    
    components: {
		'card-c': Card,
        'carousel-c': Carousel,
        'slide-c': Slide
    },

    methods: {
        test() {
            console.log('test');
        }
    }
}
</script>

<style scoped>
.VueCarousel-slide {
    display: flex;
    justify-content: center;
}

h2 {
    margin: 15px;
    margin-bottom: -25px;
}

@media screen and (min-width: 768px) {
    h2 {
        font-size: 28px;
    }
}

@media screen and (min-width: 992px) {
    h2 {
        margin: 15px auto;
        margin-bottom: -25px;
        max-width: 85%;
        font-size: 32px;
    }
}
</style>

