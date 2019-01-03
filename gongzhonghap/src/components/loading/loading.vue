<template>

  <div class='loadingBox'>
    <div class='loadingBoxItem'>
      <img src='/static/images/loding.png'/>
    </div>
    <div class='loadingBoxItem2'>莫着急，正拼命加载中...</div>
  </div>

</template>

<script>
  import { Toast } from 'mint-ui';  //弹框
export default {
  name: 'loading',
  data(){
    return{
      userInfo:"",//登录的信息
    }
  },
  created() {
    this.$nextTick(function () {
      document.title = "等待中";
    })
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"))
    if(this.userInfo){
      if(this.$store.state.loadingFalse==false){
        setTimeout(()=>{
          this.$router.push({path:"/acknowledgementOfOrder"})
        },1000)
      }
    }else{
      Toast("登录出错啦！请重新登录")
    }
  },
  methods:{


  }
}

</script>

<style scoped lang="less">
  .loadingBox{
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: #0F0F19;
  }
  .loadingBoxItem{
    width: 43px;
    height: 28px;
    margin: 0 auto;
    margin-top: 30%;
  }
  .loadingBoxItem img{
    display: block;
    width: 43px;
    height: 28px;
    animation: run 3s infinite;
  }
  .loadingBoxItem2{
    width: 100%;
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height:30px;
    text-align: center;
    margin-top: 47px;
  }
  @keyframes run{
    form{
      -webkit-transform: rotateZ(0deg);
      -moz-transform: rotateZ(0deg);
      -o-transform: rotateZ(0deg);
      -ms-transform: rotateZ(0deg);
      transform: rotateZ(0deg);
    }
    to{
      -webkit-transform: rotateZ(360deg);
      -moz-transform: rotateZ(360deg);
      -o-transform: rotateZ(360deg);
      -ms-transform: rotateZ(360deg);
      transform: rotateZ(360deg);
    }

  }
</style>
