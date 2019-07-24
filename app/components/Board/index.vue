<template>
  <div class="board__container">
    <a-tree
      v-for="(job, i) in jobs"
      :key="i"
      class="draggable-tree"
      :treeData="job"
      defaultExpandAll
      @select="onSelect"
    />
  </div>
</template>

<script>
export default {
  name: 'Board',
  methods: {
    onSelect(selectedKeys) {
      this.$router.push(`/board/${selectedKeys[0]}`)
    }
  },
  props: {
    jobs: {
      type: Array,
      default: _ => [
        [
          {
            title: '전문직',
            key: 'professional/basic',
            children: [
              {
                title: '의사',
                key: 'professional/doctor'
              },
              {
                title: '변호사',
                key: 'professional/lawyer'
              }
            ]
          }
        ],
        [
          {
            title: '학생',
            key: 'student/basic',
            children: [
              {
                title: '초등학생',
                key: 'student/elementary'
              },
              {
                title: '중학생',
                key: 'student/middle'
              },
              {
                title: '고등학생',
                key: 'student/high'
              },
              {
                title: '대학생',
                key: 'student/university'
              },
              {
                title: '대학원생',
                key: 'student/postgraduate'
              }
            ]
          }
        ]
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/color.scss';

.board__container {
  border: 1px solid $oc-gray-4;
  border-radius: 4px;
  padding: 8px;
  background: white;
  .draggable-tree {
    display: inline-flex;
  }
}
</style>
