<template>
  <!--设计咖-->
  <div id="design_offee" v-on:swipeleft="swiperleft" v-on:swiperight="swiperright">
    <v-touch class="swiperBox">
      <!---->
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item1,index1) in objList" >
            <div class="imgIs">
              <img class="img1" :src="item1.designerUser.designerHonorList[0].imageUrl+'?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim'" />
              <img  class="img2" src="/static/images/图片渐变bg.png" />
              <div  class="img3" @click="goToHomePage(item1)">
                    <h5>
                      <img :src="item1.ownerUrl+'?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim'" alt="">
                      <span>{{item1.name}}</span>
                    </h5>
              </div>
            </div>
            <div class="regionName">{{item1.regionName}} | {{item1.designerUser.title}}</div>
            <div class="powerIndex">
              <span>影响力</span>
              <div class="ul1"> </div>
              <div class="ul2" :style="{width:item1.designerUser.style}"></div>
            </div>
            <div class="caredCount"><span>{{item1.caredCount?item1.caredCount:0}}</span> 粉丝 <span style="margin-left: 0.5rem">{{item1.laudedCount?item1.laudedCount:0}}</span> 次获赞 </div>

          </div>

        </div>
        <div class="swiper-pagination"></div>
      </div>

      <!---->
    </v-touch>
  </div>
</template>

<script>
  import {commonUserList} from "../../../assets/js/promiseHttp"
  import { Toast } from 'mint-ui';  //弹框
export default {
  name: 'design_offee',
  data(){
    return{
      message:"不同努力加载中...", //触底提示
      objList:[], // 智慧团数据
      style:{}, //星星的赞
      starLength:{}, //星星的长度
    }
  },
  created() {
    commonUserList().then(res=>{
      if(res.data.status == true){
        console.log(res,"fhsdfjk")
        res.data.data.forEach((item,index)=>{
          item.designerUser.style =  (item.designerUser.powerIndex*10)*0.7+"px";
        })
        this.objList = res.data.data;
        this.$nextTick(()=>{
            //     滑动
            var mySwiper = new Swiper ('.swiper-container', {
              effect : 'coverflow',
              slidesPerView: 1.35,
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
        })
      }else{
        Toast("网络出错啦，请重试")
      }
    })
  },
  methods:{
    swiperleft(){
//        Toast("zuo")
    },
    swiperright(){
//        Toast("you")
    },
    goToHomePage(v){ //去个人主页
      this.$router.push({path: "/homePage", query: {state: 2,id:v.id,source:"XCX"}}) //去企业主页 1是企业 2是个人
    }
  },
}

</script>

<style scoped lang="less">
  #design_offee{
    width: 100%;
    height: 100%;
    overflow-y:auto ;
    box-sizing: border-box;
    background: url(../../../../static/images/loginBj.png);
    background-size: 100% 100%;
    background-size:cover ;
    .swiperBox{
      width: 100%;
      height: 100%;
      >.swiper-container{
        width: 100%;
        height: 85%;
        overflow: visible !important;
      }
      .swiper-pagination{
        position: absolute;
        left: 0;
        bottom:-0.7rem;
        font-size:0.25rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(102,102,102,1);
      }
      .swiper-slide{
        margin-top: 0.3rem;
        width: 100%;
        background: #fff;
        box-sizing: border-box;
        position: relative;
        .imgIs{
          width: 100%;
          margin: 0 auto;
          position: relative;
          height: 70%;
          box-shadow:0px 0.17rem 0.21rem 0.04rem rgba(2, 9, 2, 0.1);
          border-radius:10px;
          .img1{
            display: block;
            width: 100%;
            height: 100%;
          }
          .img2{
            display: block;
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top:0;
          }
         .img3{
           width: 100%;
           height: 100%;
           position: absolute;
           left: 0;
           top:0;
           z-index: 1;
           h5{
             width: 100%;
             padding: 0.1rem;
             box-sizing: border-box;
             position: absolute;
             left: 0;
             bottom: 0.3rem;
             img{
               display: block;
                margin: 0 auto;
               width: 0.68rem;
               height: 0.68rem;
               -webkit-border-radius: 50%;
               -moz-border-radius: 50%;
               border-radius: 50%;

             }
             span{
               display: block;
               font-size:0.13rem;
               font-family:PingFangSC-Semibold;
               font-weight:600;
               color:rgba(255,255,255,1);
               line-height: 0.24rem;
               text-align: center;
             }
           }
         }
        }
        .regionName{
          width: 100%;
          margin-top: 0.2rem;
          padding:0 0.1rem;
          box-sizing: border-box;
          font-size:0.14rem;
          font-family:PingFangSC-Semibold;
          font-weight:600;
          color:rgba(5,5,9,1);
          overflow : hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          word-break:break-all;
        }
        .powerIndex{
          width: 100%;
          padding:0 0.1rem;
          margin-top: 0.05rem;
          box-sizing: border-box;
          font-size:0.12rem;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(102,102,102,1);
          position: relative;
          span{
            display: inline-block;
            width: 40px;
          }
          .ul1{
            display: inline-block;
            position: absolute;
            width: 70px;
            height: 12px;
            left: 50px;
            top: 2px;
            background:url(../../../../static/images/star2.jpg) ;

          }
          .ul2{
            display: inline-block;
            width: 70px;
            height: 12px;
            position: absolute;
            left: 50px;
            z-index: 1;
            top: 2px;
            background: url(../../../../static/images/star1.jpg);
          }
        }
        .caredCount{
          width: 100%;
          padding:0 0.1rem;
          margin-top: 0.05rem;
          box-sizing: border-box;
          font-size:0.12rem;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(102,102,102,1);
          span{
            font-size:0.2rem;
            font-family:PingFangSC-Semibold;
            font-weight:600;
            color:rgba(0,0,0,1);
          }
        }

      }

    }

  }

</style>
