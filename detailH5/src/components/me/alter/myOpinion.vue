<template>
  <div id="myOpinion">
    <ul class="myOpinion_ul">
      <li v-for="(item,index) in lisrData" class="myOpinion_li">
        <p class="myOpinion_wen">问： {{item.question}}</p>
        <p class="myOpinion_da"><b>答：</b>{{item.answer}}</p>
      </li>
    </ul>
    <div class="messageFoot" @click="updataMore">
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
      this.userInfo = {data:{access_token:this.$router.history.current.query.token,id:this.$router.history.current.query.id}}//截取url
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
        console.log(res,"fdsfsdkfs")
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
