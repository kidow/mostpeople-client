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
  }
}
</script>