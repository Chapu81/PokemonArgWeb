<template>
<div>
    <component :is="is_card ? 'add-card' : 'add-deck'"></component>
</div>
</template>

<script>
import Add_card from '../../components/admin/Add_card.vue'
import Add_deck from '../../components/admin/Add_deck.vue'
    export default {
        name: 'add',
        components: {
            'add-card': Add_card,
            'add-deck': Add_deck,
        },

        data: () => ({
            
        }),

        computed: {
            is_card() {
                return this.$route.params.opt === 'cartas';
            }
        }
    }
</script>

<style scoped>
.v-input--selection-controls {
    margin-top: 0;
    padding-top: 0;
}
</style>