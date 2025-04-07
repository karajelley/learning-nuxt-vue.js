<template>
  <v-container class="text-center">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <h1>Welcome to Address Finder 🔍</h1>
        <h3>Looking for an address?</h3>
        <p>Using Vuetify and Nuxt Leaflet we will find and display addresses!</p>

        <Map />

        <v-row justify="center" class="mt-4">
          <v-col cols="auto">
            <NuxtLink to="/">
              <v-btn color="primary" variant="outlined">Home</v-btn>
            </NuxtLink>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
