var apiDomian = require("../../js/api.js");
let API = apiDomian.apidmain();
// pages/me/me.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgImge:"../../images/bg.png",
    userInfo: {
      header: "../../images/defultphoto.png",
      name: "登录",
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
     console.log(data)
     if (data){
       wx.request({ //设置的默认东西

         url: API.apiDomain + '/apis/operation/' + API.operationEdition +'/commonUser/findCommonUserById',
         method: "GET",
         data: {
           userId: data.id
         },
         header: {
           'Content-Type': 'application/json',
           'Accept': 'application/json',
           "Authorization": "Bearer " + data.access_token
         },
         success: function (res) {
          
           if (res.data.status == true) {
             console.log(res.data.data,"dbasdkas")
             that.setData({
               bgImge: res.data.data.owner_url ? res.data.data.owner_url : "../../images/defultphoto.png" ,
               userInfo: {
                 header: res.data.data.owner_url ? res.data.data.owner_url : "../../images/defultphoto.png" ,
                 name: res.data.data.name,
               }
             })


           } else {
             that.setData({
               bgImge: "../../images/bg.png",
               userInfo: {
                 header: "http://pgf8indq4.bkt.clouddn.com/defult_photo@3x.png",
                 name: "登录",
               }
             })
             if (res.statusCode == 500) {
               wx.showModal({
                 showCancel: false,
                 title: "网络异常，请重试",

               })
             } else if (res.statusCode == 401) {
               wx.showModal({
                 showCancel: false,
                 title: "网络异常",

               })
             } else {
               wx.showModal({
                 showCancel: false,
                 title: res.data.message,
                 icon: 'success',
                 duration: 2000,

               })
               
             }

           }
         }
       })
       
     }else{
       that.setData({
         bgImge:"../../images/bg.png",
         userInfo: {
           header: "http://pgf8indq4.bkt.clouddn.com/defult_photo@3x.png",
           name: "登录",
         }
       })
     }
   
  
   },
  outBnt(){ //退出
    let that = this;
    let data = wx.getStorageSync('userInfo')//获取本地存储信息
    if(data){
      wx.removeStorageSync('userInfo');
      wx.removeStorageSync('activityInfo');
      wx.removeStorageSync('RegistrationData');
      wx.removeStorageSync('faceUrl');
      wx.removeStorageSync('userInfoImgs');
      that.setData({
        bgImge: "../../images/bg.png",
        userInfo: {
          header: "http://pgf8indq4.bkt.clouddn.com/defult_photo@3x.png",
          name: "登录",
        }
      }),
        wx.showToast({
          title: ' 退出成功！',
          icon: 'success',
          duration: 2000
        })
      wx.switchTab({
        url: '../../pages/index/index'
      })
    }else{
      wx.setStorageSync("userInfoImgs", that.data.userInfo)
      wx.showToast({
        title: ' 请先登录！',
        icon: 'success',
        duration: 2000
      })
    }   
   
  },
  aboutBnt(){ // 关于不同
    
    wx.navigateTo({
      url: '../../pages/message/message?messid=1',
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