import NProgress from 'nprogress'
export function interceptors (instance) {
  instance.interceptors.request.use(config => {
    NProgress.start()
    return config
  })
  instance.interceptors.response.use(config => {
    NProgress.done()
    if (config.status === 403 || config.data.code === 403) {
      window.location.href = '#/login'
    }
    return config
  }, error => {
    if (error.response.status === 403) {
      window.location.href = '#/login'
    }
    return Promise.reject(error.response.status)
  })
}
