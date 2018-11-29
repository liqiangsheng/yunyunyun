const _import = require('../_import');
const userManagement = [
    { path: 'userManagement', component: _import('layout/routerView'), name: '用户管理', children: [
        //用户管理子页面
        {path:"userManagementHome",component:_import("userManagement/userManagemen"),name:"用户管理列表"},
        {path:"userList",component:_import("userManagement/userList"),name:"用户搜索页"},
        {path:"commentManagement",component:_import("userManagement/commentManagement"),name:"用户评论管理"},
    ]
    }
]
export default userManagement;