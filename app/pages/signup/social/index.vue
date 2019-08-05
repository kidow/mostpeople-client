<template>
  <div class="auth__box">
    <form @submit.prevent="socialSignUp">
      <a-input v-model="email" size="large" disabled />
      <div style="height: 12px" />
      <a-input v-model="nickname" placeholder="닉네임 (4 ~ 8자리)" size="large" />
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
        html-type="submit"
        size="large"
        :disabled="!email || !nickname || !checked"
      >가입하기</a-button>
    </form>
  </div>
</template>

<script>
export default {
  layout: 'auth',
  mounted() {
    this.email = this.$route.query.email
  },
  data: _ => ({
    email: '',
    occupation: '',
    nickname: '',
    checked: false,
    loading: false,
    error: '',
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
  methods: {
    async socialSignUp() {
      this.loading = true
      const options = {
        url: '/auth/signup/social',
        method: 'post',
        data: {
          email: this.email,
          nickname: this.nickname,
          occupation: this.occupation
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