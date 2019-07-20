<template>
  <div class="signup__container">
    <!-- <a-steps progressDot :current="step" size="small">
      <a-step title="가입 수단" />
      <a-step title="이메일 인증" />
      <a-step title="기본 정보" />
    </a-steps>-->
    <vue-auth-signup :step="step" @count="step += 1" />
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
  }
}
</script>

<style lang="scss" scoped>
.ant-steps {
  padding-bottom: 1rem;
}
</style>
