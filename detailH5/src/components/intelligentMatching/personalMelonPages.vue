<template>
  <!--个人吃瓜页-->
  <div id="personalMelonPages">
    <div class="personalMelonPages_header" ref="offsetHeight">
      <img :src="BjImg" alt="" class="personalMelonPages_header_img">
      <div class="personalMelonPages_header_box">
        <ul class="personalMelonPages_header_ul">
          <li class="personalMelonPages_header_li1">
            <img :src="listData.bannerUrl" alt="">
          </li>
          <li class="personalMelonPages_header_li2">
            <b>{{listData.name}}</b>
            <div>{{listData.address}}</div>
          </li>
          <li class="personalMelonPages_header_li3">
            <div>
              <div v-if="listData.type==false" @click="followClick('关注')"><img src="/static/images/关注.png" alt="">关注</div>
              <div class="active" v-if="listData.type==true" @click="followClick('已关注')"><img src="/static/images/gou.png" alt="">已关注</div>
            </div>
          </li>
        </ul>
        <ul class="personalMelonPages_header_ul1">
          <li v-for="(item,index) in headerList" @click="headerClick(item)">
            <b>999</b>
            <p>{{item}}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="personalMelonPages_box" ref="findBox">
      <vue-waterfall-easy :imgsArr="imgsArr" srcKey="imageUrl1" :enablePullDownEvent="openPullDown" :maxCols="maxCols" @click="clickFn">
        <div slot="loading" slot-scope="{isFirstLoad}">
          <div slot="loading" v-if="isFirstLoad">不同努力加载中...</div>
          <div slot="loading" v-else></div>
        </div>
        <div id="img-info" slot-scope="props">

          <h5>黑川雅之来报道！设计界绝对干货！！！这里有一枚...</h5>
          <ul class="img-info_ul">
            <li  class="img-info_li1"><img src="/static/images/defultphoto.png" alt=""></li>
            <li class="img-info_li2">dsfsdfds帅哥</li>
            <li class="img-info_li3"><img src="/static/images/点赞1.png" alt=""></li>
            <li class="img-info_li4">{{9999}}</li>
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
  import {activityImagesList,} from "../../assets/js/promiseHttp.js"
  export default {
    name: 'find',
    components: {
      vueWaterfallEasy
    },
    data(){
      return{
        BjImg:"/static/images/5.png", //高斯模糊的背景
        listData:{name:"Algernon",address:"深圳 , 南山",type:true,bannerUrl:"/static/images/5.png"}, //头部数据
        headerList:["关注","粉丝","点赞"], //头数的按钮
        bookId:{
          p: 1, // request param//
          s: 20, // request param//
          bookId:"7",
        }, //测试
        pages:0, //总共多少页
        isFirstLoad:true, //第一次加载
        maxCols:2,  //瀑布流显示最大的列数
        openPullDown:true,//下拉刷新
        imgsArr:[], //数据
        userInfo:"", //用户信息
        offsetHeight:0 //头部高度
      }
    },
    created() {
      this.$nextTick(function () {
        document.title = "个人吃瓜页"
      })
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"))?JSON.parse(localStorage.getItem("userInfo")):"";
      console.log(this.$router.history.current.query.id)
      activityImagesList(this.bookId).then(res=>{
        if(res.data.status==true){
          res.data.data.forEach((item,index)=>{
            item.imageUrl1 =item.imageUrl+"?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim"
          })
          this.pages = Math.ceil(res.data.total/this.bookId.s)
          this.imgsArr = res.data.data;
        }else{
          Toast("网络出错了，请重试")
        }
      })

    },
    methods:{
      headerClick(v){ //点击头部的按钮
        console.log(v,"fshkdfksdkfk")
      },
      followClick(v){ //点击是不是关注了
        if(v=='关注'){

        }else if(v=='已关注'){

        }
      },
      clickFn(event,{index,value}){ //进入详情页
        console.log(value)
        this.$router.push({path:"/findDetail",query:{id:value.id}}) //去发现的详情页面，记得带状态跟token
      },
      handleScroll(e){  //回到顶部按钮出现
//          console.log(e,"scrollTop")
//          console.log(e.target.scrollTop,"scrollTop")
//          console.log(e.target.scrollHeight,"OffsetHeight")
//          console.log(e.target.OffsetHeight,"OffsetHeight")
        if(e.target.scrollTop>=(e.target.scrollHeight-e.target.clientHeight-0.5)){

          this.bookId.p++
          let that = this;
          if(that.pages<that.bookId.p){
            that.bookId.p = that.pages;
            Toast("没有更多数据了");
            return;
          }else if(that.pages==that.bookId.p){
            Indicator.open("加载中")
            activityImagesList(that.bookId).then(res=>{
              if(res.data.status == true){
                res.data.data.forEach((item,index)=>{
                  item.imageUrl1 =item.imageUrl+"?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim"
                })
                that.imgsArr = that.imgsArr.concat(res.data.data);
                setTimeout(()=>{
                  Indicator.close();
                },200)

              }else{
                Indicator.close();
                Toast("网络出错了，请重试")
              }
            })
          }else if(that.pages>that.bookId.p){
            Indicator.open("加载中")
            activityImagesList(that.bookId).then(res=>{
              if(res.data.status == true){
                res.data.data.forEach((item,index)=>{
                  item.imageUrl1 =item.imageUrl+"?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim"
                })
                that.imgsArr = that.imgsArr.concat(res.data.data);
                setTimeout(()=>{
                  Indicator.close();
                },200)

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
  #personalMelonPages {
    width: 100%;
    .personalMelonPages_box{
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      top:1.8rem;
      box-sizing: border-box;
    }
    .personalMelonPages_header{
      width: 100%;
      height: 1.7rem;
      .personalMelonPages_header_img{
        display: inline-block;
        height: 100%;
        width: 100%;
        filter: blur(15px);
        opacity:0.3;
      }
      .personalMelonPages_header_box{
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top:0;
        padding-top: 0.32rem ;
        box-sizing: border-box;
        .personalMelonPages_header_ul{
          width: 100%;
          display: flex;
          padding: 0 0.16rem;
          box-sizing: border-box;
          .personalMelonPages_header_li1{
            width: 0.6rem;
            height: 0.6rem;
            img{
              display: block;
              width: 0.6rem;
              height: 0.6rem;
            }
          }
          .personalMelonPages_header_li2{
            width: 1.8rem;
            margin-left: 0.1rem;
            height: 0.6rem;
            b{
              font-size:0.17rem;
              font-family:PingFangSC-Medium;
              font-weight:500;
              color:rgba(5,5,9,1);
              line-height: 0.34rem;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            >div{
              font-size:0.12rem;
              font-family:PingFangSC-Regular;
              font-weight:400;
              color:rgba(51,51,51,1);
            }
          }
          .personalMelonPages_header_li3{
            flex: 1;
            margin-top: 0.15rem;
            >div{
              width: 0.8rem;
              height: 0.3rem;
              text-align: center;
              line-height: 0.3rem;
              border-radius: 0.03rem;
              border: 0.01rem solid #000000;
              float: right;
              div{
                width: 100%;
                img{
                  width: 0.1rem;
                  height: 0.11rem;
                  display: inline-block;
                  margin-right: 0.05rem;
                }
              }
              div.active{
                background: rgba(5,5,9,0.9);
                color: #ffffff;
              }

            }

          }

        }
        .personalMelonPages_header_ul1{
          width: 100%;
          height: 0.5rem;
          display: flex;
          margin-top:0.28rem ;
          background:rgba(255,255,255,0.3);
          li{
            flex: 1;
            text-align: center;
            padding-top: 0.05rem;
            b{
              font-size:0.15rem;
              font-family:PingFangSC-Regular;
              font-weight:400;
              color:rgba(5,5,9,1);
            }
            p{
              font-size:0.12rem;
              font-family:PingFangSC-Regular;
              font-weight:400;
              color:rgba(102,102,102,1);
              line-height: 0.16rem;
            }
          }
        }
      }
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
