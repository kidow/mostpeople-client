<template>
  <div>
    <vue-breadcrumb :breadcrumbs="breadcrumbs" />
    <div style="height: 24px" />
    <a-table
      size="small"
      :dataSource="dataSource"
      :loading="loading"
      :customRow="customRow"
      :columns="columns"
    ></a-table>
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
    dataSource: [
      {
        key: '1',
        id: 1,
        category: '프로게이머',
        title: '롤체 꿀잼',
        author: 'kidow',
        createdAt: '21:08',
        views: 1,
        likes: 150,
        categoryValue: 'progamer',
        occupationValue: 'sports'
      },
      {
        key: '2',
        id: 2,
        category: '백수',
        title: '백수가 암울한이유',
        author: 'kidow',
        createdAt: '21:08',
        views: 2,
        likes: 200,
        categoryValue: 'basic',
        occupationValue: 'jobless'
      }
    ],
    columns: [
      {
        dataIndex: 'id'
      },
      {
        title: '직업',
        dataIndex: 'category'
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
      },
      {
        title: '추천',
        dataIndex: 'likes'
      }
    ],
    loading: false
  }),
  methods: {
    customRow({ categoryValue, occupationValue, id }) {
      return {
        on: {
          click: _ =>
            this.$router.push(
              `/board/${occupationValue}/${categoryValue}/${id}`
            )
        }
      }
    }
  }
}
</script>