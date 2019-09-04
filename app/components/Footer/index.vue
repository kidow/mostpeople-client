<template>
  <footer>
    <ul>
      <li>
        <nuxt-link to="/terms">이용약관</nuxt-link>
      </li>
      <li>
        <span class="separator">•</span>
        <nuxt-link to="/privacy">개인정보처리방침</nuxt-link>
      </li>
      <li>
        <span class="separator">•</span>
        <nuxt-link to="/about">소개</nuxt-link>
      </li>
      <li>
        <span class="separator">•</span>
        <a-tooltip placement="top" trigger="click" title="준비 중입니다">
          <a>광고문의</a>
        </a-tooltip>
        <!-- <nuxt-link to="/partnership">광고문의</nuxt-link> -->
      </li>
      <li>
        <span class="separator">•</span>
        <a-tooltip placement="top" trigger="click" title="준비 중입니다">
          <a>고객센터</a>
        </a-tooltip>
      </li>
      <li>
        <span class="separator">•</span>
        <a @click="visible = true">개선점</a>
      </li>
    </ul>
    <div style="margin-top: 8px">contact@mostpeople.kr</div>
    <div style="margin-top: 8px">외주 제작 의뢰받습니다.</div>
    <a-modal
      title="개선점을 알려주세요"
      :visible="visible"
      @cancel="visible = false"
      okText="전송"
      @ok="onSubmit"
    >
      <div
        style="margin-bottom: 16px; word-break: keep-all;"
      >현 서비스에 대해 개선했으면 하는 점이나 버그, 추가됐으면 하는 직업이 있다면 알려주세요. 회원님의 소중한 의견이 서비스의 발전에 큰 도움이 될 것입니다.</div>
      <a-textarea v-model="content" :rows="4" :placeholder="placeholder" :disabled="!isLoggedIn" />
    </a-modal>
    <div class="copyright">Copyright ⓒ mostpeople. All rights reserved.</div>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Footer',
  data: _ => ({
    content: '',
    visible: false,
    loading: false
  }),
  methods: {
    async onSubmit() {
      if (!this.content) return
      this.loading = true
      const options = {
        url: '/prt/improvements',
        method: 'post',
        data: {
          content: this.content
        }
      }
      try {
        await this.$axios(options)
        this.notifySuccess('소중한 의견을 내어 주셔서 감사합니다!')
        this.visible = false
        this.loading = false
      } catch (err) {
        this.loading = false
        console.log(err)
        this.notifyError(err.response.data.message)
      }
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'auth/IS_LOGGED_IN'
    }),
    placeholder() {
      return this.isLoggedIn ? '개선점을 알려주세요' : '로그인이 필요합니다'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/color.scss';
@import '~/assets/scss/media.scss';

footer {
  height: 150px;
  color: $oc-gray-6;
  ul {
    padding: 0;
    margin: 0;
    font-size: 14px;
    @include media('<phone') {
      font-size: 12px;
    }
    li {
      display: inline-block;
      a {
        color: $oc-gray-6;
        cursor: pointer;
        &:hover {
          color: $oc-gray-8;
        }
      }
    }
  }
  .copyright {
    margin-top: 1rem;
  }
}
</style>
 