import Vue from 'vue'
import Router from 'vue-router'
const Home = resolve => require(['@/components/home/home'], resolve); //详情
const HomeMap = resolve => require(['@/components/homeMap/homeMap'], resolve); //详情地图
const Index = resolve => require(['@/components/index/index'], resolve); //智慧活动
const Me = resolve => require(['@/components/me/me'], resolve); //我的
const Myfollow = resolve => require(['@/components/me/myfollow'], resolve); //我的关注
const Fans = resolve => require(['@/components/me/fans'], resolve); //我的粉丝
const MyFabulous = resolve => require(['@/components/me/myFabulous'], resolve); //我的赞
const MyCollection = resolve => require(['@/components/me/myCollection'], resolve); //我的收藏
const MyComment = resolve => require(['@/components/me/myComment'], resolve); //我的评论
const UserFeedback = resolve => require(['@/components/me/userFeedback'], resolve); //用户反馈
const MessageNotification = resolve => require(['@/components/me/messageNotification'], resolve); //消息通知
const PersonalSettings = resolve => require(['@/components/me/personalSettings'], resolve); //个人设置
const PraiseMe = resolve => require(['@/components/me/praiseMe'], resolve); //赞我的
const CommentOnMy = resolve => require(['@/components/me/comment_on_my'], resolve); //评论我的
const CollectMy = resolve => require(['@/components/me/collect_my'], resolve); //收藏我的
const Login1 = resolve => require(['@/components/login1/login1'], resolve); //登录1
const Login = resolve => require(['@/components/login/login'], resolve); //登录
const Message = resolve => require(['@/components/message/message'], resolve); //协议，之类
const EditingInformation = resolve => require(['@/components/editingInformation/editingInformation'], resolve); //编辑
const MeActivity = resolve => require(['@/components/meActivity/meActivity'], resolve); //我的活动
const MultiActivity = resolve => require(['@/components/multiActivity/multiActivity'], resolve); //购票列表
const RegistrationInformation = resolve => require(['@/components/registrationInformation/registrationInformation'], resolve); //填写报名信息
const EnterprisePage = resolve => require(['@/components/homePage/enterprisePage'], resolve); //企业主页
const BigShotPage = resolve => require(['@/components/homePage/bigShotPage'], resolve); //大咖主页
const LookMore = resolve => require(['@/components/homePage/lookMore'], resolve); //查看更多
const MoreStories = resolve => require(['@/components/homePage/moreStories'], resolve); //更多故事
const IntelligentMatching = resolve => require(['@/components/intelligentMatching/IntelligentMatching'], resolve); //智能匹配
const IntelligentMatchingA = resolve => require(['@/components/intelligentMatching/IntelligentMatchingA'], resolve); //智能匹配
const IntelligentMatchingB = resolve => require(['@/components/intelligentMatching/IntelligentMatchingB'], resolve); //智能匹配
const IntelligentMatchingC = resolve => require(['@/components/intelligentMatching/IntelligentMatchingC'], resolve); //智能匹配
const IntelligentComment = resolve => require(['@/components/intelligentMatching/IntelligentComment'], resolve); //评论的详情
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
const homeIndex = resolve => require(['@/components/homeIndex/homeIndex'], resolve); //资讯
const HomeIndex1_0 = resolve => require(['@/components/homeIndex1_0/homeIndex1_0'], resolve); //首页
const Follow = resolve => require(['@/components/homeIndex1_0/alter/follow'], resolve); //关注
const FindDetail = resolve => require(['@/components/homeIndex1_0/findDetail'], resolve); //作品详情发现的详情
const PersonalMelonPages = resolve => require(['@/components/intelligentMatching/personalMelonPages'], resolve); //个人吃瓜页
const Release = resolve => require(['@/components/release/release'], resolve); //发布
// import Home from '@/components/home/home'
// import HomeMap from '@/components/homeMap/homeMap' //详情地图
// import Index from '@/components/index/index' //智慧活动
// import Me from '@/components/me/me' //我的
// import Myfollow from '@/components/me/myfollow' //我的关注
// import Fans from '@/components/me/fans' //我的粉丝
// import MyFabulous from '@/components/me/myFabulous' //我的赞
// import MyCollection from '@/components/me/myCollection' //我的收藏
// import MyComment from '@/components/me/myComment' //我的评论
// import UserFeedback from '@/components/me/userFeedback' //用户反馈
// import messageNotification from '@/components/me/messageNotification' //消息通知
// import PraiseMe from '@/components/me/praiseMe' //点赞我的
// import CommentOnMy from '@/components/me/comment_on_my' //评论我的
// import CollectMy from '@/components/me/collect_my' //收藏我的
// import PersonalSettings from '@/components/me/personalSettings' //个人设置

