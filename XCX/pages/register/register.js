// pages/login/login.js
var Base64 = require("../../js/common.js");
var apiDomian = require("../../js/api.js");
let BASE = Base64.Base64();
let API = apiDomian.apidmain();

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: "获取验证码",
    telCode: "",
    isShow: true,
    codeNum: 60,
    telValue: "", // 登录手机
    psdValue: "",// 登录验证码
    titleText: "注册你的设计，精彩你的生活",
    hidden: true,
    nocancel: false,
    codeNumber:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    let data = wx.getStorage({ key: 'userInfo' })
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
  ObtainCode() {//获取验证码
    var that = this;
    if (!that.data.telValue) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'success',
        duration: 2000
      })
      return
    }

    that.setData({
      isShow: false
    });
    var codeNum = this.data.codeNum;
    //请求数据

    that.CODE_FUC(that.data.telValue);

    var clearTime = setInterval(function () {
      codeNum--;
      that.setData({
        codeNum: codeNum
      });
      if (codeNum <= 0) {
        clearInterval(clearTime)
        that.setData({
          code: '重新发送',
          codeNum: 60,
          isShow: true,
        })
      }


    }, 1000)
  },
  loginBnt() { //点击登录
    var that = this;
    if (!that.data.telValue) {
      wx.showToast({
        title: '请填写手机号',
        icon: 'success',
        duration: 2000
      })
      return;
    } else if (!that.data.psdValue) {
      wx.showToast({
        title: '请填写验证码',
        icon: 'success',
        duration: 2000
      })
      return;
    } else {
      //请求数据
      wx.request({
        url: API.apiDomain + '/apis/operation/' + API.operationEdition +'/sysUserOperation/bindMobile', //第三方登录绑定&注册用户
        method:"POST",
        data:{
          name: that.data.telValue, mobile: that.data.telValue, verifyCode: that.data.psdValue, mobileType: 'XCX'
        },
       success:(res=>{
         console.log(res.data)
         if (res.data.status== true){
              wx.showToast({
                  title: '注册成功请登录',
                  icon: 'success',
                  duration: 2000
                })

           setTimeout(() => {
             wx.navigateBack({
               delta: 1
             })
           }, 500)
         }
       
       })
      })
     
    }

    //登录成功保存到本地，还回上一级



  },
  telPhone(e) { //登录的手机号
    var that = this;
    var phone = e.detail.value;

    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (myreg.test(phone)) {

      that.setData({
        telValue: e.detail.value
      })

    } else {
      wx.showToast({
        title: '手机号有误！',
        icon: 'success',
        duration: 2000
      })
      return;

    }

  },
  codePsd(e) { //登录的验证码
    var that = this;
    that.setData({
      psdValue: e.detail.value
    })
  },

 
  CODE_FUC(TEL) {
    let that =this;
    wx.request({
      url: API.apiDomain + '/apis/operation/' + API.operationEdition +'/sysUserOperation/generateMobileVerifyCode',
      method: "GET",
      data: {
        mobile: TEL,
        mobileType: "XCX"
      },
      header: {
        "Accept": "application/json", // 默认值
      },
      success: (res => {
        console.log(res.data)
        wx.showToast({
          title: '短信获取成功',
          icon: 'success',
          duration: 2000
        })
        that.setData({
          codeNumber:res.data
        })
      })
    })
  },

})