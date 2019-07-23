<template>
  <div>
    <div class="card__container">
      <div style="margin-bottom: 8px;">
        <span style="font-size: 24px; font-weight: bold; margin-right: 8px" class="card__title">인기 글</span>
        <nuxt-link to="/popular">더 보기</nuxt-link>
      </div>
      <vue-list-home :list="cards" />
      <span>직업 수 워크넷 기준 6025개</span>
    </div>
    <!-- <div class="card__container">
      <div style="margin-bottom: 8px;">
        <span
          style="font-size: 24px; font-weight: bold; margin-right: 8px"
          class="card__title"
        >인기 게시판</span>
      </div>
      <vue-list-home :list="cards" />
    </div>-->
    <div class="card__container">
      <div style="margin-bottom: 8px;">
        <span style="font-size: 24px; font-weight: bold; margin-right: 8px" class="card__title">게시판</span>
      </div>
      <vue-board />
    </div>
  </div>
</template>

<script>
import VueListHome from '~/components/List/Home'
import VueBoard from '~/components/Board'
import VueCard from '~/components/Card'
export default {
  data: _ => ({
    cards: [
      {
        id: 1,
        title: '취업하기 힘든 이유',
        src:
          'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
        category: '백수',
        commentsLength: 15,
        likesLength: 30,
        label: 'jobless'
      },
      {
        id: 2,
        title: '롤체 너무 재밌따',
        src: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
        category: '프로게이머',
        commentsLength: 15,
        likesLength: 30,
        label: 'progamer'
      }
    ]
  }),
  components: {
    VueCard,
    VueListHome,
    VueBoard
  }
}
</script>
