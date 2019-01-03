// component/components.js
/**
 * 瀑布流组件
 */
var apiDomian = require("../../js/api.js");
let API = apiDomian.apidmain();
var leftList = new Array();//左侧集合
var rightList = new Array();//右侧集合
var leftHight = 0, rightHight = 0, itemWidth = 0, maxHeight = 0;

Component({
  properties: {},
  data: {
    message:"不同努力加载中...",
    leftList: [],//左侧集合
    rightList: [],//右侧集合
    listData:[], //数据
    pageNum:0,
    data: {
      p: 1, // request param//
      s: 20, // request param//
    },
  },

  attached: function () { //第一个生命周期方法

   let data= wx.getStorageSync("userInfo")
    if(data){
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
          p:this.data.data.p,
          s: this.data.data.s,
          userId:data.id,
          // userId:"100",
          pubStatus:true
        },
        complete() {  //请求结束后隐藏 loading 提示框
          wx.hideLoading();
        },

        success: function (res) {
          if(res.data.status == true){
            that.setData({
              pageNum: Math.ceil(res.data.total / that.data.data.s)
            })
            if (that.data.pageNum > 1) {
              that.setData({
                message: '点击加载更多...'
              })
            } else {
              that.setData({
                message: '这是我的底线...'
              })
            }
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
          }else{
            wx.showModal({
              showCancel: false,
              title: "网络异常",

            })
          }
          

        },
        
      })
    }
   
  },

  methods: {
    goDetail(e){
      wx.navigateTo({
        url: '../../pages/findDetail/findDetail?id=' + e.currentTarget.dataset.id,
      })
    },
    moreTap(){
      let data = wx.getStorageSync("userInfo")
      this.data.data.p++;
      this.setData({
        data: this.data.data
      })
      let that= this;
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
          if(res.data.status ==true){
            that.setData({
              pageNum: Math.ceil(res.data.total / that.data.data.s)
            })
            res.data.data.map((item, index) => {
              item.height = parseInt(item.cover.height);
              item.width = parseInt(item.cover.width);
            
            })


            setTimeout(() => {
              if(res.data.data.length>0){
                that.setData({
                  listData: that.data.listData.concat(res.data.data)
                })
              
                that.fillData(true, that.data.listData);
              }else{
                wx.showModal({
                  showCancel: false,
                  title: "这是我的底线...",

                })
              }
            
            }, 100)
          }else{
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

      leftList=[];
      rightList=[];
      leftHight = 0;
      rightHight = 0;
    },
  }
})
