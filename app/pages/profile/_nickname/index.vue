<template>
  <div>
    <a-tabs
      type="card"
      @change="tabChange"
      defaultActiveKey="1"
      :tabPosition="$device.isMobile ? 'top' : 'left'"
    >
      <a-tab-pane tab="기본 정보" key="1">
        <div style="display: flex; align-items: center; position: relative;">
          <a-avatar alt="thumbnail" :src="profileUrl" v-if="profileUrl" size="large" />
          <a-avatar alt="thumbnail" icon="user" v-else size="large" />
          <span
            style="font-size: 36px; margin-left: 8px; top: 7rem; left: 10rem; position: absolute"
          >{{ nickname }}</span>
        </div>
        <div style="display: flex; align-items: center; margin: 1rem 0;">
          <a-icon @click="goFacebook" theme="filled" class="facebook" type="facebook" />
          <a-icon @click="goTwitter" type="twitter" class="twitter" />
        </div>
        <div style="display: flex; align-items: center">
          <a-icon theme="filled" style="font-size: 1.5rem;" type="mail" />
          <nuxt-link
            :to="`mailto:${email}`"
            target="_blank"
            style="font-size: 1rem; margin-left: 8px"
          >{{ email }}</nuxt-link>
        </div>
        <p style="margin: 1rem 0; font-size: 1rem">{{ intro }}</p>
        <div class="form" v-if="korName">
          <label for="occupation">직업</label>
          <a-input :defaultValue="korName" style="width: 200px" id="occupation" read-only />
        </div>
      </a-tab-pane>

      <a-tab-pane tab="활동" key="2">
        <a-list itemLayout="vertical" size="large" :dataSource="skeleton" v-if="loading">
          <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
            <a-skeleton :loading="loading" active avatar>
              <a-list-item-meta description="loading">
                <a href="http" slot="title">tiel</a>
                <a-avatar slot="avatar" src="lodign" />
              </a-list-item-meta>
            </a-skeleton>
          </a-list-item>
        </a-list>
        <div style="font-size: 16px; line-height: 2.0" v-else-if="posts.length">
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
                    <br />
                    <nuxt-link
                      class="post-korName"
                      style="font-size: 12px: color: #adb5bd"
                      :to="`/board/${item.occupationId}`"
                    >{{ item.korName }}</nuxt-link>
                  </template>
                </a-list-item-meta>
                {{item.content}}
              </a-list-item>
            </a-list>
          </div>
        </div>
        <div v-else>활동 내역이 없습니다.</div>
        <div style="font-size: 16px" v-if="comments.length">
          댓글
          <vue-count-to
            style="font-weight: bold; font-size: 28px; line-height: 2.0"
            :end-val="comments.length"
            :duration="1500"
          />개
          <div>
            <a-list class="comment-list" itemLayout="horizontal" :dataSource="comments">
              <a-list-item slot="renderItem" slot-scope="item">
                <a-comment :content="item.content">
                  <span slot="author">
                    <nuxt-link :to="`/post/${item.uuid}`">{{ item.title }}</nuxt-link>
                  </span>
                  <a-tooltip
                    slot="datetime"
                    :title="$moment(item.datetime).add(9, 'hour').format('YYYY-MM-DD hh:mm:ss')"
                  >
                    <span>{{$moment(item.datetime).add(9, 'hour').fromNow()}}</span>
                  </a-tooltip>
                </a-comment>
              </a-list-item>
            </a-list>
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import VueCountTo from 'vue-count-to'
export default {
  head() {
    return {
      title: this.nickname ? `${this.nickname} - 모스트피플` : '모스트피플'
    }
  },
  validate({ params }) {
    return /@[a-z]/g.test(params.nickname)
  },
  components: {
    VueCountTo
  },
  data: _ => ({
    posts: [],
    comments: [],
    email: '',
    intro: '',
    nickname: '',
    korName: '',
    profileUrl: '',
    facebookUrl: '',
    twitterUrl: '',
    timelineFetched: false,
    loading: false,
    skeleton: [{}, {}, {}]
  }),
  methods: {
    goFacebook() {
      if (!this.facebookUrl) return
      window.open(`https://facebook.com/${this.facebookUrl}`, '_blank')
    },
    goTwitter() {
      if (!this.twitterUrl) return
      window.open(`https://twitter.com/${this.twitterUrl}`, '_blank')
    },
    tabChange(key) {
      if (key === '2') this.getTimeline()
    },
    async getTimeline() {
      const { nickname } = this.$route.params
      if (this.timelineFetched) return
      this.loading = true
      const options = {
        url: `/users/${nickname.slice(1)}/timeline`,
        method: 'get'
      }
      try {
        const { data } = await this.$axios(options)
        console.log(data.posts)
        this.posts = data.posts
        this.comments = data.comments
        this.timelineFetched = true
        this.loading = false
      } catch (err) {
        console.log(err)
        this.loading = false
        this.notifyError(err.response.data.message)
      }
    }
  },
  async asyncData({ app, params }) {
    const options = {
      url: `/users/${params.nickname.slice(1)}`,
      method: 'get'
    }
    try {
      const { data } = await app.$axios(options)
      return {
        nickname: data.nickname,
        profileUrl: data.profileUrl,
        facebookUrl: data.facebookUrl,
        twitterUrl: data.twitterUrl,
        email: data.email,
        korName: data.korName,
        intro: data.intro
      }
    } catch (err) {
      console.log(err)
    }
  }
}
</script>


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

.ant-avatar {
  width: 10rem;
  height: 10rem;
  img {
    width: 10rem;
    height: 10rem;
  }
}

.twitter,
.facebook {
  font-size: 36px;
  cursor: pointer;
}

.twitter {
  &:hover {
    color: #00aced;
  }
}

.facebook {
  &:hover {
    color: #3b5998;
  }
  margin-right: 0.5rem;
}

.form {
  label {
    font-weight: 700;
    margin-right: 8px;
    font-size: 1rem;
  }
}

.post-korName {
  color: $oc-gray-6;
  font-size: 12px;
  &:hover {
    color: $oc-gray-6;
  }
}
</style>

<style lang="scss">
.ant-avatar[data-v-70d93e5a] {
  i {
    font-size: 135px;
  }
}
</style>
