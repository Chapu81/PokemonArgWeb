<template>
<v-card
    class="my-10 mx-3"
    max-width="350"
>
    <v-carousel show-arrows-on-hover height="250" hide-delimiters>
        <v-carousel-item
            v-for="(item,i) in [card.front, card.back]"
            :key="i"
            :src="item"
        ></v-carousel-item>
    </v-carousel>

    <v-card-title class="pb-0">{{card.name}}</v-card-title>

    <v-card-text class="pb-0">
        <div class="subtitle-1 d-flex justify-space-between align-center">
            <span class="title">
                $ {{card.price}}
            </span>
            <span class="d-flex justify-center align-center">
                Tipo: 
                <v-img
                    :alt="card.type"
                    class="shrink ml-2"
                    contain
                    :src="`/img/types/${types[card.type]}.webp`"
                    transition="scale-transition"
                    width="20"
                />
            </span>
        </div>

        <div>
            Legendaria: 
            {{is_legendary}}
        </div>
    </v-card-text>

    <v-card-actions class="d-flex justify-center align-center">
        <v-btn
            color="red"
            text
        >
            Agregar al carrito
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
            },

            types() {
                return {
                    Incoloro: 'colorless',
                    Oscuridad: 'darkness',
                    Dragón: 'dragon',
                    Hada: 'fairy',
                    Lucha: 'fighting',
                    Fuego: 'fire',
                    Hierba: 'grass',
                    Relámpago: 'lightning',
                    Metal: 'metal',
                    Psíquico: 'psychic',
                    Agua: 'water',
                }
            },

            is_legendary() {
                return this.card.legendary ? 'Si' : 'No';
            }
        }
    }
</script>

<style scoped>

</style>