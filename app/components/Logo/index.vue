<template>
  <nuxt-link to="/">MOSTPEOPLE</nuxt-link>
</template>

<script>
export default {
  name: 'Logo'
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/color.scss';

a {
  color: $brand-color;
  font-weight: 300;
  font-size: 24px;
  &:hover {
    text-decoration: none;
  }
}
</style>
