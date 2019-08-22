<template>
  <div class="board__container">
    <div class="board" v-for="profession in professions" :key="profession.name">
      <h4>{{ profession.name }}</h4>
      <div
        style="margin-left: 12px;"
        v-for="occupation in profession.occupations"
        :key="occupation.uuid"
      >
        <a-badge dot :count="profession.postsCount">
          <nuxt-link :to="`/board/${occupation.uuid}`">{{ occupation.korName }}</nuxt-link>
        </a-badge>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Board',
  props: {
    professions: {
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
