
console.log(`nuxt-jquery.js 1`)
// import jquery from 'jquery'
const jquery = require('jquery')
console.log(`nuxt-jquery.js 2`)

const $ = jquery
document.$ = jquery




console.log(`nuxt-jquery.js 3`)

console.log(`jquery=${typeof(jquery)}`);
