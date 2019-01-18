<template>
  <!--首页-->
  <div id="homeIndex1_0">
    <ul class="homeIndex1_ul">
      <li v-for="(item,index) in headerTab" @click="tabClick(index)">
        <div class="homeIndex1_ul_li_div" :class="[{active:headerTabIndex==index},'homeIndex1_span'+index]">
          <span>{{item.Chinese}}</span>
          <p>{{item.English}}</p>
        </div>
      </li>
    </ul>
    <div class="homeIndex1_0_components">
      <Find v-if="headerTabIndex==0"></Find>
    </div>

    <ul class="Indextab">
      <li v-for="(item,index) in tabbarAarr" class="indexTabLi" @click="tabarClick(index)">
        <img :src="tabbarAarrIndex==index?item.icon:item.icon1" alt="" class="indexTabImg" :class="{active:index==2}">
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
        headerTab:[{Chinese:"发现",English:"Find"},{Chinese:"关注",English:"Aattention"}], //tab
        headerTabIndex:0,//是关注还是发现
        tabbarAarr:[  //、、tab
          {icon:"./static/images/homesmall.png",icon1:"./static/images/homesmall1.png",path:"/homeIndex1_0"},
          {icon:"./static/images/资讯2.png",icon1:"./static/images/资讯1.png",path:"/homeIndex"},
          {icon:"./static/images/zhaio.png",icon1:"./static/images/zhaio.png",path:"/release"},
          {icon:"./static/images/智慧活动2.png",icon1:"./static/images/智慧活动1.png",path:"/index"},
          {icon:"./static/images/mesmall.png",icon1:"./static/images/mesmall1.png",path:"/me"},
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
        if(i==1){
          this.$router.push({path:"/follow"})
        }
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
        height: 0.52rem;
        font-family:PingFangSC-Light;
        font-weight:300;
        color:rgba(102,102,102,1);
        border-bottom: 0.01rem solid #e6e6e6;
        .homeIndex1_ul_li_div{
          width:0.7rem ;
          height: 0.46rem;
          text-align: center;
          font-size: 0.14rem;
          span{
            display: inline-block;
            line-height: 0.24rem;
            margin-top: 0.04rem;
          }
          p{
            line-height: 0.12rem;
            color:rgba(102,102,102,1);
            font-size: 0.1rem;
          }
        }
        .homeIndex1_ul_li_div.active{
          font-size:0.14rem;
          font-family:PingFangSC-Regular;
          font-weight:600;
          color:rgba(5,5,9,1);
          border-bottom:0.02rem solid rgba(5,5,9,1);

          p{
            color:rgba(102,102,102,1);
            font-weight:100;
            font-size: 0.1rem;
          }
        }
        .homeIndex1_span0{
          display: block;
          float: right;
          margin-right:0.1rem ;
        }
        .homeIndex1_span1{
          display: block;
          float: left;
          margin-left:0.1rem ;
        }
      }

    }
    .homeIndex1_0_components{
      width: 100%;
      position: absolute;
      left: 0;
      top:0.52rem;
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
        padding-top:0.13rem ;
        box-sizing: border-box;
        .indexTabImg{
          width:  24px;
          height:  24px;
          display:block;
          margin: 0 auto;
        }
        .indexTabImg.active{
          width: 0.3rem;
          transform: translateY(-0.05rem);
          height: 0.3rem;
        }
      }
    }
  }
</style>
