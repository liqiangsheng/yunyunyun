var apiDomian = require("../../js/api.js");
let API = apiDomian.apidmain();
// pages/me/me.js
const app = getApp()
var leftList = new Array();//左侧集合
var rightList = new Array();//右侧集合
var leftHight = 0, rightHight = 0, itemWidth = 0, maxHeight = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message: "加载中...",
    leftList: [],//左侧集合
    rightList: [],//右侧集合
    listData: [], //数据
    pageNum: 0,
    data: {
      p: 1, // request param//
      s: 20, // request param//
    },
    meTab: ["原创", "草稿"],//原创 草稿
    meTabIndex: 0,//原创 草稿
    tabList: [{ name: "关注", num: "2000" }, { name: "粉丝", num: "1.5万" }, { name: "点赞", num: "5000" }, { name: "收藏", num: "100" }, { name: "评论", num: "265" },],
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
  Me_tabClick(e) { ////原创 草稿
    this.setData({
      meTabIndex: e.currentTarget.dataset.index
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
    console.log(data)
    if (data) {
      wx.getSystemInfo({ //获取用户设备信息
        success: (res) => {
          let percentage = 750 / res.windowWidth; //750rpx/屏幕宽度
          let margin = 20 / percentage; //计算瀑布流间距
          itemWidth = (res.windowWidth - margin) / 2; //计算 瀑布流展示的宽度
          maxHeight = itemWidth / 0.8  //计算瀑布流的最大高度，防止长图霸屏
        }
      });
      let that = this;
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
            that.setData({
              pageNum: Math.ceil(res.data.total / that.data.data.s)
            })
            // if (that.data.pageNum > 1) {
            //   that.setData({
            //     message: '加载中...'
            //   })
            // } else {
            //   that.setData({
            //     message: '这是我的底线...'
            //   })
            // }
            res.data.data.map((item, index) => {
              item.height = parseInt(item.cover.height);
              item.width = parseInt(item.cover.width);
            })

            setTimeout(() => {

              that.setData({
                listData: res.data.data
              })
              that.fillData(false, res.data.data);
            }, 100)
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
    if (this.data.meTabIndex==0){
      this.moreTap();
    }
   
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
     console.log(data.userType,"data.userType")
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
    wx.navigateTo({
      url: '../../pages/findDetail/findDetail?id=' + e.currentTarget.dataset.id,
    })
  },
  moreTap() {
    let data = wx.getStorageSync("userInfo")
    this.data.data.p++;
    this.setData({
      data: this.data.data
    })
    let that = this;
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
        // userId: "100",
        pubStatus: true
      },

      success: function (res) {
        if (res.data.status == true) {
          that.setData({
            pageNum: Math.ceil(res.data.total / that.data.data.s)
          })
          res.data.data.map((item, index) => {
            item.height = parseInt(item.cover.height);
            item.width = parseInt(item.cover.width);

          })


          setTimeout(() => {
            if (res.data.data.length > 0) {
              that.setData({
                listData: that.data.listData.concat(res.data.data)
              })

              that.fillData(true, that.data.listData);
            } else {
              that.setData({
                message:"这是我的底线..."
              })
            }

          }, 100)
        } else {
          wx.showModal({
            showCancel: false,
            title: "网络异常",

          })
        }


      }
    })
  },
  /**
   * 填充数据
   */
  fillData: function (isPull, listData) {
    if (isPull) { //是否下拉刷新，是的话清除之前的数据
      leftList.length = 0;
      rightList.length = 0;
      leftHight = 0;
      rightHight = 0;
    }
    for (let i = 0, len = listData.length; i < len; i++) {
      let tmp = listData[i];
      tmp.width = parseInt(tmp.width); //宽度
      tmp.height = parseInt(tmp.height);//
      tmp.itemWidth = itemWidth
      let per = tmp.width / tmp.itemWidth;
      tmp.itemHeight = tmp.height / per;
      if (tmp.itemHeight > maxHeight) {
        tmp.itemHeight = maxHeight;
      }

      if (leftHight == rightHight) {
        leftList.push(tmp);
        leftHight = leftHight + tmp.itemHeight;
      } else if (leftHight < rightHight) {
        leftList.push(tmp);
        leftHight = leftHight + tmp.itemHeight;
      } else {
        rightList.push(tmp);
        rightHight = rightHight + tmp.itemHeight;
      }
    }

    this.setData({
      leftList: leftList,
      rightList: rightList,
    });

    leftList = [];
    rightList = [];
    leftHight = 0;
    rightHight = 0;
  },
})