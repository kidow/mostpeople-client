<template>
  <vue-layout>
    <nuxt />
    <a-divider />
    <vue-footer />
    <a-back-top />
  </vue-layout>
</template>

<script>
import VueLayout from '~/components/Layout'
import VueFooter from '~/components/Footer'
export default {
  components: {
    VueFooter,
    VueLayout
  }
}
</script>
