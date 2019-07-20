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
      location.href = redirect || '/'
    },
    async onSubmit() {
      const options = {
        url: '/auth/login',
        method: 'post',
        data: {
          email: this.email,
          password: this.password
        }
      }
      try {
        await this.$axios(options)
        this.redirectAfterLogin()
      } catch (err) {
        console.log(err)
      }
    },
    async facebookLogin() {
      let clientId = process.env.FACEBOOK_APP_ID

      const getToken = () => {
        return new Promise((resolve, reject) => {
          const url = ``

          const popup = window.open(
            url,
            'social_login',
            'menubar=1, resizable=1, width=400, height=600'
          )

          const f = function(e) {
            if (e.origin !== process.env.BASE_URL) return

            const data = JSON.parse(e.data)
            if (!data.success) {
              popup.close()
              reject(data.message)
            } else {
              resolve(data.access_token)
            }
            window.removeEventListener('message', f, false)
          }

          window.addEventListener('message', f)
        })
      }
      try {
        const accessToken = await getToken()
        return
        this.redirectAfterLogin()
      } catch (err) {
        this.error = err.response.data.message
        console.log(err)
      }
    },
    async googleLogin() {
      let clientId = process.env.GOOGLE_CLIENT_ID
      let state = Math.random()
        .toString(36)
        .substring(2)

      const getToken = () => {
        return new Promise((resolve, reject) => {
          const url = `https://accounts.google.com/o/oauth2/auth?redirect_uri=${process.env.API_BASE_URL}/auth/naver&client_id=${process.env.GOOGLE_APP_KEY}&response_type=code&approval_state=force&state=profile&scope=email%20profile`

          const popup = window.open(
            url,
            'social_login',
            'menubar=1, resizble=1, width=400, height=600'
          )

          const f = function(e) {
            if (e.origin !== process.env.BASE_URL) return

            const data = JSON.parse(e.data)
            if (!data.success) {
              popup.close()
              reject(data.message)
            } else {
              resolve(data.access_token)
            }
            window.removeEventListener('message', f, false)
          }

          window.addEventListener('message', f)
        })
      }

      try {
        const accessToken = await getToken()
        return
        this.redirectAfterLogin()
      } catch (err) {
        this.error = err.response.data.message
        console.log(err)
      }
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