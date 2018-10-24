import { login, logout, getInfo ,loadDictCache,loadOrgCache,load} from '@/api/login';
import { Message } from 'element-ui';
import Cookies from 'js-cookie';
import axios from 'axios';
import { findPageResource } from '@/api/public'
let _this = this;
//let localStorage = require('storejs');
const user = {
  loginDate:[],
  state: {
    token: Cookies.get('Admin-Token'),
    name: '',
    avatar: '',
    roles: [],
    access_token : Cookies.get('ACCESS_TOKEN'),
    refresh_token : Cookies.get('refresh_token'),
    token_type :Cookies.get('TOKEN_TYPE'),
    menus : [],
    pageResource:[],
    rolesName:Cookies.get('SET_ROLES_NAME'),
    userAccount:''
  },

  mutations: {
    SET_TOKEN: (state, token) => {  //角色名称role:["admin"]
      state.token = token;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_MENUS: (state, roles) => {  //角色资源菜单
        console.log(roles,"dasjkasdk")
      state.menus = roles;
    },
    //用于AJAX请求时，做校验的两个参数
    SET_ACCESS_TOKEN:(state, roles) => {  //获取角色ACCESS_TOKEN
        state.access_token = roles;
    },
    SET_TOKEN_TYPE:(state, roles) => {  //获取角色TOKEN_TYPE
      state.token_type = roles;
    },
    //end
    SET_ROLES_NAME:(state, roles) => {
      state.rolesName = roles;
    },
    SET_PAGE_RESOURCE:(state, roles) => {
      state.pageResource = roles;
    },
    SET_USER_ACCOUNT:(state, roles) => {
        state.userAccount = roles;
    },
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo.username, userInfo.password,userInfo.verifyCode,userInfo.key).then(response => {  //登录页面请求
            console.log(response,"carter")
           if(response.data.status){
               /* 第一步 获取token信息 */
               Cookies.set('ACCESS_TOKEN',response.data.access_token);   //存储access_token
               Cookies.set('refresh_token',response.data.refresh_token);   //存储access_token
               Cookies.set('TOKEN_TYPE', response.data.token_type);   //存储token_type
               commit('SET_ACCESS_TOKEN', response.data.access_token);   //用户 access_token
               commit('SET_TOKEN_TYPE', response.data.token_type);   //token_type

               /* 第二步 获取角色信息*/
               Cookies.set('Admin-Token', response.data.roleCode);   //存储cookies
               Cookies.set('SET_ROLES_NAME', response.data.roleName);   //存储token_type
               commit('SET_TOKEN', response.data.name);   //用户名称
               commit('SET_ROLES_NAME', response.data.roleName);   //角色名
               commit('SET_USER_ACCOUNT', response.data.userAccount);  //账号
               resolve(response); //进入主界面
            }else{
               resolve(response);
            }
        }).catch(error => {
            Message.error('网络请求失败，请检查网络');
            reject(error);
        });
      });
    },


    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
          //获取角色信息
          load().then(response => {
              if(response.data.status){
                  /* 角色信息 */
                  const data = response.data.data.userInfo;
                  commit('SET_NAME', data.userName);  //用户名
                  commit('SET_MENUS', data);  //角色资源权限
                  commit('SET_ROLES', [data.roleCode]); //角色
                  commit('SET_AVATAR', data.avatar);    //头像
                  commit('SET_USER_ACCOUNT', data.userAccount);  //账号
                  resolve(response);
                  localStorage.setItem("userResMap",JSON.stringify(data)); //资源权限
                  localStorage.setItem('userInfo',JSON.stringify(response.data.data)); // 保存用户信息
                  let localCacheVersion = JSON.parse(localStorage.getItem("cacheVersion"));
                  console.log(localCacheVersion,"asasdas")
                  let serverCacheVersion = response.data.data.cacheVersion;
                  if(localCacheVersion){
                      if(localCacheVersion.org_map !== serverCacheVersion.org_map){
                          loadOrg();
                      }
                      if(localCacheVersion.dict_data !== serverCacheVersion.dict_data){
                          loadDict();
                      }
                      if(!localStorage.getItem("loadOrgCache")){ //如果为空 就去拉取缓存
                          loadOrg();
                      }
                      if(!localStorage.getItem("loadDictCache")){
                          loadDict();
                      }
                  } else {
                      loadOrg();
                      loadDict();
                  }
                  localStorage.setItem('cacheVersion', JSON.stringify(serverCacheVersion)); //保存缓存信息
                  function loadOrg(){
                      loadOrgCache().then(res=>{
                          if(res.data.status){
                              localStorage.setItem('loadOrgCache',JSON.stringify(res.data.data)); //设置片区字典
                          }
                      });
                  }
                  function loadDict(){
                      loadDictCache().then(res=>{
                          if(res.data.status){
                              localStorage.setItem('loadDictCache',JSON.stringify(res.data.data)); //设置片区字典
                          }
                      });
                  }
              }else{
                  resolve(response);
              }
          }).catch(error => {

              resolve(error);
          });
      });
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '');
          commit('SET_ROLES', []);
          Cookies.remove('Admin-Token');
          Cookies.remove('ACCESS_TOKEN');
          Cookies.remove('TOKEN_TYPE');
          Cookies.remove('SET_ROLES_NAME');
          Cookies.remove('sidebarStatus');
          localStorage.removeItem('userInfo');
          localStorage.removeItem('userResMap');
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '');
        Cookies.remove('Admin-Token');
          Cookies.remove('ACCESS_TOKEN');
          Cookies.remove('TOKEN_TYPE');
          Cookies.remove('SET_ROLES_NAME');
          Cookies.remove('sidebarStatus');
          localStorage.removeItem('userInfo');
          localStorage.removeItem('userResMap');
        resolve();
      });
    },

    //页面资源权限
    FindPageResource({ commit, state }, data){
        return new Promise((resolve, reject) =>{
            findPageResource(data).then(response=>{
              commit('SET_PAGE_RESOURCE', response.data.data);
                resolve();
            })
        });
    }

  }
};

export default user;
