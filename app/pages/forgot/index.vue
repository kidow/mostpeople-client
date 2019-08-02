<template>
  <div class="auth__box">
    <a-steps :current="step" v-if="!$device.isMobile" style="margin-bottom: 12px">
      <a-step title="이메일 전송" />
      <a-step title="이메일 인증" />
      <a-step title="비밀번호 변경" />
    </a-steps>
    <vue-auth-forgot :step="step" @count="step += 1" />
  </div>
</template>

<script>
import VueAuthForgot from '~/components/Auth/Forgot'
export default {
  layout: 'auth',
  head: _ => ({
    title: '비밀번호 초기화 - 모스트피플'
  }),
  components: {
    VueAuthForgot
  },
  data: _ => ({
    step: 0
  }),
  middleware: ['isLoggedIn']
}
</script>