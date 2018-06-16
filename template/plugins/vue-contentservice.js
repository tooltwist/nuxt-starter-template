import Vue from 'vue'

import Contentservice from 'vue-contentservice'
//import Contentservice from '~/node_modules/vue-contentservice/dist/vue-contentservice.cjs.js'

// Load the configuration.
// This file will be overwritten during Docker builds.
import Config from '../protected-config/websiteConfig'
console.log('Config from protected-config/websiteConfig:\n', Config)

let options = null
if (Config.contentservice) {
  options = {
    protocol: Config.contentservice.protocol,
    host: Config.contentservice.host,
    port: Config.contentservice.port,
    version: Config.contentservice.version,
    apikey: Config.contentservice.apikey,

    // hints: {
    //   usernames: true,
    //   sitename: 'ToolTwist',
    // }
  }
} else {
  console.error('Missing contentservice configuration in protected-config/websiteConfig.js')
  console.error('Contentservice will be disabled.')
}


Vue.use(Contentservice, options)


// Define the store used to edit layouts.
// See 'Dynamic Module Registration' at
// https://vuex.vuejs.org/en/modules.html


// Make nuxtContentservice available all over the place
// https://nuxtjs.org/guide/plugins/#inject-in-root-amp-context
// https://github.com/nuxt/nuxt.js/issues/2233
//
export default ({ app, isClient, store }, inject) => {
  console.error(`%%%%%%%%%%%%%%%%%%% layoutStore=`, Contentservice.layoutStore)

  inject('nuxtContentservice', Contentservice._content )
}
