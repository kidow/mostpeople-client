import Vue from 'vue'
import Antd from 'ant-design-vue/lib'

export default () => {
  Vue.use(Antd),
    Vue.mixin({
      methods: {
        notifySuccess(description) {
          this.$notification['success']({
            message: '성공',
            description: description || '성공적으로 적용하였습니다.'
          })
        },
        notifyError(description) {
          this.$notification['error']({
            message: '실패',
            description:
              description ||
              '죄송합니다. 서버 오류가 발생했습니다. 나중에 다시 시도해주세요.'
          })
        },
        notifyWarning(description) {
          this.$notification['warning']({
            message: '경고',
            description
          })
        },
        messageSuccess(message) {
          this.$message['success'](message || '성공적으로 등록되었습니다.')
        }
      }
    })
}
