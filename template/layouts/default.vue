<template lang="pug">
  div
    .above-my-footer
      public-header
      nuxt

    public-footer.my-footer
</template>

<script>
  import PublicHeader from '@/components/PublicHeader.vue'
  import PublicFooter from '@/components/PublicFooter.vue'

  export default {
    name: 'settings',
    components: {
      PublicHeader,
      PublicFooter
    },
  }
</script>


<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}
</style>
