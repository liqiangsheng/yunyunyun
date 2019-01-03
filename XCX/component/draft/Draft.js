// component/draft/Draft.js
var apiDomian = require("../../js/api.js");
let API = apiDomian.apidmain();
var formatTime = require("../../js/formatTime.js"); // 时间戳转时间
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  /**
  * 组件的初始数据
  */
  data: {
    message: "不同努力加载中...",
    listData: [], //数据
    pageNum: 0,
    data: {
      p: 1, // request param//
      s: 20, // request param//
    },
  },
  attached: function () { //第一个生命周期方法
  let that= this;
    wx.showLoading({ //显示消息提示框  此处是提升用户体验的作用
      title: '数据加载中',
      icon: 'loading',
    });
    let data = wx.getStorageSync("userInfo")
    if (data) {
  
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
          pubStatus: false
        },
        complete() {  //请求结束后隐藏 loading 提示框
          wx.hideLoading();
        },


        success: function (res) {

          if(res.data.status == true){
           
       
            let num = Math.ceil(res.data.total / that.data.data.s);
            that.setData({
              pageNum: num
            })
          
            if (num > 1) {
              that.setData({
                message: '点击加载更多...'
              })
            } else {
              that.setData({
                message: '这是我的底线...'
              })
            }

            res.data.data.forEach((item,index) => {
            
              item.timeI = formatTime.formatTime5(item.updateTime) 
            
            })
          
            that.setData({
              listData: res.data.data
            })

          }else{
            wx.showModal({
              showCancel: false,
              title: "网络异常",

            })
          }
         

        }
      })  
    }

  },
  

 

  /**
   * 组件的方法列表
   */
  methods: {
    updataMore(){ //点击加载更多
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
          //  userId: "100",
          pubStatus: false
        },

        success: function (res) {

          if(res.data.status==true){
            res.data.data.forEach((item, index) => {
              item.timeI = formatTime.formatTime5(item.updateTime)
              

            })
            if (res.data.data.length>0){
              that.setData({
                listData: that.data.listData.concat(res.data.data)

              })
            }else{
              wx.showModal({
                showCancel: false,
                title: "这是我的底线...",

              })
            }
           
          }else{
            wx.showModal({
              showCancel: false,
              title: "网络异常",

            })
          }
        

        }
      })
       
    }
  }
})
