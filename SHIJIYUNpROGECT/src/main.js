import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'nprogress/nprogress.css'
import 'animate.css/animate.min.css'
import 'normalize.css/normalize.css'
import IconSvg from '@/components/Icon-svg/index.vue'
import VueAMap from 'vue-amap';
import * as filters from './filters' // 全局filter
import publicFunction from './utils/publicFun'
import Validate from './utils/validation'
import { getToken } from '@/utils/auth' // 验权
import refreshIcon from  '@/components/refreshIcon/index.vue'
import clzPopover from '@/components/Popover';
import './permission'
import vuePlugins from '@/utils/vuePlugins'
import '@/utils/plugins'
import  '@/directive/index.js'
import moment from 'moment'

Vue.prototype.$moment = moment;
Vue.prototype.localStorage =  require('storejs');

Vue.component('refresh-icon',refreshIcon);
Vue.component('clz-popover',clzPopover);
Vue.use(Validate);

Vue.use(publicFunction);    //公共方法

Vue.use(vuePlugins);


Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.component('icon-svg', IconSvg);

// register global utility filters.
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
});

/*地图*/
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
    key: '8c318365cfef01656d814eb6a2ffc06d',
    plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor']
});
/*地图 end*/


let vm = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  data:{
      hubBus:new Vue(),
  }
});
global.vm = vm; //Define you app variable globally



