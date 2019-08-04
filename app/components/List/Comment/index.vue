<template>
  <div>
    <div class="comment__header">
      <span>댓글 {{ comments.length }}</span>
      <a-divider type="vertical" />
      <span class="recommend">추천 {{ likes }}</span>
      <a-divider type="vertical" />
      <span>조회수 {{ views }}</span>
      <a-divider type="vertical" />
      <span class="recommend">신고</span>
    </div>
    <a-list v-if="comments.length" :dataSource="comments" itemLayout="horizontal">
      <a-list-item slot="renderItem" slot-scope="item">
        <a-comment
          :author="item.nickname"
          :avatar="item.profileUrl"
          :content="item.content"
          :datetime="item.createdAt"
          :class="item.parentId"
        >
          <template slot="actions">
            <a-tooltip title="좋아요">
              <a-icon
                type="like"
                :theme="action === 'liked' ? 'filled' : 'outlined'"
                @click="like"
              />
              <span style="padding-left: '8px';cursor: 'auto'">{{ likes }}</span>
            </a-tooltip>
            <span>수정</span>
            <span>삭제</span>
            <span @click="isReply = !isReply">답글</span>
          </template>
          <a-comment v-if="isReply">
            <a-avatar
              slot="avatar"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
            />
            <div slot="content">
              <a-form-item>
                <a-textarea :rows="4" v-model="reply"></a-textarea>
              </a-form-item>
              <a-form-item>
                <a-button
                  htmlType="submit"
                  :loading="loading.reply"
                  @click="replySubmit"
                  type="primary"
                >Add Comment</a-button>
              </a-form-item>
            </div>
          </a-comment>
        </a-comment>
      </a-list-item>
    </a-list>

    <a-comment v-if="isLoggedIn">
      <a-avatar
        slot="avatar"
        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        alt="Han Solo"
      />
      <div slot="content">
        <a-form-item>
          <a-textarea :rows="4" v-model="comment" />
        </a-form-item>
        <a-form-item>
          <a-button
            :disabled="!comment"
            htmlType="submit"
            :loading="loading.comment"
            @click="commentSubmit"
            type="primary"
          >등록</a-button>
        </a-form-item>
      </div>
    </a-comment>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ListComment',
  data: _ => ({
    comment: '',
    reply: '',
    loading: {
      comment: false,
      reply: false
    },
    action: null,
    likes: 0,
    views: 0,
    isReply: false
  }),
  props: {
    comments: {
      type: Array,
      default: _ => []
    }
  },
  methods: {
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
      } catch (err) {
        console.log(err)
        this.notifyError({ description: err.response.data.message })
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
  computed: {
    ...mapGetters({
      isLoggedIn: 'auth/IS_LOGGED_IN'
    })
  }
}
</script>

<style lang="scss" scoped>
.ant-list-item {
  padding: 0;
}
.comment__header {
  .recommend {
    cursor: pointer;
  }
}
</style>