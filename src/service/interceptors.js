import NProgress from 'nprogress'
export function interceptors (instance) {
  instance.interceptors.request.use(config => {
    console.log(config)
    NProgress.start()
    return config
  })
  instance.interceptors.response.use(config => {
    console.log(config)
    NProgress.done()
    if (config.status === 401 || config.data.code === 401) {
      window.location.href = '#/h/login'
    }
    return config
  })
}
