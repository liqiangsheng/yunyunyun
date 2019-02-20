<template>
  <!--收藏我的-->
  <div id="collect_my">
    <div class="collect_my_false" v-if="objList.length<=0">
      <img src="/static/images/queshengtu.png" alt="">
      <p>你的收藏区目前空空也～</p>
    </div>
    <div class="collect_my_true" v-else>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'praiseMe',
    data(){
      return{
        userInfo:{}, //用户信息
        p:1,  //页
        s:20, //每页多少
        message:"不同努力加载中...", //触底提示
        pageNum:"",//每页数据
        totalAll:0, //一共多少位设计师关注
        objList:[], // 大咖说数据
      }
    },
    created() {

      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    },
    methods:{

    }
  }

</script>

<style scoped lang="less">
  #collect_my {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    top:0;
    right: 0;
    .collect_my_false{
      width: 100%;
      padding-top: 1rem;
      img{
        display: block;
        width: 1rem;
        height: 0.94rem;
        margin: 0 auto;
      }
      p{
        font-size:0.12rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(153,153,153,1);
        line-height:0.5rem;
        text-align: center;
        width: 100%;
      }
    }

  }
</style>
