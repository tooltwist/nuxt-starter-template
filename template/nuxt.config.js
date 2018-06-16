const nodeExternals = require('webpack-node-externals')
const webpack = require('webpack')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '{{ name }}',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    plugins: [
      /*
      *  These are the Webpack plugins (not to be mistaken for Nuxt plugins)
      *  https://nuxtjs.org/faq/webpack-plugins/
      */
      // https://nuxtjs.org/faq/webpack-plugins/
      // https://github.com/nuxt/nuxt.js/issues/843
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      })
    ]

  },
  plugins: [
    /*
     *  These are our Nuxt plugins, defined in the /plugins directory.
     */
    { src: '~plugins/vue-awesome.js', ssr: true },
    { src: '~plugins/vue-authservice.js', ssr: false },
    { src: '~plugins/vue-contentservice.js', ssr: false },
    { src: '~/plugins/nuxt-drag-drop.js', ssr: true },
    { src: '~/plugins/nuxt-froala.js', ssr: false },
    { src: '~/plugins/nuxt-vue-split-panel.js', ssr: false },
    { src: '~plugins/vue-hotkey.js', ssr: false },
  ],
  modules: [
    ['nuxt-buefy'],
    '@nuxtjs/font-awesome',
  ],
  buefy: { defaultIconPack: 'fas' },
  css: [
    { src: '@/assets/scss/main.scss', lang: 'sass' }
  ],
  router: {
    middleware: 'only-if-logged-in'
  }
}
