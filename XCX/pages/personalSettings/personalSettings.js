// pages/personalSettings/personalSettings.js
var apiDomian = require("../../js/api.js");
let API = apiDomian.apidmain();
// pages/me/me.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  myfollowBnt(e) {
  
    let v = e.currentTarget.dataset.item;
    let data = wx.getStorageSync('userInfo')//获取本地存储信息
    if (data) {
      if (v.name == "关注") { 
        wx.navigateTo({ //去我的页面关注
          url: "../../pages/myfollow/myfollow"
        })

      } else if (v.name == "粉丝") {
        wx.navigateTo({ //去我的页面粉丝
          url: "../../pages/fans/fans"
        })
      } else if (v.name == "点赞") {
        wx.navigateTo({ //去我的页面点赞
          url: "../../pages/myFabulous/myFabulous"
        })

      } else if (v.name == "收藏") {
        wx.navigateTo({ //去我的页面收藏
          url: "../../pages/myCollection/myCollection"
        })

      } else if (v.name == "评论") {
        wx.navigateTo({ //去我的页面评论
          url: "../../pages/myComment/myComment"
        })

      }

    } else {
      wx.showModal({
        showCancel: false,
        title: "您未登录，请登录",
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function () {
    let that = this;
    

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
  comment_my(){ //评论我的
    var that = this
    let data = wx.getStorageSync('userInfo')//获取本地存储信息
    if (data) {
      wx.navigateTo({
        url: "../../pages/comment_on_my/comment_on_my"
      })
    } else {
      wx.showToast({
        title: ' 请先登录！',
        icon: 'success',
        duration: 2000
      })
    }
  },
  praise_my(){ //点赞我的
    var that = this
    let data = wx.getStorageSync('userInfo')//获取本地存储信息
    if (data) {
      wx.navigateTo({
        url: "../../pages/praise_my/praise_my"
      })
    } else {
      wx.showToast({
        title: ' 请先登录！',
        icon: 'success',
        duration: 2000
      })
    }
  },
  collect_my() { //收藏我的
    var that = this
    let data = wx.getStorageSync('userInfo')//获取本地存储信息
    if (data) {
      wx.navigateTo({
        url: "../../pages/collect_my/collect_my"
      })
    } else {
      wx.showToast({
        title: ' 请先登录！',
        icon: 'success',
        duration: 2000
      })
    }
  },
  settingBnt() { // 去设置页面
    var that = this
    let data = wx.getStorageSync('userInfo')//获取本地存储信息
    if (data) {
      wx.navigateTo({
        url: "../../pages/editingInformation/editingInformation"
      })
    } else {
      wx.showToast({
        title: ' 请先登录！',
        icon: 'success',
        duration: 2000
      })
    }

  },
  commentBnt() { // 消息通知
    var that = this
    let data = wx.getStorageSync('userInfo')//获取本地存储信息
    if (data) {
      wx.navigateTo({
        url: "../../pages/messageNotification/messageNotification"
      })
    } else {
      wx.showToast({
        title: ' 请先登录！',
        icon: 'success',
        duration: 2000
      })
    }

  },
  userBnt() { // 用户反馈
    var that = this
    let data = wx.getStorageSync('userInfo')//获取本地存储信息
    if (data) {
      wx.navigateTo({
        url: "../../pages/userFeedback/userFeedback"
      })
    } else {
      wx.showToast({
        title: ' 请先登录！',
        icon: 'success',
        duration: 2000
      })
    }

  },
  outBnt() { //退出
    let that = this;
    let data = wx.getStorageSync('userInfo')//获取本地存储信息
    if (data) {
      wx.removeStorageSync('userInfo');
      wx.removeStorageSync('activityInfo');
      wx.removeStorageSync('RegistrationData');
      wx.removeStorageSync('faceUrl');
      wx.removeStorageSync('userInfoImgs');
        wx.showToast({
          title: ' 退出成功！',
          icon: 'success',
          duration: 2000
        })
        setTimeout(()=>{
          wx.switchTab({
            url: '../../pages/index/index'
          })
        },1000)
     
    } else {
      wx.setStorageSync("userInfoImgs", that.data.userInfo)
      wx.showToast({
        title: ' 请先登录！',
        icon: 'success',
        duration: 2000
      })
    }

  },
  aboutBnt() { // 关于不同

    wx.navigateTo({
      url: '../../pages/message/message?messid=1',
    })

  },
  meActivityBnt() { //去我的活动
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