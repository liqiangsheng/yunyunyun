// pages/editingInformation/editingInformation.js

var apiDomian = require("../../js/api.js");
let API = apiDomian.apidmain();
// var uploadQiniu = require("../../js/uploadQiniu.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dayStyle: [
      { month: 'current', day: new Date().getDate(), color: 'white', background: '#AAD4F5' },
      { month: 'current', day: new Date().getDate(), color: 'white', background: '#AAD4F5' }
    ],
    
    year:"2018",  //年
    month:"01", //月
    day:"01",  //日
    qiniuToken:"", //七牛的token
    yearmonthday:"20180101", //  选中的日期
    birthdayShow: false, //生日弹框
    cityShow: false, //城市弹出
    array: [ '男', '女'],//性别
    sexIndex:0, //性别的下标
    index: 0,
    imgSrc: "https://pub.qinius.butongtech.com/defult_photo@3x.png",//7牛云的url
    userName: "设计云", //用户名
    onOff: true,//用户名弹框
    personal: "设计云", //个人简介
    onOff1: true,//个人简介弹框
    threeLevelLinkage: [], //城市3级联动
    regionId:"", //城市的Id
    areaArr: "深圳市",
    showPickerView: false,
  },
  dateTime(e){  //选择的日期
    let clickDay = e.detail.day;
    let changeDay = `dayStyle[1].day`;
    let changeBg = `dayStyle[1].background`;
    
    let day = "",month = "",year="";
    if (e.detail.day<10){
      day = "0" + e.detail.day;
    }else{
      day = "" +e.detail.day;
    }
    if (e.detail.month < 10) {
      month = "0" + e.detail.month;
    } else {
      month = "" +e.detail.month;
    }
    year = "" +e.detail.year
    this.setData({
      year: year,
      month: month,
      day: day,
      [changeDay]: clickDay,
      [changeBg]: "#84e7d0"
    })
  },
  modalConfirm(e){ //用户名的确定
    let that = this;
    if (e.currentTarget.dataset.index == "1"){
      this.setData({
        userName: that.data.userName,
        onOff: true
      })
        
    }else{
      this.setData({
        personal: that.data.personal,
        onOff1: true
      })
    }
  },
  modalCancel(e) { //用户名的取消
    let that = this;
    if (e.currentTarget.dataset.index == "1") {
       this.setData({
         onOff:true
       })
    } else {
      this.setData({
        onOff1: true
      })
    }
  },
  textareaBlur(e) { //个人简介
    let that = this;
    that.setData({
      personal: e.detail.value
    })
  },
  userNameBlur(e) {//用户名
    let that = this;
    that.setData({
      userName: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
     wx.showLoading({
      title: '加载中...',
    })
    let data =  wx.getStorageSync("userInfo");
    
    if(data){
      wx.request({ //请求七牛的token
        url: API.apiDomain + '/apis/system/' + API.systemEdition +'/sysAttachment/upPublicToken',
        header: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          "Authorization": "bearer " + data.access_token
        },
        success: (res => {
          if (res.data.status == true) {
            that.setData({
              qiniuToken: res.data.data.upToken
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

        })
      })
     setTimeout(()=>{

        wx.request({ //设置的默认东西

          url: API.apiDomain + '/apis/operation/' + API.operationEdition+'/commonUser/findCommonUserById',
         method: "GET",
         data: {
           userId: data.id
         },
         header: {
           'Content-Type': 'application/json',
           'Accept': 'application/json',
           "Authorization": "Bearer " + data.access_token
         },
         success: function (res) {
             console.log(res,"fdksfk")
           if (res.data.status == true) {
             wx.hideLoading();
             that.setData({
               areaArr: res.data.data.region_name ? res.data.data.region_name : "深圳市",
               yearmonthday: res.data.data.birthday ? res.data.data.birthday:"19700101",
               sexIndex: res.data.data.sex ? res.data.data.sex:"0",
               regionId: res.data.data.region_id ? res.data.data.region_id : "2018042317050430c6a250e4044f94bb4cc074302b789a",
               personal: res.data.data.introduce ? res.data.data.introduce:"",
               userName: res.data.data.name ? res.data.data.name : that.data.name,
               imgSrc: res.data.data.owner_url ? res.data.data.owner_url : "https://pub.qinius.butongtech.com/defult_photo@3x.png",
             })


           } else {
             wx.hideLoading();
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

       

     },1000)
    

    }else{
      wx.showModal({
        showCancel: false,
        title: "登录发生错误，请重新登录",
        icon: 'success',
      })
      wx.navigateTo({
        url: '../../pages/login/login',
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
  sexChange: function (e) { //选择性别
   
    this.setData({
      sexIndex: e.detail.value
    })
  },
  
  headPortrait() { //上传照片
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
       
        that.setData({
          imgSrc: tempFilePaths[0]
        })
        that.uploadQiniu(that.data.qiniuToken,tempFilePaths);  // 上传图片到七牛
        
      }
    })
  },

  userName() {// 用户名
    let that = this;
    that.setData({
      onOff: !that.data.onOff
    })
  },
  personalProfile() { //个人简介
    let that = this;
    that.setData({
      onOff1: !that.data.onOff1
    })
  },
  okClick() {//确定编辑
    let that = this;
    let data = wx.getStorageSync("userInfo");
    if(data){
      wx.showLoading({
        title: '加载中...',
      })
      wx.request({
        url: API.apiDomain + '/apis/operation/' + API.operationEdition +'/sysUserOperation/updateUserInfo',
        method:"POST",
        header: {
          "Authorization": "bearer " + data.access_token
        },
        data:{
          "birthday": that.data.yearmonthday ? that.data.yearmonthday:"19701001",
          "id": data.user_id,
          "name": that.data.userName ? that.data.userName:"",
          "sex": that.data.sexIndex?that.data.sexIndex+"":"0",
          "remark": that.data.personal ? that.data.personal:"",
          "regionId": that.data.regionId ? that.data.regionId : "2018042317050430c6a250e4044f94bb4cc074302b789a",
          "ownerUrl": that.data.imgSrc ? that.data.imgSrc : "https://pub.qinius.butongtech.com/defult_photo@3x.png"
        },
        success:(res=>{
          let obj ={};
          
          if(res.data.status == true){
            obj.name = that.data.userName;
            obj.header = that.data.imgSrc;
            wx.setStorageSync("userInfoImgs", obj)
            wx.hideLoading();
          
            setTimeout(()=>{
              wx.navigateBack({
                delta:1,
              })
            },500)

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
        })
      })

    }else{
      wx.showModal({
        showCancel: false,
        title: "登录发生错误，请重新登录",
        icon: 'success',
      })
      wx.navigateTo({
        url: '../../pages/login/login',
      })
    }

  },
 
  cityClick() {// 地区事件
   
    wx.navigateTo({
      url: '../../pages/city/city',
    })
  },
  birthdayClick() { //生日确定
  
    let that = this;
    that.data.birthdayShow = !that.data.birthdayShow
    that.setData({
      birthdayShow: that.data.birthdayShow
    })
    console.log(that.data.birthdayShow,"dakdjkasdkjas")
    if(that.data.birthdayShow == true){
      that.data.yearmonthday = "确定"
      that.setData({
        yearmonthday: that.data.yearmonthday,
      })
    }else{
      
      that.setData({
        yearmonthday: that.data.year + that.data.month + that.data.day,
      })
    }
    console.log(that.data.yearmonthday)
    
  },

 uploadQiniu(a, b) { //上传图片的方法
 
    let token = a;  //后台请求回来的token
    let tempFilePaths = b; // 图片路径
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
        that.data.imgSrc = "https://pub.qinius.butongtech.com" + "/" + data.key //地址拼接
        that.setData({
          imgSrc: that.data.imgSrc  
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
