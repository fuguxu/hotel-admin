import MTable from './src/main'

MTable.install = function (Vue) {
  Vue.component(MTable.name, MTable)
}

export default MTable
