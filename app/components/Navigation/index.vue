<template>
  <div class="navigation__container">
    <a-icon type="home" :class="{ matched: $route.path === '/' }" @click="$router.push('/')" />
    <a-icon type="user" :class="{ matched: $route.path === '/profile' }" @click="$router.push('/profile')" />
    <a-icon type="heart" :class="{ matched: $route.path === '/popular'}" @click="$router.push('/popular')" />
  </div>
</template>

<script>
export default {
  name: 'VueNavigation',
  methods: {}
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/color.scss';

.navigation__container {
  position: fixed;
  bottom: 0;
  height: 56px;
  background: white;
  width: 100%;
  border-top: 1px solid $oc-gray-5;
  display: flex;
  align-items: center;
  justify-content: space-around;
  i {
    font-size: 30px;
    color: $oc-gray-5;
    &.matched {
      color: $oc-gray-7;
    }
  }
}
</style>