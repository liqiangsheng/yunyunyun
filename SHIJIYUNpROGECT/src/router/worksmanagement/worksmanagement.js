const _import = require('../_import');
const worksmanagement = [
    { path: 'worksmanagement', component: _import('layout/routerView'), name: '作品管理菜单', children: [
        // 作品管理子页面
        { path: 'worksmanagementList', component: _import('worksmanagement/worksmanagement'), name: '单项审核管理' },
    ] }
]
export default worksmanagement;