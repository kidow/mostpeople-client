<template>
  <div class="search__container">
    <h1>
      <span>{{ $route.query.keyword }}</span>
      에 대한 검색 결과를
      <vue-count-to :end-val="count" :duration="1500"></vue-count-to>개를 찾았습니다.
    </h1>
    <a-divider />
    <div>
      <div class="category">
        게시판명
        <span class="text">검색결과</span>
        <vue-count-to :end-val="2" :duration="1500" />
        <span class="text">개</span>
      </div>
      <div></div>
    </div>
    <div style="margin-top: 20px">
      <nuxt-link to="/">
        <a-tag>리그 오브 레전드</a-tag>
      </nuxt-link>
      <nuxt-link to="/">
        <a-tag>TFT</a-tag>
      </nuxt-link>
    </div>
    <a-divider />
    <div>
      <div class="category">
        게시물
        <span class="text">검색결과</span>
        <vue-count-to :end-val="343" :duration="1500"></vue-count-to>
        <span class="text">개</span>
      </div>
      <div class="posts">
        <div class="post">
          <div class="title">
            <nuxt-link to="/">난 롤토체스 마음에 들던데</nuxt-link>
          </div>
          <div class="content">칼바람 할때는 담배 피우다 존나 늦게오는 개새끼들 많았는데 롤토체스는 비흡연자들만 있는 클린한 게임임</div>
          <span class="occupation">
            <nuxt-link to="/">리그 오브 레전드</nuxt-link>
          </span>
          <span class="date">2019.07.24 21:43</span>
        </div>
        <div class="post">
          <div class="title">
            <nuxt-link to="/">롤토체스 3판째인데 잘 한거냐?</nuxt-link>
          </div>
          <div class="content">조합 ㄱㅊ은거임?</div>
          <span class="occupation">
            <nuxt-link to="/">리그 오브 레전드</nuxt-link>
          </span>
          <span class="date">2019.07.24 22:01</span>
        </div>
        <div class="post">
          <div class="title">
            <nuxt-link to="/">롤토체스 포인트는 하지도않는데 계속주네</nuxt-link>
          </div>
          <div class="content">3연 1등으로 다2 안착</div>
          <span class="occupation">
            <nuxt-link to="/">리그 오브 레전드</nuxt-link>
          </span>
          <span class="date">2019.07.24 21:45</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueCountTo from 'vue-count-to'
export default {
  components: {
    VueCountTo
  },
  data: _ => ({
    count: 345
  }),
  head: _ => ({
    title: '검색 - 모스트피플'
  })
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/color.scss';

.search__container {
  h1 {
    font-size: 16px;
    color: $oc-gray-6;
    span {
      font-size: 24px;
      color: $oc-gray-8;
      font-weight: bold;
    }
  }
  div {
    .category {
      font-size: 20px;
      font-weight: bold;
      .text {
        font-size: 16px;
        font-weight: normal;
      }
    }
    .posts {
      margin-top: 20px;
      .post {
        margin-bottom: 12px;
        .title {
          font-size: 15px;
          a {
            color: $oc-gray-8;
          }
        }
        .content {
          font-size: 13px;
          color: $oc-gray-7;
          margin: 4px 0;
        }
        .occupation {
          font-size: 12px;
        }
        .date {
          color: $oc-gray-5;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
