<template>
  <div id="homeIndex">
   <ul class="homeIndex_header">
      <li v-for="(item,index) in headerArr"  @click="headerClick(index)">
        <div class="homeIndex_header_div" :class="{active:headerIndex==index}">
          <span>{{item.Chinese}}</span>
          <p>{{item.English}}</p>
        </div>

      </li>
   </ul>
   <!--<div class="homeIndex_content" v-on:swipeleft="swiperleft" v-on:swiperight="swiperright">-->
   <div class="homeIndex_content">
     <!--<Creativity v-if="headerIndex==0"></Creativity>-->
     <keep-alive>
       <DesignOffee v-show="headerIndex==0" ref="DesignOffee" :headerIndex="headerIndex"></DesignOffee>
     </keep-alive>
     <keep-alive>
       <ResourcePool v-show="headerIndex==1"  ref="ResourcePool" :headerIndex="headerIndex"></ResourcePool>
     </keep-alive>
     <keep-alive>
       <Weathervane v-show="headerIndex==2" ref="Weathervane" :headerIndex="headerIndex"></Weathervane>
     </keep-alive>
     <keep-alive>
       <FireMap v-if="headerIndex==3" ref="FireMap">></FireMap>
   </keep-alive>
   </div>

    <ul class="Indextab">
      <li v-for="(item,index) in tabbarAarr" class="indexTabLi" @click="tabarClick(index)">
        <img :src="tabbarAarrIndex==index?item.icon:item.icon1" alt="" class="indexTabImg" :class="{active:index==2}">
      </li>
    </ul>
  </div>
</template>

<script>
  import Creativity from "./components/creativity.vue"
  import DesignOffee from "./components/design_offee1.vue" //设计咖 匠星
  import ResourcePool from "./components/resource_pool.vue" //资源池 工坊
  import IntelligenceOrps from "./components/Intelligence_orps.vue" //智慧团
  import Weathervane from "./components/WEATHERVANE.vue" //风向标  //资讯
  import BigCoffeeSays from "./components/big_coffee_say.vue" //大咖说 匠心
  import NewHorizons from "./components/new_horizons.vue" //新世界
  import FireMap from "../pictureLiveBroadcast/fireMap.vue" //火图直播
export default {
  name: 'homeIndex',
  components:{
    NewHorizons,Weathervane,Creativity,BigCoffeeSays,FireMap,DesignOffee,ResourcePool,IntelligenceOrps
  },
  data(){
    return{
      headerArr:[{Chinese:"匠星",English:"Stars"},{Chinese:"工坊",English:"Studio"},{Chinese:"资讯",English:"News"},{Chinese:"图播",English:"Live picture"}], //头部按钮
      headerIndex:0,//头部按钮下标
      tabbarAarr:[  //、、tab
        {icon:"./static/images/homesmall.png",icon1:"./static/images/homesmall1.png",path:"/homeIndex1_0"},
        {icon:"./static/images/zixun2.png",icon1:"./static/images/zixun1.png",path:"/homeIndex"},
        {icon:"./static/images/zhaio.png",icon1:"./static/images/zhaio.png",path:"/release"},
        {icon:"./static/images/zhihuihuodong2.png",icon1:"./static/images/zhihuihuodong1.png",path:"/index"},
        {icon:"./static/images/mesmall.png",icon1:"./static/images/mesmall1.png",path:"/me"},
      ],
      tabbarAarrIndex:1,  //点击tab的下标
      numb:0,
    }
  },
  watch:{

    'headerIndex':function (newl,old1) {
      if(newl==1){
        this.$refs.ResourcePool.resource_poolScroll();
      }else if(newl==2){
        this.$refs.Weathervane.weathERVANEScrollTop();
      }else if(newl==0){
        this.$refs.DesignOffee.DesignOffeeScrollTop();
      }
    }
  },
  created() {
    this.headerIndex = this.$store.state.headerIndex; //点击还回回到原来的页面
  },
mounthed(){

},
  methods:{

    headerClick(i){//头部按钮
      this.headerIndex = i;
      this.$store.dispatch("headerIndex",this.headerIndex) //设计咖 智慧团 资源池下标存VueX
    },
    tabarClick(i){  //tabar点击事件
//     this.tabbarAarrIndex = i;
      this.$router.push({path:this.tabbarAarr[i].path});

    },
  },
}

</script>

<style scoped lang="less">
  #homeIndex{
     width: 100%;
    .homeIndex_header{
      width: 100%;
      display: flex;
      padding: 0 0.1rem;
      box-sizing: border-box;
      background: #ffffff;
      border-bottom: 0.01rem solid #e6e6e6;
      li{
        flex: 1;
        height: 0.52rem;
        font-family:PingFangSC-Medium;
        font-weight:100;
        color:rgba(102,102,102,1);
        text-align: center;
        .homeIndex_header_div{
          width: 90%;
          height: 0.44rem;
          text-align: center;
          span{
            display: inline-block;
            line-height: 0.24rem;
            margin-top: 0.04rem;
            font-size: 0.14rem;
            font-weight: 100;
          }
          p{
            line-height: 0.12rem;
            color:rgba(102,102,102,1);
            font-weight:100;
            font-size: 0.1rem;
          }
        }
        .active{
          border-bottom:0.02rem solid rgba(5,5,9,1);
          span{
            display: inline-block;
            line-height: 0.24rem;
            margin-top: 0.04rem;
            font-size: 0.14rem;
            color: #262628;
            font-weight: 600;
          }

        }

      }
    }
    .homeIndex_content{
      position: absolute;
      left: 0;
      top:0.53rem;
      right: 0;
      bottom: 0.55rem;
    }
    .Indextab{
      position: absolute;
      width: 100%;
      height: 0.55rem;
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
