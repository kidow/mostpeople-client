<template>
  <div>
    <a-row>
      <a-col :lg="3" :sm="2" :xs="1"></a-col>
      <a-col :lg="18" :sm="20" :xs="22">
        <vue-header />
        <nuxt />
        <a-divider />
        <vue-footer />
      </a-col>
      <a-col :lg="3" :sm="2" :xs="1"></a-col>
    </a-row>
    <a-back-top />
  </div>
</template>
<script>
import VueHeader from '~/components/Header'
import VueFooter from '~/components/Footer'
export default {
  components: {
    VueHeader,
    VueFooter
  }
}
</script>