// import Login1 from '@/components/login1/login1' //登录1
// import Login from '@/components/login/login' //登录
// import Message from '@/components/message/message' //协议，之类
// import EditingInformation from '@/components/editingInformation/editingInformation' //编辑
// import MeActivity from '@/components/meActivity/meActivity' //我的活动
// import MultiActivity from '@/components/multiActivity/multiActivity' //购票列表
// import RegistrationInformation from '@/components/registrationInformation/registrationInformation' //填写报名信息
// import LookMore from '@/components/homePage/lookMore' //查看更多
// import MoreStories from '@/components/homePage/moreStories' //更多故事
// import IntelligentMatching from '@/components/intelligentMatching/IntelligentMatching' //智能匹配
// import IntelligentMatchingA from '@/components/intelligentMatching/IntelligentMatchingA' //智能匹配
// import IntelligentMatchingB from '@/components/intelligentMatching/IntelligentMatchingB' //智能匹配
// import IntelligentMatchingC from '@/components/intelligentMatching/IntelligentMatchingC' //智能匹配
// import IntelligentComment from '@/components/intelligentMatching/IntelligentComment' //智能匹配
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
// import HomeIndex1_0 from '@/components/homeIndex1_0/homeIndex1_0' //首页
// import Follow from '@/components/homeIndex1_0/alter/follow' //首页
// import FindDetail from '@/components/homeIndex1_0/findDetail' //发现的详情
// import PersonalMelonPages from '@/components/intelligentMatching/personalMelonPages' //个人吃瓜页
// import Release from '@/components/release/release' //发布


Vue.use(Router)

