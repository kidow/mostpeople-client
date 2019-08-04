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
          <a-avatar alt="thumbnail" :src="profileUrl" size="large" />
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
            to="mailto:wcgo2ling@gmail.com"
            target="_blank"
            style="font-size: 1rem; margin-left: 8px"
          >wcgo2ling@gmail.com</nuxt-link>
        </div>
        <p
          style="margin: 1rem 0; font-size: 1rem"
        >Frontend Engineer@Laftel Inc. 개발을 재미있게 이것 저것 하는 개발자입니다.</p>
      </a-tab-pane>

      <a-tab-pane tab="활동" key="2">
        <div style="font-size: 16px; line-height: 2.0">
          게시글
          <vue-count-to style="font-weight: bold; font-size: 28px" :end-val="130" :duration="1500" />개
          <div>
            <a-list
              itemLayout="vertical"
              size="large"
              :pagination="pagination"
              :dataSource="listData"
            >
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
            :end-val="10"
            :duration="1500"
          />개
          <div>
            <a-list class="comment-list" itemLayout="horizontal" :dataSource="data">
              <a-list-item slot="renderItem" slot-scope="item">
                <a-comment :author="item.author" :avatar="item.avatar">
                  <template slot="actions">
                    <span v-for="(action, i) in item.actions" :key="i">{{action}}</span>
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
    </a-tabs>
  </div>
</template>

<script>
const listData = []
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'https://vue.ant.design/',
    title: `ant design vue part ${i}`,
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
  })
}
import VueCountTo from 'vue-count-to'
export default {
  head: _ => ({
    title: '남의유저 - 모스트피플'
  }),
  validate({ params }) {
    return /@[a-z]/g.test(params.nickname)
  },
  components: {
    VueCountTo
  },
  data: _ => ({
    listData,
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
    data: [
      {
        actions: ['신고'],
        author: 'Han Solo',
        avatar:
          'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content:
          'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        datetime: 'a day ago'
      },
      {
        actions: ['신고'],
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
    nickname: '',
    occupation: '',
    profileUrl: '',
    facebookUrl: '',
    twitterUrl: '',
    timelineFetched: false,
    loading: false
  }),
  methods: {
    goFacebook() {
      window.open(`https://facebook.com/${this.facebookUrl}`, '_blank')
    },
    goTwitter() {
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
        this.timelineFetched = true
        this.loading = false
      } catch (err) {
        console.log(err)
        this.loading = false
        this.notifyError({ description: err.response.data.message })
      }
    }
  },
  async asyncData({ app, params }) {
    const options = {
      url: `/users/${params.nickname.slice(1)}`,
      method: 'get'
    }
    try {
      const { data } = await this.$axios(options)
      return {
        nickname: data.nickname,
        profileUrl: data.profileUrl,
        facebookUrl: data.facebookUrl,
        twitterUrl: data.twitterUrl,
        email: data.email,
        occupation: data.occupation,
        intro: data.intro
      }
    } catch (err) {
      console.log(err)
    }
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
  min-height: 200px;
  padding: 1rem;
}
</style>

<style lang="scss" scoped>
@import '~/assets/scss/media.scss';

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

.ant-avatar-lg {
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
</style>
