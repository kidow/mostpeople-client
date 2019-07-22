<template>
  <div class="nav-bar__container">
    <span class="bar__label">어제 올라온 글</span>
    <vue-count-to class="bar__value" :end-val="count" :duration="1500">{{ count }}</vue-count-to>
    <span class="bar__label">어제 달린 댓글</span>
    <vue-count-to class="bar__value" :end-val="count" :duration="1500">{{ count }}</vue-count-to>
  </div>
</template>

<script>
import VueCountTo from 'vue-count-to'
export default {
  components: {
    VueCountTo
  },
  props: {
    count: {
      type: Number,
      default: 11440
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/color.scss';

.nav-bar__container {
  display: flex;
  padding: 0.5rem;
  color: $brand-color;
  margin: 1rem 0;
}
</style>
