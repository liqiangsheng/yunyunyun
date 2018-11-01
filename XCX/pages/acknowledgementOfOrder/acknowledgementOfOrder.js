var apiDomian = require("../../js/api.js");  //数据请求api
var formatTime = require("../../js/formatTime.js"); // 时间戳转时间
let API = apiDomian.apidmain();
let Logindata = wx.getStorageSync("userInfo");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow:false,
    isShow1:true,
    ActivityInfo:"", //活动信息
    buyData:"", //门票数据
    registrationData: "", //报名数据
    tel:"", //报名信息
    Total:0, //实付
    orginTotal: 0, //原价
    erectSubtraction: 0, //立减
    nextValue:"付款",
    combination:[], //组合票
    single: [], //单票
    backstageData:{} , //后台数据
    userID:"", //用户id
  },

  paymentClick() { //支付
    let data = wx.getStorageSync("userInfo");
    let that= this;
    let obj = {};
    obj.customerActivitySignupNote={};
    let goodsList = [], goodsListObj={};//单活单
    let groupList = [], groupListObj = {};//多活单
    that.data.registrationData.map((item,index)=>{ //数组组成对象
      obj.customerActivitySignupNote[item.code] = item.value; 
    
    })
  
    for (let i = 0; i < that.data.buyData.length; i++){
      if (that.data.buyData[i].danId) { //单票
        goodsListObj.id = that.data.buyData[i].id;
        that.data.buyData[i].sort = that.data.buyData[i].index;
        that.data.buyData[i].count = that.data.buyData[i].num;
        goodsList.push(that.data.buyData[i])
      }else{//组合票
        groupListObj.id = that.data.buyData[i].id;
        that.data.buyData[i].sort =that.data.buyData[i].index;
        that.data.buyData[i].count = that.data.buyData[i].num;
        groupList.push(that.data.buyData[i])
      }
    }
    obj.settingVersion = that.data.registrationData[0].version;
    obj.activityId = that.data.ActivityInfo.id;
    let faceURL = wx.getStorageSync("faceUrl");
    if (!!faceURL){
      obj.faceUrl = faceURL;
    }else{
      obj.faceUrl = "";
    }
   
    obj.activityOrder={},
    obj.activityOrder.goodsList = goodsList;
    obj.activityOrder.groupList = groupList;
    obj.userId = that.data.userID;
    that.setData({
      backstageData: obj
    })
   wx.request({
     url: API.apiDomain + '/apis/activity/customerActivitySignupNote/insertSignupNoteAndOrder',
     method: "POST",
     header: {
       Authorization: "Bearer " + data.access_token
     },
     data: obj,
     success(res){
       if(res.data.status == true){
         console.log(res,"支付")
         if (that.data.Total<=0){ //价格小于0去生成门票
            wx.setStorageSync("objList", res.data.data)
            wx.navigateTo({
              url: '../../pages/admission/admission?orderid=' + res.data.data.id,
            })
         } else {//去支付页面
           wx.showModal({
             showCancel: false,
             title: "请选择免费活动",
             icon: 'success',
           })
          //  wx.navigateTo({
          //    url: '../../pages/payment/payment?id=' + res.data.data.id,
          //  })  
         }
       }else{
         wx.showModal({
           showCancel: false,
           title: res.data.message,
           icon: 'success',
         })
         return;
       }
     }
   })
   
  },
   
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    if (options.id){
      that.setData({
        payId: options.id
      })
    }
    let data = wx.getStorageSync("userInfo");
    let that = this;
   
  
    if (data){ //登录
      that.setData({
        userID: data.user_id,

      })
      let ActivityInfos = wx.getStorageSync("activityInfo");
      let buyDatas = wx.getStorageSync("buyData");
      let registrationDatas = wx.getStorageSync("RegistrationData");
      if (ActivityInfos){
        ActivityInfos.startTime = formatTime.formatTime3(ActivityInfos.startTime)
        that.setData({
          ActivityInfo: ActivityInfos,
        
        })

      }else{
        that.loginError();
      }
      if (buyDatas) {
        let a=0,b=0,c=0;//价格计算赋值
        buyDatas.map((item,index)=>{
          a += item.payPrice; //合计
          b += item.originalPrice;//总额
          c = b-a;//立减
        })
        if(a <=0){
          that.setData({
            nextValue: "下一步",
          
          })
        }else{
          that.setData({
            nextValue: "支付",

          })
        }
        that.setData({
          buyData: buyDatas,
          Total: a,
          orginTotal: b,
          erectSubtraction: c,
        })

      } else {
        that.loginError();
      }
      if (registrationDatas) {
       registrationDatas.map((item,index)=>{
         if (item.code =="mobile1No"){
            that.setData({
              tel: item.value,

            })
          }
        })
        that.setData({
          registrationData: registrationDatas,

        })

      } else {
        that.loginError();
      }
    
      
     }else{//未登录
      that.loginError();
     }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  explain(e){ // 退款说明，付款说明
    let that = this;
    if (e.currentTarget.dataset.payment === "payment"){
      that.setData({
        isShow: !that.data.isShow
      })

    } else if (e.currentTarget.dataset.payment === "refund"){
      that.setData({
        isShow1: !that.data.isShow1
      })
     }

  },
 
  loginError(){
    wx.showToast({
      title: ' 登录异常！',
      icon: 'success',
      duration: 2000
    })
    setTimeout(() => {
      wx.navigateTo({ //去我的页面登录
        url: "../../pages/login/login"
      })
    }, 1000)
  }
})