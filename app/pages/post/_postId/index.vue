<template>
  <div>
    <vue-breadcrumb :breadcrumbs="breadcrumbs" />
    <a-skeleton avatar :paragraph="{rows: 6}" active v-if="!mounted" />
    <template v-else>
      <h1>{{ post.title }}</h1>
      <div class="user-meta">
        <a-avatar
          @click="$router.push(`/profile/@${post.nickname}`)"
          v-if="post.profileUrl"
          :src="post.profileUrl"
          :alt="post.profileAlt"
        />
        <a-avatar
          v-else
          icon="user"
          class="avatar"
          @click="$router.push(`/profile/@${post.nickname}`)"
        />
        <span class="id" @click="$router.push(`/profile/@${post.nickname}`)">{{ post.nickname }}</span>
        <a-divider type="vertical" />
        <span
          class="date"
        >{{ $moment(post.createdAt).add(9, 'hour').format('YYYY-MM-DD hh:mm:ss' )}}</span>
      </div>
      <vue-editor :readonly="true" :value="post.content" />
    </template>

    <div class="comment__header">
      <span>댓글 {{ comments.filter(comment => comment.status === 1).length }}</span>
      <a-divider type="vertical" />
      <span class="pointer" :class="{ isLiked: !!isLiked }" @click="like">추천 {{ post.likeCount }}</span>
      <a-divider type="vertical" />
      <span>조회수 {{ post.viewCount }}</span>
      <a-divider type="vertical" />
      <a-popover trigger="click">
        <div slot="content">
          <a-icon
            type="facebook"
            class="facebook"
            style="font-size: 24px; cursor: pointer"
            theme="filled"
            @click="shareFacebook"
          />
          <a-icon
            type="twitter"
            class="twitter"
            style="font-size: 24px; cursor: pointer"
            @click="shareTwitter"
          />
          <a-icon
            type="link"
            class="link"
            style="font-size: 24px; cursor: pointer"
            @click="copyLink"
          />
        </div>
        <span class="pointer">공유</span>
      </a-popover>

      <a-divider type="vertical" />
      <template v-if="user.uuid === post.userId">
        <span class="pointer" @click="$router.push(`${$route.path}/edit`)">수정</span>
        <a-divider type="vertical" />
        <span class="pointer" @click="onDelete">삭제</span>
        <a-divider type="vertical" />
      </template>
      <a-popover trigger="click">
        <div slot="content">준비 중입니다</div>
        <span class="pointer">신고</span>
      </a-popover>
    </div>

    <a-modal title="정말 삭제하시겠습니까?" content="이 행동은 되돌릴 수 없습니다." v-model="visible" @ok="onDelete" />

    <vue-comments-list
      :comments="comments"
      @add-comment="data => onCommentPush(data)"
      @add-reply="(index, data) => onReplyPush(index, data)"
      @remove-comment="index => removeComment(index)"
    />
    <!-- <div class="comment__container">
      <div class="comment__header">
        <span>댓글 0</span>
        <a-divider type="vertical" />
        <span style="cursor: pointer">추천 0</span>
        <a-divider type="vertical" />
        <span>조회수 0</span>
        <a-divider type="vertical" />
        <span style="cursor: pointer">신고</span>
      </div>
    </div>-->

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
    isLiked: false,
    visible: false,
    mounted: false,
    post: {}
  }),
  methods: {
    onCommentPush(data) {
      this.comments.push(data)
    },
    onReplyPush(index, data) {
      this.comments.splice(index + 1, 0, data)
    },
    removeComment(item) {
      item.status = 4
    },
    async like() {
      const options = {
        url: `/prt/likes/${this.$route.params.postId}`,
        method: 'post',
        data: {
          refType: 2
        }
      }
      try {
        const { data } = await this.$axios(options)
        if (data.addLike) {
          this.post.likeCount++
          this.isLiked = true
        } else {
          this.post.likeCount--
          this.isLiked = false
        }
      } catch (err) {
        this.notifyError(err.response.data.message)
        console.log(err)
      }
    },
    onDelete() {
      const options = {
        url: `/prt/posts/${this.$route.params.postId}`,
        method: 'delete',
        params: {
          userId: this.user.uuid
        }
      }
      const that = this
      this.$confirm({
        title: '정말 삭제하시겠습니까?',
        content: '이 행동은 되돌릴 수 없습니다.',
        async onOk() {
          try {
            await that.$axios(options)
            that.$router.push('/')
          } catch (err) {
            console.log(err)
            that.notifyError(err.response.data.message)
          }
        }
      })
    },
    shareFacebook() {
      const { BASE_URL } = process.env
      const { path } = this.$route
      window.open(
        `http://www.facebook.com/sharer/sharer.php?u=${BASE_URL}${path}`
      )
    },
    shareTwitter() {
      const { BASE_URL } = process.env
      const { path } = this.$route
      window.open(
        `https://twitter.com/intent/tweet?text=TEXT&url=${BASE_URL}${path}`
      )
    },
    async copyLink() {
      this.$copyText(`${process.env.BASE_URL}${this.$route.path}`)
      this.messageSuccess('성공적으로 복사되었습니다')
    }
  },
  head() {
    return {
      title: this.post.title ? `${this.post.title} - 모스트피플` : '모스트피플',
      meta: [
        // Open Graph
        { hid: 'og-type', property: 'og:type', content: 'website' },
        {
          hid: 'og-site_name',
          property: 'og:site_name',
          content: '모스트피플'
        },
        { hid: 'og-title', property: 'og:title', content: this.post.title },
        {
          hid: 'og-description',
          property: 'og-description',
          content: this.post.lpretext
        },
        {
          hid: 'og-image',
          property: 'og:image',
          content: this.post.thumbnailUrl
        },
        {
          hid: 'og-url',
          property: 'og:url',
          content: process.env.BASE_URL + this.$route.path
        },
        {
          hid: 'og-image-alt',
          property: 'og:image:alt',
          content: '###mostpeople###'
        },
        // Twitter
        {
          hid: 'twitter-site',
          property: 'twitter:site',
          content: '@모스트피플'
        },
        {
          hid: 'twitter-card',
          property: 'twitter:card',
          content: 'summary'
        },
        {
          hid: 'twitter-title',
          property: 'twitter:title',
          content: '모스트피플'
        },
        {
          hid: 'twitter-description',
          property: 'twitter:description',
          content: this.post.pretext
        },
        {
          hid: 'twitter-image',
          property: 'twitter:image',
          content: this.post.thumbnailUrl
        },
        {
          hid: 'twitter-domain',
          property: 'twitter:domain',
          content: process.env.BASE_URL + this.$route.path
        }
      ]
    }
  },
  async asyncData({ app, params, redirect }) {
    const options = {
      url: `/posts/${params.postId}`,
      method: 'get'
    }
    try {
      const { data } = await app.$axios(options)
      if (data.post.status === 4 || !data.post.title)
        return redirect('/notfound')
      return {
        breadcrumbs: data.breadcrumbs,
        comments: data.comments,
        post: data.post
      }
    } catch (err) {
      console.log(err)
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'auth/IS_LOGGED_IN',
      user: 'auth/GET_USER'
    })
  },
  mounted() {
    this.mounted = true
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
  .pointer {
    cursor: pointer;
    &.isLiked {
      color: $brand-color;
      transition: 0.3s;
    }
  }
}
.ant-divider {
  margin: 0 4px;
}
.facebook {
  &:hover {
    color: #3b5998;
  }
}
.twitter {
  &:hover {
    color: #1da1f2;
  }
}
.link {
  &:hover {
    color: $oc-gray-9;
  }
}

.ant-skeleton[data-v-28c03496] {
  margin: 2rem 0;
}
</style>
