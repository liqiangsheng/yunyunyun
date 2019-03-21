const _import = require('../_import');
let system = [
    { path: 'userManage', name: '系统管理',component: _import('layout/routerView'),children:[
            { path: 'character',component: _import('system/userManage/Character'), name: '角色管理'},
            { path: 'authority', icon: 'mobankuangjia', component: _import('system/userManage/Authority'), name: '权限配置', hidden: true},
            // { path: 'userManagement',component: _import('system/userManage/userManagement'), name: '用户管理`'},
            // { path: 'postSetting',component: _import('system/userManage/postSetting'), name: '岗位管理'},
            // { path: 'resourceMag',component:  _import('system/userManage/resourceMag'), name: '资源管理'},
            // { path: 'regionalMag',component: _import('system/userManage/RegionalMag'), name: '地区管理'},
            // { path: 'organizationMag',component: _import('system/userManage/organizationMag'), name: '组织管理'},
            // { path: 'model',component: _import('system/userManage/model'), name: '模型列表'},
        ]}
]
export default system;
