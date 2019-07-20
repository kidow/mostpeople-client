export const state = () => ({
  user: {
    id: null,
    email: '',
    nickname: '',
    status: 0
  }
})

export const getters = {
  IS_LOGGED_IN: state => !!state.user.id
}
