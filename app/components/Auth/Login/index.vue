<template>
  <div class="auth__box">
    <button class="login-button" @click="OAuthLogin('/auth/facebook')">
      <img src="~/assets/icons/facebook.png" alt="facebook" />
      페이스북으로 로그인
    </button>
    <div style="height: 12px" />
    <button class="login-button" @click="OAuthLogin('/auth/google')">
      <img src="~/assets/icons/google.png" alt="google" />
      구글로 로그인
    </button>
    <!-- <div style="height: 12px" />
    <button class="login-button" @click="OAuthLogin('/auth/kakao')">
      <img src="~/assets/icons/kakao.png" alt="kakao" />
      카카오로 로그인
    </button>-->
    <!-- <div style="height: 12px" />
    <button class="login-button" @click="OAuthLogin('/auth/naver')">
      <img src="~/assets/icons/naver.png" alt="naver" />
      네이버로 로그인
    </button>-->
    <a-divider>또는</a-divider>
    <form @submit.prevent="onSubmit">
      <a-input placeholder="이메일" v-model="email" size="large" />
      <div style="height: 12px" />
      <a-input placeholder="비밀번호" type="password" v-model="password" size="large" />
      <div style="height: 12px" />
      <div style="text-align: right">
        <nuxt-link to="/forgot">비밀번호 찾기</nuxt-link>
      </div>
      <div style="height: 12px" />
      <a-button
        block
        id="login"
        :disabled="!email || !password"
        :class="{ disabled: !email || !password }"
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
      let data = {
        email: this.email,
        password: this.password
      }
      try {
        // const token = await this.$recaptcha.execute('login')
        // if (!token) return
        // data.token = token
        await this.$store.dispatch('auth/LOGIN', data)
        this.redirectAfterLogin()
      } catch (err) {
        this.loading = false
        console.log(err)
        this.notifyError(err ? err.response.data.message : '')
      }
    },
    OAuthLogin(url) {
      const { query } = this.$route
      const redirect = query.redirect ? `?redirect=${query.redirect}` : ''
      location.href = `${process.env.API_BASE_URL}${url}${redirect}`
    }
  },
  data: _ => ({
    email: '',
    password: '',
    loading: false
  }),
  mounted() {
    this.$recaptcha.init()
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/shadow.scss';
@import '~/assets/scss/color.scss';

.auth__box {
  background: white;
  box-shadow: $box-shadow-1;
  padding: 22px;
  .login-button {
    background: white;
    width: 100%;
    height: 40px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    padding: 0 15px;
    cursor: pointer;
    color: $oc-gray-7;
    border: 1px solid #d9d9d9;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    &:hover {
      filter: brightness(0.95);
    }
    img {
      width: 16px;
      margin-right: 8px;
    }
  }
  #login {
    background: $brand-color;
    border-color: $brand-color;
    color: white;
    &:hover {
      filter: brightness(0.95);
    }
  }
}
</style>