
var apiDomian = require("js/api.js");
let API = apiDomian.apidmain();
//app.js
App({

  onLaunch: function () {
    
    
    let that = this;

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
 
    
  },
  globalData: {
    userInfo: null
  },

 

})
