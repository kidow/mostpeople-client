<template>
  <div>
    <a-tabs type="card" defaultActiveKey="1" :tabPosition="$device.isMobile ? 'top' : 'left'">
      <a-tab-pane tab="기본 정보" key="1"></a-tab-pane>
      <a-tab-pane tab="비밀번호 변경" key="2">Content of tab 2</a-tab-pane>
      <a-tab-pane tab="계정 관리" key="3">
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
      <a-tab-pane tab="알림 설정" key="4">Content of tab 4</a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
export default {
  head: _ => ({
    title: '내정보 - 모스트피플'
  }),
  data: _ => ({
    email: '',
    password: '',
    checked: false,
    passwordConfirm: '',
    newPassword: '',
    loading: false,
    nickname: '',
    jos: ''
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
          console.log(1)
        }
      })
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
</style>
