<template>
  <div id="admission">
    <div class='admissionBox'>
      <div class='admissionBoxItem1'><img src='/static/images/okOrder.png'/></div>
      <div class='admissionBoxItem2'>
        <div class='view'>
          <span>姓　　名</span>
          <span>{{dataObj.name}}</span>
        </div>
        <div class='view'>
          <span>注  册  码</span>
          <span>{{dataObj.signCode}}</span>
        </div>
        <div class='view' v-if='!!dataObj.faceUr'>
          <span>人像状态</span>
          <sapn style='color:#FE5F5F'>已拍照</sapn>
        </div>
        <div class='voice' @click='voiceClick'>
          <span>明星产品语音导览</span>
          <img class='imgae1' src='/static/images/video.gif'/>
          <img class='imgae' src='/static/images/right.png'/>
        </div>
      </div>
      <div class='admissionBoxItem3' v-if='!!dataObj.faceUr'>
        <img :src='dataObj.faceUrl'/>
        <div id="qrcode"></div>
      </div>
      <div class='admissionBoxItem5' v-else>
        <div id="qrcode" ref="qrcode"></div>
      </div>
      <div class='admissionBoxItem4'>
        <div>可凭该图片上面的二维码扫码入场或者刷脸入场</div>
        <div>
          <span style='font-size:16px;font-weight:900'>温馨提示：</span> 手机截图可保存至手机。
        </div>
        <div>仅限本人使用，转发无效。</div>
      </div>
      <div class='IntelligenceBox'>
        <div class='IntelligenceBoxItem'>一　参展商对接信息　一</div>
        <div class='IntelligenceBoxItem1' v-for="(item,inde ) in dataObj.conList">
          <div class='IntelligenceBoxItem1Index'>{{item.companyName}}</div>
          <div class='IntelligenceBoxItem1Index1'>{{item.dateTime}}
            <span>　|　</span>
            <span> {{item.conLocation}}</span>　
            <span class='IntelligenceBoxItem1Index2'>{{item.conMode}}</span>
          </div>
          <div class='IntelligenceBoxItem1Index3' v-if='item.conScheduler'>{{item.conScheduler}}</div>
        </div>
        <div class='IntelligenceBoxItem2'>
          组委会咨询热线 400-800-99327
        </div>
      </div>
      <div class='scrollTop' @click='goHome'>
        首页
      </div>
    </div>
  </div>
</template>

<script>
  import QRCode from 'qrcodejs2'
  import { findSimpleOneToClient,} from '../../assets/js/promiseHttp'; //数据
  import { Toast } from 'mint-ui';  //弹框
export default {
  components:{QRCode},
  name: 'Admission',
  data(){
    return{
      dataObj:{}, //二维码数据
      userInfo:"",//登录的信息
    }
  },
  created(){

    this.userInfo = JSON.parse(localStorage.getItem("userInfo"))
    let objListId = JSON.parse(localStorage.getItem("objListId"))
    if(this.userInfo){
      findSimpleOneToClient(this.userInfo.data.access_token,objListId).then(res=>{
         if(res.status == true){
           if(!!res.data.conList){
             res.data.conList.map((item, index) => {
               item.dateTime = item.conTime ? item.conTime|formatTime : "待定";
               item.conLocation = item.conLocation ? item.conLocation : "待定";
               item.conMode = item.conMode ? item.conMode : "待定";
             })
           }
            this.dataObj = res.data;
           this.$nextTick (function () {
             this.qrcode(res.data.signCode);
           })

         }else{
           Toast("网络异常，请重试")
         }
      })

    }else{
      Toast("登录出错啦！请重新登录")
    }
  },
  methods:{
    goHome(){ //回到首页
      this.$router.push({path:"/index"})
    },
    qrcode (message) {
      let qrcode = new QRCode('qrcode', {
        width: 80,  // 设置宽度
        height: 80, // 设置高度
        text: message
      })
    },
    bingLongClick(){//长按二维码

    },
    voiceClick(){//明星产品

     location.href=window.common.webvie
    }
  },
}

</script>

