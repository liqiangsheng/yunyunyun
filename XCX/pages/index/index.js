// pages/index/index.js
var apiDomian = require("../../js/api.js");  //数据请求api
var formatTime = require("../../js/formatTime.js"); // 时间戳转时间
let API = apiDomian.apidmain();
var app = getApp();    
// app.globalData.followUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: "https://dcloud.butongtech.com/#",
    url1: '',
    state: 1,
  },
  changeData: function () {
    let that = this;

    let data = wx.getStorageSync("userInfo");
      that.data.url1 = API.url + "/homeIndex1_0?token=" + data.access_token + "&id=" + data.id + "&userType=" + data.userType;
      that.setData({
        url1: that.data.url1,
        state: 2
      })
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    console.log(options,"options")
    let data = wx.getStorageSync("userInfo");
    if(data){
      that.data.url = API.url + "/homeIndex1_0?token=" + data.access_token + "&id=" + data.id + "&userType=" + data.userType;
      that.setData({
        url: that.data.url,
        state:1
      })
      console.log(that.data.url)
    }else{
      that.data.url = API.url + "/homeIndex1_0"
      that.setData({
        url: that.data.url,
        state: 1
      })
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
    this.onLoad();
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