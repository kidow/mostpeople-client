<template>
  <form @submit.prevent="onSubmit">
    <div style="display: flex;">
      <a-cascader
        placeholder="직종 / 직업"
        @change="onChange"
        :options="options"
        size="large"
        v-model="cascader"
      />
      <div style="width: 12px;" />
      <a-select @change="val => board = val" placeholder="게시판 선택" size="large">
        <a-select-option value="0">자유게시판</a-select-option>
        <a-select-option value="1" disabled>구직게시판</a-select-option>
      </a-select>
    </div>
    <div style="height: 12px" />
    <a-input placeholder="제목" v-model="title" size="large" />
    <div style="height: 12px" />
    <a-textarea
      placeholder="내용"
      :autosize="{ minRows: 8, maxRows: 20 }"
      v-model="content"
      size="large"
    />
    <div style="height: 12px" />
    <a-button
      type="primary"
      :disabled="!title || !content || !occupation || !board"
      size="large"
      html-type="submit"
    >작성</a-button>
  </form>
</template>

<script>
export default {
  data: _ => ({
    occupation: '',
    category: '',
    cascader: [],
    title: '',
    board: '',
    content: '',
    dataSource: [],
    loading: false,
    options: [
      {
        value: 'student',
        label: '학생',
        children: [
          {
            value: 'elementary',
            label: '초등학생'
          },
          {
            value: 'middle',
            label: '중학생'
          },
          {
            value: 'high',
            label: '고등학생'
          },
          {
            value: 'university',
            label: '대학생'
          },
          {
            value: 'postgraduate',
            label: '대학원생'
          }
        ]
      },
      {
        value: 'professional',
        label: '전문직',
        children: [
          {
            value: 'doctor',
            label: '의사'
          },
          {
            value: 'lawyer',
            label: '변호사'
          }
        ]
      }
    ]
  }),
  methods: {
    onSearch(val) {
      this.occupation = val
    },
    onChange(value) {
      this.occupation = value[0]
      this.category = value[1]
    },
    async onSubmit() {
      let options = {
        url: '/posts',
        method: 'post',
        data: {
          occupation: this.occupation,
          category: this.category,
          title: this.title,
          content: this.content
        }
      }
      try {
        const token = await this.$recaptcha.execute('social')
        if (!token) return
        options.data.token = token
        this.loading = true
        const { data } = await this.$axios(options)
        this.$router.push(
          `/board/${data.occupation}/${data.category}/${data.id}`
        )
        console.log(1)
      } catch (err) {
        console.log(err)
        this.loading = false
      }
    }
  },
  mounted() {
    const { occupation, category } = this.$route.query
    this.occupation = occupation
    this.category = category
    this.cascader = [occupation, category]
  }
}
</script>