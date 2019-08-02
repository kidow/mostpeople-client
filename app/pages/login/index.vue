<template>
  <div class="auth__box">
    <div class="auth__logo">
      <vue-logo />
    </div>
    <vue-auth-login />
  </div>
</template>

<script>
import VueLogo from '~/components/Logo'
import VueAuthLogin from '~/components/Auth/Login'
export default {
  layout: 'auth',
  components: {
    VueAuthLogin,
    VueLogo
  },
  head: _ => ({
    title: '로그인 - 모스트피플',
    head: {
      script: [
        {
          src: `https://www.google.com/recaptcha/api.js?render=${process.env.RECAPTCHA_KEY}`
        }
      ]
    }
  }),
  middleware: ['isLoggedIn']
}
</script>

<style lang="scss" scoped>
.auth__box {
  text-align: center;
  .auth__logo {
    padding-bottom: 1rem;
  }
}
</style>
