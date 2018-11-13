// pages/Intelligence/Intelligence.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:"https://dcloud.butongtech.com/#/IntelligentMatching?token=",
    url1: "http://172.16.0.55:8083/#/IntelligentMatching?token=",
  },
  Test(e){
    11111111111
    console.log(e.detail.data,"dsbakdkaskdka")
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
       let data = wx.getStorageSync("userInfo"),that = this;
       console.log(data,"111")
       if(data){
         that.data.url = this.data.url + data.access_token + "&id=" + data.id;
         that.data.url1 = this.data.url1 + data.access_token + "&id=" + data.id;
         that.setData({
           url: that.data.url,
           url1: that.data.url1,
         })
         console.log(that.data.url,"dshakdk")
         console.log(that.data.url1, "dshakdk")
       }else{
         wx.showModal({
           showCancel: false,
           title: "登录异常，请重试",

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