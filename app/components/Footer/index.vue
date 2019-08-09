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
        <nuxt-link to="/partnership">광고문의</nuxt-link>
      </li>
      <li>
        <span class="separator">•</span>
        <a>고객센터</a>
      </li>
    </ul>
    <div class="copyright">Copyright ⓒ mostpeople. All rights reserved.</div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
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
 