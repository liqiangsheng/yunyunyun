// pages/login1/login1.js
var Base64 = require("../../js/common.js");
var apiDomian = require("../../js/api.js");
let BASE = Base64.Base64();
let API = apiDomian.apidmain();
var app = getApp();
var formatTime = require("../../js/formatTime.js"); // 时间戳转时间
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: "获取验证码",
    isShow: true,
    codeNum: 60,
    telValue: "",
    psdValue: "",
    infoData:{} //初始数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    console.log(options.id,"shakdaskk")
    wx.request({
      url: API.apiDomain + '/apis/activity/' + API.activityEdition +'/activityInfo/findOne?id=' + options.id,
      method: "GET",
      success(res) {
        if (res.data.status == true) {
          let datas = res.data.data;
    
           datas.time = formatTime.formatTime(datas.startTime) + "-" + formatTime.formatTime(datas.endTime)
        
          that.setData({
            infoData: datas,
          })
        }else{
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
    setTimeout(()=>{
      if (!that.data.telValue) {
        wx.showToast({
          title: '请填写手机号',
          icon: 'success',
          duration: 2000
        })
        return;
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
    },100)
   
  },
  loginBnt() {
  
    setTimeout(()=>{
      var that = this;
      if(!that.data.telValue) {
        wx.showToast({
          title: '请填写手机号',
          icon: 'success',
          duration: 2000
        })
        return;
      } else if(!that.data.psdValue) {
        wx.showToast({
          title: '请填写验证码',
          icon: 'success',
          duration: 2000
        })
        return;
      } else{
        //请求数据
        wx.showToast({
          title: '加载中',
          icon: 'loading',
          duration: 20000
        })
        wx.request({
          url: API.apiDomain + '/apis/operation/' + API.operationEdition +'/sysUserOperation/bindMobile',
          data: { "mobile": that.data.telValue, "verifyCode": that.data.psdValue, "mobileType": "XCX" },
          header: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          method: "POST",
          success(res) {
            if (res.data.status == true) {
              wx.hideToast();
              wx.request({ // 登录成功去请求个人数据保存
                url: API.apiDomain + '/apis/operation/' + API.operationEdition +'/commonUser/findCommonUserById',
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
                    wx.setStorageSync("userInfoImgs", obj)
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
             
              wx.navigateBack({
                delta: 1
              })
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
  make_base_auth(user, password) { //base64账号密码的加密
    var tok = user + ':' + password;
    var hash = BASE.encode(tok);
    return "Basic " + hash;
  } ,
  gocegister() { //去注册
    wx.navigateTo({
      url: '../../pages/register/register',
    })
  },
  CODE_FUC(TEL) {
    let that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 20000
    })
    wx.request({
      url: API.apiDomain + "/apis/operation/" + API.operationEdition +"/sysUserOperation/generateMobileVerifyCode",
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
          wx.hideToast();
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
      })
    })
  }, 
})