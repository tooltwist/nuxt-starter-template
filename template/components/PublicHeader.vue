<template lang="pug">
  // styles defined in assets/scss/main.cscc
  nav.navbar.is-dark.is-fixed-top.my-header
    .container
      .navbar-brand
        router-link.navbar-item(to="/")
          img(src="@/assets/images/tooltwist-logo-white.png", alt="My Project")

        .navbar-burger.burger(data-target="navbarExampleTransparentExample", @click="toggleNavbar()", v-bind:class="{'is-active': isActive}")
          span
          span
          span
      //- navbar-brand

      #navbarExampleTransparentExample.navbar-menu(v-bind:class="{'is-active': isActive}")
        .navbar-start
          router-link.navbar-item(to="/publicPage") publicPage
          router-link.navbar-item(to="/user/privatePage", v-show="isLoggedIn") privatePage
        //- navbar-start

        .navbar-end
          .navbar-item.has-text-grey-light.is-size-7.has-text-weight-light(v-show="isLoggedIn") [ \{{userTitle}} ]
          router-link.navbar-item(to="/user/account", v-show="isLoggedIn") Account
          router-link.navbar-item(v-show="!isLoggedIn", to="/login") Login
          a.navbar-item(v-show="isLoggedIn", @click="doLogout") Sign out
        //- navbar-end

      //- navbar-menu
    //- container
  //- nav
</template>

<script>
export default {
  data: function() {
    return {
      isActive: false
    }
  },
  methods: {
    toggleNavbar() {
      this.isActive = !this.isActive
    },
    doLogout: function () {
      this.$authservice.logout()
      this.$router.push('/')
    }
  },
  computed: {
    isLoggedIn: function () {
      if (this.$authservice && this.$authservice.user) {
        return true;
      }
      return false;
    },
    userTitle: function () {
      if (this.$authservice && this.$authservice.user) {
        if (this.$authservice.user.username) {
          return this.$authservice.user.username
        } else {
          return this.$authservice.user.email
        }
      }
      return null
    }
  }
}
</script>
