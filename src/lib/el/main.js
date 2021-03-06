// import ElementUI from 'element-ui';
import Vue from 'vue'

// import 'element-ui/lib/theme-chalk/index.css' // 按需引入的话 样式文件不需引入 在babelrc 有配置
import {
  Input,
  Button,
  Menu,
  Submenu,
  MenuItem,
  Pagination,
  Table,
  TableColumn,
  Form,
  FormItem,
  Dialog,
  Select,
  Option,
  OptionGroup,
  Loading,
  MessageBox,
  Message,
  Notification,
  upload,
  Row,
  Col,
  Tree,
  Tabs,
  TabPane,
  CascaderPanel,
  Cascader,
  Scrollbar,
  RadioGroup,
  Radio,
  DatePicker
} from 'element-ui'
Vue.prototype.$ELEMENT = { size: 'small' }
Object.assign(DatePicker.props, {
  valueFormat: {
    type: String,
    default: 'yyyy-MM-dd'
  }
})
// console.log(Input.props.disabled = { type: Boolean, default: true }) 在此可以修改组件的props methods computed等状态
Vue.use(Input)//
Vue.use(Button)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Pagination)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Dialog)
Vue.use(Select)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(upload)
Vue.use(Row)
Vue.use(Col)
Vue.use(Tree)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(CascaderPanel)
Vue.use(Cascader)
Vue.use(Scrollbar)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(DatePicker)

Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
Vue.prototype.$handleRequestTip = (res) => {
  let isSuccess = res.code === 200
  Message({
    type: isSuccess ? 'success' : 'error',
    message: isSuccess ? '操作成功!' : '操作失败'
  })
}
// Vue.use(ElementUI);
// export default ElementUI;
