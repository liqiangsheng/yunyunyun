import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/home' //详情
import HomeMap from '@/components/home/homeMap' //详情的地图
import HomePage from '@/components/homePage/homePage' //首页
import LookMore from '@/components/homePage/lookMore' //查看更多
import IntelligentMatching from '@/components/intelligentMatching/IntelligentMatching' //智能匹配
import IntelligentMatchingA from '@/components/intelligentMatching/IntelligentMatchingA' //智能匹配
import IntelligentMatchingB from '@/components/intelligentMatching/IntelligentMatchingB' //智能匹配
import IntelligentMatchingC from '@/components/intelligentMatching/IntelligentMatchingC' //智能匹配
import IntelligentMatchingD from '@/components/intelligentMatching/IntelligentMatchingD' //智能匹配
import Login from '@/components/login' //登录
import PayH5 from '@/components/payH5'  //支付
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/IntelligentMatching',
      name: 'IntelligentMatching',
      component: IntelligentMatching,
    },{
      path: '/IntelligentMatchingA',
      name: 'IntelligentMatchingA',
      component: IntelligentMatchingA,
    },{
      path: '/IntelligentMatchingB',
      name: 'IntelligentMatchingB',
      component: IntelligentMatchingB,
    },{
      path: '/IntelligentMatchingC',
      name: 'IntelligentMatchingC',
      component: IntelligentMatchingC,
    },{
      path: '/IntelligentMatchingD',
      name: 'IntelligentMatchingD',
      component: IntelligentMatchingD,
    },
    {
      path: '/homePage',
      name: 'homePage',
      component: HomePage,
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
    { path: '/lookMore',
      component: LookMore,
      name: 'lookMore'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/payH5',
      name: 'PayH5',
      component: PayH5
    }
  ]
})
