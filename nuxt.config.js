const TITLE = 'Mostpeople'
const DESCRIPTION = 'Most people have a job.'

module.exports = {
  mode: 'universal',
  srcDir: 'app/',
  head: {
    title: TITLE,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        content: DESCRIPTION,
        name: 'description'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  loading: { color: '#fff' },
  css: ['ant-design-vue/dist/antd.css'],
  plugins: ['@/plugins/antd-ui'],
  modules: ['@nuxtjs/axios', '@nuxtjs/pwa'],
  axios: {},
  build: {
    extend(config, ctx) {}
  }
}
