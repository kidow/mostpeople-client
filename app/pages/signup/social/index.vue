<template>
  <div class="signup__container">
    <a-steps :current="2" v-if="!$device.isMobile">
      <a-step title="가입 수단" />
      <a-step title="이메일 인증" />
      <a-step title="기본 정보" />
    </a-steps>
    <div class="auth__box">
      <form @submit.prevent="socialSignUp">
        <a-input v-model="email" size="large" :disabled="emailVerified" placeholder="이메일" />
        <div style="height: 12px" />
        <a-input v-model="nickname" placeholder="닉네임 (3 ~ 10자리)" size="large" />
        <div style="height: 12px" />
        <a-auto-complete
          @select="onSelect"
          size="large"
          @search="onSearch"
          placeholder="직업 (선택)"
          :open="isOpen"
          optionLabelProp="text"
        >
          <a-spin v-if="fetching" size="small" />
          <template slot="dataSource">
            <a-select-option
              v-for="occupationId in dataSource"
              :key="occupationId.uuid"
              :text="occupationId.korName"
            >{{ occupationId.korName }}</a-select-option>
          </template>
        </a-auto-complete>
        <div style="height: 12px" />
        <a-checkbox :checked="checked" @change="e => this.checked = e.target.checked">
          <nuxt-link to="/terms" target="_blank">이용약관</nuxt-link>과
          <nuxt-link to="/privacy" target="_blank">개인정보처리방침</nuxt-link>에 동의합니다
        </a-checkbox>
        <div style="height: 12px" />
        <a-alert v-if="error" showIcon :message="error" type="error" banner />
        <div style="height: 12px" v-if="error" />
        <a-button
          block
          id="signup"
          :loading="loading"
          html-type="submit"
          size="large"
          :disabled="!email || !nickname || !checked"
        >가입하기</a-button>
      </form>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash.debounce'
import isEmail from 'validator/lib/isEmail'
import isLength from 'validator/lib/isLength'
export default {
  layout: 'auth',
  data: _ => ({
    email: '',
    occupationId: '',
    nickname: '',
    checked: false,
    loading: false,
    error: '',
    isOpen: false,
    fetching: false,
    dataSource: [],
    emailVerified: false
  }),
  methods: {
    onSelect(val) {
      this.isOpen = false
      this.occupationId = val
    },
    onSearch: debounce(async function(name) {
      if (!name) return
      const options = {
        url: '/occupations/search',
        method: 'get',
        params: { name }
      }
      try {
        this.fetching = true
        this.isOpen = false
        const { data } = await this.$axios(options)
        this.isOpen = true
        this.fetching = false
        this.dataSource = data
      } catch (err) {
        this.isOpen = false
        console.log(err)
        this.fetching = false
        this.notifyError(err.response.data.message)
      }
    }, 800),
    async socialSignUp() {
      this.error = ''
      if (!isEmail(this.email)) return (this.error = '이메일 형식이 아닙니다')
      if (!isLength(this.nickname, { min: 3, max: 10 }))
        return (this.error = '닉네임은 3 ~ 10자리로 입력해주세요')
      this.loading = true
      const options = {
        url: '/auth/signup/social',
        method: 'post',
        data: {
          email: this.email,
          nickname: this.nickname,
          occupationId: this.occupationId,
          emailVerified: this.emailVerified
        }
      }
      try {
        await this.$axios(options)
        this.$store.dispatch('auth/ME')
        this.messageSuccess('가입을 환영합니다')
        this.$router.push(this.$route.query.redirect || '/')
      } catch (err) {
        this.loading = false
        console.dir(err)
        this.notifyError(err.response.data.message)
      }
    }
  },
  head: _ => ({
    title: '소셜 가입 - 모스트피플'
  }),
  middleware: ['isLoggedIn'],
  async asyncData({ app, redirect }) {
    const options = {
      url: `/auth/email`,
      method: 'get'
    }
    try {
      const { data } = await app.$axios(options)
      if (!data) return redirect('/')
      return {
        email: data.email,
        emailVerified: !!data.emailVerified
      }
    } catch (err) {
      console.log(err)
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
}
</style>

<style lang="scss" scoped>
.ant-steps {
  padding-bottom: 1rem;
}
</style>
