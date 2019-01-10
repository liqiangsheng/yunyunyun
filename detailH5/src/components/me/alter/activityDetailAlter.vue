<template>
  <div id="activityDetailAlter">
    <p class="activityDetailAlter_p">{{listData.createdAt|formatTime}}</p>
    <div class="activityDetailAlter_img">
      <img :src="listData.url" alt="">
    </div>
    <div class="activityDetailAlter_value">
      {{listData.content}}
      <a :href="listData.elink">点击查看详情>></a>
    </div>
    <div class="activityDetailAlter_bnt" @click="okClick">
      确定
    </div>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';  //弹框
  import { notificationFindOne } from '../../../assets/js/promiseHttp';
export default {
  props:['childrenValue',"userInfo"],
  name: 'activityDetailAlter',
  data(){
    return{
      listData:{},
    }
  },
  created() {
    this.$nextTick(function () {
      if(this.childrenValue.notifyType == 1){
        document.title = "系统通知";
      }else if(this.childrenValue.notifyType == 2){
        document.title = "审核通知";
      }else if(this.childrenValue.notifyType == 3){
        document.title = "活动通知";
      }else if(this.childrenValue.notifyType == 4){
        document.title = "其他通知";
      }

    })
    notificationFindOne(this.childrenValue.id,this.userInfo.data.access_token).then(res=>{
      if(res.status==true){
        this.listData = res.data;
      }else{
        Toast("网络出错啦，请重试")
      }
    })
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
