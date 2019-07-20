<template>
  <div>{{ $route.query.keyword }}</div>
</template>

<script>
export default {
  mounted() {
    console.log(this.$route)
  }
}
</script>