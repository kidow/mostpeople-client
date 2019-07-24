<template>
  <div>{{ $route.params.nickname }}</div>
</template>

<script>
export default {
  head: _ => ({
    title: '남의유저 - 모스트피플'
  }),
  validate({ params }) {
    return /@[a-z]/g.test(params.nickname)
  }
}
</script>