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
      if (!isNaN(selectedKeys[0])) return
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
            key: '0',
            children: [
              {
                title: '의사',
                key: 'doctor'
              },
              {
                title: '변호사',
                key: 'lawyer'
              }
            ]
          }
        ],
        [
          {
            title: '학생',
            key: '1',
            children: [
              {
                title: '초등학생',
                key: 'elementaryschoolstudent'
              },
              {
                title: '중학생',
                key: 'middleschoolstudent'
              },
              {
                title: '고등학생',
                key: 'highschoolstudent'
              },
              {
                title: '대학생',
                key: 'universitystudent'
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
  .draggable-tree {
    display: inline-flex;
  }
}
</style>
