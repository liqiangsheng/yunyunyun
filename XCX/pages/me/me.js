var apiDomian = require("../../js/api.js");
let API = apiDomian.apidmain();
// pages/me/me.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      header: "http://pgf8indq4.bkt.clouddn.com/defult_photo@3x.png",
      name: "请登录",
    },
    hasUserInfo: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function () {
     let that = this;
     that.userInfoFun();
    
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
    let that = this;
    that.userInfoFun();

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
  
  loginBnt(){//去登录
    var that = this
    let data = wx.getStorageSync('userInfo')//获取本地存储信息
    if(!data){
      wx.navigateTo({ //去我的页面登录
        url: "../../pages/login/login"
      })
    }else{
      wx.showToast({
        title: ' 你已登录！',
        icon: 'success',
        duration: 2000
      })
    }
   

  },
  settingBnt(){ // 去设置页面
    var that = this
    let data = wx.getStorageSync('userInfo')//获取本地存储信息
    if (data){
      wx.navigateTo({
        url: "../../pages/editingInformation/editingInformation"
      })
    }else{
      wx.showToast({
        title: ' 请先登录！',
        icon: 'success',
        duration: 2000
      })
    }
    
  },
   userInfoFun(){ //登录本地拿
     var that = this
     let data = wx.getStorageSync('userInfo')//获取本地存储信息
     if (data){
       that.setData({
         userInfo: data
       })
       
     }else{
       that.setData({
         userInfo: {
           avatar: "../../images/defultphoto.png",
           name: "请登录",
         }
       })
     }
   
  
   },
  outBnt(){ //退出
    let that = this;
    let data = wx.getStorageSync('userInfo')//获取本地存储信息
    if(data){
      wx.removeStorageSync('userInfo');
      wx.removeStorageSync('countryDetail');
      wx.removeStorageSync('dictionaries');
      wx.removeStorageSync('qiniuUrl');
      wx.removeStorageSync('provinceDetail');
      wx.removeStorageSync('cityDetail');
      wx.removeStorageSync('provinceDetailAll');
      wx.removeStorageSync('activityInfo');
      wx.removeStorageSync('RegistrationData');
      wx.removeStorageSync('faceUrl');

      that.setData({
        userInfo: {
          avatar: "../../images/defultphoto.png",
          name: "请登录",
        }
      }),
        wx.showToast({
          title: ' 退出成功！',
          icon: 'success',
          duration: 2000
        })
    }else{
      wx.showToast({
        title: ' 请先登录！',
        icon: 'success',
        duration: 2000
      })
    }   
   
  },
  aboutBnt(){ // 关于不同
    let that = this;
    
    wx.showModal({
      showCancel: false,
      title: "关于「不同」",
      content: "「不同」，是一家致力于推动中国工业设计服务市场创新的技术服务公司。「不同」以“让科技赋能设计，设计驱动产业升级”为使命，致力于打造以设计师品牌为核心的设计资源生态圈，通过建立行业资源的数字化链接，提升设计服务与产业需求的匹配效率，推动设计向产业聚焦，产业与设计融合。同时，我们推动最前沿的设计资讯分享和跨行业深度交流，聚焦海量原生设计第一现场，让大众领略设计之美，与广大设计师一起探索未来生活。感谢无数关注、爱护我们的朋友，「不同」愿与充满活力的您，彼此相伴，共同成长！「不同」，开启设计探索之旅，让生活与众不同。欢迎加入「不同」，和大家一起交流设计，分享快乐吧！",
    })

  },
  meActivityBnt(){ //去我的活动
    var that = this
    let data = wx.getStorageSync('userInfo')//获取本地存储信息
    if (data) {
      wx.navigateTo({ 
        url: '../../pages/meActivity/meActivity',
      })
     
    } else {
      wx.showToast({
        title: ' 请先登录！',
        icon: 'success',
        duration: 2000
      })
    }
  }
})