<template>
<v-menu
    bottom
    origin="center center"
    transition="scale-transition"
    v-if="logued"
>
    <template v-slot:activator="{ on, attrs }">
        <v-btn
            elevation="4"
            :color="$store.getters.color_app"
            v-bind="attrs"
            v-on="on"
            fab
            fixed
            bottom
            left
        >
            <v-icon>mdi-account</v-icon>
        </v-btn>
    </template>

    <v-list class="pointer">
        <v-list-item
            v-for="(section, i) in sections"
            :key="i"
        >
            <v-list-item-title @click="go_to_page(section.link)">{{ section.text }}</v-list-item-title>
        </v-list-item>
        <v-list-item>
            <v-list-item-title @click="logout">Cerrar sesión</v-list-item-title>
        </v-list-item>
    </v-list>
</v-menu>
</template>

<script>
export default {
    name: 'user',

    data: () => ({

    }),

    methods: {
        go_to_page(page) {
			if(this.$route.fullPath != page) {
				this.$router.push(page)
			}
		},

        logout() {
            this.$store.getters.firebase.auth().signOut().then(() => {
                this.go_to_page('/login-admin');
            }).catch((error) => {
                console.log(error);
            });
        },
    },

    computed: {
        logued() {
            return this.$store.getters.logued;
        },

        sections() {
            return [
                {
                    text: 'Agregar cartas',
                    link: '/agregar/cartas',
                },
                {
                    text: 'Agregar mazos',
                    link: '/agregar/mazos',
                },
                {
                    text: 'Pedidos',
                    link: '/pedidos-admin',
                },
            ]
        }
    }
}
</script>

<style scoped>

</style>