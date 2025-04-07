// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'


export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/ui',
    '@nuxtjs/leaflet',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    }
  ],

  plugins: ['@/plugins/vuetify'],

  css: [
    'vuetify/styles', 
    '~/assets/styles/main.css', 
    'leaflet/dist/leaflet.css', 
    'leaflet.markercluster/dist/MarkerCluster.css',
    'leaflet.markercluster/dist/MarkerCluster.Default.css',
  ],

  build: {
    transpile: ['vuetify']
  },

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  }
})


