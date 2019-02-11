<template>
  <!--创新力-->
  <div id="creativity">
   <ul :class="{active:headerIndex==0}">
     <li v-for="(item,index) in headerArr" @click="headerClick(index)">
       <span :class="{active:headerIndex==index}">{{item}}</span>
     </li>
   </ul>
    <div class="creativityComponents">
      <DesignOffee v-if="headerIndex==0"></DesignOffee>
      <IntelligenceOrps v-if="headerIndex==1"></IntelligenceOrps>
      <ResourcePool v-if="headerIndex==2"></ResourcePool>
    </div>
  </div>
</template>

<script>
  import DesignOffee from "./design_offee1.vue" //设计咖
  import IntelligenceOrps from "./Intelligence_orps.vue" //智慧团
  import ResourcePool from "./resource_pool.vue" //资源池
export default {
  name: 'creativity',
  components:{
    DesignOffee,IntelligenceOrps,ResourcePool
  },
  data(){
    return{
      headerArr:["设计咖","智慧团","资源池"], //头部按钮
      headerIndex:0,//头部按钮下标
    }
  },
  created() {
    document.title = "创新力"
    this.headerIndex = this.$store.state.tabbarAarrIndex; //点击还回回到原来的页面
  },
  methods:{
    headerClick(index){
      this.headerIndex = index;
      this.$store.dispatch("tabbarAarrIndex",this.headerIndex) //设计咖 智慧团 资源池下标存VueX
    }
  }
}

</script>

<style scoped lang="less">
  #creativity{
     width: 100%;
    height: 100%;

    ul{
      width: 100%;
      display: flex;
      background: #ffffff;
      margin-top: 0.01rem;
      li{
        flex: 1;
        text-align: center;
        height: 0.5rem;
        line-height: 0.5rem;
        font-size:0.14rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        span{
          display: inline-block;
          height: 0.48rem;
          color:rgba(153,153,153,1);
        }
        span.active{
          color:#050509;
          border-bottom: 0.02rem solid #050509;
        }
      }
    }
    ul.active{
      background: url(../../../../static/images/tab-bg.png);
      background-size: cover;
    }
    .creativityComponents{
       position: absolute;
          left: 0;
          right: 0;
          bottom:0;
          top: 0.5rem;
          overflow: hidden;
    }
  }

</style>
