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
        optionLabelProp="text"
        :defaultValue="korName"
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
      <a-select
        @change="val => boardType = val"
        placeholder="게시판 선택"
        size="large"
        :defaultValue="boardType"
        optionLabelProp="text"
      >
        <a-select-option value="1">자유게시판</a-select-option>
        <a-select-option value="2" disabled>구직게시판</a-select-option>
      </a-select>
    </div>
    <div style="height: 12px" />
    <a-input placeholder="제목" v-model="title" size="large" />
    <div style="height: 12px" />
    <vue-editor @input="val => content = val" :value="content" />
    <div style="height: 12px" />
    <a-button
      type="primary"
      :disabled="!title || !content || !occupationId || !boardType"
      :loading="loading"
      size="large"
      html-type="submit"
    >작성</a-button>
  </form>
</template>

<script>
import VueEditor from '~/components/Editor'
import debounce from 'lodash.debounce'
import { mapGetters } from 'vuex'
export default {
  data: _ => ({
    occupationId: '',
    title: '',
    boardType: '',
    content: '',
    dataSource: [],
    loading: false,
    fetching: false,
    isOpen: false,
    korName: ''
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
      const postId = this.$sliceParams(this.$route.params.postId)
      let options = {
        url: `/prt/posts/${postId}`,
        method: 'put',
        data: {
          occupationId: this.occupationId,
          title: this.title,
          content: this.content,
          boardType: this.boardType
        },
        params: {
          userId: this.user.uuid
        }
      }
      try {
        this.loading = true
        // const token = await this.$recaptcha.execute('social')
        // if (!token) return
        // options.data.token = token
        await this.$axios(options)
        this.messageSuccess('성공적으로 수정되었습니다')
        this.$router.push(`/post/${this.$titleUrl(this.title, postId)}`)
      } catch (err) {
        this.notifyError(err.response.data.message)
        console.log(err)
        this.loading = false
      }
    }
  },
  components: {
    VueEditor
  },
  head: _ => ({
    title: '글 수정 - 모스트피플',
    head: {
      script: [
        {
          src: `https://www.google.com/recaptcha/api.js?render=${process.env.RECAPTCHA_KEY}`
        }
      ]
    }
  }),
  middleware: ['isNotLoggedIn'],
  async asyncData({ app, redirect, params, route }) {
    const sliceParams = paramsId =>
      paramsId.slice(paramsId.lastIndexOf('-') + 1, paramsId.length)
    const options = {
      url: `/prt/posts/${sliceParams(params.postId)}`,
      method: 'get'
    }
    try {
      const { data } = await app.$axios(options)
      if (data.isDeleted) return redirect('/notfound')
      if (!data.me) return redirect(route.path.slice(0, -5))

      return {
        occupationId: data.occupationId,
        title: data.title,
        boardType: data.boardType,
        content: data.content,
        korName: data.korName
      }
    } catch (err) {
      console.log(err)
    }
  },
  validate({ params }) {
    const sliceParams = paramsId =>
      paramsId.slice(paramsId.lastIndexOf('-') + 1, paramsId.length)
    return /[0-9a-f]{32}/.test(sliceParams(params.postId))
  },
  computed: {
    ...mapGetters({
      user: 'auth/GET_USER'
    })
  }
}
</script>