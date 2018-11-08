<template>
  <div id="indexBox">
    <div class="IndexHeader">
      <!--轮播-->
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,index) in banner" @click="bannerCLICK(index)">
            <div class="imgIs">
              <img :src="item" >
            </div>
          </div>
        </div>
      </div>
      <!---->
      <!-- 列表 -->
      <div v-for="(item,index) in objList" @click="goDetail(item)">

        <!--&lt;!&ndash; 滑动 &ndash;&gt;-->
        <!--<view class='homeBox' bindtap='goDetail' data-multiActivity='{{item}}' wx:if='{{item.multiActivity == true}}'>-->
          <!--<image src='../../images/bg1.png' class='homeBj' />-->
          <!--<view class='homeCentent'>-->

            <!--<view class='homeBoxHeader' >-->
              <!--<text></text>-->
              <!--<text>{{item.title}}</text>-->
              <!--<text></text>-->
              <!--<text>{{item.summary}}</text>-->
            <!--</view>-->
            <!--<swiper class='swiperClass' duration="1000" previous-margin="50px" next-margin="50px" circular='true' bindchange="scrollFun">-->
              <!--<block wx:for="{{item.children}}" wx:key="{{index}}">-->
                <!--<swiper-item>-->
                  <!--<view  class="slide-image {{swiperIndex == index ? 'active' : 'quiet'}}" mode='aspectFill'>-->
                    <!--<image src="{{item.bannerUrl}}"> </image>-->
                    <!--<view class='slide-imageitem'>{{item.name}}</view>-->
                    <!--<view class='slide-imageitem1'>-->
                      <!--<view>{{item.summary}}</view>-->
                    <!--</view>-->
                  <!--</view>-->
                <!--</swiper-item>-->
              <!--</block>-->
            <!--</swiper>-->

            <!--<view class='homeBoxFoot'>-->
              <!--<text>{{swiperIndex+1}}</text>/<text>{{item.children.length}}</text>-->
            <!--</view>-->

          <!--</view>-->

        <!--</view>-->

        <!-- 活动列表 -->
        <div class='homeBottom'>

          <div class='homeBottomContent'>
             <img :src="item.bannerUrl"/>
              <div class='homeBottomTitle'>
                <span>{{item.name}}</span>
              </div>
              <div class='homeBottomPrice'>
                <span v-if="item.expenses !=0&&item.expenses >0">¥{{item.expenses}}</span>
                <span v-else style='color:#21CB61'>免费</span>
              </div>
              <div class='homeBottomdata'>
                <div class='homeBottomdataItem1'><img src='/static/images/time.png'/><span>{{item.startTime |formatTime}}</span> </div>
                <div class='homeBottomdataItem1'><img src='/static/images/position.png'/><span>{{item.regionName}}</span> </div>
              </div>
              <div class='homeBottomstate start' v-if="nowTime >item.signStartTime && nowTime <item.signEndTime">
                立即报名
              </div>
              <div class='homeBottomstate start' v-if="nowTime < item.signStartTime">
                报名即将开始
              </div>
              <div class='homeBottomstate HaveInHand' v-if="nowTime <= item.sendTime && nowTime >= item.sstartTime">
                正在进行
              </div>
              <div class='homeBottomstate end' v-if="nowTime >item.endTime">
                活动结束
              </div>
              <div class='homeBottomstate end' v-if="nowTime > item.signEndTime && nowTime < item.sstartTime">
                报名结束
              </div>
           </div>
         </div>

      </div>
      <div class='baseline'>
        <span></span>这是我的底线 <span></span>
      </div>
    </div>
    <ul class="Indextab">
       <li v-for="(item,index) in tabbarAarr" class="indexTabLi" @click="tabarClick(index)">
         <img :src="tabbarAarrIndex==index?item.icon:item.icon1" alt="" class="indexTabImg">
         {{item.name}}
       </li>
    </ul>

  </div>
</template>

<script>
  import { Toast } from 'mint-ui';  //弹框
  import { Indicator } from 'mint-ui';
  import { activityListData } from '../../assets/js/promiseHttp';
  import {formatTime3} from "../../assets/js/Fun"
   const date = new Date().getTime();
export default {
  name: 'Index',
  data(){
    return{
      //轮播
      banner: ["https://pub.qinius.butongtech.com/banner1.png","https://pub.qinius.butongtech.com/banner2.png","https://pub.qinius.butongtech.com/banner3.png","https://pub.qinius.butongtech.com/banner4.png" ],
      tabbarAarr:[  //、、tab
        {name:"首页",icon:"./static/images/homesmall.png",icon1:"./static/images/homesmall1.png",path:"/index"},
        {name:"我的",icon:"./static/images/mesmall.png",icon1:"./static/images/mesmall1.png",path:"/me"},
      ],
      tabbarAarrIndex:0,  //点击tab的下标
      p:1, //第几页
      s:20,// 、、一夜多少
      objList:[],//列表数据
      nowTime: date //现在的时间
      }

  },
  created(){

    activityListData(this.p,this.s).then(res=>{ //出初始数据

     if(res.data.status == true){
        this.objList =res.data.data;
     }else{
       Tost("网络异常，请重试")
     }
    })
  },
  methods:{
    goDetail(item){//去活动详情

      window.sessionStorage.setItem("detailId",JSON.stringify(item))
      this.$router.push({path:"/home"}); //去详情

    },
      bannerCLICK(i){
        console.log(i)
       
      },
    tabarClick(i){  //tabar点击事件
     this.tabbarAarrIndex = i;
      this.$router.push({path:this.tabbarAarr[i].path}); 

    },
    handleScroll(){  //回到顶部按钮出现
      this.sctollTopNum = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      if(this.sctollTopNum>100){
        this.topScroll = true;
      }else{
        this.topScroll = false;
      }
    },

    goScrillTop(){ //回到顶部
      window.pageYOffset= 0;
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }

  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll) //监听回到顶部按钮出现
    let that = this;
    this.$nextTick(()=>{


        //     滑动
        var mySwiper = new Swiper ('.swiper-container', {
          autoplay:true,
          loop:true
        })


    })


  },
}

</script>

<style lang="less">
@import "../../assets/css/index.css";
.IndexHeader{
.swiper-container{
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
  #scrollTop{
    display: block;
    position: fixed;
    bottom: 0.5rem;
    right: 0.05rem;
    width: 0.34rem;
    height: 0.34rem;
    z-index: 1;
  }
}

  
</style>
