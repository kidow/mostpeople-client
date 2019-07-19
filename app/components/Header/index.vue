<template>
  <header>
    <vue-logo />
  </header>
</template>

<script>
import VueLogo from '~/components/Logo'
export default {
  name: 'Header',
  components: {
    VueLogo
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/media.scss';

header {
  padding-top: 3rem;
  @include media('<phone') {
    padding-top: 1rem;
  }
}
</style>
 