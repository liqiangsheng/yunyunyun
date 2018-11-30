<template>
  <div id="pictureLiveBroadcast">
    <div class="pictureLiveBroadcast_box" ref="box">
      <!--轮播-->
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,index) in banner">
            <div class="imgIs">
              <img :src="item.aaa" >
            </div>
          </div>
        </div>
      </div>
      <!---->
      <div class="pictureLiveBroadcast_title">
          <h5>{{titleArr.title}}</h5>
          <div class="pictureLiveBroadcast_titleItem">已有 <span>{{titleArr.peopleNum}}</span>人次浏览了此相册</div>
          <div class="pictureLiveBroadcast_titleItem"><img src="/static/images/time.png" alt="">{{titleArr.time|formatTime}}</div>
          <div class="pictureLiveBroadcast_titleItem"><img src="/static/images/position.png" alt="">{{titleArr.address}}</div>
      </div>
    </div>

    <ul class="pictureLiveBroadcast_tab"  :style="fixedStyle">
      <li v-for="(item,index) in tabAtt" @click="stateClick(index)"><span class="span" :class="{active:tabState==index}">{{item}}</span><br><span class="span1"  v-if="tabState == index"></span></li>
    </ul>
    <div class="pictureLiveBroadcast_center" v-show="tabState == 0">
      <vue-waterfall-easy :imgsArr="imgsArr" srcKey="aaa" @scrollReachBottom="getData" @click="clickFn"> </vue-waterfall-easy>
    </div>
    <ul class="pictureLiveBroadcast_ul" v-show="tabState == 1">
         <li v-for="(item,index) in imgsArr" v-if="index<3" class="li1">
           <img :src="item.aaa" alt="">
           <div :class="[{active1:index==1},{active2:index==2}]">{{index+1}}</div>
         </li>
      </ul>
    <ul class="pictureLiveBroadcast_ul1" v-show="tabState == 1">
         <li v-for="(item,index) in imgsArr" v-if="index>=3&&index<9" class="li2">
           <img :src="item.aaa" alt="">
           <div>{{index+1}}</div>
         </li>

      </ul>
    <ul class="pictureLiveBroadcast_ul2" v-show="tabState == 1">
         <li v-for="(item,index) in imgsArr" v-if="index>=9"  class="li3">
           <img :src="item.aaa" alt="">
         </li>
    </ul>
    <imgenlarge :imgenlargedata="imgenlargedata" v-if="imgenlargeShow" @ishowItem="ishowItem"></imgenlarge>
  </div>
</template>

<script>
  import vueWaterfallEasy from 'vue-waterfall-easy'  //瀑布流上拉刷新
  import imgenlarge from './imgenlarge.vue'
export default {
  name: 'pictureLiveBroadcast',
  data(){
    return {
      imgenlargedata:"",//传给图片的数据
      imgenlargeShow:false,
      tabAtt:["图片直播","热门照片"],
      tabState:0,
      titleArr:{
        title:"2018第六届深圳国际工业设计大展",
        time:1541245689871,
        address:"广东 深圳",
        peopleNum:457255,
      },
      fixedStyle:"", //吸顶初始效果
      banner:[
        {
          "aaa": "./static/images/banner1.png"
        },
        {
          "aaa": "./static/images/banner2.png"
        },
        {
          "aaa": "./static/images/banner3.png"
        },
        {
          "aaa": "./static/images/banner4.png"
        },
      ],
        imgsArr: [],
        group: 0, // request param//
        scrollTop:0, //距离顶部距离
       }
  },
  components: {
    vueWaterfallEasy,imgenlarge
  },
  created(){
    this.$nextTick(function () {
       document.title = "不同活动图片直播";

    })
    this.getData()
    let that =this;
    setTimeout(()=>{
      let clientHeight = that.$refs.box.clientHeight;
      window.onscroll = function(){ //监听滚动高度
        //变量scrollTop是滚动条滚动时，距离顶部的距离
        var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;

          if(scrollTop>=clientHeight){ //吸顶效果
            that.$nextTick(function () {})
            that.fixedStyle={"position":"fixed","top":"0","left":"0","z-index":"999991!important"}
          }else {
            that.fixedStyle='';
          }
        //变量windowHeight是可视区的高度
        var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
        //变量scrollHeight是滚动条的总高度
        var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
        //滚动条到底部的条件
        if(scrollTop == (scrollHeight - windowHeight)){
          //写后台加载数据的函数
          that.getData();
        }
      }
    },500)

  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll) //监听回到顶部按钮出现
    let that = this;
    this.$nextTick(() => {
      //     滑动
      var mySwiper = new Swiper('.swiper-container', {
        autoplay: true,
        loop: true
      })
    })
  },
  methods: {
    stateClick(i){//tab切换
      this.tabState = i;
    },
    ishowItem(v){ //子组件传来的false
      this.imgenlargeShow = v;
    },
    clickFn(event, { index, value }) { //点击每个图片放大
      // 阻止a标签跳转
      event.preventDefault()
      // 只有当点击到图片时才进行操作
      if (event.target.tagName.toLowerCase() == 'img') {
        console.log('img clicked',index, value)
        this.imgenlargeShow = true;
        this.imgenlargedata = value;//传给图片的数据
      }
    },
    getData() {
      this.$Aiox.get('./static/json/tsconfig.json?group=' + this.group) // 真实环境中，后端会根据参数group返回新的图片数组，这里我用一个惊呆json文件模拟
        .then(res => {
          this.imgsArr = this.imgsArr.concat(res.data);
            this.group++
        })
      console.log(this.group)
    },
  },
}

