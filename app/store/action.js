export const actions = {
  UPLOAD_IMAGE(_, payload) {
    return new Promise((resolve, reject) => {
      if (!payload) return this.notifyWarning('파일이 필요합니다.')

      const url = `/prt/images`
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        },
        withCredentials: true
      }

      const fd = new FormData()
      fd.append('mostpeople', payload)

      this.$axios
        .post(url, fd, config)
        .then(res => resolve(res.data))
        .catch(err => reject(err))
    })
  }
}
