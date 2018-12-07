<template>
  <div id="homePageB">
    <div>

    </div>
    <!------个人----->
    <div class="swiper-container" v-if="displayState==2&&objData.designerUser.userImagesList.length>0">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,index) in objData.designerUser.userImagesList"  ref="dasdas">
          <div class="imgIs">
            <img :src="item.imageUrl" />
          </div>
        </div>
      </div>

    </div>
    <!------个人----->
     <div class="homePageBItem" v-if="displayState==2">
       <h5 v-if="!!objData.designerUser.motto">{{objData.designerUser.motto}}</h5>
       <p v-if="!!objData.designerUser.summary">
         <span>{{objData.designerUser.summary}}</span>
       </p>
     </div>
    <!--奖项--> <!------个人----->
    <div class="homePageBItem2" v-if="displayState==2&&objData.designerUser.honordItems.length>0">
        <h5><img src="/static/images/ww.png" alt="">奖项</h5>
        <ul>
          <li v-for="(item,index) in objData.designerUser.honordItems">{{item}}</li>
        </ul>
    </div>
    <!--主要作品--> <!------个人----->
    <div class="homePageBItem3" v-if="displayState==2&&objData.designerUser.designerHonorList.length>0">
      <h5><img src="/static/images/qq.png" alt="">主要作品</h5>
      <ul>
        <li v-for="(item,index) in objData.designerUser.designerHonorList">
          <img class="homePageBItem3Img" :src="item.imageUrl" alt="" v-if="item.isHorizontal==true">
          <img class="homePageBItem3Img1"  :src="item.imageUrl" alt="" v-if="item.isHorizontal==false">
          <p class="homePageBItem3P" v-if="item.isHorizontal==true">
            {{item.name}}
          </p>
          <p class="homePageBItem3P1" v-if="item.isHorizontal==false">
            {{item.name}}
          </p>
        </li>
      </ul>
    </div>
    <!------企业 主攻领域----->
    <div class="homePageBItem4" v-if="displayState==1&&!!objData.majorScope">
        <h5>主攻领域</h5>
        <p>
          {{objData.majorScope}}
        </p>
    </div>
    <!--奖项--> <!------企业----->
    <div class="homePageBItem2" v-if="displayState==1&&objData.honordItems.length>0">
      <h5><img src="/static/images/ww.png" alt="">奖项</h5>
      <ul>
        <li v-for="(item,index) in objData.honordItems">{{item}}</li>
      </ul>
    </div>
    <!--知识专利--> <!------企业----->
    <div class="homePageBItem5" v-if="displayState==1&&objData.companyExtendType1.length>0">
      <h5><img src="/static/images/yyy.png" alt="">知识专利 <span>（发明、实用新型、外观）</span></h5>
      <ul>
        <!--<li v-for="(item,index) in knowledgeArr">-->
        <li v-if="!!objData.companyExtendType1">
          <img :src="objData.companyExtendType1[0].imageUrl" alt="">
          <p>
            {{objData.companyExtendType1[0].name}}
          </p>
        </li>
        <div class="lookMore" v-if="!!objData.companyExtendType1&&objData.companyExtendType1.length>1" @click="lookmoreClick(objData.companyExtendType1)">
          查看更多
          <img src="/static/images/jiantou.png" alt="">
        </div>
      </ul>
    </div>
    <!--经典项目/作品--> <!------企业----->
    <div class="homePageBItem6" v-if="displayState==1&&objData.companyExtendType2.length>0">
      <h5><img src="/static/images/qq.png" alt="">经典项目/作品</h5>
      <ul>
        <!--<li v-for="(item,index) in knowledgeArr">-->
        <li v-if="!!objData.companyExtendType2">
          <img :src="objData.companyExtendType2[0].imageUrl" alt="">
          <p>
            {{objData.companyExtendType2[0].name}}
          </p>
        </li>
        <div class="lookMore" v-if="!!objData.companyExtendType2&&objData.companyExtendType2.length>1" @click="lookmoreClick(objData.companyExtendType2)">
          查看更多
          <img src="/static/images/jiantou.png" alt="">
        </div>
      </ul>
    </div>
    <!--合作品牌--> <!------企业----->
    <div class="homePageBItem7" v-if="displayState==1&&objData.companyCooperationBrandsList.leng>0">
      <h5><img src="/static/images/hh.png" alt="">合作品牌</h5>
      <ul>
        <li v-for="(item,index) in objData.companyCooperationBrandsList">
          <img :src="item.imageUrl" alt="">
        </li>

      </ul>
    </div>
    <div class="homePageBItem1"  @click="contactClick">
      联系不同，与我们共享设计生态
      <img src="/static/images/goBack.png" alt="">
    </div>
  </div>
