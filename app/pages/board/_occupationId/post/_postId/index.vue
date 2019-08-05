<template>
  <div>
    <vue-breadcrumb :breadcrumbs="breadcrumbs" />
    <h1>롤체 너무 꿀잼이다</h1>
    <div class="user-meta">
      <a-avatar icon="user" class="avatar" @click="$router.push('/profile/@kidow')" />
      <span class="id" @click="$router.push('/profile/@kidow')">kidow</span>
      <a-divider type="vertical" />
      <span class="date">2019-03-12 18:29:43</span>
    </div>
    <vue-editor :readonly="true" value="<p>asdsfs</p>" />

    <vue-comments-list :comments="comments" />

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
import { mapGetters } from 'vuex'
export default {
  validate({ params }) {
    return /[0-9a-f]{32}/.test(params.postId)
  },
  components: {
    VueBreadcrumb,
    VueTable,
    VueCommentsList,
    VueEditor
  },
  data: _ => ({
    breadcrumbs: [],
    dataSource: [],
    comments: [],
    comment: '',
    reply: '',
    loading: {
      comment: false,
      edit: false,
      next: false
    },
    action: null,
    likes: 0,
    views: 0,
    isReply: false,
    title: '',
    content: '',
    createdAt: '',
    nickname: '',
    profileUrl: ''
  }),
  methods: {
    onCommentPush(comment) {
      this.comments.push(comment)
    },
    async commentSubmit() {
      this.loading.comment = true
      const options = {
        url: `/prt/comments/${this.$route.params.postId}`,
        method: 'post',
        data: {
          content: this.comment
        }
      }
      try {
        const { data } = await this.$axios(options)
        this.loading.comment = false
        this.comment = ''
      } catch (err) {
        this.loading.comment = false
      }
    },
    async replySubmit() {
      this.loading.reply = true

      setTimeout(() => {
        this.loading.reply = false
        this.comments = [
          {
            author: 'Han Solo',
            avatar:
              'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: this.value,
            datetime: this.$moment().fromNow()
          },
          ...this.comments
        ]
        this.value = ''
      }, 1000)
    },
    async like() {
      this.likes = 1
      // this.dislikes = 0
      this.action = 'liked'
    },
    async dislike() {
      this.likes = 0
      // this.dislikes = 1
      this.action = 'disliked'
    }
  },
  head: _ => ({
    title: '롤체 너무 꿀잼이다 - 모스트피플'
  }),
  async asyncData({ app, params }) {
    const options = {
      url: `/posts/${params.postId}`,
      method: 'get'
    }
    try {
      const { data } = await app.$axios(options)
      return {
        breadcrumbs: data.breadcrumbs,
        comments: data.comments,
        title: data.title,
        content: data.content,
        createdAt: data.createdAt,
        profileUrl: data.profileUrl,
        nickname: data.nickname
      }
    } catch (err) {
      console.log(err)
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'auth/IS_LOGGED_IN'
    })
  }
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
.ant-list-item {
  padding: 0;
}
.comment__header {
  .recommend {
    cursor: pointer;
  }
}
</style>
