<template>
  <div class="server-err">
    <a-icon type="exclamation-circle" />
    <div class="number">500</div>
    <h3>죄송합니다.</h3>
    <h3>내부 서버 오류입니다.</h3>
    <h3>빠른 시일 내에 고칠 예정입니다.</h3>
    <a-button size="large" @click="$router.push('/')">홈으로 이동하기</a-button>
  </div>
</template>

<script>
export default {
  head: _ => ({
    title: '알 수 없는 오류가 발생했습니다.'
  })
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/color.scss';

.server-err {
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
