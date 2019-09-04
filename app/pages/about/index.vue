<template>
  <div>
    <h1>소개</h1>
    <a-divider />
    <h4>모스트피플의 시작</h4>
    <p>
      고용노동부에서 운영하는 워크넷(https://www.work.go.kr)에 따르면, 2018년 말 기준 우리나라의 직업수는
      <vue-count-to class="count" :endVal="12145" :duration="4000" />개라고 합니다.
    </p>
    <p>대부분의 사람들은 직업을 가지고 있지만, 우리나라만 해도 직업이 10,000개가 넘는다는 사실은 사람들은 잘 모릅니다. 각각의 직업을 가진 사람들이 구인구직은 넷상에서 여러 서비스들을 통해서 활발히 하고 있지만, 각자가 자신의 분야의 심정에서 하고 싶었던 말들을 맘편히 할 수 있는 공간은 없다고 생각했습니다. 그래서 이렇게 각자의 직업을 게시판으로 삼아 소통할 수 있는 커뮤니티를 만들었습니다.</p>
    <p>저희는 여러분들이 이곳에서 직업에 대해 할 수 있는, 어떤 자유로운 주제라도 이야기하길 원합니다. 현직자로서 이 직업에 대한 평퍈이나 근황, 관심이 가서 올리는 질문글, 걱정, 고민, 그밖의 즐거운 이야기 등등을 함으로써 그동안 말하고 싶었으나 말하지 못했던 직업에 대한 이야기나 스트레스들을 이곳에서 풀다 갔으면 하는 바램입니다.</p>
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
