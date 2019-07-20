<template>
  <a-locale-provider :locale="locale">
    <a-row>
      <a-col :lg="3" :sm="2" :xs="1" />
      <a-col :lg="18" :sm="20" :xs="22">
        <slot />
      </a-col>
      <a-col :lg="3" :sm="2" :xs="1" />
    </a-row>
  </a-locale-provider>
</template>

<script>
import koKR from 'ant-design-vue/lib/locale-provider/ko_KR'
export default {
  name: 'Layout',
  data: _ => ({
    locale: koKR
  })
}
</script>