</script>

<style scoped lang="less">
#pictureLiveBroadcast{
  /*position: relative;*/
  .pictureLiveBroadcast_box{
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
        }
      }

    }
    .pictureLiveBroadcast_title{
      width: 100%;
      padding: 0.1rem;
      background: #ffffff;
      box-sizing: border-box;
      h5{
        width: 100%;
        font-size: 0.18rem;
        line-height: 0.24rem;
      }
      .pictureLiveBroadcast_titleItem{
        width: 100%;
        font-size: 0.12rem;
        line-height: 0.24rem;
        span{
          color: rgb(41, 152, 255);
        }
        img{
          display: inline-block;
          width:0.09rem;
          height: 0.09rem;
          margin-right:0.15rem;
        }
      }
    }
  }
.pictureLiveBroadcast_center{
  width: 100%;
  background: #ffffff;
}
  .pictureLiveBroadcast_ul{
    width: 100%;
    .li1{
      width: 100%;
      margin-top: 0.05rem;
      position: relative;
      img{
        width: 100%;
      }
      >div{
        width: 0.36rem;
        height: 0.36rem;
        line-height: 0.36rem;
        background: #f26100;
        text-align: center;
        font-size: .22rem;
        position: absolute;
        left: 0;
        bottom: 0;
        color: #ffffff;
      }
      >div.active1{
        background: #f28100;
      }
      >div.active2{
        background: #f2be00;
      }
    }
  }
  .pictureLiveBroadcast_ul1{
    flex-wrap: wrap;
    margin-bottom: .05rem;
    overflow: hidden;
    .li2{
      position: relative;
      width: 33.333333vw;
      height: 33.333333vw;
      float: left;
      box-sizing: border-box;
      padding: 0.05rem 0.05rem 0 0;
      img{
        display: block;
        width: 100%;
        height: 100%;
      }
      >div{
        width: 0.28rem;
        height: 0.28rem;
        line-height: 0.28rem;
        background: #999;
        text-align: center;
        font-size: .18rem;
        position: absolute;
        left: 0;
        bottom: 0;
        color: #ffffff;
      }

    }
    .li2:nth-child(3n){
      padding-right:0;
    }
  }
  .pictureLiveBroadcast_ul2{
    flex-wrap: wrap;
    margin-bottom: .05rem;
    overflow: hidden;
    margin-top: 0;
    .li3{
      width: 33.333333vw;
      height: 33.333333vw;
      float: left;
      box-sizing: border-box;
      padding: 0.05rem 0.05rem 0 0;
      img{
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .li3:nth-child(3n){
      padding-right:0;
    }
    .li3:nth-child(1),.li3:nth-child(3),.li3:nth-child(2){
      padding-top:0;
    }
  }
  .pictureLiveBroadcast_tab{
    width: 100%;
    overflow: hidden;
    background: #ffffff;
    padding-left: 0.1rem;
    li{
      width: 1rem;
      height: 0.3rem;
      float: left;
      text-align: center;
      .span1{
        display: inline-block;
        width: 0.4rem;
        height: 0.02rem;
        background:rgb(41, 152, 255) ;
        transform: translateY(-0.15rem);
      }
      .span{
        display: inline-block;
        width: 1rem;
        height: 0.28rem;
        line-height: 0.28rem;
      }
      .span.active{
        color: rgb(41, 152, 255) ;
      }
    }
  }

}

</style>
<style>
  .vue-waterfall-easy-container .vue-waterfall-easy-scroll{
    overflow-x: visible!important;
    overflow-y: visible!important;
  }
</style>
