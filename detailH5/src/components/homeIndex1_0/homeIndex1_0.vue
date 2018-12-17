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
      <!--<Follow v-if="headerTabIndex==1"></Follow>-->
    </div>

  </div>
</template>

<script>
  import Find from './alter/find.vue';
  import Follow from './alter/follow.vue';
  export default {
    name: 'find',
    components:{
      Find,Follow
    },
    data(){
      return{
        headerTab:["发现","关注"], //tab
        headerTabIndex:0,//是关注还是发现
      }
    },
    created() {

    },
    methods:{
      tabClick(i){//头部切换
        this.headerTabIndex =i;
        if(i==1){
          this.$router.push({path:"/follow"})
        }
      }
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
      bottom: 0;
      top:0.4rem;
      right: 0;
      overflow: hidden;
    }
  }
</style>
