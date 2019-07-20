<template>
  <a-locale-provider :locale="locale">
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
  </a-locale-provider>
</template>
<script>
import VueHeader from '~/components/Header'
import VueFooter from '~/components/Footer'
import koKR from 'ant-design-vue/lib/locale-provider/ko_KR'
export default {
  components: {
    VueHeader,
    VueFooter
  },
  data: _ => ({
    locale: koKR
  })
}
</script>