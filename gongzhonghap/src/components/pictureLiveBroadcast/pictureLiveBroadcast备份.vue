<template>
  <div id="pictureLiveBroadcast">

    <div class="pictureLiveBroadcast_box" ref="box">
      <!--轮播-->
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,index) in banner">
            <div class="imgIs">
              <img :src="item.imageUrl" >
            </div>
          </div>
        </div>
      </div>
      <!---->
      <div class="pictureLiveBroadcast_title">
          <h5>{{objDataTitle.name}}</h5>
          <div class="pictureLiveBroadcast_titleItem">已有 <span>{{objDataTitle.viewCount}}</span> 人次浏览了此相册</div>
          <div class="pictureLiveBroadcast_titleItem"><img src="/static/images/time.png" alt="">{{objDataTitle.bookTime|formatTime}}</div>
          <div class="pictureLiveBroadcast_titleItem"><img src="/static/images/position.png" alt="">{{objDataTitle.regionName}}</div>
      </div>
    </div>
<!--图片直播-->
    <ul class="pictureLiveBroadcast_tab"  :style="fixedStyle">
      <li v-for="(item,index) in tabAtt" @click="stateClick(index)"><span class="span" :class="{active:tabState==index}">{{item}}</span><br><span class="span1"  v-if="tabState == index"></span></li>
    </ul>
    <div class="pictureLiveBroadcast_center" v-show="tabState == 0" >
      <div class="pictureLiveBroadcast_center_fixed" @click="goBackTop" v-show="gotopShow">共 {{total}} 张 ▲</div>
      <waterfall :col='col' :width="itemWidth1" :gutterWidth="gutterWidth1"  :data="data"  @loadmore="loadmore">
        <template >
          <div class="cell-item" v-for="(item,index) in data" @click="clickFn(item,index)">
            <img v-lazy="item.imageUrl1":style="'height:'+(185/item.width)*item.height/100+'rem'"/>
          </div>
        </template>
      </waterfall>
    </div>
    <!--热门图片-->
    <ul class="pictureLiveBroadcast_ul" v-show="tabState == 1">
         <li v-for="(item,index) in imgsArr1" v-if="index<3" class="li1" @click="goToImg(item,imgsArr1,index)">
           <img v-lazy="item.imageUrl1" alt="">
           <div :class="[{active1:index==1},{active2:index==2}]">{{index+1}}</div>
         </li>
      </ul>
    <ul class="pictureLiveBroadcast_ul1" v-show="tabState == 1">
         <li v-for="(item,index) in imgsArr1" v-if="index>=3&&index<9" class="li2" @click="goToImg(item,imgsArr1,index)">
           <img v-lazy="item.imageUrl1" alt="">
           <div>{{index+1}}</div>
         </li>

      </ul>
    <ul class="pictureLiveBroadcast_ul2" v-show="tabState == 1">
         <li v-for="(item,index) in imgsArr1" v-if="index>=9&&index<=29"  class="li3" @click="goToImg(item,imgsArr1,index)">
           <img v-lazy="item.imageUrl1" alt="">
         </li>
    </ul>
    <!--欢迎页-->
    <transition name="fade">
      <welcomePage v-if="pageShow" @temp="temp"  :activityId="activityId"></welcomePage>
    </transition>
    <!--查看图片-->


  </div>
</template>

<script>
  import welcomePage from './welcomePage.vue'
  import wxShare from "../../assets/js/wxShare"
  import {activityImagesList,activityImagesBookFindOne,activityImageslistHot,shareInfoShareUrl} from "../../assets/js/promiseHttp.js"
  import { Toast } from 'mint-ui';  //弹框
  import { Indicator } from 'mint-ui';
