import Vue from 'vue'
import Antd from 'ant-design-vue/lib'

export default () => {
  Vue.use(Antd),
    Vue.mixin({
      methods: {
        notify({ type, message, description }) {
          this.$notification[type]({
            message: message || '성공',
            description: description || '성공적으로 적용하였습니다'
          })
        },
        message({ type, message }) {
          this.$message[type || 'success'](
            message || '성공적으로 적용하였습니다'
          )
        }
      }
    })
}
