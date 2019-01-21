<template>
  <!--新视界-->
  <div id="new_horizons">
      <ul class="new_horizons_centent">

        <li v-for="(item,index) in objList" @click="goToHomeDetail(item)">
          <div class="new_horizons_centent_Img">
            <img :src="item.bannerUrl?item.bannerUrl:item.bannerUrl1+'?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim'" alt="">
          </div>
          <div class="new_horizons_centent_look">
            <h5>{{item.title}}</h5>
            <span><img src="/static/images/浏览数.svg" alt="">{{item.viewCount?(item.viewCount/10000).toFixed(2)+'万':item.viewCount}}</span><br>
            <span><img src="/static/images/喜欢数.svg" alt="">{{item.laudedCount?(item.laudedCount/10000).toFixed(2)+'万':item.laudedCount}}</span>
            <span><img src="/static/images/评论数.svg" alt="">{{item.commentCount?(item.commentCount/10000).toFixed(2)+'万':item.commentCount}}</span>
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
        lengthBt:false,
      }
    },
    created() {
      document.title = "新视界"
      specialSubjectFindSubjectInfoByCategory("5",this.p,this.s).then(res=>{
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
            this.$nextTick(()=>{
              //     滑动
              var mySwiper = new Swiper ('.swiper-container', {
                autoplay:true,
                loop:true
              })
            })
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
          specialSubjectFindSubjectInfoByCategory("5",this.p,this.s).then(res=>{
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
          specialSubjectFindSubjectInfoByCategory("5",this.p,this.s).then(res=>{
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
  #new_horizons{
    width: 100%;
    height: 100%;
    overflow-y: auto;
    .new_horizons_centent{
      width: 100%;
      padding: 0.1rem;
      box-sizing: border-box;
      background: #ffffff;
      li{
        padding: 0.1rem;
        box-sizing: border-box;
        border-radius: 0.04rem;
        display: flex;
        height: 1.2rem;
        .new_horizons_centent_look{
          flex: 1;
          height: 100%;
          padding: 0 0.1rem;
          box-sizing: border-box;
          h5{
            font-size:0.15rem;
            font-family:PingFangSC-Medium;
            font-weight:500;
            color:rgba(5,5,9,1);
            line-height:0.25rem;
            overflow : hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            word-break:break-all;
          }
          span{
            display: inline-block;
            margin-right: 0.3rem;
            img{
              display: inline-block;
              width: 0.13rem;
              height: 0.11rem;
              margin-right: 0.1rem;
            }
          }
        }
        .new_horizons_centent_Img{
          height: 100%;
          width: 30%;
          img{
            display: block;
            width: 100%;
            height: 100%;
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

