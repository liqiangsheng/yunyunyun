import { asyncRouterMap, constantRouterMap } from '@/router/index';
import store from '@/store'

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param resMap
 */
function filterAsyncRouter(asyncRouterMap,resMap) {
    const accessedRouters = asyncRouterMap.filter((route,index) => {
        let id = route.path.replace("/","");
        if(id.indexOf(":") !== -1){
            if(resMap[id.split(":")[0]] !== undefined){

                return true
            }
        }
        if(route.noControl){
            return true
        }
        if (resMap[id] !== undefined){
            if (route.children && route.children.length) {
               route.children = filterAsyncRouter(route.children,resMap);
            }
        }else {
            return false;
        }
      return true
    });
    return accessedRouters

}


const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers.concat({ path: '*', redirect: '/401', hidden: true });
      //state.addRouters = routers
      state.routers = constantRouterMap.concat(routers);
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        let accessedRouters;
         /* if(data.roleCode === "JX_ADMIN"){
              accessedRouters =asyncRouterMap
          }else{
              accessedRouters = filterAsyncRouter(asyncRouterMap,data.resMap);
          }*/
         //注释掉
         //  if(data.resMap){
         //      console.log(asyncRouterMap,"liqiangs")
         //      console.log(data.resMap,"liqiangs")
         //      accessedRouters = filterAsyncRouter(asyncRouterMap,data.resMap);
         //   console.log(accessedRouters,"liqiangs")
         //  }
          //打开
       accessedRouters =asyncRouterMap
        //  console.log(accessedRouters)
          commit('SET_ROUTERS', accessedRouters);
          resolve();
      })
    }
  }
};

export default permission;
