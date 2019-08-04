<template>
  <div class="search__container">
    <h1>
      <span>{{ $route.query.keyword }}</span>
      에 대한 검색 결과를
      <vue-count-to :end-val="occupations.length + posts.length" :duration="1500"></vue-count-to>개를 찾았습니다.
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
        :key="occupation.id"
        :to="`/board/${occupation.id}`"
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
            <nuxt-link :to="`/board/${post.occupationId}`">{{ post.occupation }}</nuxt-link>
          </span>
          <span class="date">{{ post.createdAt }}</span>
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
    occupations: [
      {
        korName: '리그 오브 레전드',
        id: 1
      },
      {
        korName: 'TFT',
        id: 2
      }
    ],
    posts: [
      {
        uuid: '991bb977d7a14961851f19122084480a',
        occupationId: 1,
        title: '난 롤토체스 마음에 들던데',
        content:
          '칼바람 할때는 담배 피우다 존나 늦게오는 개새끼들 많았는데 롤토체스는 비흡연자들만 있는 클린한 게임임',
        occupation: '리그 오브 레전드',
        createdAt: '2019.07.24 21:43'
      }
    ]
  }),
  head: _ => ({
    title: '검색 - 모스트피플'
  }),
  async asyncData({ query, app, redirect }) {
    if (!query.keyword) return redirect('/')
    const options = {
      url: `/search?keyword=${query.keyword}`,
      method: 'get'
    }
    try {
      const { data } = await app.$axios(options)
      return {
        occupations: data.occupations,
        posts: data.posts
      }
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    async getSearch() {
      const { keyword } = this.$route.query
      if (!keyword) return
      const options = {
        url: `/search?keyword=${keyword}`,
        method: 'get'
      }
      try {
        const { data } = await this.$axios(options)
        this.occupations = data.occupations
        this.posts = data.posts
      } catch (err) {
        console.log(err)
      }
    }
  },
  watch: {
    '$route.query.keyword'() {
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
  }
}
</style>
