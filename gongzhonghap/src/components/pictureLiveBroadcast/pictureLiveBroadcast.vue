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
          <div class="pictureLiveBroadcast_titleItem">已有 <span>{{objDataTitle.viewCount}}</span>人次浏览了此相册</div>
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
      <vue-waterfall-easy :imgsArr="imgsArr"  srcKey="imageUrl1" @click="clickFn">
        <!--<div slot="loading" slot-scope="{isFirstLoad}">-->
          <!--<div slot="loading" v-if="isFirstLoad">不同努力加载中...</div>-->
        <!--</div>-->
      </vue-waterfall-easy>
    </div>
    <!--热门图片-->
    <ul class="pictureLiveBroadcast_ul" v-show="tabState == 1">
         <li v-for="(item,index) in imgsArr1" v-if="index<3" class="li1" @click="goToImg(item,imgsArr1,index)">
           <img :src="item.imageUrl1" alt="">
           <div :class="[{active1:index==1},{active2:index==2}]">{{index+1}}</div>
         </li>
      </ul>
    <ul class="pictureLiveBroadcast_ul1" v-show="tabState == 1">
         <li v-for="(item,index) in imgsArr1" v-if="index>=3&&index<9" class="li2" @click="goToImg(item,imgsArr1,index)">
           <img :src="item.imageUrl1" alt="">
           <div>{{index+1}}</div>
         </li>

      </ul>
    <ul class="pictureLiveBroadcast_ul2" v-show="tabState == 1">
         <li v-for="(item,index) in imgsArr1" v-if="index>=9&&index<=29"  class="li3" @click="goToImg(item,imgsArr1,index)">
           <img :src="item.imageUrl1" alt="">
         </li>
    </ul>
    <!--欢迎页-->
    <transition name="fade">
      <welcomePage v-if="pageShow" @temp="temp"  :activityId="activityId"></welcomePage>
    </transition>
    <!--查看图片-->
    <transition name="fade">
      <imgenlarge :imgenlargedata="imgenlargedata" :imgenlargedata1="imgenlargedata1" :imgenlargedata1Index="imgenlargedata1Index" :imgsArr="imgsArr"  v-if="imgenlargeShow" @ishowItem="ishowItem"></imgenlarge>
    </transition>

  </div>
</template>

<script>
  import vueWaterfallEasy from 'vue-waterfall-easy'  //瀑布流上拉刷新
  import imgenlarge from './imgenlarge.vue'
  import welcomePage from './welcomePage.vue'
  import {activityImagesList,activityImagesBookFindOne,activityImageslistHot} from "../../assets/js/promiseHttp.js"
  import { Toast } from 'mint-ui';  //弹框
  import { Indicator } from 'mint-ui';
export default {
  name: 'pictureLiveBroadcast',
  data(){
    return {
      isFirstLoad:true, //第一次加载
      objDataTitle:{}, //头部数据
      titleData:{},//头部数据
      pageShow:false,
      imgenlargedata:"",//传给图片的数据
      imgenlargedata1:[],//传给图片的数据
      imgenlargedata1Index:0,//传给图片的数据
      imgenlargeShow:false,
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
        imgsArr: [], //图片直播数据
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
    vueWaterfallEasy,imgenlarge,welcomePage
  },
  created(){
    this.$nextTick(function () {
      document.title = "火图直播平台";

    })
    if(this.$router.history.current.query.isBool=="false"||this.$router.history.current.query.isBool==false){
      this.pageShow = false;
      this.bookId.bookId = this.$router.history.current.query.bookId;

      activityImagesList(this.bookId).then(res=>{ //初始化数据
        if(res.data.status == true){
//            ?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim
          res.data.data.forEach((item,index)=>{
            item.imageUrl1 =item.imageUrl+"?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim"
          })
          this.total =res.data.total;
          this.pages = Math.ceil(res.data.total/this.bookId.s)
          this.imgsArr = res.data.data;
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
        if(res.data.status == true){
          this.objDataTitle = res.data.data;
          this.banner = res.data.data.bannerImageList;
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

  },
  methods: {
    temp(v){ //欢迎页进入
      this.pageShow = v.isbool;
      this.bookId.bookId = v.bookId;
      this.titleData = v.item;
      activityImagesList(this.bookId).then(res=>{ //初始化数据
        if(res.data.status == true){
//            ?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim
          res.data.data.forEach((item,index)=>{
            item.imageUrl1 =item.imageUrl+"?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim"
          })
          this.total =res.data.total;
          this.pages = Math.ceil(res.data.total/this.bookId.s)
          this.imgsArr = res.data.data;
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
        if(res.data.status == true){
          this.objDataTitle = res.data.data;
          this.banner = res.data.data.bannerImageList;
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
      this.imgenlargeShow = true;
      this.imgenlargedata = 0;//传给图片的数据
      this.imgenlargedata1 = v1;//传给图片的数据
      this.imgenlargedata1Index = i;
    },
    goBackTop(){//回到头部
      window.pageYOffset= 0;
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    },
    stateClick(i){//tab切换
      this.tabState = i;
    },
    ishowItem(v){ //子组件传来的false
      this.imgenlargeShow = v;
    },
    clickFn(event, { index, value }) { //点击每个图片放大
      // 阻止a标签跳转
      event.preventDefault()
      // 只有当点击到图片时才进行操作
      if (event.target.tagName.toLowerCase() == 'img') { //判断是不是img
        this.imgenlargeShow = true;
        this.imgenlargedata = 1;//传给图片的数据
        this.imgenlargedata1Index = index;
      }
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
              item.imageUrl1 =item.imageUrl+"?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim"
            })
            setTimeout(()=>{
              Indicator.close();
              that.imgsArr = that.imgsArr.concat(res.data.data);
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
              item.imageUrl1 =item.imageUrl+"?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim"
            })
            setTimeout(()=>{
              Indicator.close();
              that.imgsArr = that.imgsArr.concat(res.data.data);
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
  box-sizing: border-box;
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
      padding: 0.1rem;
      background: #ffffff;
      box-sizing: border-box;
      h5{
        width: 100%;
        font-size: 0.18rem;
        line-height: 0.24rem;
      }
      .pictureLiveBroadcast_titleItem{
        width: 100%;
        font-size: 0.12rem;
        line-height: 0.24rem;
        span{
          color: rgb(41, 152, 255);
        }
        img{
          display: inline-block;
          width:0.09rem;
          height: 0.09rem;
          margin-right:0.15rem;
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
        width: 0.4rem;
        height: 0.02rem;
        background:rgb(41, 152, 255) ;
        transform: translateY(-0.15rem);
      }
      .span{
        display: inline-block;
        width: 1rem;
        height: 0.28rem;
        line-height: 0.28rem;
      }
      .span.active{
        color: rgb(41, 152, 255) ;
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
</style>