export default {
  name: 'pictureLiveBroadcast',
  data(){
    return {
      itemWidth1:null,
      gutterWidth1:10,
      col:2,
      data:[],
      isFirstLoad:true, //第一次加载
      objDataTitle:{}, //头部数据
      titleData:{},//头部数据
      pageShow:false,
      tabAtt:["图片直播","热门照片"],
      tabState:0,
      titleArr:{
        title:"2018第六届深圳国际工业设计大展",
        time:1541245689871,
        address:"广东 深圳",
        peopleNum:457255,
      },
      fixedStyle:"", //吸顶初始效果
      banner:[], //banner
        gotopShow:false,
//        imgsArr: [], //图片直播数据
        imgsArr1: [],//热门活动直播
        size:30, //热门活动数量
        scrollTop:0, //距离顶部距离
        activityId:"",//活动id
      total:0, //公多少数量
        pages:0, //总共多少页
        bookId:{
          p: 1, // request param//
          s: 100, // request param//
          bookId:"",
        },//相册id
       }
  },
  components: {
      welcomePage
  },
  created(){
    this.itemWidth1= this.itemWidth();
    this.gutterWidth1= this.gutterWidth();
    if(this.$router.history.current.query.isBool=="false"||this.$router.history.current.query.isBool==false){
      this.pageShow = false;
      this.bookId.bookId = this.$router.history.current.query.bookId;

      activityImagesList(this.bookId).then(res=>{ //初始化数据
        if(res.data.status == true){
//            ?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim
          res.data.data.forEach((item,index)=>{
            this.$Aiox.get(item.imageUrl+'?imageInfo').then(res=>{
              item.width  = res.data.width;
              item.height  = res.data.height;
            })
            item.imageUrl1 =item.imageUrl+"?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim"
          })
          this.total =res.data.total;
          this.pages = Math.ceil(res.data.total/this.bookId.s)
          this.data = res.data.data;
        }else{
          Toast("网络出错了，请重试")
        }
      })

      activityImageslistHot(this.$router.history.current.query.bookId,this.size).then(res=>{   //热门活动接口
        if(res.data.status == true){
          res.data.data.forEach((item,index)=>{
            item.imageUrl1 =item.imageUrl+"?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim"
          })
          this.imgsArr1 = res.data.data;
        }else{
          Toast("网络出错了，请重试")
        }
      })
      activityImagesBookFindOne(this.$router.history.current.query.bookId).then(res=>{  //头部接口
        console.log(res,"res")
        if(res.data.status == true){
          this.objDataTitle = res.data.data?res.data.data:{name:"热门活动",viewCount:"9999",bookTime:1544176800000,regionName:"深圳市"};
          this.banner = res.data.data?res.data.data.bannerImageList:[];
          this.$nextTick(() => {
            //     滑动
            var mySwiper = new Swiper('.swiper-container', {
              autoplay: true,
              loop: true
            })
          })
        }else{
          Toast("网络出错了，请重试")
        }
      })
    }else{
      this.pageShow = true;
    }
    if(this.$router.history.current.query.id){  //分享传来的id
      this.activityId = this.$router.history.current.query.id;
    }else {
      this.activityId = '7';
    }


    let that =this;

    setTimeout(()=>{
      let clientHeight = that.$refs.box.clientHeight;
      window.onscroll = function(){ //监听滚动高度
        //变量scrollTop是滚动条滚动时，距离顶部的距离
        var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
        if(scrollTop>201){
          that.$nextTick(function () {
            that.gotopShow = true;
            setTimeout(()=>{
              that.gotopShow = false;
            },3000)
          })

        }else {
          that.gotopShow = false;
        }

          if(scrollTop>=clientHeight){ //吸顶效果
            that.$nextTick(function () {})//
            that.fixedStyle={"position":"fixed","top":"0","left":"0","z-index":"999991!important"}
          }else {
            that.fixedStyle='';
          }
        //变量windowHeight是可视区的高度
        var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
        //变量scrollHeight是滚动条的总高度
        var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
        //滚动条到底部的条件
//        console.log(scrollTop,"fsdakfjksdfjksdk")
//        console.log(scrollHeight - windowHeight-200)
        if(scrollTop == (scrollHeight - windowHeight)&&that.tabState==0){ //触底自动加载
            that.getData();
        }
      }
    },300)

  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll) //监听回到顶部按钮出现
    let that = this;
    if(window.common.apiDomain20020=='https://dcloud.butongtech.com:20020'){
      setTimeout(()=>{
        that.share();
      },200)
    }
  },
  methods: {
    loadmore(index){
      console.log(index,"index")
    },
    itemWidth(){
      return (185*1*(document.documentElement.clientWidth/375)) // #rem布局 计算宽度
    },
    gutterWidth(){
      return (10*0.5*(document.documentElement.clientWidth/375))  // #rem布局 计算x轴方向margin(y轴方向的margin自定义在css中即可)
    },
    share(){//分享
      console.log(this.objDataTitle);
      shareInfoShareUrl(encodeURIComponent(location.href.split('#')[0])).then(res=>{
        if(res.status==true){
          let obj = {
            title:this.objDataTitle.name,
            desc:this.objDataTitle.remark,
            url:"https://dcloud.butongtech.com/index.html#/pictureLiveBroadcast?isBool=false&bookId="+this.$router.history.current.query.bookId+"&id="+this.$router.history.current.query.id,//id=20190101000004BUTONG00001&isBool=false&bookId=20190101000004BUTONG00001
            imgUrl:!!this.objDataTitle.bannerImageList?this.objDataTitle.bannerImageList[0].imageUrl:'https://pub.qinius.butongtech.com/defultphoto.png',
          }
          wxShare.wxShare(res.data,obj)
        }else{
          Toast("网络出错了，请重试")
        }
      })
    },
    temp(v){ //欢迎页进入
      this.pageShow = v.isbool;
      this.bookId.bookId = v.bookId;
      this.titleData = v.item;
      activityImagesList(this.bookId).then(res=>{ //初始化数据
        if(res.data.status == true){
//            ?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim
          res.data.data.forEach((item,index)=>{
            this.$Aiox.get(item.imageUrl+'?imageInfo').then(res=>{
              item.width  = res.data.width;
              item.height  = res.data.height;
            })
            item.imageUrl1 =item.imageUrl+"?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim"
          })
          this.total =res.data.total;
          this.pages = Math.ceil(res.data.total/this.bookId.s)
          this.data = res.data.data;
        }else{
          Toast("网络出错了，请重试")
        }
      })

      activityImageslistHot(v.bookId,this.size).then(res=>{   //热门活动接口
        if(res.data.status == true){
          res.data.data.forEach((item,index)=>{
            item.imageUrl1 =item.imageUrl+"?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim"
          })
          this.imgsArr1 = res.data.data;
        }else{
          Toast("网络出错了，请重试")
        }
      })
      activityImagesBookFindOne(v.bookId).then(res=>{  //头部接口
        console.log(res,"res")
        if(res.data.status == true){
          console.log(res,"res")
          this.objDataTitle = res.data.data?res.data.data:{name:"热门活动",viewCount:"9999",bookTime:1544176800000,regionName:"深圳市"};
          this.banner = res.data.data?res.data.data.bannerImageList:[];
          this.$nextTick(() => {
            //     滑动
            var mySwiper = new Swiper('.swiper-container', {
              autoplay: true,
              loop: true
            })
          })
        }else{
          Toast("网络出错了，请重试")
        }
      })
    },
    goToImg(v,v1,i){ //进入图片

      let list = [];
      this.imgsArr1.forEach((item,index)=>{
        list.push(item.imageUrl+"?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/85/imageslim ")
      })
      wx.previewImage({
        current: v.imageUrl+'?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/85/imageslim ', // 当前显示图片的http链接
        urls: list // 需要预览的图片http链接列表
      });
    },
    goBackTop(){//回到头部
      window.pageYOffset= 0;
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    },
    stateClick(i){//tab切换
      this.tabState = i;
    },
    clickFn(value,index) { //点击每个图片放大

      // 阻止a标签跳转
      event.preventDefault()
//      // 只有当点击到图片时才进行操作

      let list = [];
      this.data.forEach((item,index)=>{
        list.push(item.imageUrl+"?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/85/imageslim ")
      })
      wx.previewImage({
        current: value.imageUrl+'?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/85/imageslim ', // 当前显示图片的http链接
        urls: list // 需要预览的图片http链接列表
      });
    },
    getData() {

      let that = this;
      that.bookId.p++;
      if(that.pages<that.bookId.p){
        that.bookId.p = that.pages;
        Toast("没有更多图片了");
        return;
      }else if(that.pages==that.bookId.p){
        Indicator.open("加载中")
        activityImagesList(that.bookId).then(res=>{
          if(res.data.status == true){
            res.data.data.forEach((item,index)=>{
              this.$Aiox.get(item.imageUrl+'?imageInfo').then(res=>{
                item.width  = res.data.width;
                item.height  = res.data.height;
              })
              item.imageUrl1 =item.imageUrl+"?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim"
            })
            setTimeout(()=>{
              Indicator.close();
              that.data = that.data.concat(res.data.data);
            },200)

          }else{
            Indicator.close();
            Toast("网络出错了，请重试")
          }
        })
      }else if(that.pages>that.bookId.p){
        Indicator.open("加载中")
        activityImagesList(that.bookId).then(res=>{
          if(res.data.status == true){
            res.data.data.forEach((item,index)=>{
              this.$Aiox.get(item.imageUrl+'?imageInfo').then(res=>{
                item.width  = res.data.width;
                item.height  = res.data.height;
              })
              item.imageUrl1 =item.imageUrl+"?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim"
            })
            setTimeout(()=>{
              Indicator.close();
              that.data = that.data.concat(res.data.data);
            },200)

          }else{
            Indicator.close();
            Toast("网络出错了，请重试")
          }
        })
      }
    },
  },
}

