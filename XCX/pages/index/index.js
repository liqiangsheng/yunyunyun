//index.js
//获取应用实例
var formatTime = require("../../js/formatTime.js"); // 时间戳转时间
var apiDomian = require("../../js/api.js");  //数据请求api
let API = apiDomian.apidmain();
const app = getApp();
let dictionariesData = wx.getStorageSync("dictionaries");
Page({
  data: {
    dataStroge:"",
    swiperIndex: 0, //这里不写第一次启动展示的时候会有问题
    scrollTopShow:false, //面板指示
    banner1: [], //轮播
    banner:[],
    page:1,
    row:20,
   
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    
    var that = this;
    wx.request({ //轮播数据
      url: 'https://dcloud.butongtech.com' +"/tsconfigjson",
      method:"GET",
      success(res){
        if (res.statusCode == 200){
          that.setData({
            banner1: res.data.img
          })

        }else{
          wx.showModal({
            title: '提示',
            content: '轮播数据出错了'
          })
        }
      }
    })
   
    //请求首页数据
    that.pageData();
  },
  /**
 * 页面上拉触底事件的处理函数
 */
  onReachBottom: function (e) {
    var that = this;
     let pages = that.data.page;
     pages++;
     that.setData({
       page:pages
     })
    //请求首页数据
    that.pageData();
  },
  selectProItem(e){  //点击滑动图片
    console.log(e,"sahmdhs")
  },

  scrollFun(e) { //滑动效果
    var that = this;
    that.setData({
      total: that.data.banner.length,
      swiperIndex: e.detail.current,
    })
  },
  onPageScroll: function (e) { //回到顶部按钮出现
    if (e.scrollTop>100){
      this.setData({
        scrollTopShow:true,
      })
    }else{
      this.setData({
        scrollTopShow: false,
      })
    }
  },
  goTop: function (e) {  // 一键回到顶部
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  goDetail(e){ //单活动去详情
   
        wx.navigateTo({ //去我详情页面
              url: "../../pages/detail/detail?state=" + e.currentTarget.dataset.multiactivity.multiActivity + "&id=" + e.currentTarget.dataset.multiactivity.id
            })
 
    

  },

  pageData(){ // 页面数据
    wx.showLoading({
      title: '加载中。。。',
    })
    var that = this;
    wx.request({
      url: API.apiDomain + '/apis/activity/activityInfo/list',
      header: {
        'Content-Type': 'application/json',
        'Accept': '*/*'
      },
      data: { p: that.data.page, s: that.data.row },
      method: "POST",
      success(res) {
        if (res.data.status == true) {
          let cityArry = wx.getStorageSync("cityDetail").data;
          let datas = res.data.data;
          for (let i = 0; i < datas.length; i++) {
            datas[i]["stateName"] = "";
            var date = new Date();
            var nowTime = date.getTime();
            if (nowTime >= datas[i]["signStartTime"] && nowTime <= datas[i]["signEndTime"]) {
              datas[i]["stateName"] = "立即报名";
            } else if (nowTime > datas[i]["endTime"]) {
              datas[i]["stateName"] = "已结束";
            } else if (nowTime <= datas[i]["endTime"] && nowTime >= datas[i]["startTime"]) {
              datas[i]["stateName"] = "正在进行";
            } else if (nowTime > datas[i]["signEndTime"] && nowTime < datas[i]["startTime"]) {
              datas[i]["stateName"] = "报名结束";
            } else if (nowTime < datas[i]["signStartTime"]) {
              datas[i]["stateName"] = "报名即将开始";
            }else{
              datas[i]["stateName"] = "";
            }
            datas[i]["startTime"] = formatTime.formatTime(datas[i]["startTime"])
            datas[i]["cityName"] = "";
            for (let a = 0; a < cityArry.length; a++) {
              if (cityArry[a]["id"] == datas[i]["regionId"]) {
                datas[i]["cityName"] = cityArry[a]["name"]
              }
            }
          }
          that.setData({
            banner: that.data.banner.concat(datas), //分页数据拼接
            total: that.data.banner.length,
          })
          wx.hideLoading()
        }else{
          wx.showModal({
            showCancel: false,
            title: res.data.message,
            icon: 'success',
            duration: 2000,
            
          })
          
            wx.hideLoading()
         
        }
       
      },
      fail(res) {
        console.log(res.data)
      }
    })
  }

})
