// pages/release/release.js
var apiDomian = require("../../js/api.js");  //数据请求api
var formatTime = require("../../js/formatTime.js"); // 时间戳转时间
var reg = require("../../js/reg.js"); //正则
let API = apiDomian.apidmain();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    registrationInformationBoxShow:false, //初始页面显示不显示
    activityId: "", //去除的id
    userId: "",  //去除的id
    hiddenmodalput: true,//领域
    hiddenmodalput1: true,//领域
    arrayIndex: 0, //身份证
    arrayIndex1: 0, //性别
    arrayIndex3: 0, //获取渠道
    allowEmptyData:[], //必填
    allowEmptyData1: [],//非必填
    domains:[], // 领域
    modalinputIndex:0,
    checkboxChangeValueIndex: "", //公司领域选择
    checkboxChangeValueIndex1: "", //感兴趣领域选择
    obj:{},
    areaArr:"请选择", // 城市选择的名字
    regionId: "", // 城市选择的id

  },
  citySelection(){ //选择城市点击
      wx.navigateTo({
        url: '../../pages/city/city',
      })
  },
  //点击按钮痰喘指定的hiddenmodalput弹出框
  modalinput: function (e) {
    let that = this;
    let dataIndex = e.currentTarget.dataset.index;
    if (e.currentTarget.dataset.item.code =="corpDomains"){
      that.setData({
        hiddenmodalput: !that.data.hiddenmodalput,
        modalinputIndex: e.currentTarget.dataset.index,
        checkboxChangeValueIndex: dataIndex   //公司领域选择
      })
    } else if (e.currentTarget.dataset.item.code == "interestedDomains"){
      that.setData({
        hiddenmodalput1: !that.data.hiddenmodalput1,
        modalinputIndex: e.currentTarget.dataset.index,
        checkboxChangeValueIndex1: dataIndex    //感兴趣领域选择
      })
    }
  },
  //取消按钮
  cancel: function () {
    let that = this;
    that.setData({
      hiddenmodalput: true,
      hiddenmodalput1: true
    });
  },
  //确认
  confirm: function (e) {
    let that = this;
    that.setData({
      hiddenmodalput: true,
      hiddenmodalput1: true
    })
  },
  checkboxChange1(e) { ////感兴趣领域选择
    let that = this;
    that.data.allowEmptyData1[that.data.checkboxChangeValueIndex1].value = e.detail.value;
    that.setData({
      allowEmptyData1: that.data.allowEmptyData1
    })
    if (that.data.allowEmptyData1[that.data.checkboxChangeValueIndex1].value != "") {
      that.data.allowEmptyData1[that.data.checkboxChangeValueIndex1].selerctorValue = "已选择"
    } else {
      that.data.allowEmptyData1[that.data.checkboxChangeValueIndex1].selerctorValue = "请选择"
    }
    that.setData({
      allowEmptyData1: that.data.allowEmptyData1
    })
  },
  checkboxChange(e) { ////公司领域选择
    let that = this;
 
    that.data.allowEmptyData1[that.data.checkboxChangeValueIndex].value = e.detail.value;
   
    that.setData({
      allowEmptyData1: that.data.allowEmptyData1
    })
    if (that.data.allowEmptyData1[that.data.checkboxChangeValueIndex].value != "") {
      that.data.allowEmptyData1[that.data.checkboxChangeValueIndex].selerctorValue = "已选择"
    } else {
      that.data.allowEmptyData1[that.data.checkboxChangeValueIndex].selerctorValue = "请选择"
    }
    that.setData({
      allowEmptyData1: that.data.allowEmptyData1
    })
  },
  information(e){ //必填失去焦点
    let dataIndex = e.currentTarget.dataset.index;
    let that = this;

   
    if (that.data.allowEmptyData[dataIndex].code == "mobile1No") { //正则判断手机号码2
      reg.phone(e.detail.value)
    }
    // if (that.data.allowEmptyData[dataIndex].code == "idNo") { //正则判断手机号码2
    //   reg.ID(e.detail.value)
    // }
    that.data.allowEmptyData[dataIndex].value = e.detail.value;
    that.setData({

      allowEmptyData: that.data.allowEmptyData

  })
     
  },
  bindPickerChange: function (e) { //选择性别
    
    let dataIndex = e.currentTarget.dataset.index;
    let that = this;
    if (e.currentTarget.dataset.item.code == "sex"){ //性别
      that.setData({
        arrayIndex1: e.detail.value
      })
    }
    if (e.currentTarget.dataset.item.code == "idType") { //身份证
  
      that.setData({
        arrayIndex: e.detail.value
      })
    }
    if (e.currentTarget.dataset.item.code == "gainChannel") { //获取渠道

      that.setData({
        arrayIndex3: e.detail.value
      })
    }
    that.data.allowEmptyData[dataIndex].value = e.detail.value;
    that.setData({
      allowEmptyData: that.data.allowEmptyData
    })
  },
  information1(e) { //非必填失去焦点
    let dataIndex = e.currentTarget.dataset.index;
    let that = this;
    that.data.allowEmptyData1[dataIndex].value = e.detail.value;
    that.setData({
      allowEmptyData1: that.data.allowEmptyData1
    })

  },
  bindPickerChange1: function (e) { //选择框选择

    let dataIndex = e.currentTarget.dataset.index;
    let that = this;
   
    if (e.currentTarget.dataset.item.code == "gainChannel") { //获取渠道

      that.setData({
        arrayIndex3: e.detail.value
      })
    }
    if (e.currentTarget.dataset.item.code == "sex") { //性别
      that.setData({
        arrayIndex1: e.detail.value
      })
    }
    if (e.currentTarget.dataset.item.code == "idType") { //身份证

      that.setData({
        arrayIndex: e.detail.value
      })
    }
    that.data.allowEmptyData1[dataIndex].value = e.detail.value;
    that.setData({
      allowEmptyData1: that.data.allowEmptyData1
    })
  },
  nextgo() { //下一步
    let that = this;
      for (let i = 0; i < that.data.allowEmptyData.length;i++){ //判断必填的有没有填
      if (that.data.allowEmptyData[i].value == "" || !that.data.allowEmptyData[i].value){
          wx.showModal({
            showCancel: false,
            title: that.data.allowEmptyData[i].displayName+"为必填项",
            icon: 'success',
          })
          return;
      }
        if (that.data.allowEmptyData[i].code == "mobile1No") { //正则判断手机号码2
          let msg = /^1[3456789]\d{9}$/;
          if (msg.test(that.data.allowEmptyData[i].value) == false) {
            wx.showModal({
              showCancel: false,
              title: "手机号码有误",
              icon: 'success',
            })
            return;
          }
         
        }
    }
    
    let arr = []; 
    arr = [...that.data.allowEmptyData, ...that.data.allowEmptyData1, that.data.activityId, that.data.userId]
    arr.map((item,index)=>{
      if (item.code == "regionId"){
        arr[index].value = that.data.regionId;
      }
    })
    wx.setStorageSync("RegistrationData", arr) //报名信息存本地
    wx.navigateTo({ //到是否智能匹配页面
      url: '../../pages/Intelligence/Intelligence',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let data = wx.getStorageSync("userInfo");
    let dictionaries = wx.getStorageSync("dictionaries"); // 字典
  
    dictionaries.data.map((item, index) => {// 领域

      if (dictionaries.data[index].code =='trade_domain'){
        dictionaries.data[index].values.map((item1,index1)=>{
          dictionaries.data[index].values[index1].checked = false;
        })
        that.setData({
          domains: dictionaries.data[index].values
        })
      }
    })
    let cityDetail = wx.getStorageSync("cityDetail"); // 城市
    wx.showLoading({
      title: '加载中...',
    })
    let url = '/apis/activity/' + API.activityEdition +'/activitySignupNoteSetting/findByVersionToClient';
    wx.request({
      url: API.apiDomain + url,
      method:"GET",
      header:{
        Authorization: "Bearer " + data.access_token
      },
      success:(res=>{
        wx.hideLoading() // 关闭弹窗
        let allowEmptyDatas=[], allowEmptyData1s=[];
        if(res.data.status==true){
          res.data.data.map((item,index)=>{
            // console.log(item,"danjkdkaskdaksnk")
            res.data.data[index].value="";
            res.data.data[index].selerctorValue = "请选择";
            dictionaries.data.map((item1, index1) => {
              if (item.name == item1.code){
                res.data.data[index].valuesArr1 = item1.values;
              }
            })
            if (item.code == "idType") { //身份证
              let arr =[];
              res.data.data[index].value = "1",
              res.data.data[index].valuesArr1.map((item,index)=>{
                arr.push(item.name)
              })
              res.data.data[index].valuesArr = arr;
            }
            if (item.code == "gainChannel") { //"获取渠道"
              let arr = [];
              res.data.data[index].value = "1",
              res.data.data[index].valuesArr1.map((item, index) => {
                arr.push(item.name)
              })
              res.data.data[index].valuesArr = arr;
            }
            if (item.code == "sex"){ //性别
              res.data.data[index].value = "0",
              res.data.data[index].valuesArr = ["男","女"];
            }
            if (item.code == "mobile1CountryNo") { //国家码
              res.data.data[index].value = "86",
                res.data.data[index].valuesArr = ["86"];
            }
            if (item.code == "regionId") { //地区
              let cityArr = [];
              res.data.data[index].value = "1",
              cityDetail.data.map((item1,index1)=>{
                cityArr.push(item1.name)
                
              })
              res.data.data[index].valuesArr = cityArr
            }
            if (item.code == "activityId") {  //去掉
              that.setData({
                activityId: item
              })
              res.data.data.splice(index, 1)
            }
          })
          
           res.data.data.map((item,index)=>{
             
             
             if (item.allowEmpty == false){
               allowEmptyDatas.push(item)
               allowEmptyDatas.map((item, index) => {
                 if (item.code == "userId") {//去掉
                   that.setData({
                     userId: item
                   })
                   allowEmptyDatas.splice(index, 1)
                 }
                 
               })
             }else{
               allowEmptyData1s.push(item)
               allowEmptyData1s.map((item,index)=>{
                 if (item.code == "userId") {
                   that.setData({
                     userId: item
                   })
                   allowEmptyData1s.splice(index, 1)
                 }
               })
             }
           })
           that.setData({
             registrationInformationBoxShow:true,
             allowEmptyData: allowEmptyDatas,
             allowEmptyData1: allowEmptyData1s
           })
        }else{
          that.setData({
            registrationInformationBoxShow: false,
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

  },
 
  corpDomains(e) { //公司所属领域 //感兴趣的领域
    
  },
  
})