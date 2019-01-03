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

    }
  },
  created() {
    document.title = "资讯"
    this.headerIndex = this.$store.state.headerIndex; //点击还回回到原来的页面
  },
  methods:{
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
      bottom: 0;
    }

  }

</style>
