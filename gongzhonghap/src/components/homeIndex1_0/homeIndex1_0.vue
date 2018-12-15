<template>
  <!--首页-->
  <div id="homeIndex1_0">
    <ul class="homeIndex1_ul">
      <li v-for="(item,index) in headerTab" @click="tabClick(index)">
        <span :class="[{active:headerTabIndex==index},'homeIndex1_span'+index]">{{item}}</span>
      </li>
      <div class="homeIndex1_xian">/</div>
    </ul>
    <div class="homeIndex1_0_components">
      <Find v-if="headerTabIndex==0"></Find>
      <Follow v-if="headerTabIndex==1"></Follow>
    </div>

    <ul class="Indextab">
      <li v-for="(item,index) in tabbarAarr" class="indexTabLi" @click="tabarClick(index)">
        <img :src="tabbarAarrIndex==index?item.icon:item.icon1" alt="" class="indexTabImg">
        {{item.name}}
      </li>
    </ul>
  </div>
</template>

<script>
//  import vueWaterfallEasy from 'vue-waterfall-easy'  //瀑布流上拉刷新
  import Find from './alter/find.vue';
  import Follow from './alter/follow.vue';
//  import {activityImagesList,} from "../../assets/js/promiseHttp.js"

  export default {
    name: 'find',
    components:{
      Find,Follow
    },
    data(){
      return{
//        openPullDown:true,//下拉刷新
//        pages:0, //总共多少页
//        bookId:{
//        styleH:0,
//          p: 1, // request param//
//          s: 20, // request param//
//          bookId:"7",
//        }, //测试
        imgsArr:[],
        headerTab:["发现","关注"], //tab
        headerTabIndex:0,//是关注还是发现
        tabbarAarr:[  //、、tab
          {name:"首页",icon:"./static/images/homesmall.png",icon1:"./static/images/homesmall1.png",path:"/homeIndex1_0"},
          {name:"资讯",icon:"./static/images/资讯2.png",icon1:"./static/images/资讯1.png",path:"/homeIndex"},
          {name:"智慧活动",icon:"./static/images/智慧活动2.png",icon1:"./static/images/智慧活动1.png",path:"/index"},
          {name:"我的",icon:"./static/images/mesmall.png",icon1:"./static/images/mesmall1.png",path:"/me"},
        ],
        tabbarAarrIndex:0,  //点击tab的下标

      }
    },
    created() {
//      this.$nextTick(function () {
//        let h = document.documentElement.clientHeight || document.body.clientHeight;
//        console.log(h)
//         this.styleH = h/100+"rem"
//      })
//      activityImagesList(this.bookId).then(res=>{
//
//        if(res.data.status==true){
//          res.data.data.forEach((item,index)=>{
//            item.imageUrl1 =item.imageUrl+"?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim"
//          })
//          this.pages = Math.ceil(res.data.total/this.bookId.s)
//          this.imgsArr = res.data.data;
//        }else{
//          Toast("网络出错了，请重试")
//        }
//      })
    },
    methods:{
      tabarClick(i){  //tabar点击事件
        this.$router.push({path:this.tabbarAarr[i].path});

      },
      tabClick(i){//头部切换
        this.headerTabIndex =i;
      },
      getData(){
      },
      clickFn(){

      },

    }
  }

</script>

<style scoped lang="less">
  #homeIndex1_0 {
    position: absolute;
    left: 0;
    bottom: 0;
    top:0;
    right: 0;
    overflow: hidden;
    .homeIndex1_ul{
      width: 100%;
      display: flex;
      background: #ffffff;
      position: relative;
      li{
       flex: 1;
        height: 0.39rem;
        line-height: 0.39rem;
        font-size:0.12rem;
        font-family:PingFangSC-Light;
        font-weight:300;
        color:rgba(102,102,102,1);
        span.active{
          font-size:0.15rem;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(5,5,9,1);
        }
        .homeIndex1_span0{
          display: block;
          float: right;
          margin-right: 0.3rem;
        }
        .homeIndex1_span1{
          display: block;
          float: left;
          margin-left: 0.3rem;
        }
      }
      .homeIndex1_xian{
        position: absolute;
        left: 49.9%;
        top: 0.07rem;
        font-size:0.11rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(102,102,102,1);
      }
    }
    .homeIndex1_0_components{
      position: absolute;
      left: 0;
      top:0.4rem;
      bottom:0.5rem;
      right: 0;
      overflow: hidden;
    }
    .Indextab{
      position: absolute;
      width: 100%;
      height: 0.49rem;
      bottom: 0rem;
      left: 0;
      background: #ffffff;
      border-top: 0.01rem solid #EEEEEE;
      display: flex;
      .indexTabLi{
        flex: 1;
        text-align: center;
        padding-top:0.05rem ;
        .indexTabImg{
          width: 0.16rem;
          height: 0.19rem;
          display:block;
          margin: 0 auto;
        }
      }
    }
  }
</style>
