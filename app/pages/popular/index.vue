<template>
  <div>
    <vue-breadcrumb :breadcrumbs="breadcrumbs" />
    <div style="height: 24px" />
    <a-input-search placeholder="검색" @search="onSearch" style="width: 200px; margin-bottom: 24px" />
    <a-table size="small" :data="data" :loading="loading" :customRow="customRow" :columns="columns"></a-table>
    <a-pagination :total="total" v-model="currentPage" style="margin-top: 24px" />
  </div>
</template>

<script>
import VueBreadcrumb from '~/components/Breadcrumb'
export default {
  components: {
    VueBreadcrumb
  },
  data: _ => ({
    breadcrumbs: [
      {
        url: '/popular',
        name: '인기 글'
      }
    ],
    data: [],
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
    ],
    loading: false,
    total: 0,
    currentPage: 1
  }),
  methods: {
    customRow({ occupationId, uuid }) {
      if (!uuid) return
      const url = `/board/${occupationId}/post/${uuid}`
      return {
        on: {
          click: _ => this.$router.push(url)
        }
      }
    },
    onSearch(search) {
      this.updateQuerystring({ search, offset: 0 })
    },
    updateQuerystring(payload) {
      const query = Object.assign({}, this.$route.query, payload)
      this.$router.push({ query })
    },
    async getData() {
      this.loading = true
      const options = {
        url: '/posts/popular',
        method: 'get',
        params: this.$route.query
      }
      try {
        const { data } = await this.$axios(options)
        this.data = data
        this.loading = false
      } catch (err) {
        this.loading = false
        console.log(err)
      }
    }
  },
  head: _ => ({
    title: '인기 글 - 모스트피플'
  }),
  async asyncData({ app, query }) {
    const options = {
      url: '/posts/popular',
      method: 'get',
      params: query
    }
    try {
      const { data } = await app.$axios(options)
      return { data }
    } catch (err) {
      console.log(err)
    }
  },
  watch: {
    currentPage() {
      this.updateQuerystring({ offset: 20 * (this.currentPage - 1) })
    },
    '$route.query'() {
      this.getData()
    }
  }
}
</script>