// pages/meActivity/meActivity.js

var apiDomian = require("../../js/api.js");
let API = apiDomian.apidmain();
var formatTime = require("../../js/formatTime.js"); // 时间戳转时间
Page({

  /**
   * 页面的初始数据
   */
  data: {
    meActivityBoxItemViewIndex:0,// 头部按钮
    arr: [], // 活动列表数据
    page:1,
    rows:20,
    pageNum:0,
    name:"全部",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let data = wx.getStorageSync("userInfo"), that = this;
    if(data){
      that.resetData("");
    }else{
      wx.showModal({
        showCancel: false,
        title: "登录出错啦！",
        icon: 'success',
        duration: 2000
      })
      setTimeout(()=>{
         wx.navigateTo({
           url: '../../pages/login/login',
         })
      },500)
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
  onReachBottom: function () { //分页加载
    wx.showLoading({
      title: '加载中...',
    })
    var that = this;
    let pages = that.data.page;
    let  rows = that.data.page;
    pages++;
    if (pages > that.data.pageNum){
      wx.showModal({
        showCancel: false,
        title: "已经是最后一页啦！",
        icon: 'success',
        duration: 2000,

      })
      return
    }else{
      that.setData({
        page: pages
      })
    }
   
    //请求首页数据
    
    that.resetData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  meActivityBoxItemView(e){ //点击头部的按钮
      let that = this;
       
      that.setData({
        meActivityBoxItemViewIndex: e.currentTarget.dataset.index,
        arr:[],
      })
    if (that.data.meActivityBoxItemViewIndex == 0) {//判断是哪个按钮传不一样的状态
      that.resetData("");
      that.setData({
       name:"全部"
      })

    } else if (that.data.meActivityBoxItemViewIndex ==1){
      that.resetData("2");
      that.setData({
        name: "待参加"
      })

    } else if (that.data.meActivityBoxItemViewIndex == 2) {
      that.resetData("1");
      that.setData({
        name: "待支付"
      })

    } else if (that.data.meActivityBoxItemViewIndex == 3) {
      that.resetData("7");
      that.setData({
        name: "已完成"
      })
    }
  }, 
  lookClick(e){//查看门票
    // 传订单id去二维码页面
    console.log(e)
    wx.navigateTo({
      url: '../../pages/admission/admission?orderid=' + e.currentTarget.dataset.orderid,
    })
  },
  pendingClick(e){ // 待付款
    console.log(e)
    //去支付页面，还没做
    wx.navigateTo({
      url: '../../pages/payment/payment?id=' + e.currentTarget.dataset.id,
    })
  },
  againClick(e){ //重新报名
    //e.currentTarget.dataset.multiactivity.multiActivity
    //去订单详情页面
    wx.navigateTo({
      url: '../../pages/detail/detail?state=' + false + "&id=" + "1"
    })
  },
  rightOffClick(e) {//立即报名
    wx.navigateTo({
      url: '../../pages/detail/detail?state=' + false + "&id=" + "1"
    })
  },
  resetData(a){ //初始化数据
   
    let data = wx.getStorageSync("userInfo"), that = this;
    wx.request({
      method: 'POST',
      url: API.apiDomain + '/apis/activity/' + API.activityEdition +'/customerActivitySignupNote/list',
      header: {
        'Content-Type': 'application/json',
        "Authorization": "bearer " + data.access_token
      },
      data: {
        "orderStatus": a,
        "p": that.data.page+"",
        "s": that.data.rows+"",
      },
      success(res) {
        wx.hideLoading();
        let date = new Date();
        let nowTime = date.getTime();
        if (res.data.status == true) {
          if (res.data.total/that.data.rows>0){
            res.data.pageNum = Math.ceil(res.data.total / that.data.rows);
          }else if(res.data.total / that.data.rows == 0){
            res.data.pageNum = res.data.total / that.data.rows;
          }
          that.setData({
            pageNum: res.data.pageNum
          })
          res.data.data.map((item, index) => {
            if (item.goodsAmount == 0 || !!item.payTime) {
              item.isPay = true;
            } else {
              item.isPay = false;
            }
            
            res.data.data[index].state = "正常";
            if (that.data.meActivityBoxItemViewIndex==0){ //判断是哪个按钮

              if (!item.isPay && nowTime <= (item.createTime+3600000)) {
                res.data.data[index].state = "待支付";
              }
              if (!item.isPay && nowTime >= (item.createTime + 3600000)) {
                res.data.data[index].state = "已失效";
              }
              if (!!item.isPay && nowTime <= item.endTime) {
                res.data.data[index].state = "待参加";
              }
             
              if (!!item.isPay && nowTime > item.endTime) {
                res.data.data[index].state = "已完成";
              }
            } else if (that.data.meActivityBoxItemViewIndex == 1){
              res.data.data[index].state = "待参加";
            } else if (that.data.meActivityBoxItemViewIndex == 2) {
              res.data.data[index].state = "待支付";
            } else if (that.data.meActivityBoxItemViewIndex ==3) {
              res.data.data[index].state = "已完成";
            }
           
            res.data.data[index].startTime1 = formatTime.formatTime(res.data.data[index].startTime);
            res.data.data[index].endTime1 = formatTime.formatTime(res.data.data[index].endTime);

          })
          that.setData({
            arr: that.data.arr.concat(res.data.data)
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
      },
    
    })

  }
})