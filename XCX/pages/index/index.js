//index.js
//获取应用实例
var formatTime = require("../../js/formatTime.js"); // 时间戳转时间
var apiDomian = require("../../js/api.js");  //数据请求api
var promiseData = require("../../js/promiseHttp.js");  //数据请求api


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
    this.dictionaries();
    
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
    wx.showLoading({
      title: '加载中...',
    })
    setTimeout(()=>{
       that.pageData();
    },1000)
    // //请求首页数据
   
  },
  /**
  * 生命周期函数--监听页面显示
  */
  onShow: function () {
    this.dictionaries();
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

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
        wx.hideLoading()
        if (res.data.status == true) {
          let cityArry = wx.getStorageSync("cityDetail").data;
          // wx.showToast({
          //   title: '数据请求成功',
          //   icon: 'success',
          //   duration: 500
          // })
            let datas = res.data.data;
            promiseData.HomeList(datas, cityArry, formatTime).then(res => {
              that.setData({
                banner: that.data.banner.concat(res), //分页数据拼接
              
              })
              console.log(that.data.banner, "dsajdkajkdkashk")
            })
          
        }else{
          wx.hideLoading()
          wx.showModal({
            showCancel: false,
            title: res.data.message,
            icon: 'success',
            duration: 2000,
            
          }) 
         
        }
       
      },
      fail(res) {
        wx.showModal({
          showCancel: false,
          title: res+"数据失败了",
          icon: 'success',
          duration: 20000,

        })
      }
    })
  },
  dictionaries() {//字典缓存本地
    wx.request({
      url: API.apiDomain + '/apis/system/init/loadDicTree',
      success(res) {
        if (res.data.status == true) {
          wx.setStorageSync("dictionaries", res.data)
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
        } else {
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
