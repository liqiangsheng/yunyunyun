import Vue from 'vue';
import Router from 'vue-router';
const _import = require('./_import');
/* layout template 模板文件*/
import Layout from '../views/layout/Layout.vue';
// import workbench from '@/router/workbench' // 工作台模块
import system from '@/router/system' // 系统模块
import activitymrg from '@/router/activityManagement/activityManagement.js' // 活动模块
import consultativeManagement from '@/router/consultativeManagement/consultativeManagement.js' // 咨讯管理
import worksmanagement from '@/router/worksmanagement/worksmanagement.js' // 作品管理
import userManagement from '@/router/userManagement/userManagement.js' // 用户管理
import communityManagement from '@/router/communityManagement/index.js' // 社区管理
import report_form from '@/router/report_form/index.js' // 报表管理
import pictureBroadcastMrg from '@/router/pictureBroadcastManagement/pictureBroadcastManagement.js' // 报表管理

Vue.use(Router);
export const avoid = ['/workbench', '/operation', '/licensing', '/education', '/traffic', '/finance', '/system', '/activitymrg', '/consultativeManagement','/worksmanagement','/userManagement',"/communityManagement","/report_form",'/pictureBroadcastMrg']; // 不做处理的路由

export const constantRouterMap = [
  { path: '/login', component: _import('login/indexNew'), hidden: true },
  { path: '/404', component: _import('error/404'), hidden: true },
  { path: '/401', component: _import('error/401'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/userManagement/userManagement/userManagementHome',
    name: 'Home',
    hidden: true,
    children: [
        { path: 'dashboard', component: _import('dashboard/index'), name: '用户' },
        { path: 'welcome', component: _import('dashboard/welcome'), name: '欢迎' },
        { path: 'modifyPassword', component: _import('dashboard/modifyPassword') }
    ]
  }
];

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});

export const asyncRouterMap = [
  // {
  //   path: '/workbench',
  //   id: 'workbench',
  //   component: Layout,
  //   name: '工作台',
  //   children: workbench
  // },

    {
        path: '/userManagement',
        id: 'userManagement',
        component: Layout,
        name: '用户管理',
        children: userManagement
    },
    {
        path: '/report_form',
        id: 'report_form',
        component: Layout,
        name: '报表管理',
        children: report_form
    },
    {
        path: '/communityManagement',
        id: 'communityManagement',
        component: Layout,
        name: '社区管理',
        children: communityManagement
    },
    {
        path: '/worksmanagement',
        id: 'worksmanagement',
        component: Layout,
        name: '作品管理',
        children: worksmanagement
    },
    {
        path: '/consultativeManagement',
        id: 'consultativeManagement',
        component: Layout,
        name: '咨讯管理',
        children: consultativeManagement
    },
  {
    path: '/activitymrg',
    id: 'activitymrg',
    component: Layout,
    name: '活动管理',
    children: activitymrg
  },
    {
    path: '/pictureBroadcastMrg',
    id: 'pictureBroadcastMrg',
    component: Layout,
    name: '火图管理',
    children: pictureBroadcastMrg
  },
  {
    path: '/system',
    id: 'system',
    isActive: true,
    component: Layout,
    name: '基础设置',
    children: system
  },
    { path: '*', redirect: '/401', hidden: true }
];
