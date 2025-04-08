import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import type { ThemeDefinition } from 'vuetify'

const myCustomLightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    primary: '#2c0099',
    secondary: '#ff71e4',
    surface: '#ffffff',
    background: '#f9f9f9',
    lightblue: '#E3FAFE',
    complement1: '#A480FF',
    complement2: '#9639BF',
    complement3: '#FFF8AA',
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    theme: {
      defaultTheme: 'myCustomLightTheme',
      themes: {
        myCustomLightTheme,
      },
    },
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: { mdi },
    },
  })

  nuxtApp.vueApp.use(vuetify)
})

