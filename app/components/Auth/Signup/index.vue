<template>
  <div class="auth__box">
    <template v-if="step === 0">
      <a-button icon="facebook" size="large" id="facebook" block @click="facebookSignup">페이스북으로 가입</a-button>
      <div style="height: 12px" />
      <a-button icon="google" size="large" id="google" block @click="googleSignup">구글로 가입</a-button>
      <div style="height: 12px" />
      <button id="kakao" class="signup-button" @click="kakaoSignup">
        <img src="~/assets/icons/kakao.png" alt="kakao" />
        카카오로 가입
      </button>
      <div style="height: 12px" />
      <button id="naver" class="signup-button" @click="naverSignup">
        <img src="~/assets/icons/naver.png" alt="naver" />
        네이버로 가입
      </button>
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
          :class="{ disabled: !email }"
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
          html-type="submit"
          type="primary"
          size="large"
          :disabled="!code"
          :class="{ disabled: !code }"
        >인증코드 확인</a-button>
        <div style="height: 12px" />
        <a-button block id="signup" type="primary" size="large" @click="$emit('count', 0)">다시 보내기</a-button>
      </form>
    </template>

    <template v-else>
      <form @submit.prevent="onSignup">
        <!-- <a-input v-model="email" size="large" disabled /> -->
        <a-input v-model="email" size="large" />
        <div style="height: 12px" />
        <a-input v-model="nickname" placeholder="닉네임 (3 ~ 10자리)" size="large" />
        <div style="height: 12px" />
        <a-input v-model="password" placeholder="비밀번호 (8 ~ 20자리)" type="password" size="large" />
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
          <nuxt-link to="/privacy" target="_blank">개인정보처리방침</nuxt-link>에 동의합니다.
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
          :disabled="!email || !nickname || !password || !checked"
          :class="{ disabled: !email || !nickname || !password || !checked }"
        >가입하기</a-button>
      </form>
    </template>
  </div>
</template>

<script>
import isEmail from 'validator/lib/isEmail'
import isLength from 'validator/lib/isLength'
import debounce from 'lodash.debounce'
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
        this.codeConfirm = data.authCode
        this.loading = false
        this.$emit('count', 1)
      } catch (err) {
        this.loading = false
        console.log(err)
        this.notifyError(err.response.data.message)
      }
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
    facebookSignup() {
      location.href = `${process.env.API_BASE_URL}/auth/facebook`
    },
    googleSignup() {
      location.href = `${process.env.API_BASE_URL}/auth/google`
    },
    kakaoSignup() {
      alert('(선택) 카카오계정(이메일)에 꼭 동의해주세요.')
      location.href = `${process.env.API_BASE_URL}/auth/kakao`
    },
    naverSignup() {
      location.href = `${process.env.API_BASE_URL}/auth/naver`
    },
    verifyEmail() {
      if (this.code != this.codeConfirm)
        return (this.error = '코드가 일치하지 않습니다')
      this.$emit('count', 2)
      this.error = ''
    },
    onSelect(val) {
      this.isOpen = false
      this.occupationId = val
    },
    async onSignup() {
      this.error = ''
      if (!isLength(this.nickname, { min: 3, max: 10 }))
        return (this.error = '닉네임은 3 ~ 10자리로 입력해주세요')
      if (!isLength(this.password, { min: 8, max: 20 }))
        return (this.error = '비밀번호는 8 ~ 20자리로 입력해주세요')
      this.loading = true
      const payload = {
        email: this.email,
        nickname: this.nickname,
        password: this.password,
        occupationId: this.occupationId
      }
      try {
        await this.$store.dispatch('auth/SIGN_UP', payload)
        this.messageSuccess('가입을 환영합니다')
        this.$router.push('/')
      } catch (err) {
        this.loading = false
        console.log(err)
        this.notifyError(err.response.data.message)
      }
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
    occupationId: '',
    isOpen: false,
    fetching: false,
    dataSource: []
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
  .signup-button {
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
    background: #ffde00;
    color: black;
  }
  #naver {
    background: #3eaf0e;
    color: white;
  }
  #signup {
    background: $brand-color;
    border-color: $brand-color;
    color: white;
    &:hover {
      filter: brightness(0.9);
    }
  }
  #resend {
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