<style scoped lang="less">
#admission {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top:0;
  overflow-y: auto;
  overflow-x: hidden;
  .admissionBox{
    width: 100%;
    min-height: 732px;
    background: #fff;
    /*overflow-y: auto;*/
    border-top: 1px solid #DFDFDF;
  }
  .admissionBoxItem1,.admissionBoxItem2{
    width: 100%;
    padding: 15px 15px 10px 15px;
    box-sizing: border-box;
    border-bottom: 1px solid #DFDFDF;
  }
  .admissionBoxItem1 img{
    width: 100%;
  }
  .admissionBoxItem2{
    padding-top: 0;
  }
  .admissionBoxItem2 .view{
    width: 100%;
    height: 45px;
    border-bottom: 1px solid #DFDFDF;
    line-height: 45px;
    display: flex;
  }
  .admissionBoxItem2 .view:last-child{
    border-bottom: none;
  }
  .admissionBoxItem2 .view span:first-child{
    width: 79px;
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
  }
  .admissionBoxItem2 .view span:nth-child(2){
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
    flex: 1
  }
  .voice{
    width: 100%;
    height: 45px;
    line-height: 45px;
    position: relative;
  }
  .voice span{
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
  }
  .voice .imgae{
    display: block;
    width: 7px;
    height: 13px;
    position: absolute;
    right: 5px;
    top:35%;
  }
  .voice .imgae1{
    display: block;
    width: 25px;
    height: 24px;
    position: absolute;
    right: 20px;
    top:12.5px;
  }
  .admissionBoxItem3{
    width: 100%;
    padding: 20px 15px;
    box-sizing: border-box;

  }
  .admissionBoxItem3 img{
    display: inline-block;
  }
  .admissionBoxItem3 img:first-child{
    width: 115px;
    height: 154px;
  }
  .admissionBoxItem3 #qrcode{
    width: 100px;
    height: 100px;
    margin-left: 15px;
    transform: translateY(-27px);
  }
  .admissionBoxItem4{
    width: 100%;
    padding: 0 15px;
    box-sizing: border-box;
    font-size:13px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(5,5,9,1);
    line-height:20px;

  }
  .admissionBoxItem5{
    width: 100%;
    padding: 20px 15px;
    box-sizing: border-box;

  }
  .admissionBoxItem5  #qrcode{
    display: block;
    width: 115px;
    height: 115px;
    margin: 0 auto;
  }

  .scrollTop{
    width: 34px;
    height: 34px;
    position: fixed;
    right: 5%;
    bottom: 30px;
    border-radius: 50%;
    border: 1px solid black;
    font-size: 12px;
    line-height: 34px;
    text-align: center;
    background: #000;
    color: #fff;
    opacity: 0.5;
  }
  .IntelligenceBox{
    width: 100%;
    background: #F7F7F7;
    border-top: 1px solid #DFDFDF;
    overflow: hidden;
  }
  .IntelligenceBoxItem{
    width: 100%;
    font-size:15px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(5,5,9,1);
    margin: 15px;
    line-height:35px;
    text-align: center;
  }
  .IntelligenceBoxItem1{
    width: 90%;
    margin: 0 auto;
    /* height: 60px; */
    margin-bottom:10px;
    padding-bottom: 15px;
    background:rgba(5,5,9,0.05);
  }
  .IntelligenceBoxItem2{
    width: 100%;
    height:23px;
    font-size:12px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(153,153,153,1);
    line-height:23px;
    text-align: center;
    padding-bottom: 10px;
  }
  .IntelligenceBoxItem1Index{
    width: 95%;
    margin: 0 auto;
    height:28px;
    font-size:15px;
    font-family:PingFangSC-Semibold;
    font-weight:600;
    color:rgba(5,5,9,1);
    line-height:28px;
  }
  .IntelligenceBoxItem1Index1{
    width: 95%;
    margin: 0 auto;
    height:23px;
    font-size:10px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height:23px;
  }
  .IntelligenceBoxItem1Index2{
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:#050509;
  }
  .IntelligenceBoxItem1Index3{
    width: 90%;
    margin: 0 auto;
    margin-top: 10px;
    font-size:12px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    padding: 15px;
    box-sizing: border-box;
    color:rgba(153,153,153,1);
    background:#fff;
  }
}
</style>
