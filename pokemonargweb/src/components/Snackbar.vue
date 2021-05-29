<template>
<div class="text-center">
    <v-btn
        dark
        color="orange darken-2"
        @click="snackbar = true"
    >
        {{btn_text}}
    </v-btn>

    <v-snackbar
        v-model="snackbar"
        :timeout="timeout"
    >
        {{ snackbar_text }}

        <template v-slot:action="{ attrs }">
            <v-btn
                color="blue"
                text
                v-bind="attrs"
                @click="snackbar = false"
            >
                Cerrar
            </v-btn>
        </template>
    </v-snackbar>
</div>
</template>

<script>
    export default {
        name: 'Snackbar',
        props: {
            btn_text: {
                type: String,
                default: '',
            },
            
            snackbar_text: {
                type: String,
                default: '',
            },
        },

        data: () => ({
            snackbar: false,
            text: 'My timeout is set to 2000.',
            timeout: 2000,
        }),
    }
</script>

<style scoped>

</style>