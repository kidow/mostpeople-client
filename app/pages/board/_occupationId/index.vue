<template>
  <div>
    <vue-breadcrumb :breadcrumbs="breadcrumbs" />
    <a-card :loading="loading" :title="`${korName}(이)란 무엇인가요?`">
      <span class="edit-button" slot="extra" @click="onEdit">수정</span>
      <template v-if="!isEdit">
        <h1>{{ intro }}</h1>
        <div style="display: flex; justify-content: space-between">
          <span class="createdAt">{{ $moment(createdAt).format('YYYY-MM-DD hh:mm') }}</span>
          <span class="author">- {{ nickname }} -</span>
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
        <vue-table :dataSource="dataSource" v-if="!$device.isMobile" />
        <a-list itemLayout="horizontal" :dataSource="dataSource" v-else>
          <a-list-item @click="onClickList(item)" slot="renderItem" slot-scope="item">
            <a-list-item-meta :intro="item.createdAt">
              <a slot="title" :href="`${$route.path}/post/${item.uuid}`">{{item.title}}</a>
              <a-avatar
                slot="avatar"
                shape="square"
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              />
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </a-tab-pane>
      <a-tab-pane tab="구직게시판" key="2">준비중입니다.</a-tab-pane>
      <a-button
        slot="tabBarExtraContent"
        @click="$router.push(`/new?occupation=${$route.params.occupationId}`)"
      >새 글</a-button>
    </a-tabs>
  </div>
</template>

<script>
import VueBreadcrumb from '~/components/Breadcrumb'
import VueTable from '~/components/Table'
export default {
  validate({ params }) {
    return /[0-9]/g.test(params.occupationId)
  },
  data: _ => ({
    tab: '1',
    korName: '프로게이머',
    dataSource: [
      {
        key: '1',
        uuid: 1,
        title: '롤체 꿀잼',
        author: 'kidow',
        createdAt: '21:08',
        views: 1
      },
      {
        key: '2',
        uuid: 2,
        title: '백수가 암울한이유',
        author: 'kidow',
        createdAt: '21:08',
        views: 2
      }
    ],
    loading: false,
    isEdit: false,
    intro: '',
    breadcrumbs: [
      {
        url: '/board/1',
        name: '관리직'
      }
    ],
    createdAt: '',
    nickname: ''
  }),
  methods: {
    onChangeTab(tab) {
      this.tab = tab
    },
    onClickList({ uuid }) {
      this.$router.push(`${this.$route.path}/post/${uuid}`)
    },
    async onEdit() {
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
        await this.$axios(options)
        this.messageSuccess()
        this.isEdit = false
      } catch (err) {
        this.notifyError({ description: err.response.data.message })
        console.log(err)
      }
    }
  },
  components: {
    VueTable,
    VueBreadcrumb
  },
  head: _ => ({
    title: '프로게이머 - 모스트피플'
  }),
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
.ant-tabs-content {
  background: white;
}
.ant-input {
  font-size: 1rem;
  &::placeholder {
    font-size: 1rem;
  }
}
</style>

<style lang="scss">
.ant-tabs-extra-content {
  max-width: 150px;
}
</style>
