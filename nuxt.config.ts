// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({

  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  runtimeConfig: {    
    public: {
      apiUrl: ''
    }
  },

  css: ['@/assets/scss/main.scss'],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @import "bootstrap/scss/mixins/breakpoints";

          $grid-breakpoints: (
            xs: 0, sm: 576px, md: 768px, lg: 992px, xl: 1200px, xxl: 1400px, xxxl: 1537px
          );
          `
        }
      }
    }
  },

  vue: {
    compilerOptions: { isCustomElement: tag => tag.startsWith('swiper-') }
  },

  app: {
    head: {
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@200..900&display=swap' }
      ]
    },
    pageTransition: { name: 'page' }
  },

  modules: [
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'acceptHMRUpdate']
      }
    ],
    [
      '@vee-validate/nuxt',
      {
        componentNames: {
          Form: 'VForm', Field: 'VField', FieldArray: 'VFieldArray',
        },
        autoImports: true
      }
    ]
  ],


})