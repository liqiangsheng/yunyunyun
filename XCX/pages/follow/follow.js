// pages/follow/follow.js
var apiDomian = require("../../js/api.js");  //数据请求api
var formatTime = require("../../js/formatTime.js"); // 时间戳转时间
let API = apiDomian.apidmain();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let data = wx.getStorageSync("userInfo"), that = this;
    console.log(data, "111")
    if (data) {
      that.data.url = API.url + "/follow?token=" + data.access_token + "&id=" + data.id + "&userType=" + data.userType;
      that.setData({
        url: that.data.url,
      })
      console.log(that.data.url)
    } else {
      wx.showModal({
        showCancel: false,
        title: "你还未登录，请登录",
      })
      setTimeout(()=>{
        wx.navigateTo({ //去我的个人资料
          url: "../../pages/login/login"
        })
      },1000)

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

  }
})