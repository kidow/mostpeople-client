<template>
  <div class="auth__container">
    <a-row>
      <a-col :md="8" :sm="6" :xs="2" />
      <a-col :md="8" :sm="12" :xs="20">
        <nuxt />
        <div class="auth__footer">
          <nuxt-link to="/">홈</nuxt-link>
          <a-divider type="vertical" />
          <nuxt-link target="_blank" to="/terms">이용약관</nuxt-link>
          <a-divider type="vertical" />
          <nuxt-link target="_blank" to="/privacy">개인정보처리방침</nuxt-link>
          <p style="margin: 12px 0;">© 2019 mostpeople All rights reserved.</p>
        </div>
      </a-col>
      <a-col :md="8" :sm="6" :xs="2" />
    </a-row>
  </div>
</template>

<style lang="scss" scoped>
.auth__container {
  padding: 1rem 0;
}
.auth__footer {
  padding: 1.5rem;
  text-align: center;
}
</style>
