<template>
  <div>
    <div class="card__container">
      <div style="margin-bottom: 8px;">
        <span style="font-size: 24px; font-weight: bold; margin-right: 8px" class="card__title">인기 글</span>
        <nuxt-link to="/popular">더 보기</nuxt-link>
      </div>
      <a-table
        size="small"
        :data="posts"
        :customRow="customRow"
        :locale="{ emptyText: '글이 존재하지 않습니다' }"
        :columns="columns"
      ></a-table>
    </div>
    <div class="card__container">
      <div style="margin: 24px 0 8px">
        <span style="font-size: 24px; font-weight: bold; margin-right: 8px" class="card__title">게시판</span>
        <nuxt-link to="/new">새 글</nuxt-link>
      </div>
      <vue-board :professions="professions" />
    </div>
  </div>
</template>

<script>
import VueBoard from '~/components/Board'
export default {
  data: _ => ({
    posts: [],
    professions: [],
    columns: [
      {
        dataIndex: 'uuid'
      },
      {
        title: '게시판',
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
    VueBoard
  },
  async asyncData({ app }) {
    const options = {
      url: '/',
      methods: 'get'
    }
    try {
      const { data } = await app.$axios(options)
      return {
        posts: data.posts,
        professions: data.professions
      }
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    customRow({ uuid }) {
      if (!uuid) return
      const url = `/post/${uuid}`
      return {
        on: {
          click: _ => this.$router.push(url)
        }
      }
    }
  }
}
</script>
