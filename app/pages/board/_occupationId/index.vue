<template>
  <div>
    <vue-breadcrumb :breadcrumbs="breadcrumbs" />
    <a-card :loading="loading" :title="`${korName}(은)는 무슨 직업인가요?`">
      <span class="edit-button" slot="extra" @click="onEdit">수정</span>
      <template v-if="!isEdit">
        <h1 v-if="intro">{{ intro }}</h1>
        <div v-else style="color: #adb5bd">첫 소개를 작성해 보세요</div>
        <div style="display: flex; justify-content: space-between">
          <span
            v-if="createdAt"
            class="createdAt"
          >{{ $moment(createdAt).add(9, 'hour').format('YYYY-MM-DD hh:mm:ss') }}</span>
          <span class="author" v-if="nickname">- {{ nickname }} -</span>
        </div>
      </template>
      <a-textarea
        v-model="intro"
        v-else
        placeholder="한 줄 요약"
        @keyup.enter="onEdit"
        :autosize="false"
      />
    </a-card>
    <a-tabs defaultActiveKey="1" @change="onChangeTab">
      <a-tab-pane tab="자유게시판" key="1">
        <vue-table
          :locale="{ emptyText: '글이 존재하지 않습니다'}"
          :dataSource="dataSource"
          :columns="columns"
          v-if="!$device.isMobile"
        />
        <a-list itemLayout="horizontal" :dataSource="dataSource" v-else>
          <a-list-item @click="onClickList(item)" slot="renderItem" slot-scope="item">
            <a-list-item-meta :intro="item.createdAt">
              <a slot="title" :href="`${$route.path}/post/${item.uuid}`">{{item.title}}</a>
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </a-tab-pane>
      <!-- <a-tab-pane tab="구직게시판" key="2">준비중입니다.</a-tab-pane> -->
      <a-button
        slot="tabBarExtraContent"
        @click="$router.push(`/new?occupationId=${$route.params.occupationId}`)"
      >새 글</a-button>
    </a-tabs>
  </div>
</template>

<script>
import VueBreadcrumb from '~/components/Breadcrumb'
import VueTable from '~/components/Table'
import { mapGetters } from 'vuex'
export default {
  validate({ params }) {
    return /[0-9a-f]{32}/g.test(params.occupationId)
  },
  data: _ => ({
    tab: '1',
    korName: '',
    dataSource: [],
    loading: false,
    isEdit: false,
    intro: '',
    breadcrumbs: [],
    createdAt: '',
    nickname: '',
    columns: [
      {
        title: '제목',
        dataIndex: 'title'
      },
      {
        title: '글쓴이',
        dataIndex: 'nickname'
      },
      {
        title: '작성일',
        dataIndex: 'createdAt'
      },
      {
        title: '조회수',
        dataIndex: 'viewCount'
      },
      {
        title: '추천',
        dataIndex: 'likeCount'
      }
    ]
  }),
  methods: {
    onChangeTab(tab) {
      this.tab = tab
    },
    onClickList({ uuid }) {
      this.$router.push(`/post/${uuid}`)
    },
    async onEdit() {
      if (!this.isLoggedIn) return this.notifyWarning('로그인을 해주세요.')
      if (!this.isEdit) return (this.isEdit = true)
      if (!this.intro) return (this.isEdit = false)
      if (this.intro.length > 40)
        return this.notifyWarning({ intro: '40자 이하로 작성해주세요' })
      const options = {
        url: `/prt/introductions/${this.$route.params.occupationId}`,
        method: 'put',
        data: {
          intro: this.intro
        }
      }
      try {
        this.loading = true
        await this.$axios(options)
        this.loading = false
        this.messageSuccess('성공적으로 수정되었습니다.')
        this.isEdit = false
      } catch (err) {
        this.loading = false
        this.notifyError(err.response.data.message)
        console.log(err)
      }
    }
  },
  components: {
    VueTable,
    VueBreadcrumb
  },
  head() {
    return {
      title: this.korName ? `${this.korName} - 모스트피플` : '모스트피플',
      meta: [
        // Open Graph
        { hid: 'og-type', property: 'og:type', content: 'website' },
        {
          hid: 'og-site_name',
          property: 'og:site_name',
          content: '모스트피플'
        },
        {
          hid: 'og-title',
          property: 'og:title',
          content: `${this.korName} - 모스트피플`
        },
        {
          hid: 'og-description',
          property: 'og:description',
          content: this.intro
        },
        {
          hid: 'og-url',
          property: 'og:url',
          content: process.env.BASE_URL + this.$route.path
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
          content: this.intro
        },
        {
          hid: 'twitter-domain',
          property: 'twitter:domain',
          content: process.env.BASE_URL + this.$route.path
        }
      ]
    }
  },
  async asyncData({ params, app }) {
    const options = {
      url: `/occupations/${params.occupationId}`,
      method: 'get'
    }
    try {
      const { data } = await app.$axios(options)
      return {
        intro: data.intro,
        korName: data.korName,
        nickname: data.nickname,
        createdAt: data.createdAt,
        breadcrumbs: data.breadcrumbs,
        dataSource: data.posts
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

.ant-card {
  margin: 12px 0;
}
.edit-button {
  cursor: pointer;
  color: $oc-gray-6;
  &:hover {
    color: $oc-gray-9;
  }
}
.ant-input {
  font-size: 1rem;
  &::placeholder {
    font-size: 1rem;
  }
}
</style>
