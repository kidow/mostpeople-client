<template>
  <div>
    <a-tabs type="card" defaultActiveKey="1" :tabPosition="$device.isMobile ? 'top' : 'left'">
      <a-tab-pane tab="기본 정보" key="1">기본 정보</a-tab-pane>
      <a-tab-pane tab="활동" key="2">글</a-tab-pane>
    </a-tabs>
  </div>
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

<style lang="scss">
.ant-tabs-content {
  background: white;
  border-top: 1px solid #e8e8e8;
  border-right: 1px solid #e8e8e8;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
  border-bottom: 1px solid #e8e8e8;
  min-height: 200px;
  padding: 1rem;
}
</style>