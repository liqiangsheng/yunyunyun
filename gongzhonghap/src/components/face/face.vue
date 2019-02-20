<template>

    <div class='faceBox'>
      <div class='faceBoxItem1'>
        <img src='../../assets/images/face1.png'/>
        <img src='../../assets/images/hengtiao1.png'/>

      </div>
      <div class='faceBoxItem2'>体验人脸识别快速入场</div>
      <div class='faceBoxItem3' @click='experienceClick'>
        马上体验
      </div>
      <div class='faceBoxItem4' @click='erweimaClick'>
        不用了，我只用二维码入场
      </div>
    </div>

</template>

<script>
export default {
  name: 'face',
  data(){
    return{

    }
  },
  created() {

  },
  methods:{
    experienceClick(){ //体验人脸识别快速入场
      this.$router.push({path:"/Photograph"})
    },
    erweimaClick(){ //不用了，我只用二维码入场
     this.$router.push({path:"/acknowledgementOfOrder"})
    }
  }
}

</script>

<style scoped lang="less">
  .faceBox{
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: #0F0F19;
  }
  .faceBoxItem1{
    width: 1.44rem;
    height: 1.58rem;
    position: relative;
    margin: 0 auto;
    margin-top: 0.89rem;
  }
  .faceBoxItem1 img:first-child{
    display: block;
    width: 1.44rem;
    height: 1.58rem;
  }
  .faceBoxItem1 img:last-child{
    display: block;
    width: 1.5rem;
    height: 0.22rem;
    position: absolute;
    left: 0;
    top: -5%;
    animation: run 5s infinite;
  }
  @keyframes run{
    form{
      top: 0%;
    }
    to{
      top: 50%;
    }

  }

  .faceBoxItem2{
    width: 100%;
    text-align: center;
    height:0.29rem;
    font-size:0.15rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height:0.3rem;
    margin-top: 0.2rem;
  }
  .faceBoxItem3{
    width: 90%;
    margin: 0 auto;
    height: 0.5rem;
    background:rgba(255,255,255,1);
    border-radius:0.05rem;
    margin-top: 0.2rem;
    font-size:0.17rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(5,5,9,1);
    text-align: center;
    line-height: 0.5rem;
  }
  .faceBoxItem4{
    width: 90%;
    margin: 0 auto;
    height: 0.5rem;
    background:rgba(255,255,255,1);
    border-radius:0.05rem;
    margin-top: 0.2rem;
    font-size:0.17rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(5,5,9,1);
    text-align: center;
    line-height: 0.5rem;
  }
</style>
