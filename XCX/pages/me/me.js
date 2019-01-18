var apiDomian = require("../../js/api.js");
let API = apiDomian.apidmain();
// pages/me/me.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    styleWidth1:"522px",//草稿分页
    p1: 1,  //草稿页
    s1: 20, //草稿每页多少
    pages1: 0, //草稿总共多少页
    imgsArr1: [],//草稿原创数据
    imgsArr: [],//原创数据
    styleWidth: "522px",//原创分页
    pageNum: 0,
    data: {
      p: 1, // request param//
      s: 20, // request param//
    },
    meTab: ["原创", "草稿"],//原创 草稿
    meTabIndex: 0,//原创 草稿
    tabListBool: false, //显示
    bgImge:"../../images/bg.png",
    userInfo: {
      header: "../../images/defultphoto.png",
      name: "登录",
    },
    objList:{},
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
  draft(){//草稿到底
    this.data.p1++;
    this.setData({
      p1: this.data.p1
    })
    let that = this;
    let data = wx.getStorageSync("userInfo")
    wx.request({
      url: API.apiDomain + '/apis/operation/' + API.operationEdition + '/customerPubContent/listOwner',
      method: "POST",
      header: {
        "Authorization": "bearer " + data.access_token
      },
      data: {
        p: this.data.p1,
        s: this.data.s1,
        userId: data.id,
        // userId:"100",
        pubStatus: false
      },
      complete() {  //请求结束后隐藏 loading 提示框
        wx.hideLoading();
      },

      success: function (res) {
        if (res.data.status == true) {
          wx.hideLoading();
          if (res.data.data.length>0){
            res.data.data.forEach((item, index) => {
              item.imageUrl1 = item.cover.url + "?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim"
            })

            that.setData({
              imgsArr1: that.data.imgsArr1.concat(res.data.data)
            })
          }else{
            wx.showModal({
              showCancel: false,
              title: "没有更多草稿了",
            })
          }
          if (that.data.imgsArr1.length > 1) {
            that.setData({
              styleWidth1: that.data.imgsArr1.length * 220 + 72 + "px"
            })
          } else {
            that.setData({
              styleWidth1: 440 + 72 + "px"
            })
          }
        } else {
          
          wx.showModal({
            showCancel: false,
            title: "网络异常",

          })
        }


      },

    })
  },
  original(e){//原创 到底
   
    this.data.data.p++;
    this.setData({
      data: this.data.data
    })
    let that = this;
    let data = wx.getStorageSync("userInfo")
    wx.request({
      url: API.apiDomain + '/apis/operation/' + API.operationEdition + '/customerPubContent/listOwner',
      method: "POST",
      header: {
        "Authorization": "bearer " + data.access_token
      },
      data: {
        p: that.data.data.p,
        s: that.data.data.s,
        userId: data.id,
        pubStatus: true
      },

      success: function (res) {
        if (res.data.status == true) {
          res.data.data.forEach((item, index) => {
            item.imageUrl1 = item.cover.url + "?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim"
          })
            if (res.data.data.length > 0) {
              that.setData({
                imgsArr: that.data.imgsArr.concat(res.data.data)
              })
              
            } else {
              wx.showModal({
                showCancel: false,
                title: "没有更多原创了",

              })
            }
          console.log(that.data.imgsArr,"that.data.imgsArr")
          if (that.data.imgsArr.length > 1) {
            that.setData({
              styleWidth: that.data.imgsArr.length * 220 + 72 + "px"
            })
          } else {
            that.setData({
              styleWidth: 440 + 72 + "px"
            })
          }
        } else {
          wx.showModal({
            showCancel: false,
            title: "网络异常",

          })
        }


      }
    })
  },
  myfollowBnt(e){
    // console.log(e.currentTarget.dataset.item)

    let v = e.currentTarget.dataset.item;
    let data = wx.getStorageSync('userInfo')//获取本地存储信息
    if (data) {
      if (v == "1") {
        wx.navigateTo({ //去我的页面关注
          url: "../../pages/myfollow/myfollow"
        })
      
      } else if (v == "2") {
        wx.navigateTo({ //去我的页面粉丝
          url: "../../pages/fans/fans"
        })
      } else if (v == "3") {
        wx.navigateTo({ //去我的页面点赞
          url: "../../pages/myFabulous/myFabulous"
        })
       
      } else if (v == "4") {
        wx.navigateTo({ //去我的页面收藏
          url: "../../pages/myCollection/myCollection"
        })
      
      } else if (v == "5") {
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
    let data = wx.getStorageSync("userInfo")
   
    if (data) {
    
      wx.showLoading({ //显示消息提示框  此处是提升用户体验的作用
        title: '数据加载中',
        icon: 'loading',
      });
      wx.request({
        url: API.apiDomain + '/apis/operation/' + API.operationEdition + '/customerPubContent/listOwner',
        method: "POST",
        header: {
          "Authorization": "bearer " + data.access_token
        },
        data: {
          p: this.data.data.p,
          s: this.data.data.s,
          userId: data.id,
          // userId:"100",
          pubStatus: true
        },
        complete() {  //请求结束后隐藏 loading 提示框
          wx.hideLoading();
        },

        success: function (res) {
          if (res.data.status == true) {
            wx.hideLoading();
            res.data.data.forEach((item, index) => {
              item.imageUrl1 = item.cover.url + "?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim"
            })
            that.setData({
              pageNum: Math.ceil(res.data.total / that.data.data.s),
                imgsArr: res.data.data 
            })
            if (that.data.imgsArr.length>1){
              that.setData({
                styleWidth: that.data.imgsArr.length * 220+72 + "px" 
              })
            }else{
              that.setData({
                styleWidth:  440+72+ "px" 
              })
            }
      
          } else {
            wx.showModal({
              showCancel: false,
              title: "网络异常",

            })
          }


        },

      })
      // 草稿
      wx.request({
        url: API.apiDomain + '/apis/operation/' + API.operationEdition + '/customerPubContent/listOwner',
        method: "POST",
        header: {
          "Authorization": "bearer " + data.access_token
        },
        data: {
          p: this.data.p1,
          s: this.data.s1,
          userId: data.id,
          // userId:"100",
          pubStatus: false
        },
        complete() {  //请求结束后隐藏 loading 提示框
          wx.hideLoading();
        },

        success: function (res) {
          if (res.data.status == true) {
            wx.hideLoading();
            res.data.data.forEach((item, index) => {
              item.imageUrl1 = item.cover.url + "?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim"
            })
            that.setData({
              pages1: Math.ceil(res.data.total / that.data.s),
              imgsArr1: res.data.data
            })
            if (that.data.imgsArr1.length > 1) {
              that.setData({
                styleWidth1: that.data.imgsArr1.length * 220 +72+ "px"
              })
            } else {
              that.setData({
                styleWidth1: 440 +72+ "px"
              })
            }

          } else {
            wx.showModal({
              showCancel: false,
              title: "网络异常",

            })
          }


        },

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
      wx.navigateTo({
        url: "../../pages/editingInformation/editingInformation"
      })
    }
   

  },

   userInfoFun(){ //登录本地拿
     var that = this
     let data = wx.getStorageSync('userInfo')//获取本地存储信息
    //  console.log(data.userType,"data.userType")
     if (data){
       that.setData({
         tabListBool:true
       })
       wx.showToast({
         title: '加载中',
         icon: 'loading',
         duration: 20000
       })
       if (data.userType == '2'){ //个人
         wx.request({ //设置的默认东西

           url: API.apiDomain + '/apis/operation/' + API.operationEdition + '/commonUser/findCommonUserById',
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
               wx.hideToast();
               res.data.data.care_count = res.data.data.care_count ? res.data.data.care_count : 0;
               res.data.data.cared_count = res.data.data.cared_count ? res.data.data.cared_count : 0;
               res.data.data.comment_count = res.data.data.comment_count ? res.data.data.comment_count : 0;
               res.data.data.favorite_count = res.data.data.favorite_count ? res.data.data.favorite_count : 0;
               res.data.data.laud_count = res.data.data.laud_count ? res.data.data.laud_count : 0;
               that.setData({
                 bgImge: res.data.data.owner_url ? res.data.data.owner_url : "../../images/defultphoto.png",
                 userInfo: {
                   header: res.data.data.owner_url ? res.data.data.owner_url : "../../images/defultphoto.png",
                   name: res.data.data.name,
                 },
                 objList: res.data.data,
               })
               //  console.log(that.data.objList,"fsdkfsdk")

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
       }else{//企业
         wx.request({ //设置的默认东西

           url: API.apiDomain + '/apis/operation/' + API.operationEdition + '/companyInfo/findCompanyInfoById',
           method: "GET",
           data: {
             companyId: data.id
           },
           header: {
             'Content-Type': 'application/json',
             'Accept': 'application/json',
             "Authorization": "Bearer " + data.access_token
           },
           success:function(res){
             if (res.data.status == true) {
               wx.hideToast();
               res.data.data.care_count = res.data.data.care_count ? res.data.data.care_count : 0;
               res.data.data.cared_count = res.data.data.cared_count ? res.data.data.cared_count : 0;
               res.data.data.comment_count = res.data.data.comment_count ? res.data.data.comment_count : 0;
               res.data.data.favorite_count = res.data.data.favorite_count ? res.data.data.favorite_count : 0;
               res.data.data.laud_count = res.data.data.laud_count ? res.data.data.laud_count : 0;
               that.setData({
                 bgImge: res.data.data.owner_url ? res.data.data.owner_url : "../../images/defultphoto.png",
                 userInfo: {
                   header: res.data.data.owner_url ? res.data.data.owner_url : "../../images/defultphoto.png",
                   name: res.data.data.name,
                 },
                 objList: res.data.data,
               })
               //  console.log(that.data.objList,"fsdkfsdk")

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
       }
       
       
     }else{
       wx.navigateTo({
         url: '../../pages/login/login',
       })
    
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
  goDetail(e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../../pages/findDetail/findDetail?id=' + e.currentTarget.dataset.id,
    })
  },



})