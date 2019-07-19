<template>
  <div>
    <a-row>
      <a-col :lg="3" :sm="2" :xs="1"></a-col>
      <a-col :lg="18" :sm="20" :xs="22">
        <nuxt />
      </a-col>
      <a-col :lg="3" :sm="2" :xs="1"></a-col>
    </a-row>
    <a-back-top />
  </div>
</template>
<script>
export default {}
</script>