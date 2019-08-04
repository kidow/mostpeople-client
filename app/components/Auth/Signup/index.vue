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
        <div class="verify">인증 메일의 코드를 입력해주세요</div>
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
        <a-input v-model="nickname" placeholder="닉네임 (3 ~ 8자리)" size="large" />
        <div style="height: 12px" />
        <a-input v-model="password" placeholder="비밀번호 (8 ~ 20자리)" type="password" size="large" />
        <div style="height: 12px" />
        <a-cascader
          expandTrigger="hover"
          size="large"
          :options="options"
          :showSearch="{filter}"
          @change="onChange"
          placeholder="직업 (선택)"
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
          :disabled="!email || !nickname || !password || !checked"
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
        },
        params: {
          type: 'verify'
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
        this.notifyError({ description: err.response.data.message })
      }
    },
    async facebookSignup() {
      location.href = `${process.env.API_BASE_URL}/auth/facebook`
    },
    async googleSignup() {
      location.href = `${process.env.API_BASE_URL}/auth/google`
    },
    verifyEmail() {
      if (this.code !== this.codeConfirm)
        return (this.error = '코드가 일치하지 않습니다')
      this.$emit('count')
      this.error = ''
    },
    async onSignup() {
      this.error = ''
      if (!isLength(this.nickname, { min: 3, max: 8 }))
        return (this.error = '닉네임은 3 ~ 8자리로 입력해주세요')
      if (!isLength(this.password, { min: 8, max: 20 }))
        return (this.error = '비밀번호는 8 ~ 20자리로 입력해주세요')
      this.loading = true
      const payload = {
        email: this.email,
        nickname: this.nickname,
        password: this.password
      }
      try {
        await this.$store.dispatch('auth/SIGN_UP', payload)
        this.$router.push('/')
      } catch (err) {
        this.loading = false
        console.log(err)
        this.notifyError({ descriptions: err.response.data.message })
      }
    },
    onChange(value, selectedOptions) {
      this.occupation = value[0]
      console.log(value, selectedOptions)
    },
    filter(inputValue, path) {
      return path.some(
        option =>
          option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
      )
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
    occupation: '',
    options: [
      {
        value: 'professional',
        label: '전문직',
        children: [
          {
            value: 'lawyer',
            label: '변호사'
          },
          {
            value: 'doctor',
            label: '의사'
          }
        ]
      },
      {
        value: 'student',
        label: '학생',
        children: [
          {
            value: 'elementary',
            label: '초등학생'
          },
          {
            value: 'middle',
            label: '중학생'
          },
          {
            value: 'high',
            label: '고등학생'
          },
          {
            value: 'university',
            label: '대학생'
          },
          {
            value: 'pregraduate',
            label: '대학원생'
          }
        ]
      }
    ]
  }),
  props: {
    step: {
      type: Number,
      default: 0
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
  .verify {
    margin-bottom: 12px;
    font-size: 20px;
    text-align: center;
  }
}
</style>