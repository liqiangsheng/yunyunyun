// pages/face/face.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  experienceClick(){ // 马上体验
    wx.navigateTo({ //去拍照页面
      url: "../../pages/photograph/Photograph"
    })
  },
  erweimaClick(){ // 二维码
    //  有收费去收费
    wx.setStorageSync("faceUrl","") //面部识别参数
    wx.navigateTo({ //去拍照页面
      url: "../../pages/acknowledgementOfOrder/acknowledgementOfOrder"
    })

     //没有去生成二维码页面
  }
})