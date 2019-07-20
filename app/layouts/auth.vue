<template>
  <div class="auth__container">
    <a-row>
      <a-col :md="8" :sm="6" :xs="2" />
      <a-col :md="8" :sm="12" :xs="20">
        <nuxt />
      </a-col>
      <a-col :md="8" :sm="6" :xs="2" />
    </a-row>
  </div>
</template>

<script>
export default {
  data: _ => ({})
}
</script>

<style lang="scss" scoped>
.auth__container {
  padding: 1rem 0;
}
</style>
