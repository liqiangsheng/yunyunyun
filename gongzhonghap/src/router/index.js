import Vue from 'vue'
import Router from 'vue-router'
const Home = resolve => require(['@/components/home/home'], resolve); //详情
const HomeMap = resolve => require(['@/components/homeMap/homeMap'], resolve); //详情地图
const Index = resolve => require(['@/components/index/index'], resolve); //智慧活动
const Me = resolve => require(['@/components/me/me'], resolve); //我的
const Login1 = resolve => require(['@/components/login1/login1'], resolve); //登录1
const Login = resolve => require(['@/components/login/login'], resolve); //登录
const Message = resolve => require(['@/components/message/message'], resolve); //协议，之类
const EditingInformation = resolve => require(['@/components/editingInformation/editingInformation'], resolve); //编辑
const MeActivity = resolve => require(['@/components/meActivity/meActivity'], resolve); //我的活动
const MultiActivity = resolve => require(['@/components/multiActivity/multiActivity'], resolve); //购票列表
const RegistrationInformation = resolve => require(['@/components/registrationInformation/registrationInformation'], resolve); //填写报名信息
const HomePage = resolve => require(['@/components/homePage/homePage'], resolve); //个人企业首页
const LookMore = resolve => require(['@/components/homePage/lookMore'], resolve); //查看更多
const IntelligentMatching = resolve => require(['@/components/intelligentMatching/IntelligentMatching'], resolve); //智能匹配
const IntelligentMatchingA = resolve => require(['@/components/intelligentMatching/IntelligentMatchingA'], resolve); //智能匹配
const IntelligentMatchingB = resolve => require(['@/components/intelligentMatching/IntelligentMatchingB'], resolve); //智能匹配
const IntelligentMatchingC = resolve => require(['@/components/intelligentMatching/IntelligentMatchingC'], resolve); //智能匹配
const HomeDetail = resolve => require(['@/components/homePage/IntelligentMatchingD'], resolve); //个人主页的详情
const Face = resolve => require(['@/components/face/face'], resolve); //拍照选择
const AcknowledgementOfOrder = resolve => require(['@/components/acknowledgementOfOrder/acknowledgementOfOrder'], resolve); //订单确认
const Photograph = resolve => require(['@/components/Photograph/Photograph'], resolve); //拍照页面
const Loading = resolve => require(['@/components/loading/loading'], resolve); //拍照等待上传页面
const Admission = resolve => require(['@/components/admission/admission'], resolve); //生成门票
const PayH5 = resolve => require(['@/components/PayH5/payH5'], resolve); //选择支付
const Contact = resolve => require(['@/components/homePage/contact'], resolve); //联系不同
const PictureLiveBroadcast = resolve => require(['@/components/pictureLiveBroadcast/pictureLiveBroadcast'], resolve); //图片直播
const FireMap = resolve => require(['@/components/pictureLiveBroadcast/fireMap'], resolve); //火图
const homeIndex = resolve => require(['@/components/homeIndex/homeIndex'], resolve); //首页
// import Home from '@/components/home/home'
// import HomeMap from '@/components/homeMap/homeMap' //详情地图
// import Index from '@/components/index/index' //首页
// import Me from '@/components/me/me' //我的
// import Login1 from '@/components/login1/login1' //登录1
// import Login from '@/components/login/login' //登录
// import Message from '@/components/message/message' //协议，之类
// import EditingInformation from '@/components/editingInformation/editingInformation' //编辑
// import MeActivity from '@/components/meActivity/meActivity' //我的活动
// import MultiActivity from '@/components/multiActivity/multiActivity' //购票列表
// import RegistrationInformation from '@/components/registrationInformation/registrationInformation' //填写报名信息
// import HomePage from '@/components/homePage/homePage' //首页
// import LookMore from '@/components/homePage/lookMore' //查看更多
// import IntelligentMatching from '@/components/intelligentMatching/IntelligentMatching' //智能匹配
// import IntelligentMatchingA from '@/components/intelligentMatching/IntelligentMatchingA' //智能匹配
// import IntelligentMatchingB from '@/components/intelligentMatching/IntelligentMatchingB' //智能匹配
// import IntelligentMatchingC from '@/components/intelligentMatching/IntelligentMatchingC' //智能匹配
// import HomeDetail from '@/components/homePage/IntelligentMatchingD' //个人主页的详情
// import Face from '@/components/face/face' //拍照选择
// import AcknowledgementOfOrder from '@/components/acknowledgementOfOrder/acknowledgementOfOrder' //订单确认
// import Photograph from '@/components/Photograph/Photograph' //拍照页面
// import Loading from '@/components/loading/loading' //拍照等待上传页面
// import Admission from '@/components/admission/admission' //生成门票
// import PayH5 from '@/components/PayH5/payH5' //选择支付
// import Contact from '@/components/homePage/contact' //联系不同
// import PictureLiveBroadcast from '@/components/pictureLiveBroadcast/pictureLiveBroadcast' //图片直播
// import homeIndex from '@/components/homeIndex/homeIndex' //首页


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/homeIndex',
    },
    {
      path: '/homeIndex',
      name: 'homeIndex',
      component: homeIndex,
    },{
      path: '/index',
      name: 'index',
      component: Index,
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact,
    },
    {
      path: '/fireMap',
      name: 'fireMap',
      component: FireMap,
    },
    {
      path: '/payH5',
      name: 'payH5',
      component: PayH5,
    },
    {
      path: '/PictureLiveBroadcast',
      name: 'PictureLiveBroadcast',
      component: PictureLiveBroadcast,
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
