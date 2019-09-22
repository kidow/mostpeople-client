<template>
  <a-locale-provider :locale="locale">
    <a-row>
      <a-col :lg="lg" :sm="2" :xs="1" />
      <a-col :lg="24 - (lg * 2)" :sm="20" :xs="22">
        <slot />
      </a-col>
      <a-col :lg="lg" :sm="2" :xs="1" />
      <vue-navigation v-if="$device.isMobile" />
    </a-row>
  </a-locale-provider>
</template>

<script>
import koKR from 'ant-design-vue/lib/locale-provider/ko_KR'
import VueNavigation from '~/components/Navigation'
export default {
  name: 'Layout',
  data: _ => ({
    locale: koKR
  }),
  computed: {
    lg() {
      const { path } = this.$route
      if (path.indexOf('/post') > -1) return 5
      else return 3
    }
  },
  components: {
    VueNavigation
  }
}
</script>