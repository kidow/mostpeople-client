<template>
  <div>
    <vue-breadcrumb :breadcrumbs="breadcrumbs" />
    <a-card :loading="loading.edit" :title="`${occupation.korName}(은)는 어떤 직업인가요?`">
      <span class="edit-button" slot="extra" @click="onEdit">수정</span>
      <template v-if="!isEdit">
        <h1 style="margin-bottom: 2rem" v-if="occupation.intro">{{ occupation.intro }}</h1>
        <div v-else style="color: #adb5bd">첫 소개를 작성해 보세요</div>
        <div style="display: flex; justify-content: space-between">
          <span
            v-if="occupation.createdAt"
            class="createdAt"
          >{{ $moment(occupation.createdAt).add(9, 'hour').format('YYYY-MM-DD hh:mm:ss') }}</span>
          <span
            style="cursor: pointer"
            v-if="occupation.nickname"
            @click="$router.push(`/profile/@${occupation.nickname}`)"
          >- {{ occupation.nickname }} -</span>
        </div>
      </template>
      <a-textarea
        v-model="occupation.intro"
        v-else
        placeholder="한 줄 요약"
        @keyup.enter="onEdit"
        :autosize="false"
      />
    </a-card>
    <a-tabs defaultActiveKey="1" @change="onChangeTab">
      <a-tab-pane tab="자유게시판" key="1">
        <vue-table
          :loading="!loading.page"
          :dataSource="posts"
          :columns="columns"
          v-if="!$device.isMobile"
        />
        <vue-list-post-mobile v-else :posts="posts" />
        <a-pagination
          :total="total"
          :size="$device.isMobile ? 'small' : ''"
          v-model="currentPage"
          style="margin-top: 24px"
          :defaultPageSize="20"
        />
      </a-tab-pane>

      <!-- <a-tab-pane tab="구직게시판" key="2">준비중입니다.</a-tab-pane> -->
      <a-button
        slot="tabBarExtraContent"
        @click="$router.push(`/new?occupationId=${$sliceParams($route.params.occupationId)}`)"
      >새 글</a-button>
    </a-tabs>
  </div>
</template>

<script>
import VueBreadcrumb from '~/components/Breadcrumb'
import VueTable from '~/components/Table'
import VueListPostMobile from '~/components/List/Post/Mobile'
import { mapGetters } from 'vuex'
export default {
  validate({ params }) {
    const sliceParams = paramsId =>
      paramsId.slice(paramsId.lastIndexOf('-') + 1, paramsId.length)
    return /[0-9a-f]{32}/g.test(sliceParams(params.occupationId))
  },
  data: _ => ({
    tab: '1',
    posts: [],
    occupation: {},
    loading: {
      edit: false,
      page: false
    },
    isEdit: false,
    breadcrumbs: [],
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
      },
      {
        title: '댓글',
        dataIndex: 'commentCount'
      }
    ],
    total: 0,
    currentPage: 1,
    offset: 0
  }),
  methods: {
    onChangeTab(tab) {
      this.tab = tab
    },
    async onEdit() {
      if (!this.isLoggedIn) return this.notifyWarning('로그인을 해주세요.')
      if (!this.isEdit) return (this.isEdit = true)
      if (!this.occupation.intro) return (this.isEdit = false)
      if (this.occupation.intro.length > 40)
        return this.notifyWarning('40자 이하로 작성해주세요')
      const options = {
        url: `/prt/introductions/${this.$sliceParams(
          this.$route.params.occupationId
        )}`,
        method: 'put',
        data: {
          intro: this.occupation.intro
        }
      }
      try {
        this.loading.edit = true
        await this.$axios(options)
        this.loading.edit = false
        this.messageSuccess('성공적으로 수정되었습니다.')
        this.isEdit = false
      } catch (err) {
        this.loading.edit = false
        this.notifyError(err.response.data.message)
        console.log(err)
      }
    },
    async getData() {
      this.loading.page = true
      const sliceParams = paramsId =>
        paramsId.slice(paramsId.lastIndexOf('-') + 1, paramsId.length)
      const options = {
        url: `/occupations/${this.$sliceParams(
          this.$route.params.occupationId
        )}`,
        method: 'get',
        params: {
          offset: this.offset
        }
      }
      try {
        const { data } = await this.$axios(options)
        window.scrollTo(0, 0)
        this.loading.page = false
        this.posts = data.posts
        this.total = data.total
      } catch (err) {
        this.loading.page = false
        console.log(err)
        this.notifyError(err.response.data.message)
      }
    }
  },
  components: {
    VueTable,
    VueBreadcrumb,
    VueListPostMobile
  },
  head() {
    return {
      title: this.occupation.korName
        ? `${this.occupation.korName} - 모스트피플`
        : '모스트피플',
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
          content: `${this.occupation.korName} - 모스트피플`
        },
        {
          hid: 'og-description',
          property: 'og:description',
          content: this.occupation.intro
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
          content: this.occupation.intro
        },
        {
          hid: 'twitter-domain',
          property: 'twitter:domain',
          content: process.env.BASE_URL + this.$route.path
        }
      ]
    }
  },
  async asyncData({ params, app, redirect }) {
    const sliceParams = paramsId =>
      paramsId.slice(paramsId.lastIndexOf('-') + 1, paramsId.length)
    const options = {
      url: `/occupations/${sliceParams(params.occupationId)}`,
      method: 'get'
    }
    try {
      const { data } = await app.$axios(options)
      if (!data.occupation.korName) return redirect('/')
      return {
        breadcrumbs: data.breadcrumbs,
        posts: data.posts,
        occupation: data.occupation,
        total: data.total
      }
    } catch (err) {
      console.log(err)
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'auth/IS_LOGGED_IN'
    })
  },
  watch: {
    currentPage(val) {
      this.offset = (val - 1) * 20
      this.getData()
    }
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
