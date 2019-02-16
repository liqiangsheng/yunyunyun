<template>
    <div id="PayH5">
          <div class="PayH5Header">
              <div class="selction">
               请选择支付方式 :
              </div>
             <div class="pay" v-for="(item,index) in payArray" @click="payClick(index)">
               <img class="imgShow" src="../../assets/images/successPay.png" alt="选中" v-show="item.isShow">
               <img class="img" :src="item.img" :alt="item.alt">
               {{item.alt}}
             </div>

          </div>
         <div class="goPay">
           <mt-button type="primary" @click="goPay">去支付</mt-button>
         </div>
    </div>
</template>

<script>
  import { Toast } from 'mint-ui';
export default {
  name: 'PayH5',
  data(){
    return{
          payArray:[
            {img:"/static/images/weixin.png",className:"weixin",alt:"微信支付",isShow:true,state:"weixin"},
            {img:"/static/images/aliPay.png",className:"alipay",alt:"支付宝支付",isShow:false,state:"alipay"},
          ],
       state:"",
    }
  },
  created(){
    this.$nextTick(function () {
      document.title = "支付";
    })
    if(!!this.$store.state.payId){

    }else {
//      this.$router.go(-1);
    }
  },
  methods:{
    payClick(i){ //选择支付方式
      this.payArray.forEach((item,index)=>{
        if(index == i){
          item.isShow = !item.isShow
        }else{
          item.isShow = false;
        }
      })

     if(this.payArray[i].isShow == true){
       this.state = this.payArray[i].state
     }else {
       this.state = "";
     }
    },
    goPay(){ //去支付
      if(this.state==""){
        Toast('请选择支付方式');
      }else{
        console.log(this.state)
        if(this.state == "weixin"){ //微信
          if (typeof WeixinJSBridge == "undefined"){
            if( document.addEventListener ){
              document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false);
            }else if (document.attachEvent){
              document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady);
              document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady);
            }
          }else{
            this.onBridgeReady();
          }
        }else if(this.state == "alipay"){ //支付宝

        }
      }
    },
  },
  onBridgeReady(){
    WeixinJSBridge.invoke(
      'getBrandWCPayRequest', {
        "appId":"wx2421b1c4370ec43b",     //公众号名称，由商户传入
        "timeStamp":"1395712654",         //时间戳，自1970年以来的秒数
        "nonceStr":"e61463f8efa94090b1f366cccfbbb444", //随机串
        "package":"prepay_id=u802345jgfjsdfgsdg888",
        "signType":"MD5",         //微信签名方式：
        "paySign":"70EA570631E4BB79628FBCA90534C63FF7FADD89" //微信签名
      },
      function(res){
        if(res.err_msg == "get_brand_wcpay_request:ok" ){
          console.log("jndskajdkaksdkak")
          // 使用以上方式判断前端返回,微信团队郑重提示：
          //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
        }
      });
  }
}

</script>

<style scoped lang="less">
  #PayH5{
    background: #ffffff;
    position:absolute;
    background: url(../../assets/images/bj2.png);
    background-size: cover;
    background-size: 100% 100%;
    left: 0;
    bottom: 0;
    right: 0;
    top:0;
  }
  .goPay{
    width:90%;
    height:  0.5rem;
    position:absolute;
    left: 5%;
    bottom: 0.2rem;
   button{
      width: 100%;
      height: 100%;
    }
  }

  .PayH5Header{
    width: 100%;
    min-height: 0.5rem;
    overflow: hidden;
  }
  .pay{
    position: relative;
    width:90%;
    height: 0.5rem;
    margin: 0 auto;
    line-height: 0.5rem;
    color: #ffffff;
    font-size: 0.14rem;
    overflow: hidden;
    margin-bottom: 0.15rem;
    .img{
      display:block;
      float: left;
      width:0.5rem;
      height: 0.5rem;
      margin-right: 0.2rem;
    }
  }
  .selction{
    width: 90%;
    margin: 0 auto;
    height: 0.5rem;
    line-height: 0.5rem;
    color: #ffffff;
    font-weight:900;
    font-size:0.16rem;
  }
  .imgShow{
    width: 0.12rem;
    height: 0.12rem;
    position: absolute;
    right: 20%;
    top:45%;
  }

</style>
