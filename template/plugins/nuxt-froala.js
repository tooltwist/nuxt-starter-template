// https://github.com/froala/vue-froala-wysiwyg

import Vue from 'vue'
import VueFroala from 'vue-froala-wysiwyg'

// console.log('nuxt-froala.js')
// console.log(`$ => ${typeof($)}`)
// console.log(`jquery => ${typeof(jquery)}`)
// console.log(`jQuery => ${typeof(jQuery)}`)
// console.log(`window => ${typeof(window)}`)

// Froala itself
require('froala-editor/js/froala_editor.pkgd.min')

// Require Froala Editor css files.
require('froala-editor/css/froala_editor.pkgd.min.css')
require('froala-editor/css/froala_style.min.css')

Vue.use(VueFroala)
