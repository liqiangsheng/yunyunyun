var apiDomian = require("../../js/api.js");  //数据请求api
var formatTime = require("../../js/formatTime.js"); // 时间戳转时间
let API = apiDomian.apidmain();
// pages/news/news.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    num:0,
    arr: [],
    activityNum:0,
    selectArr: [], //选中的
    price: 0,
    numPrice: 0,
    reduceGo: 0,
   

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let data = wx.getStorageSync("userInfo");
   
    if (data){
     
      wx.request({
        url: API.apiDomain + "/apis/activity/activityInfo/findOneWithGoods",
        method: "GET",
        header: {
          Authorization: "Bearer " + data.access_token
        },
        data: {
          id: options.id
        },
        success: (res => {
           if(res.data.status==true){

                that.setData({
                  arr:res.data.data
                })
             that.data.arr.startTimes = formatTime.formatTime(that.data.arr.startTime)
             let cityName = wx.getStorageSync("cityDetail");
             for (var i = 0; i < cityName.data.length; i++) {
               if (that.data.arr.regionId == cityName.data[i].id) {
                 that.data.arr.cityName = cityName.data[i].name
            
               }
             }
             that.setData({
               arr: that.data.arr
             })
             that.data.arr.activityGoodsVoList.map((item,index)=>{
               
               var date = new Date();
               var nowTime = date.getTime();
               that.data.arr.activityGoodsVoList[index].danId = that.data.arr.activityGoodsVoList[index].id+"dan";
               that.data.arr.activityGoodsVoList[index].bgItem = false; // 背景框选中
               that.data.arr.activityGoodsVoList[index].bntBj = false;// 按钮色
               that.data.arr.activityGoodsVoList[index].stateBool = true;// 状态
               that.data.arr.activityGoodsVoList[index].num = 0;// 数量
               that.data.arr.activityGoodsVoList[index].startTimes = formatTime.formatTime(that.data.arr.activityGoodsVoList[index].startTime)   
               that.data.arr.activityGoodsVoList[index].youhuijia = that.data.arr.activityGoodsVoList[index].originalPrice - that.data.arr.activityGoodsVoList[index].payPrice;
               if (that.data.arr.activityGoodsVoList[index].remaining<0){
                 that.data.arr.activityGoodsVoList[index].remainingState = "已售完";
                 that.data.arr.activityGoodsVoList[index].bntBj = false;
               } else if (nowTime < that.data.arr.startTime){  //活动的开始时间
                 console.log(nowTime,"sdasdas")
                 console.log(that.data.arr.activityGoodsVoList[index].endTime, "sdasdas")
                 that.data.arr.activityGoodsVoList[index].remainingState = "抢票中"
                 that.data.arr.activityGoodsVoList[index].bntBj = true;
               }else{
                 that.data.arr.activityGoodsVoList[index].remainingState = ""
                 that.data.arr.activityGoodsVoList[index].bntBj = false;
               }
               console.log(nowTime, "sdasdas")
               console.log(that.data.arr.startTime, "sdasdas")
             })

             that.data.arr.activityGoodsGroupVoList.map((item, index) => { // 组合票

               var date = new Date();
               var nowTime = date.getTime();
               that.data.arr.activityGoodsVoList[index].danId = that.data.arr.activityGoodsVoList[index].id + "duo";
               that.data.arr.activityGoodsGroupVoList[index].bgItem = false; // 背景框选中
               that.data.arr.activityGoodsGroupVoList[index].bntBj = false;// 按钮色
               that.data.arr.activityGoodsGroupVoList[index].stateBool = true;// 状态
               that.data.arr.activityGoodsVoList[index].num = 0;// 数量
               that.data.arr.activityGoodsGroupVoList[index].startTimes = formatTime.formatTime(that.data.arr.activityGoodsGroupVoList[index].startTime)
               that.data.arr.activityGoodsGroupVoList[index].youhuijia = that.data.arr.activityGoodsGroupVoList[index].originalPrice - that.data.arr.activityGoodsVoList[index].payPrice;
               if (that.data.arr.activityGoodsGroupVoList[index].remaining < 0) {
                 that.data.arr.activityGoodsGroupVoList[index].remainingState = "已售完";
                 that.data.arr.activityGoodsGroupVoList[index].bntBj = false;
               } else if (nowTime < that.data.arr.startTime) {
                 that.data.arr.activityGoodsGroupVoList[index].remainingState = "抢票中"
                 that.data.arr.activityGoodsGroupVoList[index].bntBj = true;
               } else {
                 that.data.arr.activityGoodsGroupVoList[index].remainingState = ""
                 that.data.arr.activityGoodsGroupVoList[index].bntBj = false;
               }
             })
             that.setData({
               arr: that.data.arr,
               meActivityBoxIsSHOW:true
             })
           }else{
             that.setData({
               meActivityBoxIsSHOW: false
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
        })
      })
      

    }else{
      wx.showModal({
        showCancel: false,
        title: "登录错误,请重新登录",
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  
   nextClick(){ // 下一步
   let that = this;
     if (that.data.selectArr.length<=0){
       wx.showToast({
         title: '请选择活动',
         icon:"success",
       })
       return;
     }else{
       wx.setStorageSync("buyData", that.data.selectArr)
       wx.navigateTo({
         url: '../../pages/registrationInformation/registrationInformation?'
       })
     }
  },
  selectedPrice(){ //选中的价格
    let that = this;
    let total;
    that.data.arr.forEach((item,index)=>{
      item.totalPrice = item.num * item.youhui;
    })

  },
  bgItemTap(e){ //点击每个列表的数据
    let bgIndex = e.currentTarget.dataset.bgindex;
    let that = this;
   
    if (e.currentTarget.dataset.bgindex1 == "one"){ //点击的单票
     if (that.data.arr.activityGoodsVoList[bgIndex].remainingState == "已售完"){
        wx.showToast({
          title: '该活动已售完',
          icon: "success",
        })
        return;

     } 
      that.data.arr.activityGoodsVoList[bgIndex].bgItem = !that.data.arr.activityGoodsVoList[bgIndex].bgItem;
      if(that.data.arr.activityGoodsVoList[bgIndex].bgItem == true){
        that.data.arr.activityGoodsVoList[bgIndex].num = 1;
        that.data.arr.activityGoodsVoList[bgIndex].index = bgIndex;
        that.data.selectArr.push(that.data.arr.activityGoodsVoList[bgIndex])
      }else{
        that.data.arr.activityGoodsVoList[bgIndex].index = bgIndex;
        that.data.arr.activityGoodsVoList[bgIndex].num = 0;
        that.data.selectArr.map((item,index)=>{
          if (item.danId == that.data.arr.activityGoodsVoList[bgIndex].danId){
            that.data.selectArr.splice(index,1)
          }
        })
      }
       that.setData({
         arr:that.data.arr,
         selectArr: that.data.selectArr
       })
     
    }else{//点击的是多票
        if ( that.data.arr.activityGoodsGroupVoList[bgIndex].remainingState == "已售完"){
          wx.showToast({
            title: '该活动已售完',
            icon: "success",
          })
          return;

        } 
      that.data.arr.activityGoodsGroupVoList[bgIndex].bgItem = !that.data.arr.activityGoodsGroupVoList[bgIndex].bgItem;
      if (that.data.arr.activityGoodsGroupVoList[bgIndex].bgItem == true) {
        that.data.arr.activityGoodsGroupVoList[bgIndex].num = 1;
        that.data.arr.activityGoodsVoList[bgIndex].index = bgIndex;
        that.data.selectArr.push(that.data.arr.activityGoodsGroupVoList[bgIndex])
      } else {
        that.data.arr.activityGoodsGroupVoList[bgIndex].num = 0;
        that.data.arr.activityGoodsVoList[bgIndex].index = bgIndex;
        that.data.selectArr.map((item, index) => {
          if (item.danId == that.data.arr.activityGoodsGroupVoList[bgIndex].danId) {
            that.data.selectArr.splice(index, 1)
          }
        })
      }
      that.setData({
        arr: that.data.arr,
        selectArr: that.data.selectArr
      })
    }
    let prices = 0, numPrices = 0, reduceGos = 0;
    that.data.selectArr.map((item, index) => {
      prices+= item.payPrice;
      numPrices += item.originalPrice;
      reduceGos += item.originalPrice - item.payPrice;
      })
   
    that.setData({
      price: prices,
      numPrice: numPrices,
      reduceGo: reduceGos
    })
   
  },
  reduceClick(e) { //减
    let that = this;
    let reducenum = e.currentTarget.dataset.index;
    that.data.arr[reducenum].num--;


    if (that.data.arr[reducenum].num <= 0) {
      wx.showToast({
        title: '已经是最小值！',
        icon: 'success',
        duration: 2000
      })
      that.data.arr[reducenum].num = 0;
      that.setData({ arr: that.data.arr })
    } else {
      that.setData({
        arr: that.data.arr
      })
    }

  },
  addClick(e) { //加
    let that = this;
    let addnum = e.currentTarget.dataset.index;
    that.data.arr[addnum].num++;
    that.setData({ arr: that.data.arr })
  },
})