<template>
  <a-table size="small" :dataSource="dataSource" :columns="columns" :loading="loading" :customRow="customRow"></a-table>
</template>

<script>
export default {
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
          title: '',
          dataIndex: 'id'
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
          dataIndex: 'views'
        }
      ]
    }
  },
  data: _ => ({
    loading: false
  }),
  methods: {
    onSelect() {
      console.log(1)
    },
    customRow({ id }) {
      return {
        on: {
          click: _ => this.$router.push(`${this.$route.path}/${id}`)
        }
      }
    }
  }
}
</script>