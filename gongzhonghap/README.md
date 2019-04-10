# detailh5
2019-9.27/到至今 不同科技有限公司 技术部 web前端工程师


不同为一个设计师类的社交类App，主要为设计师的发布作品，设计大咖发布文章，公司发布需求，公司举办活动销售门票，活动现在直播类的APP
> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
//    "vue-waterfall-easy": "^2.4.3", devDependencies
//    "qiniu-js": "^2.5.3",   devDependencies
//    "jquery": "^3.3.1",     devDependencies
//    "mobile-detect": "^1.4.3",   dependencies
// import Vuex from "vuex"  cdn引入了
// import $ from 'jquery'     cdn引入了
// import axios from "axios";   cdn引入了
// import moment from 'moment'// 格式化时间 cdn引入了
 //"vue": "^2.5.2", //
 //    "mint-ui": "^2.2.13", //
  //  "vue-amap": "^0.5.8", //高德地图插件
   //   "qiniu-js": "^2.5.3",  //七牛云上传
   // "vue-touch": "^2.0.0-beta.4", //左滑右滑插件

npm install babel-plugin-component -D然后，将 .babelrc 修改为： //mint-ui的按需引入
{
  "presets": [
    ["es2015", { "modules": false }]
  ],
  "plugins": [["component", [
    {
      "libraryName": "mint-ui",
      "style": true
    }
  ]]]
  主要负责公司公众号，小程序，后台管理系统，官网跟安卓iOS的嵌套H5页面开发，后期的版本迭代，bug的修复，后台接口的对接，产品的评审等等。
  客户端（地址：https://dcloud.butongtech.com/#/）
  1.主要用到vue全家桶技术
  2.用七牛云实现图片的上传
  3.用mpvue实现了小程序端
  4.实现了H5端的支付功能，包括（小程序端，微信端，支付宝）
  5.用原生js实现了首页的瀑布流布局
  6.解决首屏加载白屏问题
  7.实现了微信端的分享，并且解决iOS端二次分享不显示图片，文字的问题
  8.做了指定页面埋点如（登陆,注册等）

 小程序端（不同Tech）
  1.主要mpvue实现，舍弃了微信原生的各种坑，用近vue语法完成。

  官网端（http://www.butongtech.com/）
  1.主要用到nuxt.js完成，利于seo，没有首次加载慢问题
  2.用到element-ui实现页面的弹窗，提示

  后台管理系统
  1.主要vue全家桶element-ui完成
  2.用到vuedraggable插件实现了数据的夸区域拖拽，排序
  3.使用原生的上传事件实现了批量上传
  4.完成了表格导入列表，批量导出功能
  5.完成各种搜索，增删改查等等。。。

   博客地址：https://blog.csdn.net/m18565890306；
   公众号关注：web交流






