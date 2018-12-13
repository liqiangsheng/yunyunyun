<template>
  <div id="activityDetailAlter">
   <p class="activityDetailAlter_p">{{listData.time|formatTime1}}</p>
    <div class="activityDetailAlter_img">
      <img :src="listData.bannerUrl" alt="">
    </div>
    <div class="activityDetailAlter_value">
     {{listData.value}}
    </div>
    <div class="activityDetailAlter_bnt" @click="okClick">
      确定
    </div>
  </div>
</template>

<script>
export default {
  name: 'activityDetailAlter',
  data(){
    return{
      listData:{bannerUrl:"./static/images/okOrder.png",time:15412121212121,value:"本次大会由11名嘉宾带来精彩演讲，其中剑桥大学莎特沃兹基金会研究员Jenny Molloy是GOSH的核心成员组织者，围绕“Gosh：2025让开放科学硬件无处不在”的主题发表演讲；加纳的技术创新中心Kumasi Hive联合创始人兼首席执行官Jorgeppiah、技术员Harry Akligoh以及贝宁经济学家和统计学家Justin Ahinon 展示了非洲开放科学与硬件项目；瑞士骇客协会主席Rachel Aronoff带来如何使任何人都能通过检查颊细胞中的DNA损伤来测试其基因组完整性的主题演讲；另有电子工程师Kaspar Emanuel、开源云P2P软件Subutai用户社区经FelipFonseca分别介绍自己创立的开源平台及研究成果等。"}
    }
  },
  created() {
    this.$nextTick(function () {
      document.title = "活动通知";
    })
    //            ?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75/imageslim         7牛的缩略图
  },
  methods:{
    okClick(){
      this.$emit("isActivetyShow",false)
    }
  }
}

</script>

<style scoped lang="less">
#activityDetailAlter {
  position: absolute;
  left:0;
  right: 0;
  top:0;
  bottom: 0;
  background: #ffffff;
  overflow-y: auto;
  border-top: 0.01rem solid #eeeeee;
  padding: 0.15rem;
  box-sizing: border-box;
  .activityDetailAlter_p{
    width: 100%;
    font-size:0.12rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height:0.45rem;
  }
  .activityDetailAlter_img{
    width: 100%;
    margin: 0.1rem 0;
    img{
      width: 100%;
      overflow: hidden;
      display: block;
    }
  }
  .activityDetailAlter_value{
    width: 100%;
    text-indent: 0.24rem;
    font-size:0.14rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(5,5,9,1);
    line-height:0.3rem;
  }
  .activityDetailAlter_bnt{
    width: 1rem;
    height: 0.3rem;
    background: #21CB61;
    line-height: 0.3rem;
    font-size: 0.12rem;
    margin: 0.1rem auto;
    text-align: center;
    border-radius: 0.04rem;
    color: #ffffff;
  }
}
</style>
