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
    leftList: [],//左侧集合
    rightList: [],//右侧集合
    listData: [
      { title: "可爱大方的小果果搞怪", url: "../../images/1.png", time: 154189654123654 },
      { title: "可爱大方的小果果搞怪可爱大方的小果果搞怪可爱大方的小果果搞怪121312312", url: "../../images/2.png", time: 154189654123654 },
      { title: "可爱大方的小果果搞怪", url: "../../images/3.png", time: 154189654123654 },
      { title: "可爱大方的小果果搞怪", url: "../../images/5.png", time: 154189654123654 },
      { title: "可爱大方的小果果搞怪", url: "../../images/4.png", time: 154189654123654 },
      { title: "可爱大方的小果果搞怪", url: "../../images/6.png", time: 154189654123654 },
      { title: "可爱大方的小果果搞怪", url: "../../images/4.png", time: 154189654123654 },
      { title: "可爱大方的小果果搞怪", url: "../../images/4.png", time: 154189654123654 },
    ], //数据
    pageNum: 0,
    data: {
      p: 1, // request param//
      s: 20, // request param//
      bookId: "7",
    },
  },
  attached: function () { //第一个生命周期方法
  let that= this;
    let data = wx.getStorageSync("userInfo")
    if (data) {
      that.data.listData.map(res=>{
        res.timeI = formatTime.formatTime5(res.time)
       
      })
      that.setData({
        listData: that.data.listData
      })

      console.log(that.data.listData)
  
    }

  },
  

 

  /**
   * 组件的方法列表
   */
  methods: {
    updataMore(){ //点击加载更多

    }
  }
})
