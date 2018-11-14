import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/home' //详情
import HomeMap from '@/components/homeMap/homeMap' //详情地图
import Index from '@/components/index/index' //首页
import Me from '@/components/me/me' //我的
import Login1 from '@/components/login1/login1' //登录1
import Login from '@/components/login/login' //登录
import Message from '@/components/message/message' //协议，之类
import EditingInformation from '@/components/editingInformation/editingInformation' //编辑
import MeActivity from '@/components/meActivity/meActivity' //我的活动


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index',
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
    },
    {
      path: '/meActivity',
      name: 'meActivity',
      component: MeActivity,
    },
    {
      path: '/editingInformation',
      name: 'EditingInformation',
      component: EditingInformation,
    },
    {
      path: '/message',
      name: 'Message',
      component: Message,
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    { path: '/homeMap',
      component: HomeMap,
      name: 'map'
    },
      { path: '/me',
      component: Me,
      name: 'me'
    },
    { path: '/login1',
      component: Login1,
      name: 'login1'
    },
    { path: '/login',
      component: Login,
      name: 'login'
    },
  ]
})
