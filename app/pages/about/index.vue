<template>
  <div>
    <h1>소개</h1>
    <a-divider />
    <h4>모스트피플의 시작</h4>
    <p>
      고용노동부에서 운영하는 워크넷(https://www.work.go.kr)에 따르면, 2018년 말 기준 우리나라의 직업수는
      <vue-count-to class="count" :endVal="12145" :duration="1500" />개라고 합니다.
    </p>
    <p>저희는 이러한 시대 변화 속에서 다양한 직업군에 종사하는 사람들이 서로 소통을 하고, 알아가고 이해하는 장이 되기를 바라는 마음으로 이러한 서비스를 만들게 되었습니다.</p>
  </div>
</template>

<script>
import VueCountTo from 'vue-count-to'
export default {
  head: _ => ({
    title: '소개 - 모스트피플'
  }),
  layout: 'noHeader',
  components: {
    VueCountTo
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/color.scss';

div {
  h1 {
    font-weight: bold;
    font-size: 34px;
    color: $oc-gray-9;
  }
  h4 {
    font-size: 26px;
    font-weight: 500;
    color: $oc-gray-8;
    margin: 30px 0;
    &:after {
      content: '';
      width: 45px;
      height: 2px;
      background: $brand-color;
      margin-top: 16px;
      z-index: 10;
      display: block;
    }
  }
  h5 {
    font-size: 22px;
    font-weight: 500;
    color: $oc-green-8;
    margin: 30px 0 20px 15px;
  }
  p {
    font-size: 16px;
    color: $oc-gray-8;
    line-height: 160%;
    word-break: keep-all;
    margin-left: 15px;
    .count {
      color: $oc-gray-9;
      font-size: 24px;
    }
  }
  ul {
    li {
      position: relative;
      color: $oc-gray-7;
      line-height: 160%;
      font-size: 16px;
      font-weight: 300;
    }
  }
}
</style>
