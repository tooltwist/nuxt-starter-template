<template lang="pug">
  section.section(v-if="debugging")
    .content
      .card
        header.card-header
          p.card-header-title Client-side Redirector
        .card-content

          b If logged In
          span(v-if="goToLoggedIn") &nbsp;&nbsp;&lt;---
          br
          | Go to \{{loggedIn}}
          br
          div(v-if="loggedInReturn")
            | then... \{{loggedInReturn}}
            br
          br
          br

          b If not logged in
          span(v-if="!goToLoggedIn") &nbsp;&nbsp;&lt;---
          br
          | Go to \{{notLoggedIn}}
          br
          div(v-if="notLoggedInReturn")
            | then... \{{notLoggedInReturn}}
            br
          br
          | Is server: \{{isServer}}
          br
          | Have credentials: \{{haveCredentials}}
          br
          | Initially had credentials: \{{initialAuthenticated}}
          br
          br
          button.button.is-small.is-primary(@click="doTheRedirect") GO TO PAGE
</template>

<script>

const DEBUG = false

export default {
  name: 'teaservice',
  data: function () {
    return {
      debugging: DEBUG,
      loggedIn: null,
      loggedInReturn: null,
      notLoggedIn: null,
      notLoggedInReturn: null,
      initialAuthenticated: '-',
    }
  },
  computed: {
    isServer: function () {
      if (process.server) {
        return true
      } else {
        return false
      }
    },
    haveCredentials: function () {
      if (this.$authservice) {
        return true
      } else {
        return false
      }

    },
    goToLoggedIn: function () {
      return (this.$authservice && this.$authservice.user)
    }
  },
  created: function () {
    console.log(`**** RouteToPage ****`);
    if (process.server) {
      console.log('**** Running on the server')
      return
    } else {
      console.log('**** Running on the browser')
      console.log(this.$route.query)
      if (this.$route.query) {
        let path = this.$route.query.requiredPath
        if (path) {
          console.log(`**** Routing to ${path}`)
          this.$router.push(path)
          return
        }
        // Should not get here
        console.log(`**** Routing to default path of /`)
        this.$router.push('/')
      }
      return
    }



    //   this.loggedIn = this.$route.query.loggedIn
    //   this.loggedInReturn = this.$route.query.loggedInReturn
    //   this.notLoggedIn = this.$route.query.notLoggedIn
    //   this.notLoggedInReturn = this.$route.query.notLoggedInReturn
    // } else {
    //   console.error(`RouteToPage called without query parameters`);
    // }
    // return


    if (DEBUG) {
      // Display the nice page

      if (this.$authservice) {
        this.initialAuthenticated = true
      } else {
        this.initialAuthenticated = false
      }
    } else {

      // Do the redirect, unless we are on the server
      if (!process.server) {
        setTimeout(this.doTheRedirect, 50)
      }
    }
  },
  methods: {
    doTheRedirect: function () {
      console.log(`doTheRedirect()`);
      let path
      let returnTo
      if (this.$authservice && this.$authservice.user) {
        path = this.loggedIn
        returnTo = this.loggedInReturn
      } else {
        path = this.notLoggedIn
        returnTo = this.notLoggedInReturn
      }
      //alert(`path=${path}, returnTo=${returnTo}`)
      console.log(`redirecting to ${path}...`);
      if (returnTo) {
        this.$router.push(path, { query: { returnTo: returnTo }})
      } else {
        this.$router.push(path)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.card {
  width: 300px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 10px;
  background-color: #f2f2f2;
}
</style>
