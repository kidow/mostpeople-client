export default async ({ store, redirect }) => {
  const isLoggedIn = store.getters['auth/IS_LOGGED_IN']

  if (isLoggedIn) redirect('/')
}
