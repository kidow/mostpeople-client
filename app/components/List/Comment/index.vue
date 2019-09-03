<template>
  <div>
    <a-list v-if="comments.length" :dataSource="comments" itemLayout="horizontal">
      <a-list-item slot="renderItem" slot-scope="item, index">
        <a-comment :class="{ 'ant-comment-nested': !!item.parentId }" v-if="!item.isEdit">
          <span
            v-if="item.status === 1"
            slot="datetime"
          >{{ $moment(item.createdAt).add(9, 'hour').format('YYYY-MM-DD hh:mm:ss') }}</span>
          <div slot="content">{{ item.status === 1 ? item.content : '삭제된 댓글입니다.' }}</div>
          <span
            slot="author"
            @click="$router.push(`/profile/@${item.nickname}`)"
            style="font-size: 16px; cursor: pointer"
            v-if="item.status === 1"
          >{{ item.nickname }}</span>
          <a-avatar
            slot="avatar"
            :src="item.profileUrl"
            :alt="item.profileAlt"
            v-if="item.profileUrl && item.status === 1"
            @click="$router.push(`/profile/@${item.nickname}`)"
          />
          <a-avatar
            v-else-if="!item.profileUrl && item.status === 1"
            icon="user"
            slot="avatar"
            @click="$router.push(`/profile/@${item.nickname}`)"
          />
          <template slot="actions" v-if="item.status === 1">
            <a-tooltip title="좋아요">
              <template @click="like(item)">
                <a-icon type="like" :theme="item.isLiked ? 'filled' : 'outlined'" />
                <span style="padding-left: 4px;cursor: 'auto'">{{ item.likeCount }}</span>
              </template>
            </a-tooltip>
            <template v-if="item.userId === user.uuid">
              <span @click="item.isEdit = true">수정</span>
              <a-popconfirm
                title="정말 삭제하시겠습니까?"
                @confirm="removeComment(item)"
                okType="danger"
                cancelText="아니오"
              >
                <span slot="okText">예</span>
                <span>삭제</span>
              </a-popconfirm>
              <span v-if="!item.parentId" @click="item.isReply = !item.isReply">답글</span>
            </template>
          </template>
          <!-- 답글 -->
          <a-comment v-if="item.isReply">
            <a-avatar
              slot="avatar"
              :src="user.profileUrl"
              :alt="user.profileAlt"
              v-if="user.profileUrl"
            />
            <a-avatar slot="avatar" v-else icon="user" />
            <div slot="content">
              <a-form-item>
                <a-textarea :rows="4" v-model="item.reply"></a-textarea>
              </a-form-item>
              <a-form-item>
                <a-button
                  htmlType="submit"
                  :loading="item.loading"
                  :disabled="!item.reply"
                  @click="replySubmit(item, index)"
                  type="primary"
                >등록</a-button>
              </a-form-item>
            </div>
          </a-comment>
        </a-comment>
        <a-comment v-else :class="{ 'ant-comment-nested': !!item.parentId }">
          <a-avatar
            slot="avatar"
            :src="user.profileUrl"
            :alt="user.profileAlt"
            v-if="user.profileUrl"
          />
          <a-avatar v-else icon="user" slot="avatar" />
          <div slot="content">
            <a-form-item>
              <a-textarea :disabled="!isLoggedIn" :rows="4" v-model="item.content" />
            </a-form-item>
            <a-form-item>
              <a-button
                :disabled="!item.content"
                htmlType="submit"
                :loading="item.loading"
                @click="item.isEdit ? editComment(item) : addReply(item)"
                type="primary"
              >{{ item.isEdit ? '수정' : '등록' }}</a-button>
              <a-button style="margin-left: 8px" @click="item.isEdit = false">취소</a-button>
            </a-form-item>
          </div>
        </a-comment>
      </a-list-item>
    </a-list>

    <a-comment>
      <a-avatar slot="avatar" :src="user.profileUrl" :alt="user.profileAlt" v-if="user.profileUrl" />
      <a-avatar v-else icon="user" slot="avatar" />
      <div slot="content">
        <a-form-item>
          <a-textarea
            :placeholder="isLoggedIn ? '': '로그인이 필요합니다'"
            :disabled="!isLoggedIn"
            :rows="4"
            v-model="comment"
          />
        </a-form-item>
        <a-form-item v-if="isLoggedIn">
          <a-button
            :disabled="!comment"
            htmlType="submit"
            :loading="loading.comment"
            @click="addComment"
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
      edit: false
    },
    isReply: false,
    likeCount: 0
  }),
  props: {
    comments: {
      type: Array,
      default: _ => []
    }
  },
  methods: {
    async addComment() {
      this.loading.comment = true
      const options = {
        url: `/prt/comments/${this.$sliceParams(this.$route.params.postId)}`,
        method: 'post',
        data: {
          content: this.comment
        }
      }
      try {
        const { data } = await this.$axios(options)
        this.loading.comment = false
        this.messageSuccess()
        this.$emit('add-comment', data)
        this.comment = ''
      } catch (err) {
        this.loading.comment = false
        console.log(err)
        this.notifyError(err.response.data.message)
      }
    },
    async removeComment(item) {
      item.loading = true
      const options = {
        url: `/prt/comments/${item.id}`,
        method: 'delete'
      }
      try {
        await this.$axios(options)
        item.loading = false
        this.$emit('remove-comment', item)
        this.messageSuccess('성공적으로 삭제되었습니다')
      } catch (err) {
        item.loading = false
        console.log(err)
        this.notifyError(err.response.data.message)
      }
    },
    async replySubmit(comment, index) {
      comment.loading = true
      const options = {
        url: `/prt/comments/${this.$sliceParams(this.$route.params.postId)}`,
        method: 'post',
        data: {
          content: comment.reply,
          parentId: comment.id
        }
      }
      try {
        const { data } = await this.$axios(options)
        comment.isReply = false
        comment.reply = ''
        this.messageSuccess()
        this.$emit('add-reply', index, data)
        comment.loading = false
      } catch (err) {
        comment.loading = false
        this.notifyError(err.response.data.message)
        console.log(err)
      }
    },
    async like(item) {
      const options = {
        url: `/prt/likes/${this.$sliceParams(item.uuid)}`,
        method: 'post',
        data: {
          refType: 3
        }
      }
      try {
        const { data } = await this.$axios(options)
        if (data.addLike) {
          item.likeCount++
          item.isLiked = true
        } else {
          item.likeCount--
          item.isLiked = false
        }
      } catch (err) {
        console.log(err)
        this.notifyError(err.response.data.message)
      }
    },
    async addReply(item) {
      item.loading = true
      const options = {
        url: `/prt/comments/${this.$sliceParams(this.$route.params.postId)}`,
        method: 'post',
        data: {
          parentId: item.id,
          content: item.reply
        }
      }
      try {
        const { data } = this.$axios(options)
        item.isEdit = false
        item.loading = false
      } catch (err) {
        console.log(err)
        this.notifyError(err.response.data.message)
        item.loading = false
      }
    },
    async editComment(item) {
      item.loading = true
      const options = {
        url: `/prt/comments/${item.id}`,
        method: 'put',
        data: {
          content: item.content
        }
      }
      try {
        await this.$axios(options)
        item.loading = false
        item.isEdit = false
        this.messageSuccess('성공적으로 수정되었습니다')
      } catch (err) {
        item.loading = false
        console.log(err)
        this.notifyError(err.response.data.message)
      }
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'auth/IS_LOGGED_IN',
      user: 'auth/GET_USER'
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
.facebook {
  font-size: 16px;
  &:hover {
    color: #3b5998;
  }
}
.twitter {
  font-size: 16px;
  &:hover {
    color: #1da1f2;
  }
}
</style>