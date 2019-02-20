<template>
  <div class='PhotographBox'>
    <div class='PhotographBoxItem1'>
      <div class='PhotographBoxItem2'>注意事项</div>
      <div class='PhotographBoxItem3'><img src='../../assets/images/ok1.png'/></div>
      <div class='PhotographBoxItem4'>正确案例</div>
      <div class='PhotographBoxItem5'>
        <div>
          <img src='../../assets/images/6.png'/>
          不可多人
        </div>
        <div>
          <img src='../../assets/images/5.png'/>
          不能挡脸
        </div>
        <div>
          <img src='../../assets/images/4.png'/>
          不能模糊
        </div>
      </div>
      <div class='PhotographBoxItem5'>
        <div>
          <img src='../../assets/images/3.png'/>
          人脸姿态端正
        </div>
        <div>
          <img src='../../assets/images/4.png'/>
          不能带墨镜
        </div>
        <div>
          <img src='../../assets/images/1.png'/>
          不可侧脸过大
        </div>
      </div>

      <div  class='PhotographBoxItem6'>
        <div @click='cacelClick'>取 消</div>
        <div @click="PhotographClick">
          点击拍照
          <input id="fileBtn" type="file" @change="inputChange($event)" accept="image/*" />
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import { qiniuToken,upImgQiniu} from '../../assets/js/promiseHttp'; //数据
  import { Toast } from 'mint-ui';  //弹框
export default {
  name: 'Photograph',
  data(){
    return{
      qiniuToken:"", //七牛的Token
      userInfo:"",//登录的信息
      faceUrl:"", //拍照的图片
    }
  },
  created() {

     this.userInfo = JSON.parse(localStorage.getItem("userInfo"))
    if(this.userInfo){
      qiniuToken(this.userInfo.data.access_token).then(res=>{

        if(res.status==true){
          this.qiniuToken = res.data.upToken
        }else{
          Toast("网络异常，请重试")
        }
      })
    }else{
      Toast("登录出错啦！请重新登录")
    }
  },
  methods:{
    inputChange(event,){//上传拍照
      upImgQiniu(event,this.qiniuToken).then(res=>{
        this.faceUrl = res;
        console.log( this.faceUrl )
        sessionStorage.setItem("faceUrl", JSON.stringify(this.faceUrl)) //面部识别参数
        this.$store.dispatch('loadingFalse',false) //是顺着去加载页还是退回来false为顺着去
        this.$router.push({path:"/loading"})
      })
    },
    cacelClick(){ //取消
      this.$router.push({path:"/face"})
    },
    PhotographClick(){

    }
  }
}

</script>

<style scoped lang="less">
  .PhotographBox{
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: #0F0F19;
  }
  .PhotographBoxItem1{
    width: 90%;
    height: 80%;
    margin: 10% 5%;
    background:rgba(255,255,255,1);
    border-radius:5px;
    overflow: hidden;
    position: relative;
  }
  .PhotographBoxItem2{
    width:100%;
    height:32px;
    font-size:17px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(5,5,9,1);
    line-height:32px;
    margin-top: 10px;
    text-align: center;
  }
  .PhotographBoxItem3{
    width: 74px;
    height: 74px;
    margin: 0 auto;
    margin-top: 10px;
  }
  .PhotographBoxItem3 img{
    display: block;
    width: 74px;
    height: 74px;
  }
  .PhotographBoxItem4{
    width: 100%;
    height:26px;
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(33,203,97,1);
    line-height:36px;
    text-align: center;
  }
  .PhotographBoxItem5{
    width: 100%;
    display: flex;
    text-align: center;
    margin-top:10px;
  }
  .PhotographBoxItem5 div{
    flex: 1;
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height:24px;
  }
  .PhotographBoxItem5 div img{
    display: block;
    width: 62px;
    height: 62px;
    margin: 0 auto
  }
  .PhotographBoxItem6{
    width: 100%;
    height: 49px;
    display: flex;
    position: absolute;
    left: 0;
    bottom: 0;
    border-top: 1px solid #DCDCDC;
  }
  .PhotographBoxItem6 div{
    flex: 1;
    text-align: center;
    line-height: 49px;
  }
  .PhotographBoxItem6 div:nth-child(1){
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(153,153,153,1);
    border-right:  1px solid #DCDCDC;
  }
  .PhotographBoxItem6 div:nth-child(2){
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(33,203,97,1);
    position: relative;
    input{
      position: absolute;
      left: 0;
      top:0;
      width: 100%;
      height: 100%;
      opacity: 0;
    }
  }
</style>
