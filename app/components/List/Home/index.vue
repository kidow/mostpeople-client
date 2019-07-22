<template>
  <a-list :grid="{ gutter: 16, lg: 4, sm: 3, xs: 2 }" :dataSource="list">
    <a-list-item slot="renderItem" slot-scope="item">
      <a-card hoverable style="width: 200px">
        <img alt="example" :src="item.src" slot="cover" />
        <a-card-meta>
          <template slot="title">{{ item.title }}</template>
          <template slot="description">{{ item.category }}</template>
          <template slot="description">
            <div>
              <a-icon type="message" />
              <span style="margin: 0 4px;">{{ item.commentsLength }}</span>
              <a-icon type="like" />
              <span style="margin-left: 4px;">{{ item.likesLength }}</span>
            </div>
          </template>
        </a-card-meta>
      </a-card>
    </a-list-item>
  </a-list>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: _ => []
    }
  }
}
</script>