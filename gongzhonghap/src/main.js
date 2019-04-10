// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/rem'

//首页瀑布流
import waterfall from 'vue-waterfall2'
Vue.use(waterfall)
//路由懒加载
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'https://pub.qinius.butongtech.com/404.jpg',
  loading: 'https://pub.qinius.butongtech.com/gongfang1.png',
  attempt: 1
})
// 上线记得注释掉 调试用
let vConsole = new VConsole() // 初始化
Vue.use(vConsole)
//touch事件
import {shujike} from './assets/js/common'
Vue.prototype.$shujike = shujike;
//vuex
import { mutations } from "@/vuex/mutations"
import { state } from "@/vuex/state";
import { actions } from "@/vuex/actions";
//url地址
const common = window.common;
//过滤器
import vueFilter from './assets/js/filter'
for (let key in vueFilter){
  Vue.filter(key,vueFilter[key])
}
//导航栏url截取
import {UrlSearch} from  "./assets/js/Fun"
let Request = new UrlSearch(); //方法实力化
// 高德引入vue-amap组件
//   import VueAMap from 'vue-amap';
// 初始化vue-amap
VueAMap.initAMapApiLoader({
  // 高德的key
  key: 'df297249893d948553a71ea111d11384',
  // 插件集合
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 高德 sdk 版本，默认为 1.4.4
  v: '1.4.4'
});
Vue.use(VueAMap.default);
Vue.prototype.$moment = moment;// 格式化时间
Vue.prototype.$Request = Request;
Vue.prototype.$Aiox = axios;
Vue.prototype.$http = common.apiDomain;
Vue.config.productionTip = false

Vue.use(Vuex);
const store = new Vuex.Store({
  state,
  mutations,
  actions
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
