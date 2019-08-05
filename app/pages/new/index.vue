<template>
  <form @submit.prevent="onSubmit">
    <div style="display: flex;">
      <a-auto-complete
        :dataSource="dataSource"
        @select="onSelect"
        size="large"
        @search="onSearch"
        placeholder="검색"
        :open="isOpen"
      >
        <a-spin v-if="fetching" size="small" />
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
    occupation: '',
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
      this.occupation = val
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
          occupation: this.occupation,
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
        this.$router.push(`/board/${data.occupationId}/post/${data.postId}`)
      } catch (err) {
        this.notifyError(err.response.data.message)
        console.log(err)
        this.loading = false
      }
    }
  },
  mounted() {
    const { occupation } = this.$route.query
    this.occupation = occupation
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