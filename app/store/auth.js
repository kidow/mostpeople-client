export const state = () => ({
  user: {
    uuid: null,
    email: '',
    nickname: '',
    status: null,
    providerId: null
  }
})

export const getters = {
  IS_LOGGED_IN: state => !!state.user.uuid,
  GET_USER: state => state.user
}

export const mutations = {
  SAVE_USER(state, user) {
    state.user = user
  },
  CLEAR_USER(state) {
    state.user = {
      id: null,
      email: '',
      nickname: '',
      status: null
    }
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
        const { data } = await this.$axios(options)
        await dispatch('auth/ME', data.token)
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

        const { data } = await this.$axios(options)
        await dispatch('auth/ME')
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
