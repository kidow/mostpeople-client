<template>
  <div class="list__container">
    <div class="list__empty" v-if="!posts.length">글이 존재하지 않습니다.</div>
    <div
      class="list__item"
      v-for="post in posts"
      :key="post.uuid"
      v-else
      @click="$router.push(`/post/${post.uuid}`)"
    >
      <div class="item__img" v-if="post.thumbnailUrl">
        <img :src="post.thumbnailUrl" alt="thumb" />
      </div>
      <div class="item__left">
        <div class="item__title">{{ post.title }}</div>
        <div class="item__desc">
          <span class="item__nickname">{{ post.nickname }}</span>
          <span class="item__dot">·</span>
          <span class="item__date">{{ post.createdAt }}</span>
          <span class="item__dot">·</span>
          <span class="item__viewCount">조회 {{ post.viewCount }}</span>
        </div>
      </div>
      <div class="item__right">
        <div class="item__commentCount">{{ post.commentCount }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    posts: {
      type: Array,
      default: _ => []
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/color.scss';

.list__container {
  background: white;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  .list__empty {
    padding: 10px;
    color: $oc-gray-5;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .list__item {
    padding: 10px;
    display: flex;
    border-bottom: 1px solid $oc-gray-1;
    .item__img {
      margin-right: 10px;
      img {
        width: 40px;
      }
    }
    .item__left {
      flex: 1;
      .item__title {
        font-size: 16px;
      }
      .item__desc {
        font-size: 13px;
        color: $oc-gray-5;
      }
    }
    .item__right {
      width: 40px;
      margin-left: 10px;
      .item__commentCount {
        border: 1px solid #e8e8e8;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        padding: 10px;
      }
    }
  }
}
</style>