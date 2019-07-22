<template>
  <div class="auth__box">
    <template v-if="step === 0">
      <a-button icon="facebook" size="large" id="facebook" block @click="facebookSignup">페이스북으로 가입</a-button>
      <div style="height: 12px" />
      <a-button icon="google" size="large" id="google" block @click="googleSignup">구글로 가입</a-button>
      <a-divider>또는</a-divider>
      <form @submit.prevent="submitEmail">
        <a-input placeholder="이메일" v-model="email" size="large" />
        <div style="height: 12px" />
        <a-alert v-if="error" showIcon :message="error" type="error" banner />
        <div style="height: 12px" v-if="error" />
        <a-button
          block
          id="signup"
          :disabled="!email"
          :loading="loading"
          html-type="submit"
          type="primary"
          size="large"
        >이메일로 가입</a-button>
      </form>
    </template>
    <template v-else-if="step === 1">
      <form @submit.prevent="verifyEmail">
        <span class="verify">인증 메일의 코드를 입력해주세요</span>
        <a-input placeholder="코드" v-model="code" size="large" />
        <div style="height: 12px" />
        <a-alert v-if="error" showIcon :message="error" type="error" banner />
        <div style="height: 12px" v-if="error" />
        <a-button
          block
          id="signup"
          :loading="loading"
          @click="verifyEmail"
          html-type="submit"
          type="primary"
          size="large"
          :disabled="!code"
        >이메일 인증</a-button>
      </form>
    </template>
    <template v-else>
      <form @submit.prevent="onSignup">
        <a-input v-model="email" size="large" disabled />
        <div style="height: 12px" />
        <a-input v-model="nickname" placeholder="닉네임 (4 ~ 8자리)" size="large" />
        <div style="height: 12px" />
        <a-input v-model="password" placeholder="비밀번호 (8 ~ 20자리)" type="password" size="large" />
        <div style="height: 12px" />
        <a-auto-complete
          :dataSource="jobData"
          placeholder="직업 (선택)"
          @select="onSelect"
          @search="onSearch"
          size="large"
        />
        <div style="height: 12px" />
        <a-checkbox :checked="checked" @change="e => this.checked = e.target.checked">
          <nuxt-link to="/terms" target="_blank">이용약관</nuxt-link>에 동의합니다
        </a-checkbox>
        <div style="height: 12px" />
        <a-alert v-if="error" showIcon :message="error" type="error" banner />
        <div style="height: 12px" v-if="error" />
        <a-button
          block
          id="signup"
          :loading="loading"
          @click="onSignup"
          html-type="submit"
          size="large"
          :disabled="!email || !nickname || !password || !checked || !job"
        >가입하기</a-button>
      </form>
    </template>
  </div>
</template>

<script>
import isEmail from 'validator/lib/isEmail'
import isLength from 'validator/lib/isLength'
export default {
  name: 'AuthSignup',
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
        this.$emit('count')
      } catch (err) {
        this.loading = false
        console.log(err)
      }
    },
    async facebookSignup() {},
    async googleSignup() {},
    verifyEmail() {
      if (this.code !== this.codeConfirm)
        return (this.error = '코드가 일치하지 않습니다')
      this.$emit('count')
      this.error = ''
    },
    async onSignup() {
      console.log(this.job)
      return
      this.error = ''
      if (!isLength(this.nickname, { min: 4, max: 8 }))
        return (this.error = '닉네임은 4 ~ 8자리로 입력해주세요')
      if (!isLength(this.password, { min: 8, max: 20 }))
        return (this.error = '비밀번호는 8 ~ 20자리로 입력해주세요')
      this.loading = true
      const options = {
        url: '/auth/signup',
        method: 'post',
        data: {
          email: this.email,
          nickname: this.nickname,
          password: this.password
        }
      }
      try {
        await this.$axios(options)
        this.$router.push('/')
      } catch (err) {
        console.log(err)
      }
    },
    onSearch(val) {
      console.log('search :', val)
    },
    onSelect(val) {
      console.log('select :', val)
    }
  },
  data: _ => ({
    email: '',
    loading: false,
    error: '',
    code: '',
    codeConfirm: '',
    nickname: '',
    password: '',
    checked: false,
    job: '',
    jobData: ['백수', '개발자']
  }),
  props: {
    step: {
      type: Number,
      default: 0
    }
  },
  async asyncData({ app }) {
    // const options = {
    //   url: '/jobs',
    //   methods: 'get'
    // }
    // try {
    //   const { data } = await app.$axios(options)
    //   this.jobData = data
    // } catch (err) {
    //   console.log(err)
    // }
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
  }
  #facebook {
    background: #3b5998;
    border-color: #3b5998;
  }
  #google {
    background: #db4437;
    border-color: #db4437;
  }
  #signup {
    background: $brand-color;
    border-color: $brand-color;
  }
}
</style>