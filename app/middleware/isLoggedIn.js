export default async ({ route, store, redirect }) => {
  const isLoggedIn = store.getters['auth/IS_LOGGED_IN']

  if (!isLoggedIn) redirect(`/login?redirect=${route.path}`)
}
