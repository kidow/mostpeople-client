<template>
  <vue-layout>
    <vue-header />
    <a-divider />
    <nuxt />
    <a-divider />
    <vue-footer />
    <a-back-top />
  </vue-layout>
</template>
<script>
import VueHeader from '~/components/Header'
import VueFooter from '~/components/Footer'
import VueLayout from '~/components/Layout'
export default {
  components: {
    VueHeader,
    VueFooter,
    VueLayout
  }
}
</script>