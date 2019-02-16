<template>
  <!--发现-->
  <div id="find">
    <div class="find_box" ref="findBox">
      <vue-waterfall-easy ref="waterfall" :imgsArr="imgsArr" srcKey="imageUrl1" @click="clickFn" :maxCols="maxCols" :reachBottomDistance="reachBottomDistance">
        <!--<div slot="loading">-->
          <!--<div slot="loading" v-if="isFirstLoad"></div>-->
          <!--<div slot="loading" v-else></div>-->
        <!--</div>-->
        <!--<div slot="waterfall-over"> {{message}}</div>-->
        <div id="img-info" slot-scope="props">
          <h5>{{props.value.title}}</h5>
          <ul class="img-info_ul">
            <li  class="img-info_li1" @clcik.stop="headerClick(item,index)">
              <img :src="props.value.authorInfo.ownerUrl?props.value.authorInfo.ownerUrl:'/static/images/defultphoto.png'" alt="" >
            </li>
            <li class="img-info_li2" @clcik.stop="headerClick(item,index)">{{props.value.authorInfo.name}}</li>
          </ul>
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
        reachBottomDistance:500,
        refshash:"下拉刷新",
        p:1,  //页
        s:50, //每页多少
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
      customerPubContentListHomePage(this.p,this.s).then(res=>{
        console.log(res,"fdjsfgd")
        if(res.status==true){
          res.data.forEach((item,index)=>{
            item.imageUrl1 =item.cover.url+"?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim"
          })
          this.pages = Math.ceil(res.total/this.s)
          if(this.pages>0){
            this.message = '加载中...'
          }else{
            this.message = '这是我的底线...'
          }
          this.imgsArr = res.data;
        }else{
          Toast("网络出错了，请重试")
        }
      })
//      this.getData(); //下拉加载
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
      getData(){  //加载更多...
        this.query();
      },

      query(){
        customerPubContentListHomePage(this.p,this.s).then(res=>{
          if(res.status == true){
            res.data.forEach((item,index)=>{
              item.imageUrl1 =item.cover.url+"?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim"
            })
            if(res.data.length>0){
              this.imgsArr = this.imgsArr.concat(res.data);
            }else{
              this.$refs.waterfall.waterfallOver()
              this.message = "这是我的底线..."
            }

            this.p++;
          }else{
            Toast("网络出错了，请重试")
          }
        })
      },
      handleScroll(e){  //回到顶部按钮出现
        console.log(e,"OffsetHeight")
        console.log(e.target.scrollTop)
        console.log(e.target.scrollHeight)
        console.log(e.target.offsetHeight)
        if(e.target.scrollTop>=e.target.scrollHeight-e.target.offsetHeight-100){
          this.p++
          let that = this;
          if(that.pages<that.p){
            that.p = that.pages;
            this.message = "这是我的底线...";
            this.$refs.waterfall.waterfallOver();
          }else if(that.pages==that.p){
            customerPubContentListHomePage(this.p,this.s).then(res=>{
              if(res.status == true){
                res.data.forEach((item,index)=>{
                  item.imageUrl1 =item.cover.url+"?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim"
                })
                that.imgsArr = that.imgsArr.concat(res.data);
                this.message = "这是我的底线...";
              }else{
                Toast("网络出错了，请重试")
              }
            })
          }else if(that.pages>that.p){
            customerPubContentListHomePage(this.p,this.s).then(res=>{
              if(res.status == true){
                res.data.forEach((item,index)=>{
                  item.imageUrl1 =item.cover.url+"?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim"
                })
                that.imgsArr = that.imgsArr.concat(res.data);
                this.message = "加载中...";
              }else{

                Toast("网络出错了，请重试")
              }
            })
          }
        }

      },
    },
    mounted() {

      document.querySelector('.find_box').addEventListener('scroll',this.handleScroll,true) //监听高度
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
    h5{
      width: 100%;
      font-size:0.12rem;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(5,5,9,1);
      line-height:0.2rem;
      overflow : hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      word-break:break-all;
    }
    .img-info_ul{
      width: 100%;
      overflow: hidden;
      margin-top: 0.05rem;
      .img-info_li1{
        float: left;
        width: 0.16rem;
        height: 0.16rem;
        img{
          display: block;
          width: 0.16rem;
          height: 0.16rem;
        }
      }
      .img-info_li2{
        float: left;
        width: 0.9rem;
        line-height: 0.16rem;
        margin-left: 0.05rem;
        font-size:0.1rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(102,102,102,1);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
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
