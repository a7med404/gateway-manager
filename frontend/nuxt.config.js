export default {
  ssr: false,

  head: {
    title: 'Gateway App',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  css: [],

  plugins: [],

  components: true,

  toast: {
    position: 'top-right',
    keepOnHover: true,
    duration: '6000',
    theme: 'toasted-primary',
    icon: 'error',
    iconPack: 'fontawesome',
    register: [
      // Register custom toasts
      {
        name: 'my-error',
        message: 'Oops...Something went wrong',
        options: {
          type: 'error',
        },
      },
    ],
    action: {
      text: 'X',
      onClick: (e, toastObject) => {
        toastObject.goAway(0)
      },
    },
  },

  buildModules: ['@nuxtjs/tailwindcss'],

  modules: ['@nuxtjs/axios', '@nuxtjs/toast'],

  axios: {
    baseURL: process.env.BASE_URL,
    common: {
      Accept: 'application/json',
    },
    proxyHeaders: false,
    credentials: false,
  },
  proxy: {
    '/api': {
      target: process.env.PROXY_BASE_URL,
      pathRewrite: {
        '^/api': '/',
      },
    },
  },

  store: {
    namespaced: true,
  },

  build: {},
}
