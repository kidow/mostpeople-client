<template>
  <nuxt-link to="/">
    <img src="~/assets/icons/logo.png" alt="logo" />
  </nuxt-link>
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
  img {
    width: 166px;
  }
}
</style>
