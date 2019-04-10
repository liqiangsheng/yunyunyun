<template>
  <div id="admission">
    <div class='admissionBox'>
      <div class='admissionBoxItem1'><img :src='dataObj.bannerUrl'/></div>
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
        <!--<div class='voice' @click='voiceClick'>-->
          <!--<span>明星产品语音导览</span>-->
          <!--<img class='imgae1' src='../../assets/images/video.gif'/>-->
          <!--<img class='imgae' src='/static/images/right.png'/>-->
        <!--</div>-->
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
          <div class='IntelligenceBoxItem1Index'>{{item.companyName}} <img :src="item.topImg" alt="" @click="topShowClicik(item)" v-if='item.conScheduler'></div>
          <div class='IntelligenceBoxItem1Index1'>{{item.dateTime}}
            <span>　|　</span>
            <span> {{item.conLocation}}</span>　
            <span class='IntelligenceBoxItem1Index2'>{{item.conMode}}</span>
          </div>
          <div class='IntelligenceBoxItem1Index3' v-show="item.topShow">{{item.conScheduler}}</div>
          <!--<div class='IntelligenceBoxItem1Index3' v-show="item.topShow">sdfnkdasnfkasd你是卡的饭卡上的立法是登录房价快速的经费公开乐山大佛昆仑山打开了放开手打开了发生的快乐沪南公路</div>-->
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
  import { findSimpleOneToClient,packagejson} from '../../assets/js/promiseHttp'; //数据
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
    console.log('二维码')
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"))
    let objListId = JSON.parse(localStorage.getItem("objListId"))
    console.log(objListId)
    if(this.userInfo){
      findSimpleOneToClient(this.userInfo.data.access_token,objListId).then(res=>{
         if(res.status == true){
           packagejson().then(res1=>{
              console.log(res1)
             if(res1.status == 200){
                res1.data.forEach((item,index)=>{
                  if(item.id ==res.data.activityId){
                    res.data.bannerUrl = item.bannerUrl;
                  }
                })
             }else{
               Toast("网络异常，请重试")
             }
           })
           setTimeout(()=>{
             if(!!res.data.conList){
               res.data.conList.map((item, index) => {
                 item.dateTime = item.conTime ? item.conTime|formatTime : "待定";
                 item.conLocation = item.conLocation ? item.conLocation : "待定";
                 item.conMode = item.conMode ? item.conMode : "待定";
               })
             }
             if(!!res.data.conList){
               res.data.conList.forEach((item,index)=>{
                 item.topImg = "./static/images/xia.png"
                 item.topShow = false;
               })
             }

             this.$nextTick (function () {
               this.qrcode(res.data.signCode);
             })
             this.dataObj = res.data;
             console.log( this.dataObj,"fdskfdjks1111111111111111111111")
           },300)


         }else{
           Toast("网络异常，请重试")
         }
      })

    }else{
      Toast("登录出错啦！请重新登录")
    }
  },
  methods:{
    topShowClicik(v){ //点击旋转

      v.topShow = !v.topShow ;
      if( v.topShow == true){
        v.topImg = "./static/images/shang.png";
      }else{
        v.topImg = "./static/images/xia.png";
      }
    },
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
    min-height: 7.32rem;
    background: #fff;
    /*overflow-y: auto;*/
    border-top: 0.01rem solid #DFDFDF;
  }
  .admissionBoxItem1,.admissionBoxItem2{
    width: 100%;
    padding: 0.15rem  0.15rem  0.1rem 0.15rem;
    box-sizing: border-box;
    border-bottom: 0.01rem solid #DFDFDF;
  }
  .admissionBoxItem1 img{
    width: 100%;
  }
  .admissionBoxItem2{
    padding-top: 0;
  }
  .admissionBoxItem2 .view{
    width: 100%;
    height: 0.45rem;
    border-bottom: 1px solid #DFDFDF;
    line-height: 0.45rem;
    display: flex;
  }
  .admissionBoxItem2 .view:last-child{
    border-bottom: none;
  }
  .admissionBoxItem2 .view span:first-child{
    width: 0.79rem;
    font-size:0.14rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
  }
  .admissionBoxItem2 .view span:nth-child(2){
    font-size:0.14rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
    flex: 1
  }
  .voice{
    width: 100%;
    height: 0.45rem;
    line-height:0.45rem;
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
    width: 0.07rem;
    height: 0.13rem;
    position: absolute;
    right:0.05rem;
    top:35%;
  }
  .voice .imgae1{
    display: block;
    width: 0.25rem;
    height: 0.24rem;
    position: absolute;
    right: 0.2rem;
    top:0.125rem;
  }
  .admissionBoxItem3{
    width: 100%;
    padding: 0.2rem 0.15rem;
    box-sizing: border-box;

  }
  .admissionBoxItem3 img{
    display: inline-block;
  }
  .admissionBoxItem3 img:first-child{
    width: 1.15rem;
    height: 1.54rem;
  }
  .admissionBoxItem3 #qrcode{
    width: 1rem;
    height: 1rem;
    margin-left: 0.15rem;
    transform: translateY(-0.27rem);
  }
  .admissionBoxItem4{
    width: 100%;
    padding: 0 0.15rem;
    box-sizing: border-box;
    font-size:0.13rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(5,5,9,1);
    line-height:0.2rem;

  }
  .admissionBoxItem5{
    width: 100%;
    padding: 0.2rem 0.15rem;
    box-sizing: border-box;

  }
  .admissionBoxItem5  #qrcode{
    display: block;
    width: 1.15rem;
    height: 1.15rem;
    margin: 0 auto;
  }

  .scrollTop{
    width: 0.34rem;
    height: 0.34rem;
    position: fixed;
    right: 5%;
    bottom: 0.3rem;
    border-radius: 50%;
    border: 1px solid black;
    font-size: 0.12rem;
    line-height: .34rem;
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
    font-size:.15rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(5,5,9,1);
    margin: .15rem;
    line-height:.35rem;
    text-align: center;
  }
  .IntelligenceBoxItem1{
    width: 90%;
    margin: 0 auto;
    /* height: 60px; */
    margin-bottom:.1rem;
    padding-bottom: 0.15rem;
    background:rgba(5,5,9,0.05);
  }
  .IntelligenceBoxItem2{
    width: 100%;
    height: .23rem;
    font-size:0.12rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(153,153,153,1);
    line-height:0.23rem;
    text-align: center;
    padding-bottom: .1rem;
  }
  .IntelligenceBoxItem1Index{
    width: 95%;
    margin: 0 auto;
    height:.28rem;
    font-size:.15rem;
    font-family:PingFangSC-Semibold;
    font-weight:600;
    color:rgba(5,5,9,1);
    line-height:.28rem;
     position: relative;
    img{
      display: block;
      position: absolute;
      top: 0.24rem;
      right: 0.1rem;
      width: 0.1rem;
      height: 0.06rem;
    }
  }
  .IntelligenceBoxItem1Index1{
    width: 95%;
    margin: 0 auto;
    /*height:0.23rem;*/
    font-size:0.1rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height:0.23rem;
  }
  .IntelligenceBoxItem1Index2{
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:#050509;
  }
  .IntelligenceBoxItem1Index3{
    width: 90%;
    margin: 0 auto;
    margin-top: 0.1rem;
    font-size:0.12rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    padding: 0.15rem;
    box-sizing: border-box;
    color:rgba(153,153,153,1);
    background:#fff;
  }
}
</style>
