<template>
  <v-container class="py-8">
    <!-- Page Title and Home Button -->
    <v-row justify="center" class="mb-6">
      <v-col cols="12" class="text-center">
        <h1 class="text-h4 font-weight-medium">Caregivers</h1>
        <NuxtLink to="/">
          <v-btn color="primary" variant="outlined">Home</v-btn>
        </NuxtLink>
      </v-col>
    </v-row>

    <!-- Nurses Cards -->
    <v-row justify="center">
      <v-col
        v-for="caregiver in caregivers"
        :key="caregiver.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card class="pa-4 position-relative" style="height: 250px">
          <!-- Top Left: Type -->
          <!-- Add variant="flat" and text-color="white" to make the bg variable color and text white-->
          <v-chip
            class="position-absolute top-0 left-0 ma-2"
            size="small"
            color="primary"
          >
            {{ formatType(caregiver.properties.type_de_contact) }}
          </v-chip>

          <!-- Top Right: T1 Badge -->
          <!-- Add variant="flat" and text-color="white" to make the bg variable color and text white-->
          <v-chip
            class="position-absolute top-0 right-0 ma-2"
            size="small"
            color="complement2"
          > 
            {{ caregiver.properties.tiering_auxiliaire }}
          </v-chip>

          <v-card-title class="mt-6 text-wrap text-h6">
            {{ caregiver.properties.firstname }}
            {{ caregiver.properties.lastname }}
          </v-card-title>

          <v-card-text>
            <div>Email: {{ caregiver.properties.email || "Not provided" }}</div>
            <div>Phone: {{ caregiver.properties.phone || "Not provided" }}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Loading Spinner -->
    <div class="text-center my-6" v-if="loading">
      <v-progress-circular indeterminate color="primary" size="40" />
      <div class="mt-2">Loading caregivers...</div>
    </div>

    <!-- No Results -->
    <v-alert v-if="!loading && caregivers.length === 0" type="info">
      No caregivers found.
    </v-alert>

    <!-- Scroll to Top Button -->
    <v-fade-transition>
      <v-btn
        v-if="showScrollToTop"
        icon
        color="primary"
        class="scroll-to-top"
        @click="scrollToTop"
        style="position: fixed; bottom: 20px; right: 20px; z-index: 999"
      >
        <v-icon>mdi-chevron-up</v-icon>
      </v-btn>
    </v-fade-transition>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

type HubspotContact = {
  id: string;
  properties: {
    firstname: string;
    lastname: string;
    email: string | null;
    phone: string | null;
    type_de_contact?: string | null;
    tiering_auxilitier: string | null;
  };
};

export default defineComponent({
  data() {
    return {
      caregivers: [] as HubspotContact[],
      loading: true,
      showScrollToTop: false,
    };
  },
  mounted() {
    this.fetchCaregivers();
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    async fetchCaregivers() {
      try {
        const data = await $fetch<{ contacts: HubspotContact[] }>(
          "/api/hubspot?type=auxiliaire de vie"
        );
        this.caregivers = data.contacts.filter(
          (c) => c.properties.tiering_auxiliaire === "T1"
        );
      } catch (error) {
        console.error("Error loading nurses:", error);
      } finally {
        this.loading = false;
      }
    },
    handleScroll() {
      this.showScrollToTop = window.scrollY > 300;
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    formatType(type?: string | null) {
      if (!type) return "Unknown";
      return type
        .split(" ")
        .map((word) =>
          ["de", "du", "la", "le"].includes(word.toLowerCase())
            ? word.toLowerCase()
            : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
    },
  },
});
</script>

<style scoped>
.scroll-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 999;
}
</style>