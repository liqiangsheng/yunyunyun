var apiDomian = require("../../js/api.js");
let API = apiDomian.apidmain();

// pages/loading/loading.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qiniuToken: "",
    qiniuUrl:"https://pub.qinius.butongtech.com", //七牛的地址
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      //拿到拍的照片上传7牛云，成功跳其他页面
    let that = this;
    let arr = [options.id]
    if (options.id){
      let data = wx.getStorageSync("userInfo");
      wx.request({
        url: API.apiDomain + '/apis/system/sysAttachment/upPublicToken',
        header: {
          "Authorization": "bearer " + data.access_token
        },
        success: (res => {
          // that.setData({
          //   qiniuToken: res.data.data.upToken
          // })
          if(res.data.status == true){
            that.uploadQiniu(res.data.data.upToken, arr);
          }else{
            wx.showModal({
              showCancel: false,
              title: res.data.message,
              icon: 'success',
              duration: 2000
            })
          }
          
        })
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

  },
  uploadQiniu(a, b) {
    let token = a;
    let tempFilePaths = b;
    var that = this;
    wx.uploadFile({
      url: 'https://upload-z2.qiniup.com',
      name: 'file',
      filePath: tempFilePaths[0],
      header: {
        "Content-Type": "multipart/form-data"
      },
      formData: {
        token: token,
      },
      success: function (res) {
        let data = JSON.parse(res.data)
        // to do ...
        wx.request({  //获取7牛的保存地址
          url: API.apiDomain + '/apis/system/init/loadGlobalVariable',
          method: "GET",
          success(res1) {
            if(res1.data.status == true){
               let dataUrl = res1.data.data;
              dataUrl.map((item,index)=>{ //赋值七牛的url
                if (item.code == "qiniu_pub_https_url"){
                 that.setData({
                   qiniuUrl:item.name
                 })
                  
                }
              })
             
            }else{
              wx.setStorageSync("faceUrl", "") //面部识别参数
              wx.showModal({
                showCancel: false,
                title: res.data.message,
                icon: 'success',
                duration: 2000
              })
            }
          }
        })
        let qiniu1url = that.data.qiniuUrl + "/" + data.key; //拼接图片地址保存
        wx.setStorageSync("faceUrl", qiniu1url) //面部识别参数
        wx.navigateTo({
          url: '../../pages/acknowledgementOfOrder/acknowledgementOfOrder'
        })
      },
      fail: function (res) {
        wx.showModal({
          showCancel: false,
          title: "上传失败",
          icon: 'success',
          duration: 2000
        })
      }
    })
  }
})