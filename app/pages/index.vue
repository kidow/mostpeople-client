<template>
  <div>
    <div class="card__container">
      <div style="margin-bottom: 8px;">
        <span style="font-size: 24px; font-weight: bold; margin-right: 8px" class="card__title">인기 글</span>
        <nuxt-link to="/popular">더 보기</nuxt-link>
      </div>
      <a-table size="small" :data="data" :customRow="customRow" :columns="columns"></a-table>
      <!-- <vue-list-home :list="cards" /> -->
      <!-- <span>직업 수 워크넷 기준 6025개</span> -->
    </div>
    <div class="card__container">
      <div style="margin: 24px 0 8px">
        <span style="font-size: 24px; font-weight: bold; margin-right: 8px" class="card__title">게시판</span>
      </div>
      <vue-board :occupations="occupations" />
    </div>
  </div>
</template>

<script>
import VueTable from '~/components/Table'
import VueBoard from '~/components/Board'
import VueCard from '~/components/Card'
export default {
  data: _ => ({
    data: [],
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
    ],
    columns: [
      {
        dataIndex: 'uuid'
      },
      {
        title: '직업',
        dataIndex: 'korName'
      },
      {
        title: '제목',
        dataIndex: 'title'
      },
      {
        title: '글쓴이',
        dataIndex: 'nickname'
      },
      {
        title: '작성일',
        dataIndex: 'createdAt'
      },
      {
        title: '조회수',
        dataIndex: 'viewCount'
      },
      {
        title: '추천',
        dataIndex: 'likeCount'
      }
    ]
  }),
  components: {
    VueCard,
    VueTable,
    VueBoard
  },
  async asyncData({ app }) {
    const options = {
      url: '/',
      methods: 'get'
    }
    try {
      const { data } = await app.$axios(options)
      return { data }
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    customRow({ occupationId, uuid }) {
      if (!uuid) return
      const url = `/board/${occupationId}/post/${uuid}`
      return {
        on: {
          click: _ => this.$router.push(url)
        }
      }
    }
  }
}
</script>
