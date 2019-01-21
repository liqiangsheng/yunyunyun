<template>
  <!--大咖说-->
  <div id="big_coffee_says">
    <div class="big_coffee_says_header">
      <div class="swiper-container1" v-if="lengthBt==false">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,index) in banner.specialSubjectImageVoList">
            <div class="imgIs">
              <img :src="item.image" >
            </div>
          </div>
        </div>
      </div>
      <!--轮播-->
      <div class="swiper-container" v-if="lengthBt==true">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,index) in banner.specialSubjectImageVoList">
            <div class="imgIs">
              <img :src="item.image" >
            </div>
          </div>
        </div>
      </div>
      <!---->
    </div>

    <ul class="big_coffee_says_centent">
      <li v-for="(item,index) in objList" @click="goToHomeDetail(item)">
        <div class="big_coffee_says_centent_Img">
          <img :src="item.bannerUrl?item.bannerUrl:item.bannerUrl1+'?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim'" alt="">
        </div>
        <h5>{{item.title}}</h5>
        <div class="big_coffee_says_centent_look">
          <span><img src="/static/images/浏览数.svg" alt="">{{item.viewCount>10000?(item.viewCount/10000).toFixed(2)+'万':item.viewCount}}</span>
          <span><img src="/static/images/喜欢数.svg" alt="">{{item.laudedCount>10000?(item.laudedCount/10000).toFixed(2)+'万':item.laudedCount}}</span>
          <span><img src="/static/images/评论数.svg" alt="">{{item.commentCount>10000?(item.commentCount/10000).toFixed(2)+'万':item.commentCount}}</span>
        </div>
      </li>
    </ul>

    <div class="messageFoot" @click="updataMore">
      {{message}}
    </div>
  </div>
</template>

<script>
  import {specialSubjectFindSubjectInfoByCategory} from "../../../assets/js/promiseHttp"
  import { Toast } from 'mint-ui';  //弹框
export default {
  name: 'big_coffee_says',
  data(){
    return{
      p:1,  //页
      s:20, //每页多少
      message:"不同努力加载中...", //触底提示
      pageNum:"",//每页数据
      objList:[], // 大咖说数据
      banner:{}, // 大咖说数据
      lengthBt:false,
    }
  },
  created() {
    document.title = "大咖说";
    specialSubjectFindSubjectInfoByCategory("4",this.p,this.s).then(res=>{
      if(res.data.status == true){
        this.pageNum = Math.ceil(res.data.data.totalAll/this.s);
        if(this.pageNum >1){
          this.message = "点击加载更多..."
        }else{
          this.message = "这是我的底线..."
        }
        res.data.data.informationVoList.forEach((item,index)=>{
           item.bannerUrl1 = "/static/images/默认轮播.png"
        })
        this.objList = res.data.data.informationVoList;
        this.banner = res.data.data;
        if (this.banner.specialSubjectImageVoList&&this.banner.specialSubjectImageVoList.length>=2){
          this.lengthBt = true;
          this.$nextTick(()=>{
            //     滑动
            var mySwiper = new Swiper ('.swiper-container', {
              autoplay:true,
              loop:true
            })
          })
        }else {
          this.lengthBt = false;
        }
      }else{
        Toast("网络出错啦，请重试")
      }
    })
  },
  methods:{
    goToHomeDetail(v){ //去个人主页详情
      this.$router.push({path: "/homeDetail", query: {id:v.id}}) //去企业主页个人主页详情
    },
    updataMore(){ //加载更多 分页
      this.p++;
      if(this.p>this.pageNum){
        this.message = "这是我的底线..."
        Toast("这是最后一页啦！")
      }else if(this.p==this.pageNum){
        this.message = "这是我的底线..."
        specialSubjectFindSubjectInfoByCategory("4",this.p,this.s).then(res=>{
          if(res.data.status == true){
            res.data.data.informationVoList.forEach((item,index)=>{
              item.bannerUrl1 = "/static/images/默认轮播.png"
            })
            this.objList = this.objList.concat(res.data.data.informationVoList);
          }else{
            Toast("网络出错啦，请重试")
          }
        })
      }else if(this.p<this.pageNum){
        this.message = "点击加载更多..."
        specialSubjectFindSubjectInfoByCategory("4",this.p,this.s).then(res=>{
          res.data.data.informationVoList.forEach((item,index)=>{
            item.bannerUrl1 = "/static/images/默认轮播.png"
          })
          if(res.data.status == true){
            this.objList =  this.objList.concat(res.data.data.informationVoList);
          }else{
            Toast("网络出错啦，请重试")
          }
        })
      }
    },
  },
}

</script>

<style scoped lang="less">
  #big_coffee_says {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    .big_coffee_says_header{
      width: 100%;
      >.swiper-container1{
        width: 100%;
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
      }
      >.swiper-container{
        width: 100%;
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
      }
    }
    .big_coffee_says_centent{
      width: 100%;
      padding: 0.1rem;
      box-sizing: border-box;
      li{
       background: #ffffff;
        padding: 0.1rem;
        box-sizing: border-box;
        margin-top: 0.1rem;
        border-radius: 0.04rem;
        .big_coffee_says_centent_Img{
          width: 100%;
          img{
            display: block;
            width: 100%;
          }
        }
        h5{
          font-size:0.15rem;
          font-family:PingFangSC-Medium;
          font-weight:500;
          color:rgba(5,5,9,1);
          line-height:0.35rem;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
          margin-top: 0.1rem;
        }
        .big_coffee_says_centent_look{
          width: 100%;
          display: flex;
          span{
            display: block;
            flex: 1;
            img{
              display: inline-block;
              width: 0.13rem;
              height: 0.11rem;
              margin-right: 0.1rem;
            }
          }
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
