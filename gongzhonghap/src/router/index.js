import Vue from 'vue'
import Router from 'vue-router'
const Home = resolve => require(['@/components/home/home'], resolve); //详情
const HomeMap = resolve => require(['@/components/homeMap/homeMap'], resolve); //详情地图
const Index = resolve => require(['@/components/index/index'], resolve); //智慧活动
const Me = resolve => require(['@/components/me/me'], resolve); //我的
const SetPassword = resolve => require(['@/components/me/setPassword'], resolve); //密码设置
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
const homeIndex = resolve => require(['@/components/homeIndex/homeIndex'], resolve); //资讯
const HomeIndex1_0 = resolve => require(['@/components/homeIndex1_0/homeIndex1_0'], resolve); //首页
const Follow = resolve => require(['@/components/homeIndex1_0/alter/follow'], resolve); //关注
const FindDetail = resolve => require(['@/components/homeIndex1_0/findDetail'], resolve); //作品详情发现的详情
const PersonalMelonPages = resolve => require(['@/components/intelligentMatching/personalMelonPages'], resolve); //个人吃瓜页
const Release = resolve => require(['@/components/release/release'], resolve); //发布

Vue.use(Router)

export default new Router({
  // mode:'history',
  mode:'hash',
  routes: [
    {
      path: '/',
      redirect: '/homeIndex1_0',
    },
    // {
    //   path: '/',
    //   redirect: '/login',
    // },
    {
      path: '/homeIndex1_0',
      name: 'homeIndex1_0',
      component: HomeIndex1_0,
      meta:{
        isTrue:true,
        title:"发现",
      }
    },
    {
      path: '/follow',
      name: 'follow',
      component: Follow,
      meta:{
        isTrue:false,
        title:"关注",
      }
    },
    {
      path: '/findDetail',
      name: 'findDetail',
      component: FindDetail,
      meta:{
        isTrue:false,
        title:"作品详情",
      }
    },
    {
      path: '/homeIndex',
      name: 'homeIndex',
      component: homeIndex,
      meta:{
        isTrue:true,
        title:"资讯",
      }
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      meta:{
        isTrue:true,
        title:"活动",
      }
    },
    {
      path: '/release',
      name: 'release',
      component: Release,
      meta:{
        isTrue:false,
        title:"发布",
      }
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact,
      meta:{
        isTrue:false,
        title:"联系不同",
      }
    },
    {
      path: '/setPassword',
      name: 'setPassword',
      component: SetPassword,
      meta:{
        isTrue:false,
        title:"修改密码",
      }
    },
    {
      path: '/payH5',
      name: 'payH5',
      component: PayH5,
      meta:{
        isTrue:false,
        title:"支付",
      }
    },
    {
      path: '/PictureLiveBroadcast',
      name: 'PictureLiveBroadcast',
      component: PictureLiveBroadcast,
      meta:{
        isTrue:false,
        title:"火图直播平台",
      }
    },
    {
      path: '/loading',
      name: 'loading',
      component: Loading,
      meta:{
        isTrue:false,
        title:"加载页",
      }
    },
    {
      path: '/admission',
      name: 'admission',
      component: Admission,
      meta:{
        isTrue:false,
        title:"活动门票",
      }
    },
    {
      path: '/Photograph',
      name: 'Photograph',
      component: Photograph,
      meta:{
        isTrue:false,
        title:"生成照片",
      }
    },
    {
      path: '/acknowledgementOfOrder',
      name: 'acknowledgementOfOrder',
      component: AcknowledgementOfOrder,
      meta:{
        isTrue:false,
        title:"订单确认",
      }
    },
    {
      path: '/face',
      name: 'face',
      component: Face,
      meta:{
        isTrue:false,
        title:"照片选择",
      }
    },
    {
      path: '/IntelligentMatching',
      name: 'IntelligentMatching',
      component: IntelligentMatching,
      meta:{
        isTrue:false,
        title:"智能匹配",
      }
    },
    { path: '/lookMore',
      component: LookMore,
      name: 'lookMore',
      meta:{
        isTrue:false,
        title:"查看更多",
      }
    },
    { path: '/moreStories',
      component: MoreStories,
      name: 'moreStories',
      meta:{
        isTrue:false,
        title:"更多故事",
      }
    },
    {
      path: '/IntelligentMatchingA',
      name: 'IntelligentMatchingA',
      component: IntelligentMatchingA,
      meta:{
        isTrue:false,
        title:"智能匹配",
      }
    },
    {
      path: '/IntelligentMatchingB',
      name: 'IntelligentMatchingB',
      component: IntelligentMatchingB,
      meta:{
        isTrue:false,
        title:"智能匹配",
      }
    },
    {
      path: '/IntelligentMatchingC',
      name: 'IntelligentMatchingC',
      component: IntelligentMatchingC,
      meta:{
        isTrue:false,
        title:"智能匹配",
      }
    },
    {
      path: '/IntelligentComment',
      name: 'IntelligentComment',
      component: IntelligentComment,
      meta:{
        isTrue:false,
        title:"评论详情",
      }
    },
    {
      path: '/personalMelonPages',
      name: 'personalMelonPages',
      component: PersonalMelonPages,
      meta:{
        isTrue:false,
        title:"个人主页",
      }
    },
    {
      path: '/homeDetail',
      name: 'HomeDetail',
      component: HomeDetail,
      meta:{
        isTrue:false,
        title:"文章详情",
      }
    },
    {
      path: '/enterprisePage',
      name: 'enterprisePage',
      component: EnterprisePage,
      meta:{
        isTrue:false,
        title:"工坊主页",
      }
    },
    {
      path: '/bigShotPage',
      name: 'bigShotPage',
      component: BigShotPage,
      meta:{
        isTrue:false,
        title:"匠心主页",
      }
    },
    {
      path: '/registrationInformation',
      name: 'registrationInformation',
      component: RegistrationInformation,
      meta:{
        isTrue:false,
        title:"报名信息填写",
      }
    },
    {
      path: '/multiActivity',
      name: 'multiActivity',
      component: MultiActivity,
      meta:{
        isTrue:false,
        title:"票务选择",
      }
    },
    {
      path: '/meActivity',
      name: 'meActivity',
      component: MeActivity,
      meta:{
        isTrue:false,
        title:"我的活动",
      }
    },
    {
      path: '/editingInformation',
      name: 'EditingInformation',
      component: EditingInformation,
      meta:{
        isTrue:false,
        title:"编辑资料",
      }
    },
    {
      path: '/message',
      name: 'Message',
      component: Message,
      meta:{
        isTrue:false,
        title:"协议",
      }
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta:{
        isTrue:false,
        title:"活动详情",
      }
    },
    { path: '/homeMap',
      component: HomeMap,
      name: 'map',
      meta:{
        isTrue:false,
        title:"活动地图"
      }
    },
      { path: '/me',
      component: Me,
      name: 'me',
        meta:{
          isTrue:false,
          title:"我的"
        }
    },
    { path: '/personalSettings',
      component: PersonalSettings,
      name: 'personalSettings',
      meta:{
        isTrue:false,
        title:"个人设置"
      }
    },
    { path: '/praiseMe',
      component: PraiseMe,
      name: 'praiseMe',
      meta:{
        isTrue:false,
        title:"赞我的",
      }
    },
    { path: '/collect_my',
      component: CollectMy,
      name: 'collect_my',
      meta:{
        isTrue:false,
        title:"收藏我的"
      }
    },
    { path: '/comment_on_my',
      component: CommentOnMy,
      name: 'comment_on_my',
      meta:{
        isTrue:false,
        title:"评论我的"
      }
    },
    { path: '/userFeedback',
      component: UserFeedback,
      name: 'userFeedback',
      meta:{
        isTrue:false,
        title:"用户反馈",
      }
    },
    { path: '/messageNotification',
      component: MessageNotification,
      name: 'messageNotification',
      meta:{
        isTrue:false,
        title:"消息通知",
      }
    },
    { path: '/myfollow',
      component: Myfollow,
      name: 'myfollow',
      meta:{
        isTrue:false,
        title:"我的关注",
      }
    },
    { path: '/myComment',
      component: MyComment,
      name: 'myComment',
      meta:{
        isTrue:false,
        title:"我的评论",
      }
    },
    { path: '/myCollection',
      component: MyCollection,
      name: 'myCollection',
      meta:{
        isTrue:false,
        title:"我的收藏"
      }
    },
    { path: '/fans',
      component: Fans,
      name: 'fans',
      meta:{
        isTrue:false,
        title:"我的粉丝"
      }
    },
    { path: '/myFabulous',
      component: MyFabulous,
      name: 'myFabulous',
      meta:{
        isTrue:false,
        title:"我的点赞"
      }
    },
    { path: '/login1',
      component: Login1,
      name: 'login1',
      meta:{
        isTrue:false,
        title:"登陆"
      }
    },
    { path: '/login',
      component: Login,
      name: 'login',
      meta:{
        isTrue:false,
        title:"登陆"
      }
    },
  ]
})
