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
import MultiActivity from '@/components/multiActivity/multiActivity' //购票列表
import RegistrationInformation from '@/components/registrationInformation/registrationInformation' //填写报名信息
import HomePage from '@/components/homePage/homePage' //首页
import LookMore from '@/components/homePage/lookMore' //查看更多
import IntelligentMatching from '@/components/intelligentMatching/IntelligentMatching' //智能匹配
import IntelligentMatchingA from '@/components/intelligentMatching/IntelligentMatchingA' //智能匹配
import IntelligentMatchingB from '@/components/intelligentMatching/IntelligentMatchingB' //智能匹配
import IntelligentMatchingC from '@/components/intelligentMatching/IntelligentMatchingC' //智能匹配
import HomeDetail from '@/components/homePage/IntelligentMatchingD' //个人主页的详情
import Face from '@/components/face/face' //拍照选择
import AcknowledgementOfOrder from '@/components/acknowledgementOfOrder/acknowledgementOfOrder' //订单确认
import Photograph from '@/components/Photograph/Photograph' //拍照页面
import Loading from '@/components/loading/loading' //拍照等待上传页面
import Admission from '@/components/admission/admission' //生成门票


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
      path: '/loading',
      name: 'loading',
      component: Loading,
    },
    {
      path: '/admission',
      name: 'admission',
      component: Admission,
    },
    {
      path: '/Photograph',
      name: 'Photograph',
      component: Photograph,
    },
    {
      path: '/acknowledgementOfOrder',
      name: 'acknowledgementOfOrder',
      component: AcknowledgementOfOrder,
    },
    {
      path: '/face',
      name: 'face',
      component: Face,
    },
    {
      path: '/IntelligentMatching',
      name: 'IntelligentMatching',
      component: IntelligentMatching,
    },
    { path: '/lookMore',
      component: LookMore,
      name: 'lookMore'
    },
    {
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
      path: '/homeDetail',
      name: 'HomeDetail',
      component: HomeDetail,
    },
    {
      path: '/homePage',
      name: 'homePage',
      component: HomePage,
    },
    {
      path: '/registrationInformation',
      name: 'registrationInformation',
      component: RegistrationInformation,
    },
    {
      path: '/multiActivity',
      name: 'multiActivity',
      component: MultiActivity,
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
