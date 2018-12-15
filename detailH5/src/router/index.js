import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/home' //详情
import HomeMap from '@/components/home/homeMap' //详情的地图
import HomePage from '@/components/homePage/homePage' //=智慧活动
import LookMore from '@/components/homePage/lookMore' //查看更多
import IntelligentMatching from '@/components/intelligentMatching/IntelligentMatching' //智能匹配
import IntelligentMatchingA from '@/components/intelligentMatching/IntelligentMatchingA' //智能匹配
import IntelligentMatchingB from '@/components/intelligentMatching/IntelligentMatchingB' //智能匹配
import IntelligentMatchingC from '@/components/intelligentMatching/IntelligentMatchingC' //智能匹配
import HomeDetail from '@/components/homePage/IntelligentMatchingD' //个人主页的详情
import Qiniu from '@/components/qiniu/qiniu' //七牛上传
import Login from '@/components/login/login' //登录
import PayH5 from '@/components/payH5'  //支付
import Contact from '@/components/homePage/contact' //联系不同
import PictureLiveBroadcast from '@/components/pictureLiveBroadcast/pictureLiveBroadcast' //图片直播
const Message = resolve => require(['@/components/message/message'], resolve); //协议，之类
const FireMap = resolve => require(['@/components/pictureLiveBroadcast/fireMap'], resolve); //火图
const HomeIndex = resolve => require(['@/components/homeIndex/homeIndex'], resolve); //首页
import Myfollow from '@/components/me/myfollow' //我的关注
import Fans from '@/components/me/fans' //我的粉丝
import MyFabulous from '@/components/me/myFabulous' //我的赞
import MyCollection from '@/components/me/myCollection' //我的收藏
import MyComment from '@/components/me/myComment' //我的评论
const UserFeedback = resolve => require(['@/components/me/userFeedback'], resolve); //用户反馈
const MessageNotification = resolve => require(['@/components/me/messageNotification'], resolve); //消息通知
const PersonalSettings = resolve => require(['@/components/me/personalSettings'], resolve); //个人设置
import HomeIndex1_0 from '@/components/homeIndex1_0/homeIndex1_0' //首页
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/message',
      name: 'Message',
      component: Message,
    },
    {
      path: '/homeIndex1_0',
      name: 'homeIndex1_0',
      component: HomeIndex1_0,
    },
    { path: '/myfollow',
      component: Myfollow,
      name: 'myfollow'
    },
    { path: '/myComment',
      component: MyComment,
      name: 'myComment'
    },
    { path: '/myCollection',
      component: MyCollection,
      name: 'myCollection'
    },
    { path: '/fans',
      component: Fans,
      name: 'fans'
    },
    { path: '/myFabulous',
      component: MyFabulous,
      name: 'myFabulous'
    },
    {
      path: '/homeIndex',
      name: 'homeIndex',
      component: HomeIndex,
    },
    {
      path: '/fireMap',
      name: 'fireMap',
      component: FireMap,
    },
    { path: '/personalSettings',
      component: PersonalSettings,
      name: 'personalSettings'
    },
    { path: '/userFeedback',
      component: UserFeedback,
      name: 'userFeedback'
    },
    { path: '/messageNotification',
      component: MessageNotification,
      name: 'messageNotification'
    },
    {
      path: '/IntelligentMatching',
      name: 'IntelligentMatching',
      component: IntelligentMatching,
    },
    {
      path: '/PictureLiveBroadcast',
      name: 'PictureLiveBroadcast',
      component: PictureLiveBroadcast,
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact,
    },
    {
      path: '/qiniu',
      name: 'Qiniu',
      component: Qiniu,
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
