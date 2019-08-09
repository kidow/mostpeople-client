<template>
  <a-table
    size="small"
    :dataSource="dataSource"
    :columns="columns"
    :loading="loading"
    :customRow="customRow"
    :locale="{ emptyText: '글이 존재하지 않습니다' }"
  />
</template>

<script>
export default {
  name: 'Table',
  props: {
    dataSource: {
      type: Array,
      default: _ => []
    },
    columns: {
      type: Array,
      default: _ => []
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
          click: _ => this.$router.push(`/post/${uuid}`)
        }
      }
    }
  }
}
</script>