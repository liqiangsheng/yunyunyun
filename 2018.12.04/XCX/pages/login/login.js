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
    hiddenModal:true,//注册
    code:"获取验证码",
    telCode:"",
    isShow:true,
    codeNum:60,
    telValue:"", // 登录手机
    psdValue: "",// 登录验证码
    titleText:"与设计相处，使彼此感动",
    hidden:true,
    nocancel: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
   
    let data = wx.getStorage({ key: 'userInfo'})
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
  ObtainCode(){//获取验证码
      var that = this;
        setTimeout(() => {
        if (!that.data.telValue) {
          wx.showToast({
            title: '请输入手机号',
            icon: 'success',
            duration: 2000
          })
          return
        }
      
   
      //请求数据
    
        that.setData({
          isShow: false
        });
        var codeNum = this.data.codeNum;
        that.CODE_FUC(that.data.telValue);  
          var clearTime = setInterval(function(){
          codeNum--;
          that.setData({
            codeNum: codeNum
          });
            if (codeNum <= 0) {
            clearInterval(clearTime)
            that.setData({
              code: '重新发送',
              codeNum: 60,
              isShow:true,
            })
          }
        },1000)

    }, 100)
  },
  loginBnt(){ //点击登录
    var that = this;
    setTimeout(()=>{

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

        wx.request({// 请求登录数据
          url: API.apiDomain + '/apis/operation/sysUserOperation/bindMobile',
          data: { "mobile": that.data.telValue, "verifyCode": that.data.psdValue, "mobileType": "XCX" },
          method: "POST",
          header: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          success(res) {
            if (res.data.status == true) {
              wx.request({ //登录成功去请求个人数据保存
                url: API.apiDomain + '/apis/operation/commonUser/findCommonUserById',
                method: "GET",
                data: {
                  userId: res.data.data.id
                },
                header: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  "Authorization": "Bearer " + res.data.data.access_token
                },
                success(res) {
                  if (res.data.status == true) {
                    let obj = {};
                    obj.name = res.data.data.name;
                    obj.header = res.data.data.owner_url ? res.data.data.owner_url : "http://pgf8indq4.bkt.clouddn.com/defult_photo@3x.png";
                    wx.setStorageSync("userInfoImgs", obj)  //保存我的里面头像昵称到本地
                  } else {
                    wx.removeStorageSync("userInfoImgs")
                    if (res.statusCode == 500) {
                      wx.showModal({
                        showCancel: false,
                        title: "网络异常，请重试",

                      })
                    } else if (res.statusCode == 401) {
                      wx.showModal({
                        showCancel: false,
                        title: "网络异常",

                      })
                    } else {
                      wx.showModal({
                        showCancel: false,
                        title: res.data.message,
                        icon: 'success',
                        duration: 2000,

                      })
                    }
                  }
                }
              })

              wx.setStorageSync("userInfo", res.data.data) 
              setTimeout(() => {  //登录成功保存到本地，还回上一级
                wx.navigateBack({
                  delta: 1
                })
              }, 1000)

            } else {
              if (res.statusCode == 500) {
                wx.showModal({
                  showCancel: false,
                  title: "网络异常，请重试",

                })
              } else if (res.statusCode == 401) {
                wx.showModal({
                  showCancel: false,
                  title: "网络异常",

                })
              } else {
                wx.showModal({
                  showCancel: false,
                  title: res.data.message,
                  icon: 'success',
                  duration: 2000,

                })
              }

            }

          },
          

        })
      }


    },100)
    
  },
  telPhone(e){ //登录的手机号
    var that = this;
    console.log(e.detail.value)
    var phone = e.detail.value;
    that.setData({
      telValue: e.detail.value
    })
    var myreg = /^[1]\d{10}$/;
    if (!myreg.test(phone)){

      wx.showToast({
        title: '手机号有误！',
        icon: 'success',
        duration: 2000
      })
      return;

    }
    
  },
  codePsd(e){ //登录的验证码
    var that = this;
    that.setData({
      psdValue: e.detail.value
    })
  },
  loginDetail(){//查看协议
   let that = this;
   
    wx.navigateTo({
      url: '../../pages/message/message?messid=3',
    })

  },
  loginDetail1() {//查看协议
    let that = this;
    wx.navigateTo({
      url: '../../pages/message/message?messid=2',
    })
  

  },
  
  make_base_auth(user, password) {  //base的加密
    var tok = user + ':' + password;
    var hash = BASE.encode(tok);
    return "Basic " + hash;
  } ,
  CODE_FUC(TEL){
    wx.request({
      url: API.apiDomain + "/apis/operation/sysUserOperation/generateMobileVerifyCode",
      method: "GET",
      data: {
        mobile: TEL,
        mobileType: "XCX"
      },
      header: {
        "Accept": "application/json", // 默认值
      },
      success: (res => {
        if (res.data.status == true) {
       
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
  }, 
  gocegister (){ //去注册
   wx.navigateTo({
     url: '../../pages/register/register',
   })
  }
})