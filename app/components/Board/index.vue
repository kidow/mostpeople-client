<template>
  <div class="board__container">
    <!-- <a-tree
      showIcon
      v-for="(job, i) in jobs"
      :key="i"
      class="draggable-tree"
      :treeData="job"
      defaultExpandAll
      @select="onSelect"
    />-->
    <div class="board" v-for="occupation in occupations" :key="occupation.id">
      <h4>{{ occupation.title }}</h4>
      <div style="margin-left: 12px;" v-for="job in occupation.jobs" :key="job.id">
        <nuxt-link :to="`/board/${job.id}`">{{ job.title }}</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Board',
  props: {
    occupations: {
      type: Array,
      default: _ => []
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/color.scss';

.board__container {
  border: 1px solid $oc-gray-4;
  border-radius: 4px;
  padding: 12px;
  display: flex;
  flex-wrap: wrap;
  background: white;
  .draggable-tree {
    display: inline-flex;
  }
  .board {
    margin-bottom: 18px;
    width: 150px;
    h4 {
      border-bottom: 1px solid $oc-gray-4;
      font-size: 1rem;
    }
    a {
      display: block;
    }
  }
}
</style>

<style lang="scss">
.ant-tree-iconEle {
  width: 3px !important;
}
</style>
