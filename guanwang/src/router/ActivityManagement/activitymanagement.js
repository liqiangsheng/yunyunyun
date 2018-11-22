const _import = require('../_import');
const activitymrg = [
  { path: 'activityMrg', component: _import('layout/routerView'), name: '活动管理', children: [
            // 活动管理子页面
            { path: 'activityMrgAddList', component: _import('activityMrg/activityMrg/activityMrgList'), name: '活动列表' },
            { path: 'activityMrgDetail', component: _import('activityMrg/activityMrg/activityMrgDetail'), name: '活动查询列表' },
            { path: 'activityMrgAddSingle', component: _import('activityMrg/activityMrg/activityMrgAddSingle'), name: '新建单活动' },
            { path: 'activityMrgAddMany', component: _import('activityMrg/activityMrg/activityMrgAddMany'), name: '新建多活动' }
            // { path: 'commodityMgrAdd',component: _import('marketing/commodityMgr/subPage/commodityMgrAdd'), name: '新增商品',hidden:true,noControl:true},
            // { path: 'commodityMgrEdit',component: _import('marketing/commodityMgr/subPage/commodityMgrEdit'), name: '编辑商品',hidden:true,noControl:true},
  ] }
]
export default activitymrg;