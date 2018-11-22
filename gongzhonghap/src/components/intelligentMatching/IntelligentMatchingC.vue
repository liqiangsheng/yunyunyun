<template>
  <div id="IntelligentMatchingC">
    <img src="/static/images/jindu.png" alt="" class="jindu">
     <div>
       加载中...
     </div>
  </div>
</template>

<script>
export default {
  name: 'IntelligentMatchingC',
  data(){
    return{

    }
  },
  created(){
    this.$nextTick(function () {
      document.title = "智能匹配";
    })
     //请求数据 传参回到小程序
    let matchingArrStr = JSON.parse(sessionStorage.getItem("matchingArrStr"))
    console.log(matchingArrStr)
    setTimeout(()=>{ //去活动
     this.$router.push({path:"/face"})
    },1000)

  },
  methods:{

  }
}

</script>

<style scoped lang="less">
 #IntelligentMatchingC{
   position: absolute;
   left:0;
   top: 0;
   right: 0;
   bottom: 0;
   overflow-y: auto;
   background: url(../../../static/images/bj2.png);
    background-size: 100% 100%;
   .jindu{
     display: block;
     width: 0.88rem;
     height: 0.88rem;
     margin: 0 auto;
     margin-top: 40%;
     animation:circleRoate 5s infinite linear ;
   }
   div{
     width: 100%;
     height:0.26rem;
     font-size:0.14rem;
     font-family:PingFangSC-Regular;
     font-weight:400;
     color:rgba(255,255,255,1);
     line-height:0.3rem;
     margin-top: 0.2rem;
     text-align: center;
   }
   @keyframes circleRoate{
     from{transform: rotate(0deg);}
     to{transform: rotate(360deg);}
   }
 }


</style>
