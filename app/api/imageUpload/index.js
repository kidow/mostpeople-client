export default (Vue, file, path) => {
  return new Promise((resolve, reject) => {
    if (!file) return reject({ msg: 'file is required.' })
    if (!path) return reject({ msg: 'path is required.' })

    const url = '/prt/images'
    const config = {
      withCredentials: true,
      headers: { 'content-type': 'multipart/form-data' }
    }
    path = `${path}/${Date.now().toString()}`

    const fd = new FormData()
    fd.append('path', path)
    fd.append('file', file)

    Vue.$axios
      .post(url, fd, config)
      .then(res => resolve(res.data))
      .catch(err => reject(err))
  })
}
