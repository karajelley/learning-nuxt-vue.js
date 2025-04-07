<template>
  <v-container class="text-center py-10">
    <!-- Brand Logo -->
    <v-row justify="center">
      <v-col cols="auto">
        <img src="~/assets/logo_title.svg" alt="Auxicare Logo" style="width: 150px;" />
      </v-col>
    </v-row>

    <!-- Description Section -->
    <v-row justify="center" class="my-6">
      <v-col cols="12" md="8">
        <h1>Home help as we imagine it!</h1>
        <p>
          At Auxicare, our experienced and fulfilled assistants adapt to your desires and needs.
        </p>
      </v-col>
    </v-row>

    <!-- Make a request Button -->
    <v-row justify="center" class="mb-4">
      <v-col cols="auto">
        <v-btn color="primary" variant="elevated" @click="goToMakeRequest">Make a request</v-btn>
        <div class="mt-2">
          <h3>Free and without obligation</h3>
        </div>
      </v-col>
    </v-row>

    <!-- Navigation Buttons -->
    <v-row justify="center" class="mt-6" dense>
      <v-col cols="auto">
        <NuxtLink to="/about-us">
          <v-btn color="primary" variant="outlined">About Us</v-btn>
        </NuxtLink>
      </v-col>
      <v-col cols="auto">
        <NuxtLink to="/contact">
          <v-btn color="primary" variant="outlined">Contact</v-btn>
        </NuxtLink>
      </v-col>
      <v-col cols="auto">
        <NuxtLink to="/find-address">
          <v-btn color="primary" variant="outlined">Address Finder 🔍</v-btn>
        </NuxtLink>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'WelcomeComponent',
  methods: {
    goToMakeRequest() {
      window.location.href = 'https://www.auxicare.fr';
    }
  }
}
</script>
