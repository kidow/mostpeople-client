<template>
  <div>
    <a-list
      v-if="comments.length"
      :dataSource="comments"
      :header="`댓글 ${comments.length}`"
      itemLayout="horizontal"
    >
      <a-list-item slot="renderItem" slot-scope="item">
        <a-comment
          :author="item.author"
          :avatar="item.avatar"
          :content="item.content"
          :datetime="item.datetime"
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
            <span>
              <a-tooltip title="Dislike">
                <a-icon
                  type="dislike"
                  :theme="action === 'disliked' ? 'filled' : 'outlined'"
                  @click="dislike"
                />
                <span style="padding-left: '8px';cursor: 'auto'">{{dislikes}}</span>
              </a-tooltip>
            </span>
            <span>수정</span>
            <span>삭제</span>
            <span @click="isReply = !isReply">답글</span>
          </template>
          <a-comment v-for="reply in item.children" :key="reply.id" :author="reply.author" :avatar="reply.avatar" :content="reply.content" :datetime="$moment(reply.createdAt).fromNow()" >
            <template slot="actions">
              <a-tooltip title="좋아요">
                <a-icon
                  type="like"
                  :theme="action === 'liked' ? 'filled' : 'outlined'"
                  @click="like"
                />
                <span style="padding-left: '8px';cursor: 'auto'">{{ likes }}</span>
              </a-tooltip>
              <span>
                <a-tooltip title="Dislike">
                  <a-icon
                    type="dislike"
                    :theme="action === 'disliked' ? 'filled' : 'outlined'"
                    @click="dislike"
                  />
                  <span style="padding-left: '8px';cursor: 'auto'">{{dislikes}}</span>
                </a-tooltip>
              </span>
              <span>수정</span>
              <span>삭제</span>
            </template>
          </a-comment>
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
                  :loading="submitting.reply"
                  @click="replySubmit"
                  type="primary"
                >Add Comment</a-button>
              </a-form-item>
            </div>
          </a-comment>
        </a-comment>
      </a-list-item>
    </a-list>
    <a-comment>
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
            :loading="submitting.comment"
            @click="commentSubmit"
            type="primary"
          >Add Comment</a-button>
        </a-form-item>
      </div>
    </a-comment>
  </div>
</template>

<script>
export default {
  data: _ => ({
    comment: '',
    reply: '',
    submitting: {
      comment: false,
      reply: false
    },
    action: null,
    likes: 0,
    dislikes: 0,
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
      this.submitting.comment = true

      setTimeout(() => {
        this.submitting.comment = false
        let comment = {
            author: 'Han Solo',
            avatar:
              'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: this.comment,
            datetime: this.$moment().fromNow()
          }
        this.$emit('comment', comment)
        this.comment = ''
      }, 1000)
    },
    async replySubmit() {
      this.submitting.reply = true

      setTimeout(() => {
        this.submitting.reply = false
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
      this.dislikes = 0
      this.action = 'liked'
    },
    async dislike() {
      this.likes = 0
      this.dislikes = 1
      this.action = 'disliked'
    }
  }
}
</script>

<style lang="scss" scoped>
.ant-list-item {
  padding: 0;
}
</style>