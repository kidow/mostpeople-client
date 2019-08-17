<template>
  <div>
    <a-tabs
      type="card"
      defaultActiveKey="1"
      :tabPosition="$device.isMobile ? 'top' : 'left'"
      @change="tabChange"
    >
      <a-tab-pane tab="기본 정보" key="1">
        <a-upload
          accept="image/*"
          :action="uploadURL"
          name="mostpeople"
          :withCredentials="true"
          :beforeUpload="file => beforeUpload(file)"
          :showUploadList="false"
          @change="fileChange"
        >
          <a-avatar
            :src="user.profileUrl"
            v-if="user.profileUrl"
            :size="64"
            style="cursor: pointer; margin-bottom: 1rem"
          />
          <a-avatar v-else :size="64" icon="user" style="cursor: pointer; margin-bottom: 1rem" />
        </a-upload>
        <span class="basic">
          <label for="email">이메일</label>
          <a-input size="large" style="width: 300px;" id="email" v-model="email" disabled />
        </span>
        <span class="basic">
          <label for="nickname">닉네임</label>
          <a-input
            size="large"
            placeholder="닉네임 (3 ~ 8자)"
            style="width: 300px;"
            id="nickname"
            v-model="nickname"
          />
        </span>
        <span class="basic">
          <label for="job">직업</label>
          <a-auto-complete
            @select="onSelect"
            size="large"
            @search="onSearch"
            placeholder="검색"
            :open="isOpen"
            optionLabelProp="text"
            style="margin-bottom: 24px"
            :defaultValue="user.korName"
          >
            <a-spin v-if="fetching" size="small" />
            <template slot="dataSource">
              <a-select-option
                v-for="occupation in dataSource"
                :key="occupation.uuid"
                :text="occupation.korName"
              >{{ occupation.korName }}</a-select-option>
            </template>
          </a-auto-complete>
        </span>
        <span class="basic">
          <label for="facebook">페이스북</label>
          <a-input
            size="large"
            addonBefore="https://facebook.com/"
            style="width: 300px; margin-bottom: 1.5rem"
            id="facebook"
            v-model="facebookUrl"
          />
        </span>
        <span class="basic">
          <label for="twitter">트위터</label>
          <a-input
            size="large"
            addonBefore="https://twitter.com/"
            style="width: 300px; margin-bottom: 1.5rem"
            id="twitter"
            v-model="twitterUrl"
          />
        </span>
        <span class="basic">
          <label for="intro">자기 소개</label>
          <a-textarea v-model="intro" id="intro" />
        </span>
        <span class="basic">
          <a-button
            :disabled="!email || !nickname"
            size="large"
            style="display: block; margin-top: 1.5rem"
            type="primary"
            @click="changeProfile"
          >변경하기</a-button>
        </span>
      </a-tab-pane>

      <a-tab-pane tab="내 활동" key="2">
        <a-list itemLayout="vertical" size="large" :dataSource="skeletonData" v-if="loading">
          <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
            <a-skeleton :loading="loading" active avatar>
              <a-list-item-meta description="loading">
                <a slot="title" href="http">{{ 'titme' }}</a>
                <a-avatar slot="avatar" src="loading" />
              </a-list-item-meta>
            </a-skeleton>
          </a-list-item>
        </a-list>
        <div v-else-if="posts.length" style="font-size: 16px; line-height: 2.0">
          게시글
          <vue-count-to
            style="font-weight: bold; font-size: 28px"
            :end-val="posts.length"
            :duration="1500"
          />개
          <div>
            <a-list itemLayout="vertical" size="large" :dataSource="posts">
              <a-list-item slot="renderItem" slot-scope="item" key="item.title">
                <template slot="actions">
                  <span>
                    <a-icon type="like" style="margin: 0 8px" />
                    {{ item.likeCount }}
                    <a-icon type="message" style="margin: 0 8px" />
                    {{ item.commentCount }}
                    <a-icon type="eye" style="margin: 0 8px" />
                    {{ item.viewCount }}
                  </span>
                </template>
                <img
                  slot="extra"
                  width="272"
                  style="cursor: pointer; height: 150px"
                  alt="logo"
                  v-if="item.thumbnailUrl"
                  :src="item.thumbnailUrl"
                  @click="$router.push(`/post/${item.uuid}`)"
                />
                <a-list-item-meta>
                  <template slot="title">
                    <nuxt-link :to="`/post/${item.uuid}`">{{item.title}}</nuxt-link>
                    <nuxt-link
                      class="post-korName"
                      :to="`/board/${item.occupationId}`"
                    >{{ item.korName }}</nuxt-link>
                  </template>
                </a-list-item-meta>
                {{item.content}}
              </a-list-item>
            </a-list>
          </div>
        </div>
        <div v-else>아직 활동하신게 없네요.</div>
        <div style="font-size: 16px" v-if="comments.length">
          댓글
          <vue-count-to
            style="font-weight: bold; font-size: 28px; line-height: 2.0"
            :end-val="comments.length"
            :duration="1500"
          />개
          <div>
            <a-list class="comment-list" itemLayout="horizontal" :dataSource="comments">
              <a-list-item slot="renderItem" slot-scope="item, index">
                <a-comment :content="item.content" v-if="!item.isEdit">
                  <span slot="author">
                    <nuxt-link :to="`/post/${item.uuid}`">{{ item.title }}</nuxt-link>
                  </span>
                  <template slot="actions">
                    <span @click="item.isEdit = true">수정</span>
                    <a-popconfirm
                      title="정말 삭제하시겠습니까?"
                      @confirm="removeComment(item, index)"
                      okType="danger"
                      cancelText="아니오"
                    >
                      <span slot="okText">예</span>
                      <span>삭제</span>
                    </a-popconfirm>
                  </template>
                  <a-tooltip
                    slot="datetime"
                    :title="$moment(item.createdAt).format('YYYY-MM-DD hh:mm:ss')"
                  >
                    <span>{{ $moment(item.createdAt).fromNow()}}</span>
                  </a-tooltip>
                </a-comment>
                <a-comment v-else>
                  <div slot="content">
                    <a-form-item>
                      <a-textarea :rows="4" v-model="item.content"></a-textarea>
                    </a-form-item>
                    <a-form-item>
                      <a-button
                        :disabled="!item.content"
                        htmlType="submit"
                        :loading="item.loading"
                        @click="editComment(item)"
                        type="primary"
                      >수정</a-button>
                    </a-form-item>
                  </div>
                </a-comment>
              </a-list-item>
            </a-list>
          </div>
        </div>
      </a-tab-pane>

      <a-tab-pane tab="비밀번호 변경" key="3">
        <form @submit.prevent="changePassword">
          <span class="basic">
            <label for="password">기존 비밀번호</label>
            <a-input
              size="large"
              style="width: 300px;"
              id="password"
              v-model="password"
              type="password"
            />
          </span>
          <span class="basic">
            <label for="newPassword">새 비밀번호</label>
            <a-input
              size="large"
              placeholder="8 ~ 20자"
              style="width: 300px;"
              id="newPassword"
              v-model="newPassword"
            />
          </span>
          <span class="basic">
            <label for="newPasswordConfirm">새 비밀번호 확인</label>
            <a-input
              size="large"
              style="width: 300px;"
              id="newPasswordConfirm"
              v-model="newPasswordConfirm"
            />
          </span>
          <span class="basic">
            <a-button
              :disabled="!password || !newPassword || !newPasswordConfirm"
              :loading="loading"
              size="large"
              style="display: block"
              type="primary"
            >변경하기</a-button>
          </span>
        </form>
      </a-tab-pane>
      <a-tab-pane tab="계정 탈퇴" key="4">
        <h1 style="font-weight: bold;">탈퇴 안내</h1>
        <p class="desc">회원 탈퇴를 하시기 전에 안내 사항을 꼭 확인해주세요.</p>
        <ul>
          <li>사용하고 계신 이메일({{ email }})은 탈퇴할 경우 재사용 및 복구가 불가능합니다.</li>
          <li>탈퇴 후 회원정보 및 개인 서비스 이용기록은 모두 삭제됩니다.</li>
          <li>작성한 게시글 및 댓글은 탈퇴 시 자동 삭제되지 않고 그대로 남아있습니다. 삭제를 원하는 게시글이 있다면 반드시 탈퇴 전 관리자에게 문의해서 처리하거나 삭제하시기 바랍니다. 탈퇴 후에는 회원정보가 삭제되어 게시글 및 댓글 삭제가 불가능합니다.</li>
        </ul>
        <div style="margin-bottom: 10px">
          <a-checkbox @change="e => checked = e.target.checked">안내 사항을 모두 확인하였으며, 이에 동의합니다.</a-checkbox>
        </div>
        <a-button :disabled="!checked" size="large" type="danger" @click="resign">회원 탈퇴하기</a-button>
      </a-tab-pane>
      <a-tab-pane tab="알림 설정" key="5">
        <div>아직 준비중이에요.</div>
        <span class="basic">
          <label for="email">이메일</label>
          <a-switch disabled v-model="alarm.email" />
        </span>
      </a-tab-pane>
      <a-tab-pane tab="새 글" key="6"></a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import isLength from 'validator/lib/isLength'
