<template>
  <a-breadcrumb separator=">">
    <a-breadcrumb-item key="0">
      <nuxt-link to="/">
        <a-icon type="home" />
      </nuxt-link>
    </a-breadcrumb-item>
    <a-breadcrumb-item v-for="item in breadcrumbs" :key="item.name">
      <nuxt-link :to="item.url">{{ item.name }}</nuxt-link>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script>
export default {
  name: 'Breadcrumb',
  props: {
    breadcrumbs: {
      type: Array,
      default: _ => []
    }
  }
}
</script>