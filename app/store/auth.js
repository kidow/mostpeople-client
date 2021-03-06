export const state = () => ({
  user: {
    id: null,
    uuid: null,
    email: '',
    nickname: '',
    status: null,
    providerId: null,
    facebookUrl: '',
    twitterUrl: '',
    intro: '',
    occupationId: '',
    profileUrl: '',
    korName: ''
  }
})

export const getters = {
  IS_LOGGED_IN: state => !!state.user.uuid,
  GET_USER: state => state.user,
  GET_EMAIL: state => state.email
}

export const mutations = {
  SAVE_USER(state, user) {
    state.user = user
  },
  CLEAR_USER(state) {
    state.user = {
      id: null,
      uuid: null,
      email: '',
      nickname: '',
      status: null,
      providerId: null,
      facebookUrl: '',
      twitterUrl: '',
      intro: '',
      occupationId: '',
      profileUrl: '',
      korName: ''
    }
  },
  SAVE_PROFILE(state, profileUrl) {
    state.user.profileUrl = profileUrl
  }
}

export const actions = {
  SIGN_UP({ dispatch }, payload) {
    return new Promise(async (resolve, reject) => {
      const options = {
        method: 'post',
        url: '/auth/signup',
        data: {
          email: payload.email || '',
          password: payload.password || '',
          nickname: payload.nickname || ''
        }
      }

      try {
        await this.$axios(options)
        await dispatch('ME')
        resolve()
      } catch (err) {
        reject(err)
      }
    })
  },
  LOGIN({ dispatch }, payload = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const options = {
          method: 'post',
          url: '/auth/login',
          data: {
            email: payload.email,
            password: payload.password,
            token: payload.token
          }
        }

        await this.$axios(options)
        await dispatch('ME')
        resolve()
      } catch (err) {
        reject(err)
      }
    })
  },
  LOGOUT({ commit }) {
    return new Promise(async (resolve, reject) => {
      const options = {
        method: 'delete',
        url: '/auth/logout'
      }

      try {
        await this.$axios(options)
        commit('CLEAR_USER')
        resolve()
      } catch (err) {
        reject(err)
      }
    })
  },
  ME({ commit }) {
    return new Promise(async (resolve, reject) => {
      const options = {
        method: 'get',
        url: '/auth/me'
      }

      try {
        const { data } = await this.$axios(options)
        commit('SAVE_USER', data)
        resolve()
      } catch (err) {
        reject(err)
      }
    })
  },
  SUBMIT_EMAIL(_, email) {
    return new Promise(async (resolve, reject) => {
      const options = {
        method: 'post',
        url: '/auth/email',
        data: {
          email
        }
      }

      try {
        const { data } = await this.$axios(options)
        resolve(data.authCode)
      } catch (err) {
        reject(err)
      }
    })
  }
}
