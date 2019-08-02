<template>
  <div class="auth__box">
    <a-button icon="facebook" size="large" id="facebook" block @click="facebookLogin">페이스북으로 로그인</a-button>
    <div style="height: 12px" />
    <a-button icon="google" size="large" id="google" block @click="googleLogin">구글로 로그인</a-button>
    <a-divider>또는</a-divider>
    <form @submit.prevent="onSubmit">
      <a-input placeholder="이메일" v-model="email" size="large" />
      <div style="height: 12px" />
      <a-input placeholder="패스워드" type="password" v-model="password" size="large" />
      <div style="height: 12px" />
      <div style="text-align: right">
        <nuxt-link to="/forgot">
          <a-icon type="question-circle" />기억이 안나시나요?
        </nuxt-link>
      </div>
      <div style="height: 12px" />
      <a-button
        block
        id="login"
        :disabled="!email || !password"
        :loading="loading"
        type="primary"
        html-type="submit"
        size="large"
      >로그인</a-button>
    </form>
    <div style="padding: 1rem 1rem 0; text-align: center">
      <nuxt-link to="/signup">계정이 없으신가요?</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthLogin',
  methods: {
    redirectAfterLogin() {
      const { redirect } = this.$route.query
      this.$router.push(redirect || '/')
    },
    async onSubmit() {
      this.loading = true
      let options = {
        url: '/auth/login',
        method: 'post',
        data: {
          email: this.email,
          password: this.password
        }
      }
      try {
        const token = await this.$recaptcha.execute('login')
        if (!token) return
        options.data.token = token
        await this.$store.dispatch('auth/LOGIN', options.data)
        this.redirectAfterLogin()
      } catch (err) {
        this.loading = false
        console.log(err)
        this.notify({
          type: 'error',
          message: '실패',
          description: err.response.data.message
        })
      }
    },
    async facebookLogin() {
      location.href = `${process.env.API_BASE_URL}/auth/facebook`
    },
    async googleLogin() {
      location.href = `${process.env.API_BASE_URL}/auth/google`
    }
  },
  data: _ => ({
    email: '',
    password: '',
    loading: false
  })
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/shadow.scss';
@import '~/assets/scss/color.scss';

.auth__box {
  background: white;
  box-shadow: $box-shadow-1;
  padding: 22px;
  button {
    color: white;
  }
  #facebook {
    background: #3b5998;
    border-color: #3b5998;
  }
  #google {
    background: #db4437;
    border-color: #db4437;
  }
  #login {
    background: $brand-color;
    border-color: $brand-color;
  }
}
</style>