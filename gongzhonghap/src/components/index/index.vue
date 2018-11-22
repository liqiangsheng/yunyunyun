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

        <!-- 滑动 -->
         <div class="swiperBox" v-if="item.multiActivity==true">
              <h5><span>一 　</span>{{item.name}}<span> 　一</span></h5>
              <div class="p">
                   {{item.summary}}
              </div>
           <!---->
           <div :class="'swiper-container'+index">
             <div class="swiper-wrapper">
               <div class="swiper-slide" v-for="(item1,index1) in item.children" >
                 <div class="imgIs">
                   <img :src="item1.bannerUrl" />
                 </div>

                 <h5>{{item1.title}}</h5>
                 <div class="p1">
                   <span>{{item1.summary}}</span>
                 </div>
               </div>

             </div>
             <div class="swiper-pagination"></div>
           </div>

           <!---->
         </div>

        <!-- 活动列表 -->
        <div class='homeBottom' v-if="item.multiActivity==false">

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
      boxSHow:false, //  初始数据
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
    this.$nextTick(function () {
      document.title = "不同科技";
    })

    console.log(JSON.parse(localStorage.getItem("indexList")))
    setTimeout(()=>{
      if(!!JSON.parse(localStorage.getItem("indexList"))){

        this.objList=JSON.parse(localStorage.getItem("indexList"))
      }else {
        activityListData(this.p,this.s).then(res=>{ //出初始数据

          if(res.data.status == true){
            this.objList =res.data.data;
          }else{
            Tost("网络异常，请重试")
          }
        })
      }
    },100)


  },
  methods:{
    goDetail(item){//去活动详情

      window.sessionStorage.setItem("detailId",JSON.stringify(item))
      this.$router.push({path:"/home"}); //去详情

    },
      bannerCLICK(i){


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
    this.$nextTick(()=>{

      setTimeout(()=>{
        for (let i=0;i<1000;i++){
          //     滑动
          var mySwiper = new Swiper ('.swiper-container'+i, {
            effect : 'coverflow',
            slidesPerView: 1.56,
            centeredSlides: true,
            coverflowEffect: {
              rotate: 0,
              stretch: -15,
              depth:100,
              modifier: 8,
              slideShadows : false
            },
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              type:"fraction"
            },
          })
        }

      },250)

    })


  },
}

</script>

<style lang="less">
@import "../../assets/css/index.css";
.swiperBox{
  width: 100%;
  height: 5.74rem;
  background: url(../../../static/images/bg1.png);
  background-size: 100% 100%;
  background-size: cover;
  margin-top: 0.15rem;
  overflow: hidden;
  box-sizing: border-box;
  >h5{
    width: 100%;
    text-align: center;
    line-height: 0.3rem;
    margin: 0.25rem 0;
    font-size:0.15rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
    span{
      color:rgba(255,255,255,0.5)
    }
  }
  .p{
    width: 90%;
    margin: 0 auto;
    height: 0.72rem;
    font-size:0.12rem;
    font-family:PingFangSC-Light;
    font-weight:300;
    color:rgba(255,255,255,0.5);
    line-height:0.18rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }
  >.swiper-container{
    width: 100%;

  }
  .swiper-pagination{
    position: absolute;
    left: 0;
    bottom:-0.42rem;
    font-size: 0.2rem;
    .swiper-pagination-current{
      color:rgba(255,255,255,1);
      font-size: 0.24rem;
    }
  }
  .swiper-slide{
    margin-top: 0.6rem;
    width: 100%;
    background: #fff;
    box-sizing: border-box;
    position: relative;
    height: 3.07rem;
    position: relative;
    .imgIs{
      width: 100%;
      margin: 0 auto;

      img{
        display: block;
        width: 90%;
        margin: 0 auto;
        height: 1.4rem;
        transform: translateY(-0.3rem);
        background:rgba(238,238,238,1);
        box-shadow:0px 0.2rem 0.34rem 0.04rem rgba(2,2,9,0.15);
        border-radius:0.02rem;
      }
    }
    h5{
      width: 90%;
      margin: 0 auto;
      font-size:0.15rem;
      font-family:PingFangSC-Medium;
      font-weight:500;
      color:rgba(0,0,0,1);
    }
    .p1{
      width: 100%;
      height: 1.25rem;
      background:rgba(247,247,247,1);
      position: absolute;
      left: 0;
      bottom: 0;
      padding-top: 0.15rem;
      box-sizing: border-box;
      span{
        width: 90%;
        margin: 0 auto;
        display: block;
        height: 0.76rem;
        font-size:0.12rem;
        font-family:PingFangSC-Light;
        font-weight:300;
        color:rgba(102,102,102,1);
        line-height:0.19rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
      }
    }

  }

}
.IndexHeader{
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
