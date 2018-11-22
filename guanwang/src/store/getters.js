const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  rolesName: state => state.user.rolesName,
  userAccount: state => state.user.userAccount, //账号
  access_token: state => state.user.access_token,   //验证
  refresh_token:state => state.user.refresh_token,
  token_type: state => state.user.token_type,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  menus : state => state.user.menus,
  pageResource : state => state.user.pageResource,  //资源管理
};

export default getters
