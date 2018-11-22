import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { refreshToken } from '@/api/login'
import router from '@/router'
axios.defaults.isRetryRequest = false
//let access_token = this.$store.getters.access_token;
import Cookies from 'js-cookie';
window.isDirected = false
//console.log("bearer "+ Cookies.get('ACCESS_TOKEN'))
// 创建axios实例
const service = axios.create({
  // baseURL: window._Host.BASE_API, // api的base_url
  timeout: 60000 ,                 // 请求超时时间
//  headers: {"Authorization": "bearer "+ Cookies.get('ACCESS_TOKEN') }

});
// request拦截器
service.interceptors.request.use(config => {
    let access_token = store.getters.access_token;
    if(config.url.replace(/[^?]/g,"").length>0){    //判断链接是否有参数
        isLocalhost('&access_token=')
    }else{
        isLocalhost('?access_token=')
    }
    function isLocalhost(tokenName){
        if (window.location.href.indexOf('localhost') >= 0 || window.location.hostname === "127.0.0.1") {
            if (config.headers.token) {
                config.url =  window._Host.LOGIN_API + window._Host.LOGIN_CONTEXT + config.url
            } else {
                config.url =  window._Host.BASE_API + window._Host.BASE_CONTEXT + config.url + tokenName + access_token
            }
        }else {
            if (config.headers.token) {
                config.url = window._Host.LOGIN_CONTEXT + config.url
            } else {
                config.url = window._Host.BASE_CONTEXT + config.url  + tokenName + access_token //健全系统安全
            }
        }
    }
  return config;
}, error => {
  // Do something with request error
  console.log(error); // for debug
  Promise.reject(error);
});

// respone拦截器
service.interceptors.response.use(
    //response => response,
/**
 * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
 * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
 */
    response =>{
        const res = response.data;
        if(res.code.toString() !== '200'){
            Message({
                message:res.message,
                type: 'error',
                duration: 5 * 1000,
                dangerouslyUseHTMLString:true
            });
            //return Promise.reject('error');
            return response;
        }else{
            return response;
        }
    },
  error => {
      let refresh_token = Cookies.get('refresh_token');
      console.log('err' + error);// for debug
      let config = error.config;
      let access_token = store.getters.access_token;
      if(error.response.status === 401 && error.response.data.code === '1000009'){
          //如果access_token没刷新
          console.log(config)

              refreshToken(refresh_token).then(res=>{

                  if (res.data.code === '9000201' || res.data.code === '9000301') {
                      // refresh Token 过期，||  不支持 refresh Token， 路由到登陆页
                      // message:  登录失效 请重新登录
                      if (!window.isDirected) {
                          window.isDirected = true;
                          Message({
                              message:'登录失效，请重新登录，3秒过后自动跳转登录',
                              type: 'error',
                              duration: 5 * 1000,
                              dangerouslyUseHTMLString:true
                          });
                          setInterval(function(){
                              store.dispatch('FedLogOut').then(() => {
                                  location.reload();
                              });
                          },3000)
                      }
                  }
                  if (res.data.code === 200) {

                      //替换cookie access token  == res.data.access_token
                      Cookies.set('ACCESS_TOKEN',res.data.access_token);   //存储access_token
                      //修改access_token
                      store.commit('SET_ACCESS_TOKEN', res.data.access_token);
                      let str = config.url
                      str = str.match(/(\S*)access_token=/)[0];
                      config.url = str + res.data.access_token;
                      vm.$root.hubBus.$emit('refreshTabs')
                      //return axios(config);
                  }
              });


      }else{
          //如果是500报错
          let message = "请求超时";
          if(error.response) {
              const res = error.response.data;
              if(res.message!==null && res.message !== "") {
                  message = res.message;
              }
          }
          Message({
              message: message,
              type: 'error',
              duration: 3 * 1000,
              dangerouslyUseHTMLString:true
          });

      }

      return {status: false, data: { status: false}};
    //return Promise.reject(error);
  }
);
//service.defaults.headers.common['Authorization'] = "bearer "+ Cookies.get('ACCESS_TOKEN');
export default service;
