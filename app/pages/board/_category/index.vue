<template>
  <div>
    <a-card :loading="loading" :title="'프로게이머는(은) 뭔가요?'">
      <span class="edit-button" slot="extra">수정</span>
      <h1>개좃같은것ㅁㄴㅇㅁㄴㄹㅁㄹㅁ</h1>
      <div style="display: flex; justify-content: space-between">
        <span class="createdAt">{{ $moment().format('YYYY-MM-DD hh:mm:ss') }}</span>
        <span class="author">- {{ 'dsadaf' }} -</span>
      </div>
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
      <a-input-search slot="tabBarExtraContent" placeholder="제목 검색" />
    </a-tabs>
  </div>
</template>

<script>
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
    loading: false
  }),
  methods: {
    onChangeTab(tab) {
      this.tab = tab
    },
    onClickDropdown({ key }) {
      console.log(key)
    },
    onClickList({ id }) {
      this.$router.push(`${this.$route.path}/${id}`)
    }
  },
  components: {
    VueTable
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
</style>

<style lang="scss">
.ant-tabs-extra-content {
  max-width: 150px;
}
</style>
