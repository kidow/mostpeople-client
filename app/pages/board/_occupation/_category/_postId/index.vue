<template>
  <div>
    <vue-breadcrumb :breadcrumbs="breadcrumbs" />
    <h1>롤체 너무 꿀잼이다</h1>
    <div class="user-meta">
      <template @click="$router.push('/profile/@kidow')">
        <a-avatar icon="user" class="avatar" />
        <span class="id">kidow</span>
      </template>
      <a-divider type="vertical" />
      <span class="date">2019-03-12 18:29:43</span>
    </div>
    <vue-editor :readonly="true" value="<p>asdsfs</p>" />

    <vue-comments-list :comments="comments" @comment="onCommentPush" />

    <!-- <vue-table :dataSource="dataSource" v-if="!$device.isMobile" />
    <a-list itemLayout="horizontal" :dataSource="dataSource" v-else>
      <a-list-item @click="onClickList(item)" slot="renderItem" slot-scope="item">
        <a-list-item-meta :description="item.createdAt">
          <a slot="title" href="https://vue.ant.design/">{{item.title}}</a>
          <a-avatar
            slot="avatar"
            shape="square"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          />
        </a-list-item-meta>
      </a-list-item>
    </a-list>-->
  </div>
</template>

<script>
import VueCommentsList from '~/components/List/Comment'
import VueTable from '~/components/Table'
import VueBreadcrumb from '~/components/Breadcrumb'
import VueEditor from '~/components/Editor'
export default {
  // validate({ params }) {
  //   return /[0-9a-f]{32}/.test(params.postId)
  // },
  components: {
    VueBreadcrumb,
    VueTable,
    VueCommentsList,
    VueEditor
  },
  data: _ => ({
    breadcrumbs: [
      {
        url: '/board/student',
        name: '학생'
      },
      {
        url: '/board/student/university',
        name: '대학생'
      },
      {
        url: '/board/student/university/1',
        name: '롤체 너무 꿀잼이다'
      }
    ],
    dataSource: [
      {
        key: '1',
        id: 1,
        title: '롤체 꿀잼',
        author: 'kidow',
        createdAt: '21:08',
        views: 1
      },
      {
        key: '2',
        id: 2,
        title: '백수가 암울한이유',
        author: 'kidow',
        createdAt: '21:08',
        views: 2
      }
    ],
    comments: []
  }),
  methods: {
    onCommentPush(comment) {
      this.comments.push(comment)
    }
  },
  head: _ => ({
    title: '롤체 너무 꿀잼이다 - 모스트피플'
  })
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/color.scss';

h1 {
  margin-top: 0.5em;
  font-size: 30px;
  font-weight: 600;
}
.user-meta {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  .id {
    margin-left: 10px;
    font-size: 20px;
  }
  .avatar,
  .id {
    cursor: pointer;
  }
  .date {
    color: $oc-gray-5;
  }
}
</style>
