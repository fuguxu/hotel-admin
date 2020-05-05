import NProgress from 'nprogress'
export function interceptors (instance) {
  instance.interceptors.request.use(config => {
    NProgress.start()
    return config
  })
  instance.interceptors.response.use(config => {
    NProgress.done()
    return config
  })
}