export default new Router({
  // mode:'history',
  mode:'hash',
  routes: [
    {
      path: '/',
      redirect: '/homeIndex1_0',
    },
    {
      path: '/homeIndex1_0',
      name: 'homeIndex1_0',
      component: HomeIndex1_0,
      meta:{
        isTrue:true,
      }
    },
    {
      path: '/follow',
      name: 'follow',
      component: Follow,
      meta:{
        isTrue:false,
      }
    },
    {
      path: '/findDetail',
      name: 'findDetail',
      component: FindDetail,
      meta:{
        isTrue:false,
      }
    },
    {
      path: '/homeIndex',
      name: 'homeIndex',
      component: homeIndex,
      meta:{
        isTrue:false,
      }
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      meta:{
        isTrue:true,
      }
    },
    {
      path: '/release',
      name: 'release',
      component: Release,
      meta:{
        isTrue:false,
      }
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact,
      meta:{
        isTrue:false,
      }
    },
    {
      path: '/fireMap',
      name: 'fireMap',
      component: FireMap,
      meta:{
        isTrue:true,
      }
    },
    {
      path: '/payH5',
      name: 'payH5',
      component: PayH5,
      meta:{
        isTrue:false,
      }
    },
    {
      path: '/PictureLiveBroadcast',
      name: 'PictureLiveBroadcast',
      component: PictureLiveBroadcast,
      meta:{
        isTrue:false,
      }
    },
    {
      path: '/loading',
      name: 'loading',
      component: Loading,
      meta:{
        isTrue:false,
      }
    },
    {
      path: '/admission',
      name: 'admission',
      component: Admission,
      meta:{
        isTrue:false,
      }
    },
    {
      path: '/Photograph',
      name: 'Photograph',
      component: Photograph,
      meta:{
        isTrue:false,
      }
    },
    {
      path: '/acknowledgementOfOrder',
      name: 'acknowledgementOfOrder',
      component: AcknowledgementOfOrder,
      meta:{
        isTrue:false,
      }
    },
    {
      path: '/face',
      name: 'face',
      component: Face,
      meta:{
        isTrue:false,
      }
    },
    {
      path: '/IntelligentMatching',
      name: 'IntelligentMatching',
      component: IntelligentMatching,
      meta:{
        isTrue:false,
      }
    },
    { path: '/lookMore',
      component: LookMore,
      name: 'lookMore',
      meta:{
        isTrue:false,
      }
    },
    { path: '/moreStories',
      component: MoreStories,
      name: 'moreStories',
      meta:{
        isTrue:false,
      }
    },
    {
      path: '/IntelligentMatchingA',
      name: 'IntelligentMatchingA',
      component: IntelligentMatchingA,
      meta:{
        isTrue:false,
      }
    },
    {
      path: '/IntelligentMatchingB',
      name: 'IntelligentMatchingB',
      component: IntelligentMatchingB,
      meta:{
        isTrue:false,
      }
    },
    {
      path: '/IntelligentMatchingC',
      name: 'IntelligentMatchingC',
      component: IntelligentMatchingC,
      meta:{
        isTrue:false,
      }
    },
    {
      path: '/IntelligentComment',
      name: 'IntelligentComment',
      component: IntelligentComment,
      meta:{
        isTrue:false,
      }
    },
    {
      path: '/personalMelonPages',
      name: 'personalMelonPages',
      component: PersonalMelonPages,
      meta:{
        isTrue:false,
      }
    },
    {
      path: '/homeDetail',
      name: 'HomeDetail',
      component: HomeDetail,
      meta:{
        isTrue:false,
      }
    },
    {
      path: '/enterprisePage',
      name: 'enterprisePage',
      component: EnterprisePage,
      meta:{
        isTrue:false,
      }
    },
    {
      path: '/bigShotPage',
      name: 'bigShotPage',
      component: BigShotPage,
      meta:{
        isTrue:false,
      }
    },
    {
      path: '/registrationInformation',
      name: 'registrationInformation',
      component: RegistrationInformation,
      meta:{
        isTrue:false,
      }
    },
    {
      path: '/multiActivity',
      name: 'multiActivity',
      component: MultiActivity,
      meta:{
        isTrue:false,
      }
    },
    {
      path: '/meActivity',
      name: 'meActivity',
      component: MeActivity,
      meta:{
        isTrue:false,
      }
    },
    {
      path: '/editingInformation',
      name: 'EditingInformation',
      component: EditingInformation,
      meta:{
        isTrue:false,
      }
    },
    {
      path: '/message',
      name: 'Message',
      component: Message,
      meta:{
        isTrue:false,
      }
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta:{
        isTrue:false,
      }
    },
    { path: '/homeMap',
      component: HomeMap,
      name: 'map',
      meta:{
        isTrue:false,
      }
    },
      { path: '/me',
      component: Me,
      name: 'me',
        meta:{
          isTrue:false,
        }
    },
    { path: '/personalSettings',
      component: PersonalSettings,
      name: 'personalSettings',
      meta:{
        isTrue:false,
      }
    },
    { path: '/praiseMe',
      component: PraiseMe,
      name: 'praiseMe',
      meta:{
        isTrue:false,
      }
    },
    { path: '/collect_my',
      component: CollectMy,
      name: 'collect_my',
      meta:{
        isTrue:false,
      }
    },
    { path: '/comment_on_my',
      component: CommentOnMy,
      name: 'comment_on_my',
      meta:{
        isTrue:false,
      }
    },
    { path: '/userFeedback',
      component: UserFeedback,
      name: 'userFeedback',
      meta:{
        isTrue:false,
      }
    },
    { path: '/messageNotification',
      component: MessageNotification,
      name: 'messageNotification',
      meta:{
        isTrue:false,
      }
    },
    { path: '/myfollow',
      component: Myfollow,
      name: 'myfollow',
      meta:{
        isTrue:false,
      }
    },
    { path: '/myComment',
      component: MyComment,
      name: 'myComment',
      meta:{
        isTrue:false,
      }
    },
    { path: '/myCollection',
      component: MyCollection,
      name: 'myCollection',
      meta:{
        isTrue:false,
      }
    },
    { path: '/fans',
      component: Fans,
      name: 'fans',
      meta:{
        isTrue:false,
      }
    },
    { path: '/myFabulous',
      component: MyFabulous,
      name: 'myFabulous',
      meta:{
        isTrue:false,
      }
    },
    { path: '/login1',
      component: Login1,
      name: 'login1',
      meta:{
        isTrue:false,
      }
    },
    { path: '/login',
      component: Login,
      name: 'login',
      meta:{
        isTrue:false,
      }
    },
  ]
})
