<template>
  <div>
    <vue-breadcrumb :breadcrumbs="breadcrumbs" />
    <a-input-search placeholder="검색" @search="onSearch" style="width: 200px; margin: 24px 0" />
    <vue-table :loading="loading" :dataSource="data" :columns="columns" v-if="!$device.isMobile" />
    <vue-list-post-mobile v-else :posts="data" />
    <a-pagination
      :total="total"
      :size="$device.isMobile ? 'small' : ''"
      v-model="currentPage"
      style="margin-top: 24px"
      :defaultPageSize="20"
    />
  </div>
</template>

<script>
import VueTable from '~/components/Table'
import VueBreadcrumb from '~/components/Breadcrumb'
import VueListPostMobile from '~/components/List/Post/Mobile'
export default {
  components: {
    VueBreadcrumb,
    VueListPostMobile,
    VueTable
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
      },
      {
        title: '댓글',
        dataIndex: 'commentCount'
      }
    ],
    loading: false,
    total: 0,
    currentPage: 1,
    offset: 0,
    search: ''
  }),
  methods: {
    onSearch(search) {
      this.search = search
      this.offset = 0
      this.currentPage = 1
      this.getData()
    },
    async getData() {
      this.loading = true
      const options = {
        url: '/posts/popular',
        method: 'get',
        params: {
          offset: this.offset,
          search: this.search
        }
      }
      try {
        const { data } = await this.$axios(options)
        this.data = data.posts
        this.total = data.total
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
      method: 'get'
    }
    try {
      const { data } = await app.$axios(options)
      return { data: data.posts, total: data.total }
    } catch (err) {
      console.log(err)
    }
  },
  watch: {
    currentPage(val) {
      this.offset = (val - 1) * 20
      this.getData()
    }
  }
}
</script>