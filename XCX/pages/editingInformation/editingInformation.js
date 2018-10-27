// pages/editingInformation/editingInformation.js

var apiDomian = require("../../js/api.js");
let API = apiDomian.apidmain();
var uploadQiniu = require("../../js/uploadQiniu.js");

let provArrs = wx.getStorageSync("countryDetail").data
let cityArrs = wx.getStorageSync("provinceDetail").data
let areaArrs = wx.getStorageSync("cityDetail").data;
const date = new Date()
const years = []
const months = []
const days = []
for (let i = 1949; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    qiniuToken:"", //七牛的token
    years: years, //年
    year: date.getFullYear(),//那一年
    yearmonthday: date.getFullYear() + "" + date.getMonth() + "" + date.getDate(),
    months: months, //月
    month: date.getMonth(), //那一月
    days: days, //日
    day: date.getDate(), //那一天
    value: [date.getFullYear(), date.getMonth(), date.getDate()-1], //生日默认进来
    birthdayShow: false, //生日弹框
    cityShow: false, //城市弹出
    array: [ '男', '女'],//性别
    sexIndex:0, //性别的下标
    index: 0,
    imgSrc: "https://pub.qinius.butongtech.com/defult_photo@3x.png",//7牛云的url
    userName: "520", //用户名
    onOff: true,//用户名弹框
    personal: "我是设计师", //个人简介
    onOff1: true,//个人简介弹框
    threeLevelLinkage: [], //城市3级联动
    regionId:"", //城市的Id
    provArrs: provArrs,
    cityArrs: cityArrs,
    areaArrs: areaArrs,
    provArr: "中国",
    cityArr: "北京",
    areaArr: "西城区",
    showPickerView: false,
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
    
    let data =  wx.getStorageSync("userInfo");
    console.log(data)
    if(data){
      wx.request({ //请求七牛的token
        url: API.apiDomain + '/apis/system/sysAttachment/upPublicToken',
        header: {
          "Authorization": "bearer " + data.access_token
        },
        success: (res => {
          console.log(res,"bianji")
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
          Authorization: "Bearer " + data.access_token
        },
        success: function (res) {
          console.log(res,"fsfsdf");
          if (res.data.status == true) {
           
              that.setData({
                yearmonthday: res.data.data.birthday,
                sexIndex: res.data.data.sex,
                personal: res.data.data.introduce,
                userName: res.data.data.name ? res.data.data.name : data.name,
                imgSrc: res.data.data.owner_url ? res.data.data.owner_url : data.header,
              })

          } else {
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
        console.log(tempFilePaths,"fasdfs")
       
        that.setData({
          imgSrc: tempFilePaths
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
    console.log(data,"dasdjaks")
    if(data){
      wx.request({
        url: API.apiDomain + '/apis/operation/sysUserOperation/updateUserInfo',
        method:"POST",
        header: {
          "Authorization": "bearer " + data.access_token
        },
        data:{
          "birthday": that.data.yearmonthday,
          "id": data.user_id,
          "name": that.data.userName,
          "sex": that.data.sexIndex+"",
          "remark": that.data.personal,
          "regionId": that.data.regionId,
          "ownerUrl": that.data.imgSrc
        },
        success:(res=>{
          console.log(res,"fhasjdkfksd")
          if(res.data.status == true){

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
  //三级联动触发方法
  bindChange1: function (e) {
    let that = this;
    
    const val = e.detail.value
    
    that.setData({
      provArr: that.data.provArrs[val[0]].name,
      cityArr: that.data.cityArrs[val[1]].name,
      areaArr: that.data.areaArrs[val[2]].name,
      regionId: that.data.areaArrs[val[2]].id,
    })
  },
  cityClick() {// 地区事件
    // let that = this;
    // that.setData({
    //   cityShow: !that.data.cityShow
    // })
    wx.navigateTo({
      url: '../../pages/city/city',
    })
  },
  birthdayClick() { //生日事件
  
    let that = this;
    that.data.birthdayShow = !that.data.birthdayShow
    if(that.data.birthdayShow == true){
      that.data.yearmonthday = "确定"
    }else{
      that.data.yearmonthday = that.data.year + "" + that.data.month + "" + that.data.day;;
    }
    that.setData({
      yearmonthday: that.data.yearmonthday,
      birthdayShow: that.data.birthdayShow
    })
    console.log(that.data.yearmonthday,"dahkdkak")
  },
  bindChange: function (e) {//生日事件
    const val = e.detail.value
    let that = this;
    that.setData({
      year: that.data.years[val[0]],
      month: that.data.months[val[1]],
      day: that.data.days[val[2]],
    })
    
      that.data.yearmonthday = "确定"
   
    that.setData({
      yearmonthday: that.data.yearmonthday
    })
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
