<template>
  <div class="auth__box">
    <a-button icon="facebook" size="large" id="facebook" block @click="facebookLogin">페이스북으로 로그인</a-button>
    <div style="height: 12px" />
    <a-button icon="google" size="large" id="google" block @click="googleLogin">구글로 로그인</a-button>
    <div style="height: 12px" />
    <button id="kakao" class="login-button" @click="kakaoLogin">
      <img src="~/assets/icons/kakao.png" alt="kakao" />
      카카오로 가입
    </button>
    <a-divider>또는</a-divider>
    <form @submit.prevent="onSubmit">
      <a-input placeholder="이메일" v-model="email" size="large" />
      <div style="height: 12px" />
      <a-input placeholder="패스워드" type="password" v-model="password" size="large" />
      <div style="height: 12px" />
      <div style="text-align: right">
        <nuxt-link to="/forgot">비밀번호 찾기</nuxt-link>
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
      let data = {
        email: this.email,
        password: this.password
      }
      try {
        const token = await this.$recaptcha.execute('login')
        if (!token) return
        data.token = token
        await this.$store.dispatch('auth/LOGIN', data)
        this.redirectAfterLogin()
      } catch (err) {
        this.loading = false
        console.log(err)
        this.notifyError(err.response.data.message)
      }
    },
    facebookLogin() {
      location.href = `${process.env.API_BASE_URL}/auth/facebook`
    },
    googleLogin() {
      location.href = `${process.env.API_BASE_URL}/auth/google`
    },
    kakaoLogin() {
      location.href = `${process.env.API_BASE_URL}/auth/kakao`
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
  .login-button {
    width: 100%;
    height: 40px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    padding: 0 15px;
    cursor: pointer;
    &:hover {
      filter: brightness(0.9);
    }
    img {
      width: 16px;
      margin-right: 8px;
    }
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  #facebook {
    background: #3b5998;
    border-color: #3b5998;
    color: white;
    &:hover {
      filter: brightness(0.9);
    }
  }
  #google {
    background: #db4437;
    border-color: #db4437;
    color: white;
    &:hover {
      filter: brightness(0.9);
    }
  }
  #kakao {
    background: #ffe812;
    color: #000000;
  }
  #login {
    background: $brand-color;
    border-color: $brand-color;
    color: white;
    &:hover {
      filter: brightness(0.9);
    }
  }
}
</style>