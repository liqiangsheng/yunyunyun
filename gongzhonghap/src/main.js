// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from "vuex"
import './assets/rem'
import "mint-ui/lib/style.min.css"
import mintui from 'mint-ui'
import { mutations } from "@/vuex/mutations"
import { state } from "@/vuex/state";
import { actions } from "@/vuex/actions";
const common = window.common;
import moment from 'moment'// 格式化时间
import vueFilter from './assets/js/filter' //过滤器
for (let key in vueFilter){
  Vue.filter(key,vueFilter[key])
}
import axios from "axios";
import {UrlSearch} from  "./assets/js/Fun"  //导航栏url截取
let Request = new UrlSearch(); //方法实力化
// 引入vue-amap
import VueAMap from 'vue-amap';
// 初始化vue-amap
VueAMap.initAMapApiLoader({
  // 高德的key
  key: 'df297249893d948553a71ea111d11384',
  // 插件集合
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 高德 sdk 版本，默认为 1.4.4
  v: '1.4.4'
});
Vue.prototype.$moment = moment;
Vue.prototype.$Request = Request;
Vue.prototype.$Aiox = axios;
Vue.prototype.$http = common.apiDomain;
Vue.config.productionTip = false
Vue.use(VueAMap);
Vue.use(mintui);
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