</template>

<script>

export default {
  name: 'homePageB',
  props:["displayState","requestA","objData"],
  data(){
    return{

    }
  },
  created(){
     console.log(this.objData,"ashkfsdkl")
  },
  methods:{
    contactClick(){ //联系不同
      this.$router.push({path:"/contact"})
    },
    lookmoreClick(v){ //查看更多
      window.localStorage.setItem("lookmoreDetail",JSON.stringify(v)) // 把数据保存在本地另开页面展示
      this.$router.push({path:"/lookMore"})
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll) //监听回到顶部按钮出现
    let that = this;
    this.$nextTick(()=>{

      setTimeout(()=>{
        //     滑动
        var mySwiper = new Swiper ('.swiper-container', {
          effect : 'coverflow',
          slidesPerView: 1.86,
          centeredSlides: true,
          coverflowEffect: {
            rotate: 0,
            stretch: -15,
            depth:100,
            modifier: 3,
            slideShadows : false
          },
        })
      },250)

    })


  },
}

</script>

<style scoped lang="less">

</style>
<style lang="less">
  #homePageB{
    background: #EEEEEE;
    .swiper-container{
      width: 100%;
      max-height: 2.55rem;
      background: #ffffff;
    }
    .swiper-slide{
      margin: 0.6rem 0 0 0;
      width: 100%;
      height:2.15rem;
      background: #fff;
      box-sizing: border-box;
      position: relative;

      .imgIs{
        width: 2rem;
        height:2.15rem;
        margin: 0 auto;
        transform: translateY(-0.4rem);
        border-radius:0.02rem;
        box-shadow:0 0.19rem 0.25rem 0  rgba(0,0,0,0.15);
        background: #fff;
        overflow: hidden;
        img{
          display: block;
          width: 2rem;
          height:2.15rem;

        }
      }

    }
    .homePageBItem{
      width: 100%;
      background: #FFFFFF;
      h5{
        overflow: hidden;
        line-height: 0.2rem;
        width: 90%;
        padding: 0.2rem 0;
        margin: 0 auto;
        font-size:0.15rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
      }
      p{
        width: 100%;
        height: 1.11rem;

        box-sizing: border-box;
        span{
          display: block;
          box-sizing: border-box;
          background:rgba(247,247,247,1);
          width: 92%;
          margin: 0 auto;
          padding: 0.1rem;
          line-height: 0.17rem;
          height: 0.94rem;
          font-size:0.12rem;
          font-family:PingFangSC-Light;
          font-weight:300;
          color:rgba(102,102,102,1);
          display: -webkit-box;
          -webkit-line-clamp: 5;
          overflow: hidden;
          -webkit-box-orient: vertical;
          text-overflow: ellipsis;
        }
      }
    }
    .homePageBItem1{
      width: 100%;
      height:0.45rem;
      background:#050509;
      opacity:0.95;
      font-size:0.14rem;
      line-height: 0.45rem;
      text-align: center;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(255,255,255,1);
      img{
        display: inline-block;
        width: 0.13rem;
        height: 0.1rem;
      }
    }
  .homePageBItem2{
    overflow: hidden;
    width: 100%;
    margin: 0 auto;
    margin-top: 0.2rem;
    background: #FFFFFF;
    h5{
      width: 90%;
      height: 0.4rem;
      margin: 0 auto;
      line-height: 0.4rem;
      border-bottom: 0.01rem solid #E9E9E9;
      font-size:0.14rem;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(5,5,9,1);
      img{
        display: inline-block;
        width: 0.16rem;
        height: 0.16rem;
        margin-right: 0.12rem;
      }
    }
    ul{
      width: 90%;
      margin: 0 auto;
      li{
        line-height: 0.33rem;
        font-size:0.12rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(102,102,102,1);
      }
    }
   }
    .homePageBItem3{
      overflow: hidden;
      width: 100%;
      margin-top: 0.2rem;
      background: #FFFFFF;
      h5{
        width: 90%;
        height: 0.4rem;
        margin: 0 auto;
        line-height: 0.4rem;
        border-bottom: 0.01rem solid #E9E9E9;
        font-size:0.14rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(5,5,9,1);
        margin-bottom: 0.1rem;
        img{
          display: inline-block;
          width: 0.16rem;
          height: 0.16rem;
          margin-right: 0.12rem;
        }
      }
      ul{
        width: 90%;
        margin: 0 auto;
        li{
          .homePageBItem3Img{
            display: inline-block;
            width: 100%;
          }
          .homePageBItem3P{
            width: 100%;
            font-size:0.14rem;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(5,5,9,1);
            text-align: left;
            margin:  0.1rem 0;
          }
          .homePageBItem3Img1{
            width: 2rem;
            margin: 0 auto;
          }
          .homePageBItem3P1{
            width: 100%;
            font-size:0.14rem;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(5,5,9,1);
            text-align: center;
            margin:  0.1rem 0;
          }

        }
      }
    }
     .homePageBItem4{
       width: 100%;
       background: #fff;
       overflow: hidden;
       h5{
         width: 100%;
         text-align: center;
         line-height: 0.4rem;
         font-size:0.15rem;
         font-family:PingFangSC-Medium;
         font-weight:500;
         color:rgba(5,5,9,1)
       }
       p{
         width: 90%;
         margin: 0 auto;
         background:rgba(245,245,245,1);
         border-radius:2px;
         padding:  0.13rem 0.17rem 0.1rem 0.16rem;
         box-sizing: border-box;
         margin-bottom: 0.2rem;
         font-size:0.12rem;
         font-family:PingFangSC-Regular;
         font-weight:400;
         color:rgba(5,5,9,1);
       }
     }
    .homePageBItem5{
      width: 100%;
      background: #fff;
      overflow: hidden;
      margin-top: 0.2rem;
      h5{
        width: 90%;
        height: 0.4rem;
        margin: 0 auto;
        line-height: 0.4rem;
        border-bottom: 0.01rem solid #E9E9E9;
        font-size:0.14rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(5,5,9,1);
        margin-bottom: 0.1rem;
        img{
          display: inline-block;
          width: 0.16rem;
          height: 0.16rem;
          margin-right: 0.12rem;
        }
        span{
          font-size:0.12rem;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(153,153,153,1);
        }
      }
      ul{
        width: 90%;
        margin: 0 auto;
        li{
          width: 100%;
           img{
             display: block;
             width: 100%;
           }
          p{
            width: 100%;
            line-height: 0.30rem;
            font-size:0.14rem;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(5,5,9,1);
            text-align: center;
            padding-bottom: 0.1rem;
          }
        }
        .lookMore{
          width: 100%;
          text-align: center;
          line-height: 0.3rem;
          font-size:0.12rem;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(50,161,247,1);
          margin-bottom: 0.1rem;
          img{
            display: inline-block;
            width: 0.07rem;
            height: 0.07rem;
            transform: translateY(-0.02rem);
            margin-left: 0.06rem;
          }
        }
      }
    }
    .homePageBItem6{
      width: 100%;
      background: #fff;
      overflow: hidden;
      margin-top: 0.2rem;
      h5{
        width: 90%;
        height: 0.4rem;
        margin: 0 auto;
        line-height: 0.4rem;
        border-bottom: 0.01rem solid #E9E9E9;
        font-size:0.14rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(5,5,9,1);
        margin-bottom: 0.1rem;
        img{
          display: inline-block;
          width: 0.16rem;
          height: 0.16rem;
          margin-right: 0.12rem;
        }

      }
      ul{
        width: 90%;
        margin: 0 auto;
        li{
          width: 100%;
          img{
            display: block;
            width: 100%;
          }
          p{
            width: 100%;
            line-height: 0.30rem;
            font-size:0.14rem;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(5,5,9,1);
            text-align: center;
            padding-bottom: 0.1rem;
          }
        }
        .lookMore{
          width: 100%;
          text-align: center;
          line-height: 0.3rem;
          font-size:0.12rem;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(50,161,247,1);
          margin-bottom: 0.1rem;
          img{
            display: inline-block;
            width: 0.07rem;
            height: 0.07rem;
            transform: translateY(-0.02rem);
            margin-left: 0.06rem;
          }
        }
      }
    }
    .homePageBItem7{
      width: 100%;
      background: #fff;
      overflow: hidden;
      margin: 0.2rem 0;
      padding-bottom: 0.1rem;
      h5{
        width: 90%;
        height: 0.4rem;
        margin: 0 auto;
        line-height: 0.4rem;
        border-bottom: 0.01rem solid #E9E9E9;
        font-size:0.14rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(5,5,9,1);
        margin-bottom: 0.1rem;
        img{
          display: inline-block;
          width: 0.16rem;
          height: 0.16rem;
          margin-right: 0.12rem;
        }

      }
      ul{
        width: 90%;
        margin: 0 auto;
        flex-wrap: wrap;
        li{
          display: inline-block;
          width: 22%;
          margin-right: 0.08rem;
          margin-bottom: 0.08rem;
          img{
            display: block;
            width: 100%;
          }

        }
        li:nth-child(5n){
          margin-left:1%;
        }
        li:first-child{
          margin-left:1%;
        }
      }
    }
  }

</style>
