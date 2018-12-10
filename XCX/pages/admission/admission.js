let wxqrCode = require("../../js/wxqrcode.js")//生成二维码的插件
var apiDomian = require("../../js/api.js");
var QR = require("../../js/qrcode.js"); //二维码生成
var formatTime = require("../../js/formatTime.js"); // 时间戳转时间
let API = apiDomian.apidmain();
// pages/admission/admission.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timestart:0, //判断是不是长按
    timestend: 0,//判断是不是长按
    Base64Img: "", //图片路径
    dataObj:{}, //二维码数据
    canvasHidden: false, //画布显示小时
   
  },
  goTop(){ //回到首页
    wx.switchTab({
      url: '../../pages/home/home'
    })
  },
  voiceClick(){ //跳到语音介绍webview
    wx.navigateTo({
      url: '../../pages/voice/voice',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options,"sajdaskldla")
    let that = this;
    let Logindata = wx.getStorageSync("userInfo");
    if (options.orderid && options.orderid!=""){  //是不是我的活动来的
      wx.request({
        method: 'GET',
        url: API.apiDomain + '/apis/activity/' + API.activityEdition +'/customerActivitySignupNote/findSimpleOneToClient',
        header: {
          'Content-Type': 'application/json',
          "Authorization": "bearer " + Logindata.access_token
        },
        data:{
          "id": options.orderid
        },
        success(res){
          if(res.data.status == true){
            // var imgData = wxqrCode.createQrCodeImg(res.data.data.signCode, { size: 300 });//生成二维码
            var size = that.setCanvasSize(); //动态设置画布大小 
            that.createQrCode(res.data.data.signCode, "mycanvas", size.w, size.h);
             
            if(!!res.data.data.conList){
              res.data.data.conList.map((item, index) => {
                item.dateTime = item.conTime ? formatTime.formatTime5(item.conTime) : "待定";
                item.conLocation = item.conLocation ? item.conLocation : "待定";
                item.conMode = item.conMode ? item.conMode : "待定";
              })
            }
            wx.request({
              url: 'https://dcloud.butongtech.com/codeBanner',
              method: 'GET',
              success(res1){
                console.log(res1,"skadkaskdksj")
                res1.data.forEach((item,index)=>{
                  if (item.id == res.data.data.activityId){
                    that.data.dataObj.bannerUrl = item.bannerUrl;
                    that.setData({
                      dataObj: that.data.dataObj
                    })
                  }
                })
              }
            })
            that.setData({
              dataObj: res.data.data
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
    }else{//下单流程来的
      wx.showToast({
          title: ' 数据异常',
          icon: 'success',
          duration: 2000
        })
       return;

      // let data = wx.getStorageSync("objList");

      // if (Logindata) { //登录
        // var imgData = wxqrCode.createQrCodeImg(data.signCode, { size: 300 });//生成二维码
      // var size = that.setCanvasSize(); //动态设置画布大小 
      // that.createQrCode(data.signCode, "mycanvas", size.w, size.h);
        // console.log(imgData, "fsjklfjks")
        // that.setData({
          // Base64Img: imgData,
        //   dataObj: data
        // })
      // } else { //登陆出错
      //   wx.showToast({
      //     title: ' 登录异常！',
      //     icon: 'success',
      //     duration: 2000
      //   })
      //   setTimeout(() => {
      //     wx.navigateTo({ //去我的页面登录
      //       url: "../../pages/login/login"
      //     })
      //   }, 1000)
      // }

    }
   
  
  },
  //适配不同屏幕大小的canvas
  setCanvasSize: function () {
    var size = {};
    try {
      var res = wx.getSystemInfoSync();
      var scale = 750 / 686; //不同屏幕下canvas的适配比例；设计稿是750宽  686是因为样式wxss文件中设置的大小
      var width = res.windowWidth / scale;
      var height = width; //canvas画布为正方形
      size.w = width;
      size.h = height;
    } catch (e) {
      // Do something when catch error
      console.log("获取设备信息失败" + e);
    }
    return size;
  },

  /**
   * 绘制二维码图片
   */
  createQrCode: function (url, canvasId, cavW, cavH) {
    //调用插件中的draw方法，绘制二维码图片
    QR.api.draw(url, canvasId, cavW, cavH);
    setTimeout(() => {
      this.canvasToTempImage();
    }, 1000);
  },

  /**
   * 获取临时缓存照片路径，存入data中
   */
  canvasToTempImage: function () {
    var that = this;
    //把当前画布指定区域的内容导出生成指定大小的图片，并返回文件路径。
    wx.canvasToTempFilePath({
      canvasId: 'mycanvas',
      success: function (res) {
        var tempFilePath = res.tempFilePath;
        that.setData({
          Base64Img: tempFilePath,
          // canvasHidden:true
        });
      },
      fail: function (res) {
        console.log(res);
      }
    });
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
  //点击开始时的时间
  timestart: function (e) {
    　　var _this = this;
    　　_this.setData({ timestart: e.timeStamp });
  },

  //点击结束的时间
  timeend: function (e) {
    　　var _this = this;
    　　_this.setData({ timeend: e.timeStamp });
  },

  bingLongClick() {//长按事件 保存二维码
    var _this = this;
    var times = _this.data.timeend - _this.data.timestart;
    if (times > 300) {
      wx.saveImageToPhotosAlbum({
        filePath: _this.data.Base64Img,//返回的临时文件路径，下载后的文件会存储到一个临时文件
        success: function (res) {
          wx.showToast({
            title: '保存成功',
          })
        },
        fail(res) {
          wx.showToast({
            title: '保存失败请截屏',
          })
        }
      })
    }
  }
  
})