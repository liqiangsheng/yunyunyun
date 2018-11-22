一、 公共方法
    1.baseHtttp 文件下
    1)predictDomain  预发布域名，切换环境时不需要修改
    2)pathDomain     当前环境下的域名，如果是预发布，就改为测试环境，跳测试环境支付
    3)Appid          前端通过appid向服务器发请求，带上appid获取用户的code值，利用code 发请求获取openid

    --------详细目录  src/js/getOpenIdToken.js

    2. src/js/commonJs.js  公共方法封装 ，城市定位，分类赛选
    3. src/js/cookie.js    存放cookie 和获取存储openid 的方法封装
    4. src/js/document_title.js 根据路由动态切换，设置浏览器的title
    5. src/js/session.js    存放本地存储的公共方法


二 支付
    1. order/affirmorder.vue 订单支付页面
    2. order/affirm_order.vue 其他渠道来源支付订单页面
    3. order/serve_date.vue   订单服务时间字段
    4. src/savertype/         订单详情页面
    5. src/savertype/isStatus.js 订单状态过滤，判断订单状态显示对应的按钮
        ---具体状态根据产品字段表状态
    6.src/js/payment.js       支付方法集合封装，
        checkIsFromMiniProgram    该函数是跳转小程序的api
        isSecondPayment           判断订单是否为一次付款还是二次付款
                                    0   代表的是一口价 一口价是服务费叠加
                                    1   代表的是二口价 只取上门费，取最大值 不可添加数量
    7、 如果是预发布环境，就跳转到 中转
            src/components/wechatDefray/ 该组件，通过预发布环境openid 利用测试环境进行支付
            然后跳转测试环境的订单列表
三、地址

    1、引用腾讯地图iframe 定位附近位置 ，获取用户的经纬度，
       利用高德接口获取用户的城市id 街道、区域id;
        ----详细见src/address/add_ress.vue 文件--

四、优惠券页面-好友分享
  1、src/components/coupon/coupon.vue 优惠券领取页面
  2、src/components/coupon/successCoupon.vue 优惠券领取成功页面
     src/components/coupon/components  存放优惠券登陆，和领取成功后的弹框
  3、积分分享
      src/components/userDraw    积分分享点击立即分享给好友调取微信的分享api
                                  components/share/js/wxShare 里面的wxConfig函数
                                  获取分享权限，设置需要分享的链接个标题，icon;
       src/components/adataLaist  分享页面的列表组件，统计分享多少人；

文件对应的目录  见router/index.js 文件里面详细备注
