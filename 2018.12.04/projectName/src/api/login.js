import fetch from '@/utils/fetch';
import axios from 'axios'; //引入axios
import store from '@/store'

///////////////////////////////* 正式 login登录 *///////////////////////////////////////////
/*export function login(username, password) {
    var loginUrl = window.location.href.indexOf('localhost') >= 0 ? window._Host.LOGIN_API + window._Host.LOGIN_CONTEXT  + '/sec/oauth/token' : window._Host.LOGIN_CONTEXT + '/sec/oauth/token'
    return axios({
         method:"POST",
         url: loginUrl,
         headers: {
             "Authorization": "Basic " + btoa('clientapp' + ":" + '123456'),
             "Content-Type": "application/x-www-form-urlencoded"
         },
         data: 'username='+ username + '&password=' + password + '&grant_type=password'
     })
}*/

export function login(username, password,verifyCode,key) {
    return fetch({
        method:"POST",
        url: '/sec/oauth/token',
        headers: {
            "Authorization": "Basic " + btoa('clientapp' + ":" + '123456'),
          /*  "Authorization": "Basic dHVuZ190ZXN0OjEyMzQ1Ng==",*/
            "Content-Type": "application/x-www-form-urlencoded",
            "token":true //标识
        },
        data: 'username='+ username + '&password=' + password + '&grant_type=password'+'&key='+key+'&imageCode='+verifyCode
    })
}
export function refreshToken(refreshToken) {
    return fetch({
        method:"POST",
        url: '/sec/oauth/token',
        headers: {
            "Authorization": "Basic " + btoa('clientapp' + ":" + '123456'),
            /*"Authorization": "Basic dHVuZ190ZXN0OjEyMzQ1Ng==",*/
            "Content-Type": "application/x-www-form-urlencoded",
            "token":true //标识
        },
        data: 'grant_type=refresh_token'+'&refresh_token='+refreshToken
    })
}

export function logout() {
  return fetch({
    url: '/user/logout',
    method: 'post'
  });
}

export function verification(res) {
    return fetch({
        url: '/sec/validate/code/image',
        method: 'get',
        headers: {
            "token":true //标识
        },
    });
}


///////////////////////////////* 测试 login登录 *///////////////////////////////////////////
/*export function login(username, password) {
    return axios({
        method:"GET",
        url:'https://easy-mock.com/mock/596c7ab7a1d30433d835322e/vue-admin/user/token'
    })
}

export function getInfo() {
    return axios({
        method:"GET",
        url:'https://easy-mock.com/mock/596c7ab7a1d30433d835322e/vue-admin/user/getUserInfo',
    });
}*/


//ip :bendi
//10019   denglu
//10020

/* 数字字典 */

export function loadDictCache() {
    return fetch({
        method: 'GET',
        url: '/system/home/loadDictCache',
    })
}


export function loadOrgCache() {
    return fetch({
        method: 'GET',
        url: '/system/home/loadOrgCache',
    })
}
export function load() {
    return fetch({
        method: 'GET',
        url: '/system/home/load',
    })
}
