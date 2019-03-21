const _import = require('../_import');
const activitymrg = [
  { path: 'activityMrg', component: _import('layout/routerView'), name: '活动管理菜单', children: [
            // 活动管理子页面
            { path: 'activityMrgAddList', component: _import('activityMrg/activityMrg/activityMrgList'), name: '活动列表' },
            { path: 'activityMrgDetail', component: _import('activityMrg/activityMrg/activityMrgDetail'), name: '报名详单查询', hidden: true },
            { path: 'settingPage', component: _import('activityMrg/activityMrg/previewAlterSet'), name: '报名独立页设置', hidden: true },
            { path: 'InformationSetting', component: _import('activityMrg/activityMrg/InformationSetting'), name: '报名登记信息设置', hidden: true },
            { path: 'activityMrgAddSingle', name: '新建单活动管理',children:[
                {path:'newActivityMrgAddSingle',component:_import('activityMrg/activityMrg/activityMrgAddSingle'),name:'新建单活动'},
                {path:'eideActivityMrgSingle',component:_import('activityMrg/activityMrg/eideActivityMrgSingle'),name:'编辑单活动', hidden: true},
                {path:'lookActivityMrgSingle',component:_import('activityMrg/activityMrg/lookActivityMrgSingle'),name:'查看单活动', hidden: true},
                {path:'distinguishedGuest',component:_import('activityMrg/activityMrg/alter/distinguishedGuest'),name:'嘉宾管理', hidden: true}
            ] },
            { path: 'activityMrgAddMany', component: _import('activityMrg/activityMrg/activityMrgAddMany'), name: '新建多活动', hidden: true },
            { path: 'admissionTicket', component: _import('activityMrg/activityMrg/admissionTicket'), name: '组合门票', hidden: true }

  ] }
]
export default activitymrg;