const _import = require('../_import');
const consultativeManagement = [
    { path: 'consultativeManagement', component: _import('layout/routerView'), name: '咨讯管理', children: [
        // 资讯管理子页面
        { path: 'consultativeManagementList', component: _import('consultativeManagement/consultativeManagementList'), name: '资讯列表' },
        { path: 'new_picture_and_text', component: _import('consultativeManagement/new_picture_and_text'), name: '新建图文' },
        { path: 'new_video', component: _import('consultativeManagement/new_video'), name: '新建视频' },
        { path: 'drafts', component: _import('consultativeManagement/drafts'), name: '草稿箱' },
        { path: 'audit_but', component: _import('consultativeManagement/audit_but'), name: '审核不过列表' },
    ] }
]
export default consultativeManagement;