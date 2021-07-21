<template>
    <v-snackbar
        v-model="state_snackbar"
        :timeout="2000"
    >
        {{ text }}

        <template v-slot:action="{ attrs }">
            <v-btn
                color="blue"
                text
                v-bind="attrs"
                @click="state_snackbar = false"
            >
                Cerrar
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script>
    export default {
        name: 'Snackbar',
        props: ['text'],

        data: () => ({
            state_snackbar: false,
        }),

        watch: {
            text() {
                this.state_snackbar = this.text !== '';
            },
            
            state_snackbar() {
                if(!this.state_snackbar) {
                    this.$emit('close');
                }
            }
        },
    }
</script>

<style scoped>

</style>