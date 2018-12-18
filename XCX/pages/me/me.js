var apiDomian = require("../../js/api.js");
let API = apiDomian.apidmain();
// pages/me/me.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    meTab: ["原创", "草稿"],//原创 草稿
    meTabIndex: 0,//原创 草稿
    tabList: [{ name: "关注", num: "2000" }, { name: "粉丝", num: "1.5万" }, { name: "点赞", num: "5000" }, { name: "收藏", num: "100" }, { name: "评论", num: "265" },],
    tabListBool: false, //显示
    bgImge:"../../images/bg.png",
    userInfo: {
      header: "../../images/defultphoto.png",
      name: "登录",
    },
    hasUserInfo: false,
  },
  setClick(){
    let data = wx.getStorageSync('userInfo')//获取本地存储信息
    if (data) {
      wx.navigateTo({ //去我的个人资料
        url: "../../pages/personalSettings/personalSettings"
      })
    }else{
      wx.showModal({
        showCancel: false,
        title: "您未登录，请登录",
      })
    }
  },
  onPageScroll(e){
 
  },
  Me_tabClick(e) { ////原创 草稿

    this.setData({
      meTabIndex: e.currentTarget.dataset.index
    })
  },
  myfollowBnt(e){

    let v = e.currentTarget.dataset.item;
    let data = wx.getStorageSync('userInfo')//获取本地存储信息
    if (data) {
      if (v.name == "关注") {
        wx.navigateTo({ //去我的页面关注
          url: "../../pages/myfollow/myfollow"
        })
      
      } else if (v.name == "粉丝") {
        wx.navigateTo({ //去我的页面粉丝
          url: "../../pages/fans/fans"
        })
      } else if (v.name == "点赞") {
        wx.navigateTo({ //去我的页面点赞
          url: "../../pages/myFabulous/myFabulous"
        })
       
      } else if (v.name == "收藏") {
        wx.navigateTo({ //去我的页面收藏
          url: "../../pages/myCollection/myCollection"
        })
      
      } else if (v.name == "评论") {
        wx.navigateTo({ //去我的页面评论
          url: "../../pages/myComment/myComment"
        })
    
      }

    } else {
      wx.showModal({
        showCancel: false,
        title: "您未登录，请登录",
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function () {
     let that = this;
    that.userInfoFun();
    
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
    let that = this;
    that.userInfoFun();
    

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
  
  loginBnt(){//去登录
    var that = this
    let data = wx.getStorageSync('userInfo')//获取本地存储信息
    if(!data){
      wx.navigateTo({ //去我的页面登录
        url: "../../pages/login/login"
      })
    }else{
      wx.showToast({
        title: ' 你已登录！',
        icon: 'success',
        duration: 2000
      })
    }
   

  },

   userInfoFun(){ //登录本地拿
     var that = this
     let data = wx.getStorageSync('userInfo')//获取本地存储信息
     console.log(data)
     if (data){
       that.setData({
         tabListBool:true
       })
       wx.request({ //设置的默认东西

         url: API.apiDomain + '/apis/operation/' + API.operationEdition +'/commonUser/findCommonUserById',
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
          
           if (res.data.status == true) {
             console.log(res.data.data,"dbasdkas")
             that.setData({
               bgImge: res.data.data.owner_url ? res.data.data.owner_url : "../../images/defultphoto.png" ,
               userInfo: {
                 header: res.data.data.owner_url ? res.data.data.owner_url : "../../images/defultphoto.png" ,
                 name: res.data.data.name,
               }
             })


           } else {
             that.setData({
               bgImge: "../../images/bg.png",
               userInfo: {
                 header: "../../images/defultphoto.png",
                 name: "登录",
               }
             })
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
       
     }else{
    
       that.setData({
         tabListBool: false,
         bgImge:"../../images/bg.png",
         userInfo: {
           header: "../../images/defultphoto.png",
           name: "登录",
         }
       })
     }
   
  
   },
})