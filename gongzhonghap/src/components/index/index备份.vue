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

        <!-- 滑动多活动 -->
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
                   <img :src="item1.bannerUrl+'?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim'" />
                   <div class='homeBottomstate2 end1' @click.stop="goToPicture(item)">
                     火图直播
                   </div>
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
             <img :src="item.bannerUrl+'?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim'"/>
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
             <div class='homeBottomstate1 end1' @click.stop="goToPicture(item)">
                火图直播
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
      <div class='baseline' @click="updataMore">
        <!--<span></span>这是我的底线 <span></span>-->
        {{message}}
      </div>
    </div>
    <ul class="Indextab">
       <li v-for="(item,index) in tabbarAarr" class="indexTabLi" @click="tabarClick(index)">
         <img :src="tabbarAarrIndex==index?item.icon:item.icon1" alt="" class="indexTabImg" :class="{active:index==2}">
       </li>
    </ul>

  </div>
</template>

<script>
  import { Toast } from 'mint-ui';  //弹框
  import { Indicator } from 'mint-ui';
  import { activityListData,tsconfigjson } from '../../assets/js/promiseHttp';
  import {formatTime3} from "../../assets/js/Fun"
   const date = new Date().getTime();
export default {
  name: 'Index',
  data(){
    return{
      boxSHow:false, //  初始数据
      banner:[],//轮播
      tabbarAarr:[  //、、tab
        {icon:"./static/images/homesmall.png",icon1:"./static/images/homesmall1.png",path:"/homeIndex1_0"},
        {icon:"./static/images/zixun2.png",icon1:"./static/images/zixun1.png",path:"/homeIndex"},
        {icon:"./static/images/zhaio.png",icon1:"./static/images/zhaio.png",path:"/release"},
        {icon:"./static/images/zhihuihuodong2.png",icon1:"./static/images/zhihuihuodong1.png",path:"/index"},
        {icon:"./static/images/mesmall.png",icon1:"./static/images/mesmall1.png",path:"/me"},
      ],
      tabbarAarrIndex:3,  //点击tab的下标
      p:1, //第几页
      s:3,// 、、一夜多少
      num1:0,//嘉宾列表
      message:"不同正在努力加载中...", //触底提示
      pageNum:"",//每页数据
      nowTime: date, //现在的时间
      objList:[],//数据
      }

  },
  created(){
    this.$nextTick(function () {
      document.title = "不同科技";
    })
    tsconfigjson().then(res=>{
      if(res.status == 200){
        this.banner = res.data.img;
        this.$nextTick(()=>{
          //     滑动
          var mySwiper = new Swiper ('.swiper-container', {
            autoplay:true,
            loop:true
          })
        })
      }else{
        Tost("网络异常，请重试")
      }
    })
    activityListData(this.p,this.s).then(res=>{
      console.log(res)
      if(res.data.status == true){
        this.pageNum = Math.ceil(res.data.total/this.s);
        if(this.pageNum >1){
          this.message = "点击加载更多..."
        }else{
          this.message = "这是我的底线..."
        }
        this.objList =res.data.data;
        this.$nextTick(()=>{
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
        })
        Indicator.close();
      }else{
        Indicator.close();
        Tost("网络异常，请重试")
      }
    })

  },
  methods:{
    updataMore(){ //加载更多 分页
      this.p++;
      if(this.p>this.pageNum){
        this.message = "这是我的底线..."
        Toast("这是最后一页啦！")
      }else if(this.p==this.pageNum){
        this.message = "这是我的底线..."
        activityListData(this.p,this.s).then(res=>{
          if(res.data.status == true){

            this.objList = this.objList.concat(res.data.data);
            Indicator.close();
          }else{
            Indicator.close();
            Toast("网络出错啦，请重试")
          }
        })
      }else if(this.p<this.pageNum){
        this.message = "点击加载更多..."
        activityListData(this.p,this.s).then(res=>{
          if(res.data.status == true){
            this.objList =  this.objList.concat(res.data.data);
            Indicator.close();
          }else{
            Indicator.close();
            Toast("网络出错啦，请重试")
          }
        })
      }
    },
    goDetail(item){//去活动详情
      window.sessionStorage.setItem("detailId",JSON.stringify(item))
      this.$router.push({path:"/home",query:{id:item.id}}); //去详情

    },
    goToPicture(item){//去火图直播页面
      this.$router.push({path:"/pictureLiveBroadcast",query:{id:item.id,isBool:false,bookId:item.id}})
    },
      bannerCLICK(i){


      },
    tabarClick(i){  //tabar点击事件
//     this.tabbarAarrIndex = i;
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

  },
}

</script>

<style lang="less" scoped>
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
      position: relative;
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
      .homeBottomstate2{
        width: .7rem;
        height: .29rem;
        text-align: center;
        border-radius:.05rem;
        line-height: .3rem;
        font-size: .12rem;
        position: absolute;
        right: 36%;
        bottom: -1.6rem;
        z-index:1;
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
      padding-top: 0.05rem;
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
          width: 100%;
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
.end1{
  background:#eaeaea ;
  color: #333;
}

</style>
