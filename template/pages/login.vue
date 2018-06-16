<template lang="pug">
 .my-login-page
   section
     br
     br
     authservice-login(@userchange="onUserChange")
 </template>

 <script>
 import PublicHeader from '@/components/PublicHeader.vue'
 import PublicFooter from '@/components/PublicFooter.vue'

 export default {
   name: 'a3-login-page',
   components: {
     PublicHeader,
     PublicFooter
   },
   methods: {
     onUserChange () {
       if (this.$authservice.user) {
         this.$router.push('/user/privatePage')
       }
     }
   }
 }
 </script>
