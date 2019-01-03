<template>
  <!--发现-->
  <div id="find">
       <div class="find_box" ref="findBox">
         <vue-waterfall-easy :imgsArr="imgsArr" srcKey="imageUrl1" :enablePullDownEvent="openPullDown" :maxCols="maxCols" @click="clickFn">
           <div slot="loading" slot-scope="{isFirstLoad}">
             <div slot="loading" v-if="isFirstLoad">不同努力加载中...</div>
             <div slot="loading" v-else></div>
           </div>
           <div id="img-info" slot-scope="props">

               <h5>{{props.value.title}}</h5>
                <ul class="img-info_ul">
                  <li  class="img-info_li1" @clcik.stop="headerClick(item,index)">
                    <img :src="props.value.authorInfo.ownerUrl?props.value.authorInfo.ownerUrl:'/static/images/defultphoto.png'" alt="" >
                  </li>
                  <li class="img-info_li2" @clcik.stop="headerClick(item,index)">{{props.value.authorInfo.name}}</li>
                  <li class="img-info_li3" @clcik.stop="fabulousClick(item,index)">
                    <img src="/static/images/点赞1.png" alt="" v-if="props.value.laudedStatus==false">
                    <img src="/static/images/点赞2.png" alt="" v-else>
                  </li>
                  <li class="img-info_li4" @clcik.stop="fabulousClick(item,index)">{{props.value.laudedCount}}</li>
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
          p: 1, // request param//
          s: 20, // request param////测试
        pages:0, //总共多少页
        isFirstLoad:true, //第一次加载
        maxCols:2,  //瀑布流显示最大的列数
        openPullDown:true,//下拉刷新
        OffsetHeight:0,//屏幕高度
        imgsArr:[], //数据
        userInfo:"", //用户信息
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
           this.imgsArr = res.data;
         }else{
           Toast("网络出错了，请重试")
         }
       })

    },
    methods:{
      headerClick(v,i){ //去吃瓜页
        console.log(11111111)
      },
      fabulousClick(v,i){//登录的话去点赞 没登录去登录页
        console.log(11111111)
      },
      clickFn(event,{index,value}){ //进入详情页
        console.log(value)
        this.$router.push({path:"/findDetail",query:{id:value.id}}) //去发现的详情页面，记得带状态跟token
      },
      handleScroll(e){  //回到顶部按钮出现
        if(e.target.scrollTop>=(e.target.scrollHeight-this.OffsetHeight-0.5)){

          this.p++
          let that = this;
          if(that.pages<that.p){
            that.p = that.pages;
            Toast("没有更多发现了");
            return;
          }else if(that.pages==that.p){

            customerPubContentListHomePage(this.p,this.s).then(res=>{
              if(res.status == true){
                res.data.forEach((item,index)=>{
                  item.imageUrl1 =item.cover.url+"?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim"
                })
                that.imgsArr = that.imgsArr.concat(res.data);


              }else{
              Indicator.close();
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
              }else{
                Indicator.close();
                Toast("网络出错了，请重试")
              }
            })
          }
        }

      },
    },
    mounted() {
      window.addEventListener('scroll',this.handleScroll,true) //监听高度

    },
  }

</script>

<style scoped lang="less">
  #find {
    width: 100%;
    height: 100%;
    .find_box{
      width: 100%;
      height: 100%;

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
      display: flex;
      .img-info_li1{
       width: 0.16rem;
        height: 0.16rem;
        img{
          display: block;
          width: 0.16rem;
          height: 0.16rem;
        }
      }
      .img-info_li2{
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
        flex: 1;
        font-size:0.1rem;
        line-height: 0.16rem;
      }

    }
  }
</style>
