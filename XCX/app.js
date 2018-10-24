
var apiDomian = require("js/api.js");
let API = apiDomian.apidmain();
//app.js
App({

  onLaunch: function () {
    
    
    let that = this;
    that.dictionaries(); //
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              that.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                that.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  
    
  },
  globalData: {
    userInfo: null
  },

  dictionaries(){//字典缓存本地
        wx.request({
          url: API.apiDomain+'/apis/system/init/loadDicTree',
          success(res) {
            if (res.data.status == true) {
                wx.setStorageSync("dictionaries", res.data)
            }else{
              wx.showModal({
                showCancel: false,
                title: res.data.message,
                icon: 'success',
                duration: 2000
              })
            }
          },
        })
    wx.request({// 国
      url: API.apiDomain + '/apis/system/sysRegion/singlelevel?level=country',
      success(res) {
        if (res.data.status == true) {
        wx.setStorageSync("countryDetail", res.data)
        } else {
          wx.showModal({
            showCancel: false,
            title: res.data.message,
            icon: 'success',
          })
        }
      },
    })
    wx.request({// 省
      url: API.apiDomain + '/apis/system/sysRegion/singlelevel?level=province',
      success(res) {
        if (res.data.status == true) {
        wx.setStorageSync("provinceDetail", res.data)
      }else{
        wx.showModal({
          showCancel: false,
          title: res.data.message,
          icon: 'success',
        })
      }
      },
    })
    wx.request({// 城市
      url: API.apiDomain + '/apis/system/sysRegion/singlelevel?level=city',
      success(res) {
        if (res.data.status == true) {
           wx.setStorageSync("cityDetail", res.data)
          }else{
            wx.showModal({
              showCancel: false,
              title: res.data.message,
              icon: 'success',
              duration: 2000
            })
      }
      },
    })
    wx.request({//国省市
      url: API.apiDomain + '/apis/system/sysRegion/threelevel',
      success(res) {
        if (res.data.status == true) {
          wx.setStorageSync("provinceDetailAll", res.data.data)
        } else {
          wx.showModal({
            showCancel: false,
            title: res.data.message,
            icon: 'success',
            duration: 2000
          })
        }
      },
      
    })
    wx.request({// 上传到七牛的url
      url: API.apiDomain + '/apis/system/init/loadGlobalVariable',
      success(res) {
        if (res.data.status == true) {
          wx.setStorageSync("qiniuUrl", res.data.data)
        } else {
          wx.showModal({
            showCancel: false,
            title: res.data.message,
            icon: 'success',
            duration: 2000
          })
        }
      },
    })
  }
 
})