const { NODE_ENV } = process.env
const TITLE = '모스트피플 - 직업 커뮤니티'
const DESCRIPTION = '직업 커뮤니티'
const IMAGE =
  'https://mostpeople.s3.ap-northeast-2.amazonaws.com/mostpeople-logo.png'
const PUBLIC_LINK = 'https://mostpeople.kr'
const COLOR = '#2E3192'
const RECAPTCHA_KEY = '6LeqJrMUAAAAAOJbrYYGuDw0OpmpbtXaeRsimrGy'
const BASE_URL =
  NODE_ENV === 'production' ? PUBLIC_LINK : 'http://localhost:3000'
const API_BASE_URL =
  NODE_ENV === 'production'
    ? 'https://api.mostpeople.kr'
    : 'http://localhost:3001'
const snippets = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    url: PUBLIC_LINK,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+82-10-5140-5480',
        contactType: 'customer service'
      }
    ]
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    url: PUBLIC_LINK,
    logo: IMAGE
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: PUBLIC_LINK,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${BASE_URL}/search?keyword={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  }
]

module.exports = {
  mode: 'universal',
  srcDir: 'app/',
  head: {
    title: TITLE,
    meta: [
      { 'http-equiv': 'Content-Type', content: 'text/html; charset=utf-8' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge,chrome=1' },
      { name: 'robots', content: 'index, follow' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0'
      },
      {
        hid: 'description',
        name: 'description',
        content: DESCRIPTION
      },
      { hid: 'canonical', rel: 'canonical', href: PUBLIC_LINK },
      {
        'http-equiv': 'cache-control',
        content: 'no-cache, no-store, must-revalidate'
      },
      { 'http-equiv': 'pragma', content: 'no-cache' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
      { name: 'apple-mobile-web-app-title', content: 'mostpeople' },
      { hid: 'keywords', name: 'keywords', content: 'social' },
      { hid: 'image', name: 'image', content: IMAGE },
      {
        name: 'msapplication-TileColor',
        content: COLOR
      },
      {
        name: 'theme-color',
        content: COLOR
      },
      {
        name: 'naver-site-verification',
        content: 'd1bbf42aae7787d3a852803c3d79616b8773515a'
      },

      // Open Graph
      { hid: 'og-site_name', property: 'og:site_name', content: TITLE },
      { hid: 'og-title', property: 'og:title', content: TITLE },
      {
        hid: 'og-description',
        property: 'og:description',
        content: DESCRIPTION
      },
      { hid: 'og-image', property: 'og:image', content: IMAGE },
      { hid: 'og-type', property: 'og:type', content: 'article' },
      { hid: 'og-locale', property: 'og:locale', content: 'en_US' },
      { hid: 'og-image-width', property: 'og:image:width', content: '1200' },
      { hid: 'og-image-height', property: 'og:image:height', content: '630' },
      {
        hid: 'og-image-alt',
        property: 'og:image:alt',
        content: '###MOSTPEOPLE###'
      },
      { hid: 'og-url', property: 'og:url', content: PUBLIC_LINK },

      // Twiiter
      { hid: 'twitter-site', property: 'twitter:site', content: '@mostpeople' },
      { hid: 'twitter-card', property: 'twitter:card', content: 'summary' },
      { hid: 'twitter-title', property: 'twitter:title', content: TITLE },
      {
        hid: 'twitter-description',
        property: 'twitter:description',
        content: DESCRIPTION
      },
      { hid: 'twitter-image', property: 'twitter:image', content: IMAGE },
      {
        hid: 'twitter-domain',
        property: 'twitter:domain',
        content: PUBLIC_LINK
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Nanum+Gothic:400,700&display=swap&subset=korean'
      }
    ],
    __dangerouslyDisableSanitizers: ['script'],
    script: [
      {
        innerHTML: JSON.stringify(snippets),
        type: 'application/ld+json'
      }
    ]
  },
  loading: { color: COLOR },
  css: [
    { src: 'ant-design-vue/dist/antd.less', lang: 'less' },
    '~/assets/scss/main.scss'
  ],
  plugins: [
    '@/plugins/antd-ui',
    { src: '~/plugins/vue-clipboard2', ssr: false },
    { src: '~/plugins/vue-custom', ssr: true }
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    'nuxt-device-detect',
    ['@nuxtjs/moment', { locales: ['ko'], defaultLocale: 'ko' }],
    '@nuxtjs/recaptcha',
    ['@nuxtjs/sitemap']
  ],
  axios: {
    baseURL: API_BASE_URL,
    credentials: true,
    proxy: false,
    debug: false,
    retry: {
      retries: NODE_ENV === 'production' ? 3 : 0
    },
    requestInterceptor: config => {
      config.headers.common['Authorization'] = ''
      config.headers.common['Content-Type'] =
        'application/x-www-form-urlencoded;application/json'
      return config
    }
  },
  manifest: {
    name: TITLE,
    short_name: '모스트피플',
    icons: [
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ],
    theme_color: COLOR,
    background_color: COLOR,
    display: 'standalone',
    start_url: '/?utm_source=homescreen'
  },
  recaptcha: {
    hideBadge: true,
    siteKey: RECAPTCHA_KEY,
    version: 3
  },
  env: {
    BASE_URL,
    API_BASE_URL,
    RECAPTCHA_KEY
  },
  sitemap: {
    path: '/sitemap.xml',
    hostname: PUBLIC_LINK,
    cacheTime: 1000 * 60 * 15,
    gzip: true,
    generate: false,
    exclude: ['/profile', '/profile/**'],
    routes: async () => {
      const axios = require('axios')
      const api = `${API_BASE_URL}/event/sitemaps`

      try {
        const { data } = await axios.get(api)
        return data
      } catch (err) {
        console.error('failed to generate sitemap.', err)
      }
    }
  },
  build: {
    extend(config, { loaders }) {
      loaders.less.javascriptEnabled = true
      loaders.less.modifyVars = {
        'primary-color': COLOR,
        'link-color': COLOR
      }
    }
  }
}
