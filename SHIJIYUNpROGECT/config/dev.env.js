var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
    // LOGIN_API:'"http://192.168.91.4:10019"',   //登录
    // GET_INFO: '"http://192.168.91.4:10020/apis/"',   //用户信息
    // BASE_API: '"http://192.168.91.4:10020/apis/"',   //AJAX接口
    // LOGIN_API:'http://172.16.0.32:10019',   //登录
    // GET_INFO: '"http://172.16.0.32:10020/apis/"',   //用户信息
    // BASE_API: '"http://172.16.0.32:10020/apis/"',   //AJAX接口
});
