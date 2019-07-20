<template>
  <div class="auth__box">
    <template v-if="step <= 1">
      <form @submit.prevent="step ? verifyEmail : submitEmail">
        <a-input size="large" :disabled="step === 1" v-model="email" placeholder="이메일을 입력해주세요" />
        <div style="height: 12px" />
        <a-input size="large" v-if="step === 1" v-model="code" placeholder="인증코드" />
        <div style="height: 12px" v-if="step === 1" />
        <a-alert v-if="error" showIcon :message="error" type="error" banner />
        <div style="height: 12px" v-if="error" />
        <a-button
          :class="{ disabled: !email }"
          :disabled="!email"
          size="large"
          :loading="loading"
          block
        >이메일 전송</a-button>
      </form>
    </template>
    <template v-else>
      <form @submit="resetPassword">
      <a-input size="large" v-model="password" type="password" placeholder="새 비밀번호 (8 ~ 20자)" />
        <div style="height: 12px" />
        <a-input size="large" v-model="passwordConfirm" type="password" placeholder="새 비밀번호 확인" /> 
        <div style="height: 12px" />
        <a-alert v-if="error" showIcon :message="error" type="error" banner />
        <div style="height: 12px" v-if="error" />
        <a-button 
          block 
          :class="{ disabled: !password || !passwordConfirm }" :disabled="!password || !passwordConfirm" 
          size="large" 
          :loading="loading">비밀번호 변경</a-button>
      </form>
    </template>
  </div>
</template>

<script>
import isEmail from 'validator/lib/isEmail'
import isLength from 'validator/lib/isLength'
export default {
  name: 'AuthForgot',
  props: {
    step: {
      type: Number,
      default: 0
    }
  },
  data: _ => ({
    email: '',
    loading: false,
    error: '',
    code: '',
    codeConfirm: '',
    password: '',
    passwordConfirm: ''
  }),
  methods: {
    async submitEmail() {
      this.error = ''
      if (!isEmail(this.email))
        return (this.error = '이메일 형식을 입력해주세요')
      this.loading = true
      const options = {
        url: '/auth/email',
        method: 'post',
        data: {
          email: this.email
        }
      }
      try {
        const { data } = await this.$axios(options)
        this.codeConfirm = data.code
        this.loading = false
        this.error = ''
      } catch (err) {
        console.log(err)
        this.notify({
          type: 'error',
          message: '오류',
          description: err.response.data.message
        })
        this.loading = false
      }
    },
    verifyEmail() {
      if (!this.code !== this.codeConfirm) return (this.error = '')
    },
    async resetPassword() {
      this.error = ''
    }
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
  button {
    color: white;
    background: $brand-color;
    border-color: $brand-color;
    &.disabled {
      opacity: 0.8;
      &:hover {
        background: $brand-color;
        color: white;
      }
    }
  }
}
</style>