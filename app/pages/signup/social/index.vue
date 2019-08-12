<template>
  <div class="auth__box">
    <form @submit.prevent="socialSignUp">
      <a-input v-model="email" size="large" disabled />
      <div style="height: 12px" />
      <a-input v-model="nickname" placeholder="닉네임 (3 ~ 8자리)" size="large" />
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
</template>

<script>
import debounce from 'lodash.debounce'
export default {
  layout: 'auth',
  mounted() {
    this.email = this.$route.query.email
  },
  data: _ => ({
    email: '',
    occupationId: '',
    nickname: '',
    checked: false,
    loading: false,
    error: '',
    isOpen: false,
    fetching: false,
    dataSource: []
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
      this.loading = true
      const options = {
        url: '/auth/signup/social',
        method: 'post',
        data: {
          email: this.email,
          nickname: this.nickname,
          occupationId: this.occupationId
        }
      }
      try {
        await this.$axios(options)
        this.$router.push('/')
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
  middleware: ['isLoggedIn']
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