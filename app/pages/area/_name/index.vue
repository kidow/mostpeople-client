<template>
  <div>{{ $route.params.name }}</div>
</template>

<script>
export default {
  validate({ params }) {
    return /[a-z]/g.test(params.name)
  }
}
</script>1