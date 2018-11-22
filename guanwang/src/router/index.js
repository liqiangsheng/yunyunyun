import Vue from 'vue';
import Router from 'vue-router';
const _import = require('./_import');
/* layout template 模板文件*/
import Layout from '../views/layout/Layout.vue';
import workbench from '@/router/workbench' // 工作台模块
import system from '@/router/system' // 系统模块
// import marketing from '@/router/marketing' // 营销模块
import activitymrg from '@/router/activityManagement/activityManagement.js' // 活动模块

Vue.use(Router);
export const avoid = ['/workbench', '/operation', '/licensing', '/education', '/traffic', '/finance', '/system', '/activitymrg']; // 不做处理的路由

export const constantRouterMap = [
  { path: '/login', component: _import('login/indexNew'), hidden: true },
  { path: '/404', component: _import('error/404'), hidden: true },
  { path: '/401', component: _import('error/401'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/workbench/home',
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
  {
    path: '/workbench',
    id: 'workbench',
    component: Layout,
    name: '工作台',
    children: workbench
  },
    // {
    //     path: '/marketing',
    //     id: 'marketing',
    //     component: Layout,
    //     name: '营销管理',
    //     children: marketing
    // },
  {
    path: '/activitymrg',
    id: 'activitymrg',
    component: Layout,
    name: '活动管理',
    children: activitymrg
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
