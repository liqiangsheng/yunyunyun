<template>
  <div id="homeIndex">
   <ul class="homeIndex_header">
      <li v-for="(item,index) in headerArr" :class="{active:headerIndex==index}" @click="headerClick(index)">{{item}}</li>
   </ul>
   <div class="homeIndex_content">
     <Creativity v-if="headerIndex==0"></Creativity>
     <BigCoffeeSays v-if="headerIndex==1"></BigCoffeeSays>
     <Weathervane v-if="headerIndex==2"></Weathervane>
     <NewHorizons v-if="headerIndex==3"></NewHorizons>
     <FireMap v-if="headerIndex==4"></FireMap>
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
  import Creativity from "./components/creativity.vue"
  import Weathervane from "./components/WEATHERVANE.vue"
  import BigCoffeeSays from "./components/big_coffee_say.vue"
  import NewHorizons from "./components/new_horizons.vue"
  import FireMap from "../pictureLiveBroadcast/fireMap.vue" //火图直播
export default {
  name: 'homeIndex',
  components:{
    NewHorizons,Weathervane,Creativity,BigCoffeeSays,FireMap
  },
  data(){
    return{
      headerArr:["创新力","大咖说","风向标","新视界","火图直播"], //头部按钮
      headerIndex:0,//头部按钮下标
      tabbarAarr:[  //、、tab
        {name:"首页",icon:"./static/images/homesmall.png",icon1:"./static/images/homesmall1.png",path:"/homeIndex1_0"},
        {name:"资讯",icon:"./static/images/资讯2.png",icon1:"./static/images/资讯1.png",path:"/homeIndex"},
        {name:"智慧活动",icon:"./static/images/智慧活动2.png",icon1:"./static/images/智慧活动1.png",path:"/index"},
        {name:"我的",icon:"./static/images/mesmall.png",icon1:"./static/images/mesmall1.png",path:"/me"},
      ],
      tabbarAarrIndex:1,  //点击tab的下标
    }
  },
  created() {

  },
  methods:{
    headerClick(i){//头部按钮
      this.headerIndex = i;
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
      li{
        flex: 1;
        height: 0.5rem;
        font-size:0.15rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(102,102,102,1);
        line-height:0.5rem;
        text-align: center;
      }
      li.active{
        color:rgba(5,5,9,1);
      }
      li:first-child{
        text-align: right;
      }
      li:last-child{
        text-align: left;
      }
    }
    .homeIndex_content{
      position: absolute;
      left: 0;
      top:0.5rem;
      right: 0;
      bottom: 0.49rem;
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
