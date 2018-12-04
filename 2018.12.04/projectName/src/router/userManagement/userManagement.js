const _import = require('../_import');
const userManagement = [
    { path: 'userManagement', component: _import('layout/routerView'), name: '用户管理', children: [
        //用户管理子页面
        {path:"userManagementHome",component:_import("userManagement/userManagemen"),name:"用户管理列表"},
        {path:"userList",component:_import("userManagement/userList"),name:"用户搜索页",children:[
            {path:"userListC",component:_import("userManagement/userList"),name:"普通用户"},
            {path:"userList_vip",component:_import("userManagement/userList_vip"),name:"VIP用户"},
            {path:"userListenterprise",component:_import("userManagement/userListenterprise"),name:"企业用户"},
          ]
        },
        {path:"commentManagement",component:_import("userManagement/commentManagement"),name:"用户评论管理"},
    ]
    }
]
export default userManagement;