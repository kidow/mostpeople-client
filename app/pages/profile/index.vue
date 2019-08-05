<template>
  <div>
    <a-tabs
      type="card"
      defaultActiveKey="1"
      :tabPosition="$device.isMobile ? 'top' : 'left'"
      @change="tabChange"
    >
      <a-tab-pane tab="기본 정보" key="1">
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
          <a-cascader
            style="width: 300px; margin-bottom: 1.5rem"
            expandTrigger="hover"
            size="large"
            :options="options"
            :showSearch="{filter}"
            @change="onChange"
            placeholder="직업"
          />
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
            :disabled="!email || !nickname || !occupation"
            size="large"
            style="display: block; margin-top: 1.5rem"
            type="primary"
          >변경하기</a-button>
        </span>
      </a-tab-pane>

      <a-tab-pane tab="내 활동" key="2">
        <div style="font-size: 16px; line-height: 2.0">
          게시글
          <vue-count-to
            style="font-weight: bold; font-size: 28px"
            :end-val="posts.length"
            :duration="1500"
          />개
          <div>
            <a-list itemLayout="vertical" size="large" :pagination="pagination" :dataSource="posts">
              <a-list-item slot="renderItem" slot-scope="item" key="item.title">
                <template slot="actions" v-for="{type, text} in actions">
                  <span :key="type">
                    <a-icon :type="type" style="margin-right: 8px" />
                    {{text}}
                  </span>
                </template>
                <img
                  slot="extra"
                  width="272"
                  style="cursor: pointer"
                  alt="logo"
                  src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                  @click="$router.push(item.href)"
                />
                <a-list-item-meta>
                  <nuxt-link slot="title" :to="item.href">{{item.title}}</nuxt-link>
                </a-list-item-meta>
                {{item.content}}
              </a-list-item>
            </a-list>
          </div>
        </div>
        <div style="font-size: 16px">
          댓글
          <vue-count-to
            style="font-weight: bold; font-size: 28px; line-height: 2.0"
            :end-val="comments.length"
            :duration="1500"
          />개
          <div>
            <a-list class="comment-list" itemLayout="horizontal" :dataSource="comments">
              <a-list-item slot="renderItem" slot-scope="item">
                <a-comment :author="item.author" :avatar="item.avatar">
                  <template slot="actions">
                    <span>수정</span>
                    <span>삭제</span>
                  </template>
                  <p slot="content">{{item.content}}</p>
                  <a-tooltip slot="datetime" :title="item.datetime">
                    <span>{{item.datetime}}</span>
                  </a-tooltip>
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
          <li>사용하고 계신 이메일(donghyunkim@gangmom.kr)은 탈퇴할 경우 재사용 및 복구가 불가능합니다.</li>
          <li>탈퇴 후 회원정보 및 개인 서비스 이용기록은 모두 삭제됩니다.</li>
          <li>작성한 게시글 및 댓글은 탈퇴 시 자동 삭제되지 않고 그대로 남아있습니다. 삭제를 원하는 게시글이 있다면 반드시 탈퇴 전 비공개 처리하거나 삭제하시기 바랍니다. 탈퇴 후에는 회원정보가 삭제되어 게시글 및 댓글 삭제가 불가능합니다.</li>
        </ul>
        <div style="margin-bottom: 10px">
          <a-checkbox @change="e => checked = e.target.checked">안내 사항을 모두 확인하였으며, 이에 동의합니다.</a-checkbox>
        </div>
        <a-button :disabled="!checked" size="large" type="danger" @click="resign">회원 탈퇴하기</a-button>
      </a-tab-pane>
      <a-tab-pane tab="알림 설정" key="5">
        <span class="basic">
          <label for="email">이메일</label>
          <a-switch v-model="alarm.email" />
        </span>
      </a-tab-pane>
      <a-tab-pane tab="새 글 등록" key="6"></a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import isLength from 'validator/lib/isLength'
const posts = []
for (let i = 0; i < 23; i++) {
  posts.push({
    href: 'https://vue.ant.design/',
    title: `ant design vue part ${i}`,
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
  })
}
import VueCountTo from 'vue-count-to'
import { mapGetters } from 'vuex'
export default {
  head: _ => ({
    title: '내정보 - 모스트피플'
  }),
  data: _ => ({
    posts,
    pagination: {
      onChange: page => console.log(page),
      pageSize: 5,
      size: 'small'
    },
    actions: [
      { type: 'like', text: '156' },
      { type: 'message', text: '2' },
      { type: 'eye', text: '156' }
    ],
    comments: [
      {
        author: 'Han Solo',
        avatar:
          'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content:
          'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        datetime: 'a day ago'
      },
      {
        author: 'Han Solo',
        avatar:
          'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content:
          'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        datetime: '2 days ago'
      }
    ],
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
    occupation: '',
    options: [
      {
        value: 'professional',
        label: '전문직',
        children: [
          {
            value: 'lawyer',
            label: '변호사'
          },
          {
            value: 'doctor',
            label: '의사'
          }
        ]
      },
      {
        value: 'student',
        label: '학생',
        children: [
          {
            value: 'elementary',
            label: '초등학생'
          },
          {
            value: 'middle',
            label: '중학생'
          },
          {
            value: 'high',
            label: '고등학생'
          },
          {
            value: 'university',
            label: '대학생'
          },
          {
            value: 'pregraduate',
            label: '대학원생'
          }
        ]
      }
    ],
    facebookUrl: '',
    twitterUrl: ''
  }),
  methods: {
    resign() {
      this.$confirm({
        title: '경고',
        content: '정말로 탈퇴하시겠습니까?',
        okText: '예',
        cancelText: '아니오',
        okType: 'danger',
        async onOk() {
          this.loading = true
          const options = {
            url: '/prt/users',
            method: 'delete'
          }
          try {
            await this.$axios(options)
            this.loading = false
            this.$store.commit('auth/CLEAR_USER')
            this.$router.push('/')
          } catch (err) {
            this.loading = false
            console.log(err)
          }
        }
      })
    },
    onChange(value, selectedOptions) {
      this.occupation = value[0]
      console.log(value, selectedOptions)
    },
    filter(inputValue, path) {
      return path.some(
        option =>
          option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
      )
    },
    tabChange(key) {
      if (key === '2') this.getTimeline()
      else if (key === '6') this.$router.push('/new')
    },
    async getTimeline() {
      this.loading = true
      const options = {
        url: '/prt/users/timeline',
        method: 'get'
      }
      try {
        const { data } = await this.$axios(options)
        this.posts = data.posts
        this.comments = data.comments
        this.loading = false
      } catch (err) {
        console.log(err)
        this.loading = false
        this.notifyError(err.response.data.message)
      }
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
    }
  },
  components: {
    VueCountTo
  },
  middleware: ['isNotLoggedIn'],
  computed: {
    ...mapGetters({
      user: 'auth/GET_USER'
    })
  },
  mounted() {
    const {
      email,
      nickname,
      intro,
      occupation,
      facebookUrl,
      twitterUrl
    } = this.user
    this.email = email
    this.nickname = nickname
    this.intro = intro
    this.occupation = occupation
    this.facebookUrl = facebookUrl
    this.twitterUrl = twitterUrl
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
  min-height: 300px;
  padding: 1rem;
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
