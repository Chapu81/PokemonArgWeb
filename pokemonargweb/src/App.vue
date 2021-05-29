<template>
  <v-app>
    <v-app-bar
      app
      color="error"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Pokeball"
          class="shrink mr-2"
          contain
          src="./assets/img/logo/pokeball.png"
          transition="scale-transition"
          width="40"
        />
      </div>

      <v-btn
        href="/home"
        text
      >
        <span class="mr-2">Pokemon Arg</span>
      </v-btn>

      <!-- <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
      </v-btn> -->
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
