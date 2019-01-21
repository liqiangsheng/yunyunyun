<template>
  <div id="indexBox">
    <div class="IndexHeader">
      <!--轮播-->
      <div class="swiper-container" ref="bannerHeight">
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
      <ul class="activityContent" :style="'top:'+positionTop/100+'rem'" @scroll="updataMore">
        <li v-for="(item,index) in objList" @click="goDetail(item)" v-if="item.multiActivity==false">
              <img :src="item.bannerUrl+'?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim'" class="homeImg"/>
              <div class="letGo" >进入火图</div>
              <h5 class='homeBottomTitle'>
               {{item.name}}
              </h5>
              <div class='homeBottomPrice'>
                <span v-if="item.expenses !=0&&item.expenses >0">¥{{item.expenses}}</span>
                <span v-else style='color:#7ade81'>免费</span>
              </div>
              <div class='homeBottomdata'>
                <span>{{item.startTime |formatTime}}</span> | <span>{{item.regionName}}</span>
              </div>
              <div class='homeBottomstate' v-if="nowTime >item.signStartTime && nowTime <item.signEndTime">
                立即报名
              </div>
              <div class='homeBottomstate' v-if="nowTime < item.signStartTime">
                报名即将开始
              </div>
              <div class='homeBottomstate' v-if="nowTime <= item.sendTime && nowTime >= item.sstartTime">
                正在进行
              </div>
              <div class='homeBottomstate end' v-if="nowTime >item.endTime">
                活动结束
              </div>
              <div class='homeBottomstate end' v-if="nowTime > item.signEndTime && nowTime < item.sstartTime">
                报名结束
              </div>
        </li>
        <div class='messageFoot' v-if="message">
          {{message}}
        </div>
      </ul>


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
            {icon:"./static/images/资讯2.png",icon1:"./static/images/资讯1.png",path:"/homeIndex"},
            {icon:"./static/images/zhaio.png",icon1:"./static/images/zhaio.png",path:"/release"},
            {icon:"./static/images/智慧活动2.png",icon1:"./static/images/智慧活动1.png",path:"/index"},
            {icon:"./static/images/mesmall.png",icon1:"./static/images/mesmall1.png",path:"/me"},
          ],
          tabbarAarrIndex:3,  //点击tab的下标
          p:1, //第几页
          s:20,// 、、一夜多少
          num1:0,//嘉宾列表
          message:"", //触底提示
          pageNum:"",//每页数据
          nowTime: date, //现在的时间
          objList:[],//数据
          positionTop:0,//位置的距离顶部距离
      }

  },
  created(){
    this.$nextTick(function () {
      document.title = "活动列表";
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
          setTimeout(()=>{
            this.positionTop = this.$refs.bannerHeight.offsetHeight+10;
          },200)
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
          this.message = ""
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
    updataMore(e){ //加载更多 分页
      if(e.target.scrollHeight==(e.target.scrollTop+e.target.offsetHeight)){
             this.p++;
              if(this.p>this.pageNum){
                this.message = "这是我的底线...";
                return
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
      }

    },
    goDetail(item){//去活动详情
      window.sessionStorage.setItem("detailId",JSON.stringify(item))
      this.$router.push({path:"/home",query:{id:item.id}}); //去详情

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
  #indexBox{
    position: absolute;
    left: 0;
    bottom: 0;
    top:0;
    right: 0;
    .IndexHeader{
      position: absolute;
      left: 0;
      top:0;
      bottom: 0.5rem;
      right: 0;
      overflow: hidden;
      background: #eeeeee;
      .activityContent{
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        padding: 0 0.1rem;
        overflow-y:scroll ;
        li{
          background: #ffffff;
          position: relative;
          margin-bottom: 0.1rem;
          padding-bottom: 0.21rem;
          .homeImg{
            width: 100%;
            /*height: 155px;*/
          }
          .letGo{
            position: absolute;
            right: 0;
            top:0;
            background: rgba(5,5,9,0.3);
            width: 0.8rem;
            height: 0.4rem;
            line-height: 0.4rem;
            text-align: center;
            font-size: 0.12rem;
            color: #ffffff;
          }
          .homeBottomTitle{
            width: 90%;
            margin: 0 auto;
            margin-top: 0.15rem;
            font-size: 0.16rem;
            line-height: 0.2rem;
            color: #262626;
            overflow : hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            word-break:break-all;
            letter-spacing: 0.01rem;
          }
          .homeBottomPrice{
            width: 90%;
            margin: 0 auto;
            margin-top: 0.05rem;
            height:0.28rem;
            font-size:0.2rem;
            font-family:PingFangSC-Medium;
            font-weight:500;
            color:#ff8e74;
            line-height:0.28rem;
          }
          .homeBottomdata{
            width: 90%;
            margin: 0 auto;
            margin-top: 0.02rem;
            height:0.2rem;
            font-size:0.12rem;
            font-family:PingFangSC-Light;
            font-weight:500;
            color:rgba(103,103,104,1);
            line-height:0.2rem;
          }
          .homeBottomstate{
            width: 0.8rem;
            height: 0.36rem;
            border: 0.2rem solid #262626;
            text-align: center;
            line-height: 0.36rem;
            font-size: 0.14rem;
            font-weight: 600;
            color: #262626;
            border-radius:0.2rem;
            position: absolute;
            right: 0.2rem;
            bottom: 0.2rem;
          }
          .end{
            border: 0.02rem solid #c5c5c6;
            color: #c5c5c6;
          }
        }
      }
    }
    .Indextab{
      position: absolute;
      width: 100%;
      height: 0.49rem;
      bottom: 0;
      left: 0;
      background: #ffffff;
      border-top: 0.01rem solid #EEEEEE;
      display: flex;
      .indexTabLi{
        flex: 1;
        text-align: center;
        padding-top:0.13rem ;
        box-sizing: border-box;
        .indexTabImg{
          width: 0.24rem;
          height:  0.24rem;
          display:block;
          margin: 0 auto;
        }
        .indexTabImg.active{
          width: 0.3rem;
          transform: translateY(-0.05rem);
          height: 0.3rem;
        }

      }
    }
    .messageFoot{
      width: 100%;
      height: 0.3rem;
      line-height: 0.3rem;
      color: rgba(5,5,5,0.3);
      text-align: center;
      margin-top: 0.1rem;
    }
  }


</style>
