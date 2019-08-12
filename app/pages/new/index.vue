<template>
  <form @submit.prevent="onSubmit">
    <div style="display: flex;">
      <a-auto-complete
        @select="onSelect"
        size="large"
        @search="onSearch"
        placeholder="직업"
        :open="isOpen"
        optionLabelProp="text"
      >
        <a-spin v-if="fetching" size="small" />
        <template slot="dataSource">
          <a-select-option
            v-for="occupation in dataSource"
            :key="occupation.uuid"
            :text="occupation.korName"
          >{{ occupation.korName }}</a-select-option>
        </template>
      </a-auto-complete>
      <div style="width: 12px;" />
      <a-select @change="val => boardType = val" placeholder="게시판 선택" size="large">
        <a-select-option value="1">자유게시판</a-select-option>
        <a-select-option value="2" disabled>구직게시판</a-select-option>
      </a-select>
    </div>
    <div style="height: 12px" />
    <a-input placeholder="제목" v-model="title" size="large" />
    <div style="height: 12px" />
    <vue-editor @input="val => content = val" />
    <div style="height: 12px" />
    <a-button
      type="primary"
      :disabled="!title || !content || !occupation || !boardType"
      :loading="loading"
      size="large"
      html-type="submit"
    >작성</a-button>
  </form>
</template>

<script>
import VueEditor from '~/components/Editor'
import debounce from 'lodash.debounce'
export default {
  data: _ => ({
    occupationId: '',
    title: '',
    boardType: '',
    content: '',
    dataSource: [],
    loading: false,
    fetching: false,
    isOpen: false
  }),
  methods: {
    onSelect(val) {
      this.isOpen = false
      this.occupationId = val
    },
    onSearch: debounce(async function(name) {
      if (!name) return
      const options = {
        url: '/occupations/search',
        method: 'get',
        params: { name }
      }
      try {
        this.fetching = true
        this.isOpen = false
        const { data } = await this.$axios(options)
        this.isOpen = true
        this.fetching = false
        this.dataSource = data
      } catch (err) {
        this.isOpen = false
        console.log(err)
        this.fetching = false
        this.notifyError(err.response.data.message)
      }
    }, 800),
    async onSubmit() {
      let options = {
        url: '/prt/posts',
        method: 'post',
        data: {
          occupationId: this.occupationId,
          title: this.title,
          content: this.content,
          boardType: this.boardType
        }
      }
      try {
        this.loading = true
        const token = await this.$recaptcha.execute('social')
        if (!token) return
        options.data.token = token
        const { data } = await this.$axios(options)
        this.$router.push(`/post/${data.postId}`)
      } catch (err) {
        this.notifyError(err.response.data.message)
        console.log(err)
        this.loading = false
      }
    }
  },
  mounted() {
    const { occupationId } = this.$route.query
    if (occupationId) this.occupationId = occupationId
  },
  components: {
    VueEditor
  },
  head: _ => ({
    title: '새 글 - 모스트피플',
    head: {
      script: [
        {
          src: `https://www.google.com/recaptcha/api.js?render=${process.env.RECAPTCHA_KEY}`
        }
      ]
    }
  }),
  middleware: ['isNotLoggedIn']
}
</script>