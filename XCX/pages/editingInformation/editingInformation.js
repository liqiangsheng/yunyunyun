// pages/editingInformation/editingInformation.js

var apiDomian = require("../../js/api.js");
let API = apiDomian.apidmain();
var uploadQiniu = require("../../js/uploadQiniu.js");

let provArrs = wx.getStorageSync("countryDetail").data
let cityArrs = wx.getStorageSync("provinceDetail").data
let areaArrs = wx.getStorageSync("cityDetail").data;
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
        url: API.apiDomain + '/apis/system/sysAttachment/upPublicToken',
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
            wx.showModal({
              showCancel: false,
              title: res.data.message,
              icon: 'success',
            })
          }

        })
      })

      wx.request({ //设置的默认东西
      
        url: API.apiDomain + '/apis/operation/commonUser/findCommonUserById',
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
          wx.hideLoading();
          wx.showToast({
            title: '数据请求成功',
            icon: 'success',
            duration: 500
          })
          if (res.data.status == true) {
           
            // provArrs.map((item,index)=>{
            //   if (item.id == res.data.data.region_id){
            //     that.setData({
            //       areaArr: item.name,
                 
            //     })
            //   }
            // })
            // cityArrs.map((item, index) => {
            //   if (item.id == res.data.data.region_id) {
            //     that.setData({
            //       areaArr: item.name,

            //     })
            //   }
            // })
            // areaArrs.map((item, index) => {
            //   if (item.id == res.data.data.region_id) {
            //     that.setData({
            //       areaArr: item.name,

            //     })
            //   }
            // })
              that.setData({
                areaArr:res.data.data.regionName ? res.data.data.regionName:"深圳市",
                yearmonthday: res.data.data.birthday,
                sexIndex: res.data.data.sex,
                regionId: res.data.data.region_id ? res.data.data.region_id :"2018042317050430c6a250e4044f94bb4cc074302b789a",
                personal: res.data.data.introduce,
                userName: res.data.data.name ? res.data.data.name : data.name,
                imgSrc: res.data.data.owner_url ? res.data.data.owner_url : data.header,
              })
             
           
          } else {
            wx.hideLoading();
            wx.showModal({
              showCancel: false,
              title: res.data.message,
              icon: 'success',
              
            })
            
          }
        }
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
      wx.request({
        url: API.apiDomain + '/apis/operation/sysUserOperation/updateUserInfo',
        method:"POST",
        header: {
          "Authorization": "bearer " + data.access_token
        },
        data:{
          "birthday": that.data.yearmonthday ? that.data.yearmonthday:"19701001",
          "id": data.user_id,
          "name": that.data.userName ? that.data.userName:"设计云",
          "sex": that.data.sexIndex?that.data.sexIndex+"":"0",
          "remark": that.data.personal ? that.data.personal:"设计云",
          "regionId": that.data.regionId ? that.data.regionId : "2018042317050430c6a250e4044f94bb4cc074302b789a",
          "ownerUrl": that.data.imgSrc ? that.data.imgSrc : "https://pub.qinius.butongtech.com/defult_photo@3x.png"
        },
        success:(res=>{
          let obj ={};
          obj.name = that.data.userName;
          obj.header = that.data.imgSrc;
          wx.setStorageSync("userInfoImgs", obj)
          if(res.data.status == true){
            wx.showModal({
              showCancel: false,
              title: "资料编辑成功",
              icon: 'success',
            })
            setTimeout(()=>{
              wx.navigateBack({
                delta:1,
              })
            },500)

          }else{
            wx.showModal({
              showCancel: false,
              title: res.data.message,
              icon: 'success',
            })
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
            if (res1.data.status == true) {
              let dataUrl = res1.data.data;
              dataUrl.map((item, index) => { //赋值七牛的url
                if (item.code == "qiniu_pub_https_url") {

                  that.data.imgSrc = item.name + "/" + data.key
                  that.setData({
                    imgSrc: that.data.imgSrc
                  })
                }
              })

            } else {
              
              wx.showModal({
                showCancel: false,
                title: res.data.message,
                icon: 'success',
                duration: 2000
              })
            }
            
          }
         
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
