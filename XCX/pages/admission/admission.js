let wxqrCode = require("../../js/wxqrcode.js")//生成二维码的插件
var apiDomian = require("../../js/api.js");
let API = apiDomian.apidmain();
// pages/admission/admission.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timestart:0,
    timestend:0,
    Base64Img: "",
    dataObj:{}, //二维码数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let Logindata = wx.getStorageSync("userInfo");
    console.log(options.orderid)
    if (options.orderid && options.orderid!=""){  //是不是我的活动来的
      wx.request({
        method: 'GET',
        url: API.apiDomain + '/apis/activity/customerActivitySignupNote/findSimpleOneToClient',
        header: {
          'Content-Type': 'application/json',
          "Authorization": "bearer " + Logindata.access_token
        },
        data:{
          "id": options.orderid
        },
        success(res){
          console.log(res.data.data,"sdadas")
          if(res.data.status == true){
            var imgData = wxqrCode.createQrCodeImg(res.data.data.signCode, { size: 300 });//生成二维码
            that.setData({
              Base64Img: imgData,
              dataObj: res.data.data
            })

          }else{
            wx.showModal({
              showCancel: false,
              title: res.data.message,
              icon: 'success',
              duration: 2000,

            })
          }
        }
      })
    }else{//下单流程来的

      let data = wx.getStorageSync("objList");
     
      if (Logindata) { //登录
        var imgData = wxqrCode.createQrCodeImg(data.signCode, { size: 300 });//生成二维码
        console.log(imgData, "fsjklfjks")
        that.setData({
          Base64Img: imgData,
          dataObj: data
        })
        console.log(that.data.dataObj)
      } else { //登陆出错
        wx.showToast({
          title: ' 登录异常！',
          icon: 'success',
          duration: 2000
        })
        setTimeout(() => {
          wx.navigateTo({ //去我的页面登录
            url: "../../pages/login/login"
          })
        }, 1000)
      }

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

  bingLongClick(){//长按事件 保存二维码
    var _this = this;
    　　var times = _this.data.timeend - _this.data.timestart;
    　　if (times > 300) {
      　　　　console.log("长按");
      　　　　wx.getSetting({
        　　　　　　success: function (res) {
          　　　　　　　　wx.authorize({
            　　　　　　　　　　scope: 'scope.writePhotosAlbum',
            　　　　　　　　　　success: function (res) {
              　　　　　　　　　　　　console.log("授权成功");
                        var imgUrl = "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=4000347495,1320390870&fm=58&s=7FC6E81A8CB40E9049796BCC0300F026&bpow=121&bpoh=75";//图片地址
                　　　　　　　　　　　　wx.downloadFile({//下载文件资源到本地，客户端直接发起一个 HTTP GET 请求，返回文件的本地临时路径
                  　　　　　　　　　　　　　　url: imgUrl,
                  　　　　　　　　　　　　　　success: function (res) {
                    　　　　　　　　　　　　　　　　console.log(res);
                    　　　　　　　　　　　　　　　　// 下载成功后再保存到本地
                    　　　　　　　　　　　　　　　　wx.saveImageToPhotosAlbum({
                      　　　　　　　　　　　　　　　　　　filePath: res.tempFilePath,//返回的临时文件路径，下载后的文件会存储到一个临时文件
                      　　　　　　　　　　　　　　　　　　success: function (res) {

                      　　　　　　　　　　　　　　　　　　　}
                    　　　　　　　　　　　　　　　　})
                  　　　　　　　　　　　　　　}
                　　　　　　　　　　　　})
            　　　　　　　　　　}
          　　　　　　　　})
        　　　　　　}
      　　　　})
     }
  }
  
})