var apiDomian = require("../../js/api.js");
let API = apiDomian.apidmain();
// pages/city/city.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cityShow:false,  //城市数据请求成功显示
    cityName:"", //  点击城市的下标
    toView: "",  //去到 那个字母下面
    cityAll:"", //所有城市存放
    Letter:[] //字母存放
  },
  shiClick(e){ //点击城市

    let that = this;
    let cityName = e.currentTarget.dataset.item.name;
    that.setData({
      cityName: cityName
    })
  
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    prevPage.setData({
      areaArr: e.currentTarget.dataset.item.name,
      regionId: e.currentTarget.dataset.item.id
    })
    wx.navigateBack({
      delta: 1,
    })

  },
  //右边导航栏锚点跳转
  setScrollTop: function (e) {
    let that = this;
    that.data.toView = e.target.dataset.item;
    let a = e.currentTarget.dataset.item;
    console.log(e.target.dataset.item,"dabskdaksdk")
    that.setData({
      toView: that.data.toView
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    let that = this;

    wx.request({// 城市
      url: API.apiDomain + '/apis/system/sysRegion/singlelevel?level=city',
      success(res) {
        if (res.data.status == true) {
        
          let cityArr = [];
          res.data.data.map((item,index)=>{
            item.sort = item.capitalPinyin.charAt(0); //找出首字母
    
          })
          res.data.data.map((item,index)=>{
            cityArr.push(item.sort); 
          })
          var arr2 = [], allArr = [] ;//去重
          for (var i = 0; i < cityArr.length; i++) {
            if (arr2.indexOf(cityArr[i]) == -1) {
              arr2.push(cityArr[i]);
            }
          }
        
          arr2.map((item,index)=>{ //创造对应的数组
            allArr.push({ "key": item,"children":[]})
           
          })
     
          allArr.map((item,index)=>{  //把相同字母开头的放在一起
             res.data.data.map((item1,index1)=>{

               if (item.key == item1.sort){
                 item.children.push(item1)
                
               }
             })
          })
         
          that.setData({
            cityShow:true,
            Letter: arr2,
            cityAll: allArr,
          })
         
        } else {
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

    
    // if(data){
    //  data.map((res,index)=>{
       
    //     if (res.name == "中国"){
    //       that.setData({
    //         cityAll: [res]
    //       })
         
    //     }
      
    //   })
      
    // }
  
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

  }
})