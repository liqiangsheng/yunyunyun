

var WxParse = require('../../wxParse/wxParse.js'); //富文本解析
var apiDomian = require("../../js/api.js");  //数据请求api
var formatTime = require("../../js/formatTime.js"); // 时间戳转时间
let API = apiDomian.apidmain();
// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    state:true,
    latitude: 22.53083457180025, // 后台传
    longitude: 114.05976086854936,// 后台传
    addressname:"",//
    peopleArr:{},
    guests:[],//嘉宾介绍
    swiperIndex: 0, //这里不写第一次启动展示的时候会有问题
    scrollTopShow: false, //面板指示
    banner: {},
    startTimes:"",//会议时间
    dataObj: {},// 多活动数据
    hosts:[], //主办单位
    organizers:[],//承办单位
    coOrganizers: [],//承办单位
    scrollTop:0,
    page:1, //页数
    rows:20, //每页20
    DetailId:"",
    moreID: "",
    p: 1, //活动安排每页
    s: 5, //活动安排每页数据
    num: 0,//活动安排
    moreMessage: "", //活动安排
    p1: 1, //嘉宾列表每页
    s1: 5, //嘉宾列表每页数据
    num1: 0,//嘉宾列表
    moreMessage1: "", //嘉宾列表
  },
  scrollTopW(event){
    if (event.detail.scrollTop>100){
      this.setData({
        scrollTopShow: true,
      })
    }else{
      this.setData({
        scrollTopShow: false,
      })
    }
  },
  goTop: function (e) {  // 一键回到顶部
  
    this.setData({
      scrollTop: 0,
    })
   
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      state: options.state,
      DetailId: options.id
    })
    // 数据初始化
    wx.request({
      url: API.apiDomain + '/apis/activity/' + API.activityEdition +'/activityInfo/findOne?id=' + options.id,
      method:"GET",
      success:(res=>{
        
        if (res.data.status == true){
          if (that.data.state == "true") {
            
            let datas = res.data.data;
            that.setData({
              dataObj: datas,
            })
            let banners = that.data.dataObj.children[that.data.swiperIndex];
            let startTime = formatTime.formatTime3(banners.startTime)
            let hostss = that.data.dataObj.children[that.data.swiperIndex].hosts.split(",");
            let organizerss = that.data.dataObj.children[that.data.swiperIndex].organizers.split(",");
            let coOrganizerss = that.data.dataObj.children[that.data.swiperIndex].coOrganizers.split(",");
            that.setData({
              banner: banners,
              hosts: hostss,
              organizers: organizerss,
              coOrganizers: coOrganizerss,
              startTimes: startTime,
              latitude: banners.latitude, // 后台传
              longitude: banners.longitude,// 后台传
              addressname: banners.address,
              moreID: banners.id
            })
            WxParse.wxParse('article1', 'html', that.data.banner.content, that, 5);
            WxParse.wxParse('article', 'html', that.data.banner.customContent, that, 5);
            that.arrange(that.data.banner.id) ;// 活动安排

          } else {
              let datas = res.data.data;
              let startTime = formatTime.formatTime3(datas.startTime)
              let hostss = res.data.data.hosts.split(",");
              let organizerss = res.data.data.organizers.split(",");
              let coOrganizerss = res.data.data.coOrganizers.split(",");
              
                  that.setData({
                    banner: datas,
                    hosts: hostss,
                    organizers: organizerss,
                    coOrganizers: coOrganizerss,
                    startTimes: startTime,
                    latitude: datas.latitude, // 后台传
                    longitude: datas.longitude,// 后台传
                    addressname: datas.address,
                    moreID: datas.id
                  })
              }
          WxParse.wxParse('article1', 'html', that.data.banner.content, that, 5);
          WxParse.wxParse('article', 'html', that.data.banner.customContent, that, 5);
             
              that.arrange(that.data.banner.id);// 活动安排
          
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
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.mapCtx = wx.createMapContext('myMap')
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
 
  scrollFun(e) { //滑动效果
    var that = this;
    that.setData({
      swiperIndex: e.detail.current,
    })
    let banners = that.data.dataObj.children[that.data.swiperIndex];
    let startTime = formatTime.formatTime3(banners.startTime)
    let hostss = that.data.dataObj.children[that.data.swiperIndex].hosts.split(",");
    let organizerss = that.data.dataObj.children[that.data.swiperIndex].organizers.split(",");
    let coOrganizerss = that.data.dataObj.children[that.data.swiperIndex].coOrganizers.split(",");
    that.setData({
      banner: banners,
      hosts: hostss,
      organizers: organizerss,
      coOrganizers: coOrganizerss,
      startTimes: startTime,
      latitude: banners.latitude, // 后台传
      longitude: banners.longitude,// 后台传
      addressname: banners.address,
    })
    WxParse.wxParse('article1', 'html', that.data.banner.content, this, 5);
    WxParse.wxParse('article', 'html', that.data.banner.customContent, this, 5);
    that.arrange(that.data.id);// 活动安排
  },
 
 
  mapClick(){ // 地图
  let that= this;
    wx.openLocation({
      latitude: that.data.banner.latitude, // 后台传
      longitude: that.data.banner.longitude,// 后台传
      scale: 18,
      name: that.data.banner.address,
      address: that.data.banner.address
    })
  },
  moreClick(e){//点击更多详情
    let that= this;
    that.data.guests[e.currentTarget.dataset.index].centerIsshow = !that.data.guests[e.currentTarget.dataset.index].centerIsshow;
    that.setData({
      guests: that.data.guests
    })
 
  },
  takeUpClick(e){ // 收起
    let that = this;
    that.data.guests[e.currentTarget.dataset.index].centerIsshow = !that.data.guests[e.currentTarget.dataset.index].centerIsshow;
    that.setData({
      guests: that.data.guests
    })
  },
  forwardClick(){ // 转发
       
  },
  nextClick(){ // 下一步
    console.log(this.data.banner)
    let that = this;
    let data = wx.getStorageSync("userInfo");
   
      that.data.banner.stateName= "";
      var date = new Date();
      var nowTime = date.getTime();
    if (nowTime > that.data.banner.endTime) { //判断活动结束或者正在进行中  上线放开
  
      wx.showToast({
        duration: 2000,
        title: "该活动已结束",
        icon: "none"
      })
      return;
    } else if (nowTime > that.data.banner.signEndTime) {
      wx.showToast({
        duration: 2000,
        title: "活动报名已结束",
        icon: "none"
      })

      return;
    } else if (nowTime < that.data.banner.signStartTime) {
      wx.showToast({
        duration: 2000,
        title: "活动尚未开始报名，请选择其他活动！",
        icon: "none"
      })
    
      return;
    }
    if (data) { //有没有登录      //登录了

        wx.setStorageSync("activityInfo", that.data.banner) //保存活动信息
        wx.navigateTo({
          url: '../../pages/multiActivity/multiActivity?id='+that.data.banner.id,
        })
   
    }else{ // 没有登录去活动详情的登录
      wx.navigateTo({
        url: '../../pages/login1/login1?id=' + that.data.banner.id,
      })
    }
  },
  moreItemClickA() {//活动安排加载更多
    let that = this;
    let a = that.data.p+1;
    that.setData({
      p: a,
    }) 
    if (that.data.p > that.data.num) {
      that.setData({
        moreMessage: "这是我的底线...",
      }) 
      wx.showModal({
        showCancel: false,
        title: "没有更多安排了",
        icon: 'success',
      })
      return;
    } else if (that.data.p == that.data.num) {
      that.setData({
        moreMessage: "这是我的底线...",
      }) 
      wx.request({
        url: API.apiDomain + '/apis/activity/' + API.activityEdition +'/activitySchedule/list',
        method: "POST",
        data: {
          "activityId": that.data.moreID,
          "orderField": "start_time",
          "orderString": "asc",
          "p": that.data.p,
          "s": that.data.s,

        },
        success: (res => {
          if (res.data.status == true) { //
            for (var i = 0; i < res.data.data.length; i++) {
              res.data.data[i].startTime = formatTime.formatTime4(res.data.data[i].startTime)
              res.data.data[i].endTime = formatTime.formatTime4(res.data.data[i].endTime)
              if (res.data.data[i].childList.length > 0) {
                for (var j = 0; j < res.data.data[i].childList.length; j++) {
                  res.data.data[i].childList[j].startTime = formatTime.formatTime4(res.data.data[i].childList[j].startTime)
                  res.data.data[i].childList[j].endTime = formatTime.formatTime4(res.data.data[i].childList[j].endTime)
                }
              }

            }
          
            that.data.peopleArr = that.data.peopleArr.concat(res.data.data);
            that.setData({
              peopleArr: that.data.peopleArr,
            
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

    } else {
      that.setData({
        moreMessage: "点击加载更多...",
      })
      wx.request({
        url: API.apiDomain + '/apis/activity/' + API.activityEdition +'/activitySchedule/list',
        method: "POST",
        data: {
          "activityId": that.data.moreID,
          "orderField": "start_time",
          "orderString": "asc",
          "p": that.data.p,
          "s": that.data.s,

        },
        success: (res => {
          if (res.data.status == true) { //
            for (var i = 0; i < res.data.data.length; i++) {
              res.data.data[i].startTime = formatTime.formatTime4(res.data.data[i].startTime)
              res.data.data[i].endTime = formatTime.formatTime4(res.data.data[i].endTime)
              if (res.data.data[i].childList.length > 0) {
                for (var j = 0; j < res.data.data[i].childList.length; j++) {
                  res.data.data[i].childList[j].startTime = formatTime.formatTime4(res.data.data[i].childList[j].startTime)
                  res.data.data[i].childList[j].endTime = formatTime.formatTime4(res.data.data[i].childList[j].endTime)
                }
              }

            }

            that.data.peopleArr = that.data.peopleArr.concat(res.data.data);
            that.setData({
              peopleArr: that.data.peopleArr,

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
    }

  },
  moreItemClickAB() { //嘉宾介绍加载更多
    let that = this;
    let a = that.data.p1 + 1;
    that.setData({
      p1: a,
    })
    if (that.data.p1 > that.data.num1) {
      that.setData({
        moreMessage1: "这是我的底线...",
      })
      wx.showModal({
        showCancel: false,
        title: "没有更多安排了",
        icon: 'success',
      })
      return;
    } else if (that.data.p1 == that.data.num1) {
      that.setData({
        moreMessage1: "这是我的底线...",
      })
      wx.request({
        url: API.apiDomain + '/apis/activity/' + API.activityEdition +'/honoredGuest/list',
        method: "POST",
        data: {
          "activityId": that.data.moreID,
          "orderField": "start_time",
          "orderString": "asc",
          "p": that.data.p1,
          "s": that.data.s1,

        },
        success: (res => {
          if (res.data.status == true) { //
            for (var i = 0; i < res.data.data.length; i++) {
              res.data.data[i].centerIsshow = true;

            }

            that.data.guests = that.data.guests.concat(res.data.data);
            that.setData({
              guests: that.data.guests,

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

    } else {
      that.setData({
        moreMessage1: "点击加载更多...",
      })
      wx.request({
        url: API.apiDomain + '/apis/activity/' + API.activityEdition +'/honoredGuest/list',
        method: "POST",
        data: {
          "activityId": that.data.moreID,
          "orderField": "start_time",
          "orderString": "asc",
          "p": that.data.p1,
          "s": that.data.s1,

        },
        success: (res => {
          if (res.data.status == true) { //
            for (var i = 0; i < res.data.data.length; i++) {
              res.data.data[i].centerIsshow = true;

            }

            that.data.guests = that.data.guests.concat(res.data.data);
            that.setData({
              guests: that.data.guests,

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
    }

  },
  arrange(i){// 活动安排的时间
     let that = this;
    wx.request({
      url: API.apiDomain + '/apis/activity/' + API.activityEdition +'/activitySchedule/list',
      method:"POST",
      data:{
        "activityId": i,
        "orderField": "start_time",
        "orderString": "asc",
        "p": that.data.p,
        "s": that.data.s,

      },
      success:(res=>{
        if (res.data.status == true) { //
          for (var i = 0; i < res.data.data.length;i++){
            res.data.data[i].startTime = formatTime.formatTime4(res.data.data[i].startTime)
            res.data.data[i].endTime = formatTime.formatTime4(res.data.data[i].endTime)
            if (res.data.data[i].childList.length>0){
              for (var j = 0; j < res.data.data[i].childList.length; j++) {
                res.data.data[i].childList[j].startTime = formatTime.formatTime4(res.data.data[i].childList[j].startTime)
                res.data.data[i].childList[j].endTime = formatTime.formatTime4(res.data.data[i].childList[j].endTime)
              }
            }
            
           }
          let numa = Math.ceil(res.data.total /that.data.s);
          if (numa > 1) {

            that.setData({
              moreMessage: "点击加载更多...",
            })  
          } else {
      
            that.setData({
              moreMessage: "这是我的底线...",
            })  
          }
      
            that.setData({
              peopleArr: res.data.data,
              num: numa
            })  
        
         }else{
           wx.showModal({
             showCancel: false,
             title: res.data.message,
             icon: 'success',
           })
         }
      })
    }) 
    wx.request({
      url: API.apiDomain + '/apis/activity/' + API.activityEdition +'/honoredGuest/list',
      method: "POST",
      data: {
        "activityId": i,
        "orderField": "start_time",
        "orderString": "asc",
        "p": that.data.p1,
        "s": that.data.s1,
      },
      success: (res => {
        if (res.data.status == true) { //
        
          for (var i = 0; i < res.data.data.length; i++) {
            res.data.data[i].centerIsshow = true;

          }
          let numa1 = Math.ceil(res.data.total / that.data.s1);
          if (numa1 > 1) {

            that.setData({
              moreMessage1: "点击加载更多...",
            })
          } else {

            that.setData({
              moreMessage1: "这是我的底线...",
            })
          }

          that.setData({
            guests: res.data.data,
            num1: numa1
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

  }
})