</script>

<style scoped lang="less">
#pictureLiveBroadcast{
  width: 100%;
  overflow-x: hidden;
  .pictureLiveBroadcast_box{
    width:100%;
    >.swiper-container{
      width: 100%;
    }
    .swiper-slide{
      width: 100%;
      background: #fff;
      box-sizing: border-box;
      position: relative;

      .imgIs{
        width: 100%;
        img{
          display: block;
        }
      }

    }
    .pictureLiveBroadcast_title{
      width: 100%;
      padding: 0.1rem 0.1rem 0.1rem 0.2rem;
      background: #ffffff;
      box-sizing: border-box;
      font-family: '微软雅黑';
      h5{
        width: 100%;
        font-size: 0.18rem;
        line-height: 0.24rem;
        font-family: '微软雅黑';
        color: #262628;
      }
      .pictureLiveBroadcast_titleItem{
        width: 100%;
        font-size: 0.12rem;
        line-height: 0.24rem;
        font-family: '微软雅黑';
        color: #676768;
        span{
          color: #262628 ;
          font-weight: 900;
          font-family: '微软雅黑';
        }
        img{
          display: inline-block;
          width:0.09rem;
          height: 0.09rem;
          margin-right:0.1rem;
        }
      }
    }
  }
.pictureLiveBroadcast_center{
  width: 100%;
  background: #ffffff;
  position: relative;
  .pictureLiveBroadcast_center_fixed{
    position: fixed;
    left: 0;
    top: 2.6rem;
    background: rgba(0, 0, 0, 0.85);
    padding:0 0.1rem;
    height: 0.3rem;
    font-size: 0.12rem;
    line-height: 0.3rem;
    border-radius: 0 0.5rem 0.5rem 0 ;
    z-index: 999992;
    color: #ffffff;
  }
}
  .pictureLiveBroadcast_ul{
    width: 100%;
    .li1{
      width: 100%;
      margin-top: 0.05rem;
      position: relative;
      img{
        width: 100%;
      }
      >div{
        width: 0.36rem;
        height: 0.36rem;
        line-height: 0.36rem;
        background: #f26100;
        text-align: center;
        font-size: .22rem;
        position: absolute;
        left: 0;
        bottom: 0;
        color: #ffffff;
      }
      >div.active1{
        background: #f28100;
      }
      >div.active2{
        background: #f2be00;
      }
    }
  }
  .pictureLiveBroadcast_ul1{
    flex-wrap: wrap;
    margin-bottom: .05rem;
    overflow: hidden;
    .li2{
      position: relative;
      width: 33.333333vw;
      height: 33.333333vw;
      float: left;
      box-sizing: border-box;
      padding: 0.05rem 0.05rem 0 0;
      img{
        display: block;
        width: 100%;
        height: 100%;
      }
      >div{
        width: 0.28rem;
        height: 0.28rem;
        line-height: 0.28rem;
        background: #999;
        text-align: center;
        font-size: .18rem;
        position: absolute;
        left: 0;
        bottom: 0;
        color: #ffffff;
      }

    }
    .li2:nth-child(3n){
      padding-right:0;
    }
  }
  .pictureLiveBroadcast_ul2{
    flex-wrap: wrap;
    margin-bottom: .05rem;
    overflow: hidden;
    margin-top: 0;
    .li3{
      width: 33.333333vw;
      height: 33.333333vw;
      float: left;
      box-sizing: border-box;
      padding: 0.05rem 0.05rem 0 0;
      img{
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .li3:nth-child(3n){
      padding-right:0;
    }
    .li3:nth-child(1),.li3:nth-child(3),.li3:nth-child(2){
      padding-top:0;
    }
  }
  .pictureLiveBroadcast_tab{
    width: 100%;
    overflow: hidden;
    background: #ffffff;
    padding-left: 0.1rem;
    li{
      width: 1rem;
      height: 0.3rem;
      float: left;
      text-align: center;
      .span1{
        display: inline-block;
        width: 0.2rem;
        height: 0.02rem;
        background:#262628 ;
        transform: translateY(-0.12rem);
      }
      .span{
        display: inline-block;
        width: 1rem;
        height: 0.28rem;
        line-height: 0.28rem;
      }
      .span.active{
        color:#262628 ;
      }
    }
  }

}

</style>
<style>
  .vue-waterfall-easy-container .vue-waterfall-easy-scroll{
    overflow-x: visible!important;
    overflow-y: visible!important;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .8s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .cell-item{
    background: #ffffff;
    margin-top: 0.05rem;
  }
  .cell-item img{
    width: 100%;
  }
</style>
