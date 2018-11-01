var apiDomian = require("../../js/api.js");
let API = apiDomian.apidmain();
// pages/payment/payment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    payId: "", //支付时候的ID
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let data = wx.getStorageSync("userInfo");
    that.setData({
      payId: options.id
    })
    wx.showLoading({
      title: '支付数据请求中...',
    })
    wx.login({  //获取微信的code去后台接口那openId
      success(res) {
        let code = res.code;
        if (!!code) {  //获取到code的值
          wx.request({
            url: API.apiDomain + '/apis/activity/payWithWeixin/xcx', // 后台接口
            data: {
              "appid": "wxec488e381b105038",
              "id": that.data.payId,
              "jsCode": code,
            },
            header: {
              Authorization: "Bearer " + data.access_token
            },
            method: "POST",
            success(payRes) {
              console.log(payRes, "askdaskdkask")
              if (payRes.data.status == true) {//数据请求成功
                wx.hideLoading();
                wx.requestPayment({ // 发起支付
                  timeStamp: payRes.data.timeStamp,   //生成签名的时间戳
                  nonceStr: payRes.data.nonceStr,  //生成签名的随机串，长度为32个字符以下。
                  package: payRes.data.package, //统一下单接口返回的 prepay_id 参数值
                  signType: 'MD5', //签名类型，默认为MD5，支持HMAC-SHA256和MD5。注意此处需与统一下单的签名类型一致
                  paySign: payRes.data.paySign,  //签名,具体签名方案参见微信公众号支付帮助文档;
                  success: function (res) {
                    // success
                    console.log(res);
                   
                  },
                 
                })

              } else {
                // wx.showModal({
                //   showCancel: false,
                //   title: res.data.message,
                //   icon: 'success',
                // })
                // wx.hideLoading();
              }

            },
            fail(payRes) {
              wx.hideLoading();
              wx.showModal({
                showCancel: false,
                title: "支付接口请求失败",
                icon: 'success',
              })
             
              return;
            }
          })

        } else {
          wx.showModal({
            showCancel: false,
            title: "获取微信登录信息错误",
            icon: 'success',
          })
        }
    
        return;
        console.log(res, "dasjkdkjasjkdjaskdkjask")
      }
    })
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