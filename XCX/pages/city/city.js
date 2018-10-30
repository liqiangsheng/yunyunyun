// pages/city/city.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cityName:"", //  点击城市的下标
    toView: "",
      cityAll:"",
    Letter:[
      { id: "ANHUISHENG", name: "安徽省" },
      { id: "Macao" , name: "澳门特别行政区" },
      { id: "BEIJINGSHI", name: "北京市" },
      { id: "FUJIANSHENG", name: "福建省"  },
      { id: "GUANGDONGSHENG", name: "广东省" },
      { id: "GUANGXIZHUANGZUZIZHIQU", name: "广西壮族自治区" },
      { id: "GUIZHOUSHENG", name: "贵州省" },
      { id: "HEBEISHENG", name: "河北省" },
      { id: "HUBEISHENG", name: "湖北省" },
      { id: "GANSUSHENG", name: "甘肃省" },
      { id: "HEILONGJIANGSHENG" , name: "黑龙江省" },
      { id: "HAINANSHENG", name: "海南省" },
      { id: "HENANSHENG", name: "河南省" },
      { id: "HUNANSHENG", name: "湖南省" },
      { id: "JILINSHENG", name: "吉林省" },
      { id: "JIANGSUSHENG", name: "江苏省" },
      { id: "JIANGXISHENG", name: "江西省" },
      { id: "LIAONINGSHENG", name: "辽宁省" },
      { id: "NEIMENGGUZIZHIQU", name: "内蒙古自治区" },
      { id: "NINGXIAHUIZUZIZHIQU", name: "宁夏回族自治区" },
      { id: "QINGHAISHENG", name: "青海省" },
      { id: "SICHUANSHENG", name: "四川省" },
      { id: "SHANDONGSHENG", name: "山东省" },
      { id: "SHANGHAISHI", name: "上海市" },
      { id: "SHANXISHENG", name: "山西省" },
      { id: "SHANXISHENG", name: "陕西省" },
      { id: "TIANJINSHI", name: "天津市" },
      { id: "TAIWAN", name: "台湾省" },
      { id: "HongKong", name: "香港特别行政区" },
      { id: "XINJIANGWEIWUERZIZHIQU", name: "新疆维吾尔自治区" },
      { id: "XIZANGZIZHIQU", name: "西藏自治区" },
      { id: "YUNNANSHENG", name: "云南省" },
      { id: "ZHEJIANGSHENG", name: "浙江省" },
      { id: "ZHONGQINGSHI", name: "重庆市" },
    ]
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
    that.data.toView = e.target.dataset.item.id;
    let a = e.currentTarget.dataset.item.id;
    that.setData({
      toView: that.data.toView
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let data = wx.getStorageSync("provinceDetailAll")
    
    if(data){
     data.map((res,index)=>{
       
        if (res.name == "中国"){
          that.setData({
            cityAll: [res]
          })
         
        }
      
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