<template>
  <div class="signup__container">
    <a-steps progressDot :current="step" size="small">
      <a-step title="가입 수단" />
      <a-step title="이메일 인증" />
      <a-step title="기본 정보" />
    </a-steps>
    <vue-auth-signup />
  </div>
</template>

<script>
import VueAuthSignup from '~/components/Auth/Signup'
export default {
  layout: 'auth',
  data: _ => ({
    step: 0
  }),
  components: {
    VueAuthSignup
  }
}
</script>

<style lang="scss" scoped>
.signup__container {
  // width: 100%;
}
</style>
