<template>
  <div class="not-found">
    <a-icon type="question-circle" />
    <div class="number">404</div>
    <h3>죄송합니다.</h3>
    <h3>해당 글은 삭제된 상태입니다.</h3>
    <a-button size="large" @click="$router.push('/')">홈으로</a-button>
  </div>
</template>

<script>
export default {
  head: _ => ({
    title: '죄송합니다. 해당 글은 삭제된 상태입니다.'
  })
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/color.scss';

.not-found {
  text-align: center;
  margin: 4rem 0 6rem;
  i {
    font-size: 50px;
    display: block;
  }
  .number {
    font-weight: bold;
    font-size: 60px;
  }
  h3 {
    margin: 0.3rem 0 1rem;
  }
}
</style>
