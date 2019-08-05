<template>
  <a-table
    size="small"
    :dataSource="dataSource"
    :columns="columns"
    :loading="loading"
    :customRow="customRow"
    :locale="{ emptyText: '글이 존재하지 않습니다' }"
  ></a-table>
</template>

<script>
export default {
  name: 'Table',
  props: {
    dataSource: {
      type: Array,
      default: _ => []
    },
    pagination: {
      type: Object,
      default: _ => {}
    },
    columns: {
      type: Array,
      default: _ => [
        {
          dataIndex: 'uuid'
        },
        {
          title: '제목',
          dataIndex: 'title'
        },
        {
          title: '글쓴이',
          dataIndex: 'author'
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
    }
  },
  data: _ => ({
    loading: false
  }),
  methods: {
    customRow({ uuid }) {
      if (!uuid) return
      return {
        on: {
          click: _ => this.$router.push(`${this.$route.path}/post/${uuid}`)
        }
      }
    }
  }
}
</script>