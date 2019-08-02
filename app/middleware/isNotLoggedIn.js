export default async ({ store, redirect, route }) => {
  const isLoggedIn = store.getters['auth/IS_LOGGED_IN']

  if (!isLoggedIn) redirect(`/login?redirect=${route.path}`)
}
