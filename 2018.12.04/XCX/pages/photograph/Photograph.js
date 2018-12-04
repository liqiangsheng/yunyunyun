var apiDomian = require("../../js/api.js");
let API = apiDomian.apidmain();

// pages/photograph/Photograph.js
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
  cacelClick(){ // 取消
    wx.navigateBack({
      delta: 1
    })
  },
  PhotographClick(){ // 点击拍照
    var that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#CED63A",
      success: function (res) {
        
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            that.chooseWxImage('camera')
          }
        }
      }
    })


  },
  chooseWxImage: function (type) { //上传图片的方式
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        if (res.tempFilePaths){
          wx.navigateTo({
            url: '../../pages/loading/loading?id=' + res.tempFilePaths
          })
        }else{
          wx.showToast({
            icon:"success",
            title:"照片上传失败"
          })
        }
      }
    })
  }


})