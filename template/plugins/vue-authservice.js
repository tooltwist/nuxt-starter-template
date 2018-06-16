import Vue from 'vue'

import Authservice from 'vue-authservice'
//import Authservice from '~/node_modules/vue-authservice/dist/vue-authservice.cjs.js'

// Load the configuration.
// This file will be overwritten during Docker builds.
import Config from '../protected-config/websiteConfig'
console.log('Config from protected-config/websiteConfig:\n', Config)

let websiteURL = `${Config.website.protocol}://${Config.website.host}:${Config.website.port}`

const options = {
  protocol: Config.authservice.protocol,
  host: Config.authservice.host,
  port: Config.authservice.port,
  version: Config.authservice.version,
  apikey: Config.authservice.apikey,


  hints: {
    usernames: false,
    sitename: 'ToolTwist',
    login: {
      // resumeURL: 'http://localhost:8080/editor',
      // email: false,
      facebook: true,
      // google: true,
      // github: true,
      // linkedin: true,
      // twitter: true,
      //registerMessage: 'Don\'t have an account yet?'
      resumeURL: `/user/privatePage`,
      failURL: `/login`,
    },
    register: {
      password: true,
      // firstname: true,
      // middlename: true,
      // lastname: true,
      resumeURL: `/user/privatePage`,
      //termsMessage: 'Agree to our terms?',
      //termsRoute: '/terms-and-conditions'
    },
    forgot: {
      resumeURL: `/user/privatePage`,
    }
  }
}

Vue.use(Authservice, options)

// Make nuxtAuthservice available to middleware as ctx.app.$nuxtAuthservice.
// https://nuxtjs.org/guide/plugins/#inject-in-root-amp-context
// https://github.com/nuxt/nuxt.js/issues/2233
export default ({ app }, inject) => {
  console.log(`IN default function of plugin vue-authservice`, app);
  inject('nuxtAuthservice', Authservice._authservice )
}
