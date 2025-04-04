// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/ui',  '@nuxtjs/leaflet'],
  css: [
    'vuetify/styles', 
    '~/assets/styles/main.css', 
    'leaflet/dist/leaflet.css', 
    'leaflet.markercluster/dist/MarkerCluster.css',
    'leaflet.markercluster/dist/MarkerCluster.Default.css',
    '~/assets/styles/main.css'
  ],
  build: {
    transpile: ['vuetify']
  }
})

