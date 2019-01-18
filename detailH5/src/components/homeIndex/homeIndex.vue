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
   <div class="homeIndex_content">
     <DesignOffee v-if="headerIndex==0"></DesignOffee>
     <ResourcePool v-if="headerIndex==1"></ResourcePool>
     <Weathervane v-if="headerIndex==2"></Weathervane>
     <FireMap v-if="headerIndex==3"></FireMap>
   </div>

  </div>
</template>

<script>
  import Creativity from "./components/creativity.vue"
  import DesignOffee from "./components/design_offee.vue" //设计咖 匠星
  import ResourcePool from "./components/resource_pool.vue" //资源池
  import IntelligenceOrps from "./components/Intelligence_orps.vue" //智慧团
  import Weathervane from "./components/WEATHERVANE.vue" //风向标  //资讯
  import BigCoffeeSays from "./components/big_coffee_say.vue" //大咖说
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

    }
  },
  created() {
    document.title = "资讯"
    this.headerIndex = this.$store.state.headerIndex; //点击还回回到原来的页面
  },
  methods:{
    swiperleft(){//左划
      this.headerIndex--;
      if(this.headerIndex<=0){
        this.headerIndex =0;
        this.$store.dispatch("headerIndex",this.headerIndex) //设计咖 智慧团 资源池下标存VueX
      }else {
        this.$store.dispatch("headerIndex",this.headerIndex) //设计咖 智慧团 资源池下标存VueX
      }

    },
    swiperright(){//右划
      this.headerIndex++;
      if(this.headerIndex>=3){
        this.headerIndex =3;
        this.$store.dispatch("headerIndex",this.headerIndex) //设计咖 智慧团 资源池下标存VueX
      }else {
        this.$store.dispatch("headerIndex",this.headerIndex) //设计咖 智慧团 资源池下标存VueX
      }
    },
    headerClick(i){//头部按钮
      this.headerIndex = i;
      this.$store.dispatch("headerIndex",this.headerIndex) //设计咖 智慧团 资源池下标存VueX
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
        font-size:0.15rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(102,102,102,1);
        text-align: center;
        .homeIndex_header_div{
          width: 90%;
          height: 0.44rem;
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
        .homeIndex_header_div.active{
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

      }
    }
    .homeIndex_content{
      position: absolute;
      left: 0;
      top:0.5rem;
      right: 0;
      bottom: 0;
    }

  }

</style>
