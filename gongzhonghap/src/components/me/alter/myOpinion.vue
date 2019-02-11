<template>
  <div id="myOpinion">
      <ul class="myOpinion_ul" v-if="lisrData.length>0">
        <li v-for="(item,index) in lisrData" class="myOpinion_li">
          <p class="myOpinion_wen">问： {{item.question}}</p>
          <p class="myOpinion_da"><b>答：</b>{{item.answer}}</p>
        </li>
      </ul>
    <div  v-if="lisrData.length<=0" class="lengthFalse">
      <img src="/static/images/queshengtu.png" alt="">
      <p>常见区目前空空如也～</p>
    </div>
    <div class="messageFoot" @click="updataMore" v-if="lisrData.length>0">
      {{message}}
    </div>
  </div>
</template>

<script>
  import { questionAndAnswerList } from '../../../assets/js/promiseHttp';
  import { Toast } from 'mint-ui';  //弹框
  export default {
  name: 'myOpinion',
  data(){
    return{
      userInfo:{}, //用户信息
      lisrData:[], //数据
      p:1,  //页
      s:20, //每页多少
      message:"不同努力加载中...", //触底提示
      pageNum:0,//每页数据
    }
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    questionAndAnswerList(this.userInfo.data.access_token,this.p,this.s).then(res=>{
           if(res.status == true){
             this.pageNum = Math.ceil(res.total/this.s);
             if(this.pageNum>1){
               this.message = '点击加载更多...';
             }else{
               this.message = '这是我的底线...';
             }
             this.lisrData = res.data;
           }else{
             Toast("网络出错啦！请重试")
           }
    })
  },
  methods:{
    updataMore(){
      this.p++;
      if(this.p>this.pageNum){
        this.message = "这是我的底线..."
        Toast("这是最后一页啦！")
      }else if(this.p==this.pageNum){
        this.message = "这是我的底线..."
        questionAndAnswerList(this.userInfo.data.access_token,this.p,this.s).then(res=>{
          if(res.status == true){
            this.ListData = this.ListData.concat(res.data);
          }else{
            Toast("网络出错啦，请重试")
          }
        })
      }else if(this.p<this.pageNum){
        this.message = "点击加载更多..."
        questionAndAnswerList(this.userInfo.data.access_token,this.p,this.s).then(res=>{
          if(res.status == true){
            this.ListData =  this.ListData.concat(res.data);
          }else{
            Toast("网络出错啦，请重试")
          }
        })
      }
    }
  }
}

</script>

<style scoped lang="less">
#myOpinion{
  position: absolute;
  left:0;
  right: 0;
  top:0;
  bottom:0;
  overflow-y: auto;
  border-top: 0.01rem solid #eeeeee;
  box-sizing: border-box;
  .myOpinion_ul{
    width: 100%;
    padding-bottom: 0.15rem;
    li{
      width: 100%;
      padding: 0.15rem;
      box-sizing: border-box;
      background: #ffffff;
      margin-top: 0.15rem;
      .myOpinion_wen{
        width: 100%;
        font-size:0.14rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(5,5,9,1);
        line-height:0.24rem;
        padding-bottom: 0.1rem;
        overflow: hidden;
        border-bottom: 0.01rem solid #eeeeee;
      }
      .myOpinion_da{
        width: 100%;
        margin-top: 0.1rem;
        font-size:0.14rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(5,5,9,1);
        line-height:0.28rem;
      }
    }
  }
  .lengthFalse{
    width: 100%;
    padding-top: 1rem;
    img{
      display: block;
      margin: 0 auto;
      width: 1rem;
      height: 0.94rem;
    }
    p{
      width: 100%;
      text-align: center;
      line-height: 0.5rem;
      font-weight:400;
      color:rgba(153,153,153,1);
      margin-top: 0.2rem;
    }
  }
  .messageFoot{
    width: 100%;
    height: 0.3rem;
    line-height: 0.3rem;
    color: rgba(5,5,5,0.3);
    text-align: center;
    margin-top: 0.1rem;
  }
}
</style>
