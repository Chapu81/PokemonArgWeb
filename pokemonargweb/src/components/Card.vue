<template>
<v-card
    class="mx-auto"
    max-width="300"
>
    <v-img
        class="white--text align-end"
        height="400px"
        :src="card.img"
    >
        <v-card-title>{{card.name}}</v-card-title>
    </v-img>

    <v-card-text class="text--primary">
        <p>Precio: ${{card.price}}</p>

    </v-card-text>

    <v-card-actions>
        <v-btn
            color="orange"
            text
        >
            Agregar al carrito
        </v-btn>
    </v-card-actions>
</v-card>
</template>

<script>
    export default {
        name: 'Card',

        props: ['card'],

        data: () => ({

        }),
    }
</script>

<style scoped>

</style>