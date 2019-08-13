<template>
  <div class="search__container">
    <h1>
      <span>{{ $route.query.keyword }}</span>
      에 대한 검색 결과를
      <vue-count-to :end-val="occupations.length + posts.length + users.length" :duration="1500"></vue-count-to>개 찾았습니다.
    </h1>
    <a-divider />
    <div>
      <div class="category">
        게시판
        <span class="text">검색결과</span>
        <vue-count-to :end-val="occupations.length" :duration="1500" />
        <span class="text">개</span>
      </div>
      <div></div>
    </div>
    <div style="margin-top: 20px">
      <nuxt-link
        v-for="occupation in occupations"
        :key="occupation.uuid"
        :to="`/board/${occupation.uuid}`"
      >
        <a-tag>{{ occupation.korName }}</a-tag>
      </nuxt-link>
    </div>
    <a-divider />
    <div>
      <div class="category">
        게시물
        <span class="text">검색결과</span>
        <vue-count-to :end-val="posts.length" :duration="1500"></vue-count-to>
        <span class="text">개</span>
      </div>
      <div class="posts">
        <div class="post" v-for="post in posts" :key="post.uuid">
          <div class="title">
            <nuxt-link :to="`/board/${post.occupationId}/post/${post.uuid}`">{{ post.title }}</nuxt-link>
          </div>
          <div class="content">{{ post.content }}</div>
          <span class="occupation">
            <nuxt-link :to="`/board/${post.occupationId}`">{{ post.korName }}</nuxt-link>
          </span>
          <span class="date">{{ post.createdAt }}</span>
        </div>
      </div>
    </div>
    <a-divider />
    <div>
      <div class="category" style="margin-bottom: 20px">
        유저
        <span class="text">검색결과</span>
        <vue-count-to :end-val="users.length" :duration="1500" />
        <span class="text">개</span>
      </div>
      <div
        v-for="user in users"
        :key="user.uuid"
        @click="$router.push(`/profile/@${user.nickname}`)"
        class="users"
      >
        <a-avatar :src="user.profileUrl" v-if="user.profileUrl" />
        <a-avatar icon="user" v-else />
        <div style="margin-left: 10px;">
          <div style="font-size: 18px">{{ user.nickname }}</div>
          <div style="font-size: 11px">{{ user.korName }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueCountTo from 'vue-count-to'
export default {
  components: {
    VueCountTo
  },
  data: _ => ({
    occupations: [],
    posts: [],
    users: []
  }),
  head() {
    return {
      title: `${this.$route.query.keyword} 검색 - 모스트피플`
    }
  },
  async asyncData({ query, app, redirect }) {
    if (!query.keyword) return redirect('/')
    const options = {
      url: `/search`,
      method: 'get',
      params: query
    }
    try {
      const { data } = await app.$axios(options)
      return {
        occupations: data.occupations,
        posts: data.posts,
        users: data.users
      }
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    async getSearch() {
      const { query } = this.$route
      if (!query.keyword) return
      const options = {
        url: `/search`,
        method: 'get',
        params: query
      }
      try {
        const { data } = await this.$axios(options)
        this.occupations = data.occupations
        this.posts = data.posts
        this.users = data.users
      } catch (err) {
        console.log(err)
      }
    }
  },
  watch: {
    '$route.query'() {
      this.getSearch()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/color.scss';

.search__container {
  h1 {
    font-size: 16px;
    color: $oc-gray-6;
    span {
      font-size: 24px;
      color: $oc-gray-8;
      font-weight: bold;
    }
  }
  div {
    .category {
      font-size: 20px;
      font-weight: bold;
      .text {
        font-size: 16px;
        font-weight: normal;
      }
    }
    .posts {
      margin-top: 20px;
      .post {
        margin-bottom: 12px;
        .title {
          font-size: 15px;
          a {
            color: $oc-gray-8;
          }
        }
        .content {
          font-size: 13px;
          color: $oc-gray-7;
          margin: 4px 0;
        }
        .occupation {
          font-size: 12px;
        }
        .date {
          color: $oc-gray-5;
          font-size: 12px;
        }
      }
    }
    .users {
      cursor: pointer;
      display: flex;
      align-items: center;
      margin: 0 0 10px;
    }
  }
}
</style>
