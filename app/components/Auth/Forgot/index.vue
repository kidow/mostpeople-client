<template>
  <div class="auth__box">
    <template v-if="step <= 1">
      <form @submit.prevent="submitEmail">
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
          html-type="submit"
          block
        >이메일 전송</a-button>
      </form>
    </template>
    <template v-else>
      <form @submit.prevent="resetPassword">
        <a-input size="large" v-model="email" disabled />
        <div style="height: 12px" />
        <a-input size="large" v-model="password" type="password" placeholder="새 비밀번호 (8 ~ 20자)" />
        <div style="height: 12px" />
        <a-input size="large" v-model="passwordConfirm" type="password" placeholder="새 비밀번호 확인" />
        <div style="height: 12px" />
        <a-alert v-if="error" showIcon :message="error" type="error" banner />
        <a-alert v-if="success" showIcon message="성공적으로 변경하였습니다" type="success" banner />
        <div style="height: 12px" v-if="error || success" />
        <a-button
          block
          :class="{ disabled: !password || !passwordConfirm }"
          :disabled="!password || !passwordConfirm"
          size="large"
          :loading="loading"
          html-type="submit"
        >비밀번호 변경</a-button>
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
    passwordConfirm: '',
    success: false
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
        },
        params: {
          type: 'forgot'
        }
      }
      try {
        const { data } = await this.$axios(options)
        this.codeConfirm = data.code
        this.loading = false
        this.error = ''
      } catch (err) {
        console.log(err)
        this.error = err.response.data.message
        this.loading = false
      }
    },
    verifyEmail() {
      if (!this.code !== this.codeConfirm)
        return (this.error = '코드가 일치하지 않습니다')
      this.$emit('count')
    },
    async resetPassword() {
      this.error = ''
      if (!isLength(this.password, { min: 8, max: 20 }))
        return (this.error = '비밀번호는 8 ~ 20자 이내입니다')
      if (this.password !== this.passwordConfirm)
        return (this.error = '비밀번호가 일치하지 않습니다')
      this.loading = true
      const options = {
        url: '/auth/forgot',
        method: 'put',
        data: {
          email: this.email,
          password: this.password
        }
      }
      try {
        await this.$axios(options)
        this.success = true
        this.$router.push('/')
      } catch (err) {
        this.error = err.response.data.message
        this.loading = false
        console.log(err)
      }
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