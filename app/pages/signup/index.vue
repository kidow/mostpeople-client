<template>
  <div class="signup__container">
    <a-steps :current="step" v-if="!$device.isMobile" style="margin-bottom: 12px;">
      <a-step title="가입 수단" />
      <a-step title="이메일 인증" />
      <a-step title="기본 정보" />
    </a-steps>
    <vue-auth-signup :step="step" @count="val => step = val" />
  </div>
</template>

<script>
import VueAuthSignup from '~/components/Auth/Signup'
export default {
  layout: 'auth',
  head: _ => ({
    title: '회원가입 - 모스트피플'
  }),
  data: _ => ({
    step: 0
  }),
  components: {
    VueAuthSignup
  },
  middleware: ['isLoggedIn']
}
</script>

<style lang="scss" scoped>
.ant-steps {
  padding-bottom: 1rem;
}
</style>
