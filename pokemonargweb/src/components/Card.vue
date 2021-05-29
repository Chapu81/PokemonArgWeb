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
            color="error"
            text
        >
            Agregar al carrito
        </v-btn>
        
        <v-spacer v-if="logued"></v-spacer>
        
        <v-btn color="black" text v-if="logued" @click="delete_card">
            <i class="material-icons">delete</i>
        </v-btn>
    </v-card-actions>
</v-card>
</template>

<script>
import db from '../main'
    export default {
        name: 'Card',

        props: ['card'],

        data: () => ({
            snackbar_text: '',
        }),

        methods: {
            async delete_card() {
                try {
                    await db.collection('cards').doc(this.card.id).delete();
                    this.$emit('card_delete', true);

                }catch (error) {
                    this.$emit('card_delete', false);
                    console.log(error);
                }
            },
        },

        computed: {
            logued() {
                return this.$store.getters.logued;
            }
        }
    }
</script>

<style scoped>

</style>