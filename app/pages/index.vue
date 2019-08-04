<template>
  <div>
    <div class="card__container">
      <div style="margin-bottom: 8px;">
        <span style="font-size: 24px; font-weight: bold; margin-right: 8px" class="card__title">인기 글</span>
        <nuxt-link to="/popular">더 보기</nuxt-link>
      </div>
      <vue-list-home :list="cards" />
      <!-- <span>직업 수 워크넷 기준 6025개</span> -->
    </div>
    <div class="card__container">
      <div style="margin-bottom: 8px;">
        <span style="font-size: 24px; font-weight: bold; margin-right: 8px" class="card__title">게시판</span>
      </div>
      <vue-board :occupations="occupations" />
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
        category: {
          value: 'post',
          label: '기본'
        },
        commentsLength: 15,
        likesLength: 30,
        occupation: {
          value: '1',
          label: '무직'
        }
      }
      // {
      //   id: 2,
      //   title: '롤체 너무 재밌따',
      //   src: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      //   category: {
      //     value: 'university',
      //     label: '대학생'
      //   },
      //   commentsLength: 15,
      //   likesLength: 30,
      //   occupation: {
      //     value: 'student',
      //     label: '학생'
      //   }
      // }
    ],
    occupations: [
      {
        uuid: 1,
        title: '추가',
        jobs: [
          {
            uuid: 50,
            title: '유투버'
          },
          {
            uuid: 51,
            title: '스트리머'
          }
        ]
      },
      {
        uuid: 2,
        title: '관리직',
        jobs: [
          {
            uuid: 52,
            title: '국회의원'
          },
          {
            uuid: 54,
            title: 'CEO'
          }
        ]
      }
    ]
  }),
  components: {
    VueCard,
    VueListHome,
    VueBoard
  },
  async asyncData({ app }) {
    const options = {
      url: '/',
      methods: 'get'
    }
    try {
      const { data } = await app.$axios(options)
      // console.log('data: ', data)
    } catch (err) {
      console.log(err)
    }
  }
}
</script>
