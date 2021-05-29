<template>
<div class="container d-flex justify-center align-center">
    <v-hover v-for="opt in options" :key="opt">
        <template v-slot:default="{ hover }">
            <v-card
                :elevation="hover ? 8 : 3"
                height="150"
                width="200"
                @click="go_to_add(opt)"
                class="rounded 
                        pa-0 
                        ma-8 
                        d-flex 
                        justify-center 
                        align-center
                        transition-swing
                        pointer"
            >
                <p class="ma-0">Agregar {{opt}}</p>
            </v-card>
        </template>
    </v-hover>
    
    <v-hover>
        <template v-slot:default="{ hover }">
            <v-card
                :elevation="hover ? 8 : 3"
                height="150"
                width="200"
                @click="go_to_store()"
                class="rounded 
                        pa-0 
                        ma-8 
                        d-flex 
                        justify-center 
                        align-center
                        transition-swing
                        pointer"
            >
                <p class="ma-0">Ver pedidos</p>
            </v-card>
        </template>
    </v-hover>
</div>
</template>

<script>
    export default {
        name: 'home_admin',

        data: () => ({

        }),

        methods: {
            go_to_add(section) {
                this.$router.push(`/agregar/${section}`);
            },
            
            go_to_store() {
                this.$router.push(`/pedidos-admin`);
            },
        },

        computed: {
            options() {
                return [
                    'cartas',
                    'mazos',
                    'combos'
                ];
            }
        }
    }
</script>

<style scoped>
.container {
    min-height: calc(100vh - 100px);
}

</style>