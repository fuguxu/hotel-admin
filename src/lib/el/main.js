// import ElementUI from 'element-ui';
// import Vue from 'vue'

// import 'element-ui/lib/theme-chalk/index.css' // 按需引入的话 样式文件不需引入 在babelrc 有配置
import {
  Input,
  Button,
  Menu,
  Submenu,
  MenuItem
} from 'element-ui'
Vue.prototype.$ELEMENT = { size: 'small' }

// console.log(Input.props.disabled = { type: Boolean, default: true }) 在此可以修改组件的props methods computed等状态
Vue.use(Input)//
Vue.use(Button)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
// Vue.use(ElementUI);
// export default ElementUI;
