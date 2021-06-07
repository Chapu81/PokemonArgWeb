<template>
<div>
    <!-- <add-card /> -->
    <component :is="option_selected === 'cartas' ? 'add-card' : ''"></component>
</div>
</template>

<script>
import Add_card from '../../components/admin/Add_card.vue'
    export default {
        name: 'add',
        components: {
            'add-card': Add_card
        },

        data: () => ({
            option_selected: '',
        }),

        created() {
            this.option_selected = this.$route.params.opt;
        },
    }
</script>

<style scoped>
.v-input--selection-controls {
    margin-top: 0;
    padding-top: 0;
}
</style>