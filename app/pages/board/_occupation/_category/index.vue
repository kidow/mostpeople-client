<template>
  <div>
    <vue-breadcrumb :breadcrumbs="breadcrumbs" />
    <a-card :loading="loading" :title="'프로게이머(이)란?'">
      <span class="edit-button" slot="extra" @click="onEdit">수정</span>
      <template v-if="!isEdit">
        <h1>그냥 게임만 주구장창 하는 폐인</h1>
        <div style="display: flex; justify-content: space-between">
          <span class="createdAt">{{ $moment().format('YYYY-MM-DD hh:mm:ss') }}</span>
          <span class="author">- {{ 'dsadaf' }} -</span>
        </div>
      </template>
      <a-textarea
        v-model="description"
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
            <a-list-item-meta :description="item.createdAt">
              <a slot="title" href="https://vue.ant.design/">{{item.title}}</a>
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
        @click="$router.push(`/new?occupation=${$route.params.occupation}`)"
      >새 글</a-button>
    </a-tabs>
  </div>
</template>

<script>
import VueBreadcrumb from '~/components/Breadcrumb'
import VueTable from '~/components/Table'
export default {
  validate({ params }) {
    return /[a-z]/g.test(params.category)
  },
  data: _ => ({
    tab: 1,
    dataSource: [
      {
        key: '1',
        id: 1,
        title: '롤체 꿀잼',
        author: 'kidow',
        createdAt: '21:08',
        views: 1
      },
      {
        key: '2',
        id: 2,
        title: '백수가 암울한이유',
        author: 'kidow',
        createdAt: '21:08',
        views: 2
      }
    ],
    loading: false,
    isEdit: false,
    description: '',
    breadcrumbs: [
      {
        url: '/board/management',
        name: '관리직'
      },
      {
        url: '/board/management/universitystudent',
        name: '대학생'
      }
    ]
  }),
  methods: {
    onChangeTab(tab) {
      this.tab = tab
    },
    onClickList({ id }) {
      this.$router.push(`${this.$route.path}/${id}`)
    },
    async onEdit() {
      if (!this.isEdit) return (this.isEdit = true)
      if (!this.description) return (this.isEdit = false)
      if (this.description.length > 40)
        return this.notify({
          type: 'warning',
          message: '경고',
          description: '40자 이하로 작성해주세요'
        })
      const options = {
        url: '/boards/desc',
        method: 'put',
        data: {
          description: this.description
        }
      }
      try {
        this.message({ type: 'success', message: '성공적으로 적용하였습니다.' })
        this.isEdit = false
      } catch (err) {
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
  })
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
  font-size: 2em;
  &::placeholder {
    font-size: 1em;
  }
}
</style>

<style lang="scss">
.ant-tabs-extra-content {
  max-width: 150px;
}
</style>
