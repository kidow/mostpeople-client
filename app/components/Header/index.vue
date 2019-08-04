<template>
  <header class="header__container">
    <div class="header__box" v-if="!$device.isMobile">
      <vue-logo />
      <a-input-search placeholder="통합검색" size="large" @search="onSearch" />
      <span v-if="!isLoggedIn" class="text">
        <nuxt-link to="/login">로그인</nuxt-link>
        <a-divider type="vertical" />
        <nuxt-link to="/signup">회원가입</nuxt-link>
      </span>
      <span v-else class="text">
        <nuxt-link to="/profile">내 정보</nuxt-link>
        <a-divider type="vertical" />
        <span class="logout" @click="logout">로그아웃</span>
      </span>
    </div>
    <div class="header__box__mobile" v-else>
      <div class="header__component">
        <a-icon type="menu" @click="visible = true" />
        <vue-logo />
        <a-icon type="user" v-if="isLoggedIn" @click="$router.push('/profile')" />
        <a-icon type="login" v-else @click="$router.push('/login')" />
      </div>
      <div style="height: 4px" />
      <a-input-search placeholder="통합검색" @search="onSearch" />
      <a-drawer placement="left" @close="visible = false" :visible="visible">
        <div slot="title" @click="$router.push('/')">모스트피플</div>
        <div>
          <h3>인증</h3>
          <template v-if="isLoggedIn">
            <nuxt-link to="/login">로그인</nuxt-link>
            <nuxt-link to="/signup">회원가입</nuxt-link>
          </template>
          <template v-else>
            <nuxt-link to="/profile">내 정보</nuxt-link>
            <a @click="logout">로그아웃</a>
          </template>
        </div>
        <div>
          <h3>메뉴</h3>
          <nuxt-link to="/popular">인기글 보기</nuxt-link>
          <nuxt-link to="/new">새 글 등록</nuxt-link>
        </div>
        <div>
          <h3>모스트피플</h3>
          <nuxt-link to="/about">소개</nuxt-link>
          <nuxt-link to="/terms">이용약관</nuxt-link>
          <nuxt-link to="/privacy">개인정보처리방침</nuxt-link>
          <nuxt-link to="/marketing">광고 문의</nuxt-link>
          <a>고객센터</a>
        </div>
      </a-drawer>
    </div>
  </header>
</template>

<script>
import VueLogo from '~/components/Logo'
import { mapGetters } from 'vuex'
export default {
  name: 'Header',
  components: {
    VueLogo
  },
  methods: {
    onSearch(keyword) {
      if (!keyword) return
      this.$router.push(`/search?keyword=${keyword}`)
    },
    async logout() {
      const { path } = this.$route
      try {
        await this.$store.dispatch('auth/LOGOUT')
        if (path === '/profile' || path === '/new') this.$router.push('/')
      } catch (err) {
        console.dir(err)
        this.notify({
          type: 'error',
          message: '실패',
          description: err.response.data.message
        })
      }
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'auth/IS_LOGGED_IN'
    })
  },
  data: _ => ({
    visible: false,
    menu: ['mail']
  })
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/media.scss';
@import '~/assets/scss/color.scss';

.header__container {
  padding-bottom: 1rem;
  .header__box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .ant-input-affix-wrapper {
      max-width: 300px;
    }
    .text {
      .logout {
        color: $oc-gray-6;
        cursor: pointer;
        &:hover {
          color: $oc-gray-8;
          text-decoration: underline;
        }
      }
    }
  }
  .header__box__mobile {
    .header__component {
      display: flex;
      justify-content: space-between;
      align-items: center;
      i {
        font-size: 20px;
      }
    }
  }
}

.ant-drawer-body {
  div {
    margin-bottom: 2rem;
    h3 {
      font-size: 18px;
      color: $oc-gray-5;
    }
    a {
      margin: 12px 0 12px 24px;
      display: block;
      color: $oc-gray-7;
      font-size: 20px;
    }
  }
}
</style>
 