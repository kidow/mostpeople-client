<template>
  <div class="card__container">
    <div class="img__container" :style="`background-image: url(${src})`">
      <!-- <img :src="src" alt="thumbnail" /> -->
    </div>
    <span class="card__title">{{ title }}</span>
    <span class="card__category">{{ category }}</span>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    category: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.card__container {
  max-width: 200px;
  img {
    max-width: inherit;
  }
}
</style>
