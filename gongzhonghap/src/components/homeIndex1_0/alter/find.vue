<template>
  <!--发现-->
  <div id="find">
       <div class="find_box" ref="findBox" @scroll="getData">
         <vue-waterfall-easy ref="waterfall" :imgsArr="imgsArr" srcKey="imageUrl1" :reachBottomDistance="reachBottomDistance" :mobileGap="mobileGap" @click="clickFn" :maxCols="maxCols" @scrollReachBottom="getData">
         <div slot="loading" slot-scope="{isFirstLoad}">
             <div slot="loading" v-if="isFirstLoad"></div>
             <div slot="loading" v-else></div>
           </div>
           <div slot="waterfall-over"> {{message}}</div>
           <div id="img-info" slot-scope="props">
                <ul class="img-info_ul">
                  <li  class="img-info_li1" @clcik.stop="headerClick(item,index)">
                    <img :src="props.value.authorInfo.ownerUrl?props.value.authorInfo.ownerUrl:'/static/images/defultphoto.png'" alt="" >
                  </li>
                  <li class="img-info_li2" @clcik.stop="headerClick(item,index)">{{props.value.authorInfo.name}}</li>
                </ul>
             <h5>{{props.value.title}}</h5>
             <img class="jiao" src="/static/images/小角.png" alt="">
           </div>
         </vue-waterfall-easy>
       </div>

  </div>
</template>

<script>
  import vueWaterfallEasy from 'vue-waterfall-easy'  //瀑布流上拉刷新
  import { Toast } from 'mint-ui';  //弹框
  import { Indicator } from 'mint-ui';
  import {customerPubContentListHomePage} from "../../../assets/js/promiseHttp.js"
  export default {
    name: 'find',
    components: {
      vueWaterfallEasy
    },
    data(){
      return{
        mobileGap:10,
        reachBottomDistance:50,
        refshash:"下拉刷新",
        p:1,  //页
        s:20, //每页多少
        message:"", //触底提示
        pages:0,//每页数据
        isFirstLoad:true, //第一次加载
        maxCols:2,  //瀑布流显示最大的列数
        openPullDown:true,//下拉刷新
        OffsetHeight:0,//屏幕高度
        imgsArr:[], //数据
        userInfo:"", //用户信息
        pullDownDistance:0,//下拉的距离
      }
    },
    created() {

      this.userInfo = JSON.parse(localStorage.getItem("userInfo"))?JSON.parse(localStorage.getItem("userInfo")):"";
   this.$nextTick(function(){
     this.OffsetHeight = this.$refs.findBox.offsetHeight;
     document.title = "发现"
   })

      this.query(); //下拉加载
    },
    methods:{
//      pullDownMove(pullDownDistance){ //下拉刷新
//        this.pullDownDistance =pullDownDistance;
//      },
//      pullDownEnd(pullDownDistance){//下拉刷新
//        if(this.pullDownDistance>50){
//          this.p=1;
//          this.imgsArr = [];
//          this.getData();
//        }
//        this.pullDownDistance = 0
//      },
      headerClick(v,i){ //去吃瓜页
//        console.log(11111111)
      },
      fabulousClick(v,i){//登录的话去点赞 没登录去登录页
//        console.log(11111111)
      },
      clickFn(event,{index,value}){ //进入详情页

        this.$router.push({path:"/findDetail",query:{id:value.id}}) //去发现的详情页面，记得带状态跟token
      },
      getData(e){  //加载更多...
        console.log(e)
//        if(e.target.scrollHeight==(e.target.scrollTop+e.target.offsetHeight)){
          this.query();
//        }

      },

      query(){
        Indicator.open("加载中")
        customerPubContentListHomePage(this.p,this.s).then(res=>{
              if(res.status == true){
                res.data.forEach((item,index)=>{
                  item.imageUrl1 =item.cover.url+"?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim"
                })
                if(res.data.length>0){
                  this.imgsArr = this.imgsArr.concat(res.data);
                  Indicator.close()
                }else{
                  this.$refs.waterfall.waterfallOver()
                  this.message = "这是我的底线..."
                  Indicator.close()
                }
                this.p++;
              }else{
                Toast("网络出错了，请重试")
              }
            })
      },

    },
    mounted() {
    },
  }

</script>

<style scoped lang="less">
  #find {
    width: 100%;
    height: 100%;
   overflow: hidden;
    .find_box{
      width: 100%;
      height: 100%;
      overflow-y: scroll;
    }
  }
  #img-info{
    width: 100%;
    padding: 0.06rem;
    box-sizing: border-box;
    background: #ffffff;
    position: relative;
    .jiao{
      position: absolute;
      left: 0.14rem;
      top:-0.04rem;
      display: block;
      width: 0.09rem;
      height: 0.05rem;
    }
   p{
     width: 100%;
     font-size:0.12rem;
     font-family:PingFangSC-Regular;
     font-weight:400;
     color:#676768;
     line-height:0.16rem;
     overflow : hidden;
     text-overflow: ellipsis;
     display: -webkit-box;
     -webkit-line-clamp: 2;
     -webkit-box-orient: vertical;
     word-break:break-all;
     padding: 0 0.1rem;
     box-sizing: border-box;
     margin-top: 0.04rem;
     letter-spacing:0.01rem;
    }
    .img-info_ul{
      width: 100%;
      overflow: hidden;
      .img-info_li1{
        float: left;
        width: 0.24rem;
        height: 0.24rem;
        img{
          display: inline-block;
          width: 0.24rem;
          height: 0.24rem;
          border-radius: 50%;
          float: left;
        }
      }
      .img-info_li2{
        margin-left: 0.07rem;
        flex: 1;
        -ms-flex: 1;
        -webkit-flex: 1;
        display: block;
        float: left;
        line-height: 0.26rem;
        font-size: 0.12rem;
        color: #262626;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        letter-spacing:0.01rem;
      }
      .img-info_li3{
        float: left;
        width: 0.14rem;
        height: 0.13rem;
        margin-right: 0.04rem;
       img{
         display: inline-block;
         width: 0.14rem;
         height: 0.13rem;
       }
      }
      .img-info_li4{
        float: left;
        font-size:0.1rem;
        line-height: 0.16rem;
      }

    }
  }
  .messageFoot{
    width: 100%;
    height: 0.3rem;
    line-height: 0.3rem;
    color: rgba(5,5,5,0.3);
    text-align: center;
    margin-top: 0.2rem;
  }
</style>
