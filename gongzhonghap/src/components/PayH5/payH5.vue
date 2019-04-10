<template>
    <div id="PayH5">
        <!--支付中...-->
          <!--<div class="PayH5Header">-->
              <!--<div class="selction">-->
               <!--请选择支付方式 :-->
              <!--</div>-->
            <!--<div class="paySelction" v-if="!isWeixinSelction">-->
              <!--<div class="pay" v-for="(item,index) in payArray" @click="payClick(index)">-->
                <!--<img class="img" :src="item.img" :alt="item.alt">-->
              <!--</div>-->

            <!--</div>-->
            <!--<div class="paySelction" v-else>-->
              <!--<div class="pay" @click="weixinClick">-->
                <!--<img class="img" src="/static/images/weixin.png" />-->
              <!--</div>-->
            <!--</div>-->


          <!--</div>-->

    </div>
</template>

<script>
  import { Toast } from 'mint-ui';
  import {isWeixin} from '../../assets/js/common'
  import { Indicator } from 'mint-ui';
  import {payWithWeixinPubPrepay,activityOrderFindOne} from "../../assets/js/promiseHttp.js"
export default {
  name: 'PayH5',
  data(){
    return{
         code:'',
          userInfo:{},
           objList:{},//报名信息表
          noteId:'',
          payArray:[

          ],
    }
  },
  created(){

         this.noteId = JSON.parse(localStorage.getItem('objListId'));
        this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
        this.objList = JSON.parse(sessionStorage.getItem("objList"));
    console.log(this.$Request.code)
    console.log(this.userInfo)
    console.log(this.objList,"objListobjListobjListobjListobjList")
        this.code = this.$Request.code;
         this.$nextTick(function () {
           setTimeout(()=>{
             if(!!this.$Request.code){//请求支付的接口
               console.log('微信授权成功过')
               this.patMent()
//            this.onBridgeReady(this.$Request.code,orderId)
             }else{
               Toast('微信授权失败，请重试')
             }
           },100)
         })


  },
  mouthed(){


  },
  methods:{
    onBridgeReady(){ //微信支付
      let that = this;
      payWithWeixinPubPrepay(that.code,that.noteId,that.userInfo.data.access_token).then(res=>{//4为公总号
        console.log(res,'4为公总号')
          if(res.data.status == true){
            let objData = res.data.data;
            WeixinJSBridge.invoke(
              'getBrandWCPayRequest', {
                "appId":objData.appId,     //公众号名称，由商户传入
                "timeStamp":objData.timeStamp,         //时间戳，自1970年以来的秒数
                "nonceStr":objData.nonceStr, //随机串
                "package":objData.package,
                "signType":objData.signType,         //微信签名方式：
                "paySign":objData.paySign //微信签名
              },
              function(res){
                console.log(res,"9999999999999999999999999999")
                // alert(res.err_code+res.err_desc+res.err_msg,"cuowu")
                if(res.err_msg == "get_brand_wcpay_request:ok" ){
//                  Toast("支付成功");
                  Indicator.open('支付中，请等待...');
                  let temp = setTimeout(()=>{
                    activityOrderFindOne(that.objList.orderId,that.userInfo.data.access_token).then(res=>{
                       console.log(res,"支付请求接口")
                       if(res.data.status==true){
                         console.log(res.data.data.activityOrderStatus,"支付成功,即将跳转生成门票")
                             // case waitingPay = 1, //等待支付
                             // waitingAccess = 2, //支付成功带参加
                              // disable = 3, //支付已失效
                              // access = 4, //已参加
                              // waitingPrize = 5, //等待评价
                              // end = 6, //已结束
                              // done = 7,//已完成
                              // quit = 8,//已退款
                              // expire = 9 //已过期
                            if(res.data.data.activityOrderStatus =='2'){ //支付成功，关闭定时器,去二维码生成页面
                                Indicator.close();
                              clearTimeout(temp);
                              // 跳转
                              that.$router.push({path:'/admission',query:{id:that.noteId}});
                                Toast('支付成功,即将跳转生成门票');
                            }
                       }else{ //请求出现其他问题，关闭定时器，跳转到我的活动
                         Indicator.close();
                         clearTimeout(temp);
                         setTimeout(()=>{
                           that.$router.push({path:'/meActivity'})
                         },1000)
                         Toast(res.data.message+'，即将跳转到我的活动页面');

                       }
                    })
                  },1000)

                  // 使用以上方式判断前端返回,微信团队郑重提示：
                  //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                }else if(res.err_msg="get_brand_wcpay_request:cancel"){
                  alert("支付超时")
                }else{
                  alert("支付失败请重试")
                }
              });
          }else {
            Toast(res.data.message);
            that.$router.push({path:'/meActivity'})
          }
      })

    },
    patMent(){ //微信支付
       console.log(111111111111111111111111111)
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
    },

//    weixinClick(){//微信公众号支付
//
//    },
//    payClick(i){ //选择H5支付方式
//      if(i===0){ //微信支付
//        if (typeof WeixinJSBridge == "undefined"){
//          if( document.addEventListener ){
//            document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false);
//          }else if (document.attachEvent){
//            document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady);
//            document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady);
//          }
//        }else{
//          this.onBridgeReady();
//        }
//      }else if(i==1){ //支付宝支付
//        let data = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjpbXSwiY29kZSI6MjAwLCJkYXRhIjoiIiwidXNlcl9uYW1lIjoiMTg1NjU4OTAzMDYiLCJqaWd1YW5nUmVnSWQiOiIiLCJtb2JpbGUiOiIxODU2NTg5MDMwNiIsInJvbGVMaXN0IjpbeyJyb2xlSWQiOiIyMDAiLCJyb2xlQ29kZSI6ImNvbW1vbl9tZW1iZXIiLCJyb2xlTmFtZSI6IuaZrumAmuS8muWRmCJ9XSwibWVzc2FnZSI6IiIsImF1dGhvcml0aWVzIjpbIuaZrumAmuS8muWRmCJdLCJjbGllbnRfaWQiOiJhY21lIiwidG90YWwiOjAsInVzZXJfaWQiOiIyMDAiLCJzY29wZSI6WyJvcGVuaWQiXSwidXNlckFjY291bnQiOiIxODU2NTg5MDMwNiIsIm5hbWUiOiJ3ZWIgQ29kaW5nIFBlYXNhbnQiLCJoZWFkZXIiOiJodHRwOi8vcHViLnFpbml1LmJ1dG9uZ3RlY2guY29tL2RlZnVsdF9waG90b0AzeC5wbmciLCJ1c2VyVHlwZSI6IjIiLCJpZCI6IjIwMCIsImp0aSI6ImU4YTMzYjVhLTVjZDItNDg3NS1iOWVjLWE1NzVlNzY4NDkyZiIsInN0YXR1cyI6dHJ1ZX0.mFv1tSKZFNM5rVxOGtvQGOhl-f33LZcHG8fgGo5iJhSPZJBUnXj7bX9eLpSLoe-EUoTcRJZ2ae6dYdKoGb_b9VNp46k76LY8HePSIEc7r5D98Y-cnduD6Dp3W6JXXeXd3cBY_ISg4rykDts_lrL_I5H3xIgfX_cemTj4L2UWVndNqzQMcpOHfDpowSbyfQUIYFQYCY_wEHhZTDAAcIaoJIy60y55V8qGfAyYt2XW6L28CJlIKu0RxkayJcjHmSeJW2RofPT4cVlwgsuDNk2Q2q48C_M1kXZ3SC-GGuN3mGf6XGlBgkiDKty4YyuteFMCyrFbMkRH-ADukNOK9O1RlQ'
//        let url= 'http://172.16.0.59:10020/apis/activity/v1.0/payWithAlipay/wapPay';
//        let data1 = new Date().getTime();//随机时间戳
//        let obj = {
//          "out_trade_no":"2015032001010131012"+data1,
//          "total_amount":0.01,
//          "subject":"Iphone616G",
//          "product_code":"QUICK_WAP_WAY",
//          "seller_id":"13112345678",
//          "quit_url":"http://172.16.0.55:8080/#/PayH5"
//        }
//        this.$Aiox.post(url,obj,{headers:{"Authorization":"bearer "+data}}).then(res=>{
//          console.log(res,"支付宝支付")
//          if(res.status==200){
//             const div = document.createElement('div');
//             div.innerHTML = res.data;
//             document.body.appendChild(div);
//             document.forms[0].submit()
////             const form = res.data;
////             deleteExisting('#alipay'); // 判断之前是否插入过#alipay
////             const div = document.createElement('div');
////             div.id = 'alipay';
////             div.innerHTML = form;
////             document.body.appendChild(div);
////             document.querySelector('#alipay').children[0].submit(); // 执行后会唤起支付宝
//          }
//        })
//      }
//    },
//    onBridgeReady(){
//      WeixinJSBridge.invoke(
//        'getBrandWCPayRequest', {
//          "appId":"wx2421b1c4370ec43b",     //公众号名称，由商户传入
//          "timeStamp":"1395712654",         //时间戳，自1970年以来的秒数
//          "nonceStr":"e61463f8efa94090b1f366cccfbbb444", //随机串
//          "package":"prepay_id=u802345jgfjsdfgsdg888",
//          "signType":"MD5",         //微信签名方式：
//          "paySign":"70EA570631E4BB79628FBCA90534C63FF7FADD89" //微信签名
//        },
//        function(res){
//          if(res.err_msg == "get_brand_wcpay_request:ok" ){
//            console.log("jndskajdkaksdkak")
//            // 使用以上方式判断前端返回,微信团队郑重提示：
//            //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
//          }
//        });
//    }
  },

}

</script>

<style scoped lang="less">
  #PayH5{
    background: #ffffff;
    position:absolute;
    left: 0;
    bottom: 0;
    right: 0;
    top:0;
    display: flex;
    justify-content:center;
    align-items:center;
  }

  .PayH5Header{
    width: 2rem;
    background: #ffffff;
    border-radius: 0.1rem;
    .paySelction{
      width: 100%;
      display: flex;
      .pay {
        flex: 1;
        height: 0.5rem;
        line-height: 0.5rem;
        color: #ffffff;
        font-size: 0.14rem;
        overflow: hidden;
        margin-bottom: 0.15rem;
        .img{
          display:block;
          width:0.5rem;
          height: 0.5rem;
          margin: 0 auto;
        }
      }
    }
  }

  .selction{
    width: 90%;
    margin: 0 auto;
    height: 0.5rem;
    line-height: 0.5rem;
    color: #262626;
    font-weight:900;
    font-size:0.16rem;
  }


</style>
