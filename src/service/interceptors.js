import NProgress from 'nprogress'
export function interceptors (instance) {
  instance.interceptors.request.use(config => {
    NProgress.start()
    return config
  })
  instance.interceptors.response.use(config => {
    NProgress.done()
    if (config.status === 401 || config.data.code === 401) {
      window.location.href = '#/login'
    }
    return config
  })
}
