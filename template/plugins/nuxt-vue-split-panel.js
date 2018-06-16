// Only load 'vue-split-panel' on the browser
// https://github.com/nuxt/nuxt.js/issues/30#issuecomment-348075103
// https://github.com/bajaniyarohit/vue-split-panel
//console.log('nuxt-vue-split-panel.js')
// if (process.browser) {
//
//   console.log('Will load split.js')
//   window.onNuxtReady(() => {
//     console.log('Loading split.js')
//     const split = require('split.js')
//     console.log('Loaded split.js')
//     // Vue.use(VueFullCalendar)
//   })
// }
import Vue from 'vue'

if (process.browser) {
  const VueSplit = require('vue-split-panel')
  Vue.use(VueSplit)
} else {
  console.log('nuxt-vue-split-panel.js - will not load on server')
}