import VueCountTo from 'vue-count-to'
import { mapGetters } from 'vuex'
import debounce from 'lodash.debounce'
export default {
  head: _ => ({
    title: '내정보 - 모스트피플'
  }),
  data: _ => ({
    posts: [],
    comments: [],
    email: '',
    intro: '',
    password: '',
    checked: false,
    newPasswordConfirm: '',
    newPassword: '',
    loading: false,
    nickname: '',
    alarm: {
      sms: false,
      email: false
    },
    occupationId: '',
    timelineFetched: false,
    facebookUrl: '',
    twitterUrl: '',
    skeletonData: [{}, {}, {}],
    dataSource: [],
    isOpen: false,
    fetching: false
  }),
  methods: {
    onSearch: debounce(async function(name) {
      if (!name) return
      const options = {
        url: '/occupations/search',
        method: 'get',
        params: { name }
      }
      try {
        this.fetching = true
        this.isOpen = false
        const { data } = await this.$axios(options)
        this.isOpen = true
        this.fetching = false
        this.dataSource = data
      } catch (err) {
        this.isOpen = false
        console.log(err)
        this.fetching = false
        this.notifyError(err.response.data.message)
      }
    }, 800),
    onSelect(val) {
      this.isOpen = false
      this.occupationId = val
    },
    resign() {
      const that = this
      this.$confirm({
        title: '경고',
        content: '정말로 탈퇴하시겠습니까?',
        okText: '예',
        cancelText: '아니오',
        okType: 'danger',
        async onOk() {
          that.loading = true
          const options = {
            url: '/prt/users',
            method: 'delete'
          }
          try {
            await that.$axios(options)
            that.loading = false
            that.$store.commit('auth/CLEAR_USER')
            that.$message.success('그동안 이용해주셔서 감사합니다.')
            that.$router.push('/')
          } catch (err) {
            that.loading = false
            console.log(err)
          }
        }
      })
    },
    tabChange(key) {
      if (key === '2') this.getTimeline()
      else if (key === '6') this.$router.push('/new')
    },
    async getTimeline() {
      if (this.timelineFetched) return
      this.loading = true
      const options = {
        url: '/prt/users/timeline',
        method: 'get'
      }
      try {
        const { data } = await this.$axios(options)
        this.timelineFetched = true
        this.posts = data.posts
        this.comments = data.comments
        this.loading = false
      } catch (err) {
        console.log(err)
        this.loading = false
        this.notifyError(err.response.data.message)
      }
    },
    async changeProfile() {
      const options = {
        url: '/prt/users',
        method: 'put',
        data: {
          nickname: this.nickname,
          occupationId: this.occupationId,
          facebookUrl: this.facebookUrl,
          twitterUrl: this.twitterUrl,
          intro: this.intro,
          uuid: this.user.uuid
        }
      }
      const that = this
      this.$confirm({
        title: '변경하시겠습니까?',
        async onOk() {
          try {
            await that.$axios(options)
            that.messageSuccess('성공적으로 변경되었습니다.')
          } catch (err) {
            console.log(err)
            that.notifyError(err.response.data.message)
          }
        }
      })
    },
    async changePassword() {
      this.loading = true
      if (this.newPassword !== this.newPasswordConfirm)
        return this.notifyWarning({
          description: '비밀번호가 일치하지 않습니다'
        })
      if (!isLength(this.newPassword, { min: 8, max: 20 }))
        return this.notifyWarning({
          description: '비밀번호는 8 ~ 20자리 사이로 입력해주세요'
        })
      const options = {
        url: '/prt/users/password',
        method: 'put',
        data: {
          password: this.newPassword
        }
      }
      try {
        await this.$axios(options)
        this.notify()
        this.loading = false
      } catch (err) {
        console.log(err)
        this.loading = false
        this.notifyError(err.response.data.message)
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
        this.messageSuccess('성공적으로 수정되었습니다.')
        item.loading = false
        item.isEdit = false
      } catch (err) {
        item.loading = false
        console.log(err)
        this.notifyError(err.response.data.message)
      }
    },
    async removeComment(item, index) {
      item.loading = true
      const options = {
        url: `/prt/comments/${item.id}`,
        method: 'delete'
      }
      try {
        await this.$axios(options)
        item.loading = false
        this.comments.splice(index, 1)
        this.messageSuccess('성공적으로 삭제되었습니다')
      } catch (err) {
        item.loading = false
        console.log(err)
        this.notifyError(err.response.data.message)
      }
    },
    beforeUpload(file) {
      if (file.size / 1024 / 1024 / 1024 > 3) {
        this.notifyError('이미지의 용량이 3MB를 초과합니다.')
        return false
      }

      return true
    },
    async fileChange({ file }) {
      if (!file.response) return
      const options = {
        url: `/prt/users/image`,
        method: 'put',
        data: {
          imageId: file.response.imageId
        }
      }
      try {
        await this.$axios(options)
        this.$store.commit('auth/SAVE_PROFILE', file.response.location)
        this.messageSuccess()
      } catch (err) {
        console.log(err)
        this.notifyError(err.response.data.message)
      }
    }
  },
  components: {
    VueCountTo
  },
  middleware: ['isNotLoggedIn'],
  computed: {
    ...mapGetters({
      user: 'auth/GET_USER'
    }),
    uploadURL() {
      return `${process.env.API_BASE_URL}/prt/images`
    }
  },
  mounted() {
    const {
      email,
      nickname,
      intro,
      facebookUrl,
      twitterUrl,
      occupationId
    } = this.user
    this.email = email
    this.nickname = nickname
    this.intro = intro
    this.occupationId = occupationId
    this.facebookUrl = facebookUrl
    this.twitterUrl = twitterUrl
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/color.scss';

.post-korName {
  color: $oc-gray-6;
  font-size: 12px;
  &:hover {
    color: $oc-gray-6;
  }
}
</style>


<style lang="scss">
.ant-tabs-card {
  .ant-tabs-content {
    background: white;
    border-top: 1px solid #e8e8e8;
    border-right: 1px solid #e8e8e8;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px;
    border-bottom: 1px solid #e8e8e8;
    min-height: 300px;
    padding: 1rem 2rem;
  }
}
</style>


<style lang="scss" scoped>
@import '~/assets/scss/media.scss';
@import '~/assets/scss/color.scss';

.desc {
  font-size: 18px;
  @include media('<phone') {
    font-size: 14px;
  }
}

ul {
  list-style: initial;
}

.basic {
  label {
    display: block;
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 8px;
  }
  input {
    margin-bottom: 1.5rem;
  }
}

.ant-list-item-meta {
  margin-top: 20px;
}

.ant-list-item-meta-title {
  font-size: 24px;
  margin-bottom: 6px;
}
</style>
