<template>
  <header class="header__container">
    <div class="header__box" v-if="!$device.isMobile">
      <vue-logo />
      <a-input-search placeholder="통합검색" size="large" @search="onSearch" />
      <span>
        <nuxt-link to="/login">로그인</nuxt-link>
        <a-divider type="vertical" />
        <nuxt-link to="/signup">회원가입</nuxt-link>
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
      <a-drawer title="Basic Drawer" placement="left" @close="visible = false" :visible="visible">
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
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
      this.$router.push(`/search?keyword=${keyword}`)
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'auth/IS_LOGGED_IN'
    })
  },
  data: _ => ({
    visible: false
  })
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/media.scss';

.header__container {
  padding-top: 3rem;
  @include media('<phone') {
    padding-top: 1rem;
  }
  .header__box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .ant-input-affix-wrapper {
      max-width: 300px;
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
</style>
 