# detailh5

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


