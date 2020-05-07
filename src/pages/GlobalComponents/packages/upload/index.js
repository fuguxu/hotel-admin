import MUpload from './src/main'

MUpload.install = function (Vue) {
  Vue.component(MUpload.name, MUpload)
}

export default MUpload
