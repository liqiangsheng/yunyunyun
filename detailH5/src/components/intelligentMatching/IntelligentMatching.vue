<template>
  <div id="IntelligentMatching">
        <div class="IntelligentMatchingItem">
          <img src="/static/images/images7.png" alt="">
        </div>
        <div class="IntelligentMatchingItem1">
          <div class="IntelligentMatchingItem1Index">请问你需要智能匹配服务吗？</div>
          <ul class="IntelligentMatchingItem1Index1">
            <li v-for="(item,index) in bntList" :class="{active:listIndex == index}" @click="IntelligentMatchingClick(item,index)">{{item}}</li>
          </ul>
        </div>
  </div>
</template>

<script>
export default {
  name: 'IntelligentMatching',
  data(){
    return{
       bntList:["请求智能匹配参展商并安排洽谈","不需要了，我线下看看再说","不需要了，我只是普通观众"], //按钮
      listIndex:0, //默认选中的下标
    }
  },
  created(){
    console.log(this.$Request,"DASDKL")
    localStorage.setItem("token",JSON.stringify(this.$Request.token));
  },
  methods:{
    IntelligentMatchingClick(v,i){ //点击选中的下标
      this.listIndex =i;
      if(this.listIndex== 0){ //去智能匹配页面
         this.$router.push({path:"/IntelligentMatchingA"})
      }else { //去拍照页面  //回到小程序
        wx.miniProgram.navigateTo( { url:`/pages/face/face`});
      }
    }
  }
}

</script>

<style scoped lang="less">
 #IntelligentMatching{
   position: absolute;
   left:0;
   top: 0;
   right: 0;
   bottom: 0;
   overflow-y: auto;
   background: url(../../../static/images/bj2.png);
    background-size: 100% 100%;
 }
  .IntelligentMatchingItem{
    width: 100%;
    img{
      display: block;
      width: 100%;
    }
  }
  .IntelligentMatchingItem1{
    width: 92%;
    margin: 0 auto;
    height: 2.7rem;
    background: url(../../../static/images/bg.png);
    background-size: 100% 100%;
    .IntelligentMatchingItem1Index{
      width: 100%;
      height: 0.5rem;
      text-align: center;
      line-height: 0.5rem;
      font-size:0.15rem;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(255,255,255,1);
    }
    .IntelligentMatchingItem1Index1{
      width: 90%;
      margin: 0 auto;
      padding-top: 0.2rem ;
      li{
        width: 100%;
        height: 0.45rem;
        background: url(../../../static/images/yuan55.png);
        background-size: 100% 100%;
        font-size:0.15rem;
        font-family:PingFangSC-Semibold;
        font-weight:600;
        color:rgba(153,153,153,1);
        text-align: center;
        line-height: 0.45rem;
        margin-bottom: 0.2rem;
      }
      li.active{
        background: url(../../../static/images/yuan56.png);
        background-size: 100% 100%;
        font-weight:600;
        color:rgba(5,5,9,1);
      }
    }
  }

</style>
