<template lang="pug">
  div
    section.container.has-text-centered
      br
      br
      app-logo

    section.container.has-text-centered
      br
      h1.title.is-1
        | {{ name }}
      h2.subtitle.is-4
        | Nuxt.js project
      br
      .box
        i.fa.fa-user
        | &nbsp; Some nice text can go inside this box.
      br
      b-collapse(:open="false")
        button.button.is-primary(slot="trigger") Click me!
        br
        .notification
          .content
            h3.subtitle.is-4 Blurb
            p
            | Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            | Nulla accumsan, metus ultrices eleifend gravida, nulla nunceu lectus.
            | Ut vulputate semper dui. Fusce erat odio, sollicitudin vel.</template>

<script>
import AppLogo from '~/components/AppLogo.vue'

export default {
  components: {
    AppLogo
  }
}
</script>

<style>
</style>
