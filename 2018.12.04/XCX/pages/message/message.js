// pages/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     messageName:"关于不同",
    messageShow: false,
    messageShow1: false,
    messageShow2: false,
  },
  messageBoxOKClick(){ //点击回到上一级
   setTimeout(()=>{
     wx.navigateBack({
       delta: 1
     })
   },500)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.messid =="1" ){
      this.setData({
        messageName: "关于不同",
        messageShow: true,
      })
    } else if (options.messid == "2" ){
      this.setData({
        messageName: "用户协议",
        messageShow1: true,
      })
    } else if (options.messid == "3") {
      this.setData({
        messageName: "隐私政策",
        messageShow2: true,
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