<template>
  <div id="acknowledgementOfOrder">
    <div class='acknowledgementOfOrderBox'>
      <div class='acknowledgementOfOrderBoxItem1'>
        <div class='acknowledgementOfOrderBoxItem1Left'><img :src='ActivityInfo.bannerUrl'/></div>
        <div class='acknowledgementOfOrderBoxItem1Right'>
          <div>{{ActivityInfo.title}}</div>
          <!-- <div></view> -->
          <div> <img src='/static/images/time.png'/> {{ActivityInfo.startTime}}</div>
          <div  class='ellipsis'> <img src='/static/images/position.png'/> {{ActivityInfo.regionName}} </div>
        </div>
      </div>
      <div class='acknowledgementOfOrderBoxItem2' v-for="(item,index) in buyData">
        <div>{{item.name}}</div>
        <div><span>¥{{item.payPrice}}</span>X<span>1</span></div>
      </div>

      <div class='acknowledgementOfOrderBoxItem3'>
        <div><span>报名信息</span><span>{{tel}}</span></div>
      </div>
      <div class='acknowledgementOfOrderBoxItem4'>
        <div class='acknowledgementOfOrderBoxItem4Top' @click='explain("payment")'><span>付款说明</span><img src='/static/images/right.png' /></div>
        <div v-if='isShow'  class='acknowledgementOfOrderBoxItem4Bot'>
          <div>{{ActivityInfo.payRemark}}</div>

        </div>
      </div>
      <div class='acknowledgementOfOrderBoxItem5'>
        <div class='acknowledgementOfOrderBoxItem5Top' @click='explain("refund")'><span>退款说明</span><img src='/static/images/right.png'/></div>
        <div v-if='isShow1' class='acknowledgementOfOrderBoxItem4Bot'>
          <div>{{ActivityInfo.refundRemark}}</div>
        </div>
      </div>
    </div>
    <div class='acknowledgementOfOrderFoot'>
    <div class='acknowledgementOfOrderFootLeft'>
    <div>
    <span>实付:</span>
    <span style='color:#FE5F5F'>¥ {{Total}}</span>
    </div>
    <div>
    <span>原价:</span>
    <span style='color:#FE5F5F'>¥ {{orginTotal}}</span>
    <span>立减:</span>
    <span style='color:#FE5F5F'>¥ {{erectSubtraction}}</span>
    </div>
    </div>
    <div class='acknowledgementOfOrderFootRight' @click='paymentClick'>{{nextValue}}</div>
    </div>
  </div>



</template>

<script>
  import { insertSignupNoteAndOrder,activityOrderFindOneByNodeIdVo,pubPayGetAppid} from '../../assets/js/promiseHttp'; //数据
  import { Toast } from 'mint-ui';  //弹框
export default {

  name: 'acknowledgementOfOrder',
  data(){
    return{
      userInfo:"",//登录的信息
      isShow:false,
      isShow1:true,
      ActivityInfo:"", //活动信息
      buyData:"", //门票数据
      registrationData: "", //报名数据
      tel:"", //报名信息
      Total:0, //实付
      orginTotal: 0, //原价
      erectSubtraction: 0, //立减
      nextValue:"付款",
      combination:[], //组合票
      single: [], //单票
      backstageData:{} , //后台数据
      userID:"", //用户id
      matchingArrStr:"", //智能匹配
      orderId:'', //订单Id
    }
  },
  created() {
    console.log(this.$router.history.current.query.id)
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"))
    if(!!this.$router.history.current.query.id){ //是不是我的活动进来的
      activityOrderFindOneByNodeIdVo(this.$router.history.current.query.id,this.userInfo.data.access_token).then(res=>{
         console.log(res,"我们都是我的活动")
        if(res.status==true){
             this.orderId = res.data.orderId;
             this.ActivityInfo = res.data.activityInfoToMyVo;
             this.buyData = [...res.data.activityOrderGoodsVoList,...res.data.activityOrderGoodsGroupVoList];
              let a=0,b=0,c=0;//价格计算赋值
              this.buyData.map((item,index)=>{
                a += item.payPrice; //合计
                b += item.originalPrice;//总额
              })
              c = b-a;//立减
              this.Total=a.toFixed(2);
              this.orginTotal=b.toFixed(2);
              this.erectSubtraction=c.toFixed(2);
              if(this.Total>0){
                this.nextValue = "付款";
              }else{
                this.nextValue = "下一步";
              }
        }else{
          Toast(res.message)
        }
      })
    }else{//报名列表进来的
      this.$store.dispatch('loadingFalse',true)//是顺着去加载页还是退回来false为顺着去true为退回上一页
      this.userID = this.userInfo.data.user_id;
      this.ActivityInfo = JSON.parse(sessionStorage.getItem("activityInfo"));
      this.ActivityInfo.regionName = JSON.parse(sessionStorage.getItem("activityInfo")).address;
      this.buyData = JSON.parse(sessionStorage.getItem("buyData"));
      this. registrationData = JSON.parse(sessionStorage.getItem("RegistrationData"));
      this.matchingArrStr = JSON.parse(sessionStorage.getItem("matchingArrStr"));
      let a=0,b=0,c=0;//价格计算赋值
      this.buyData.map((item,index)=>{
        a += item.payPrice; //合计
        b += item.originalPrice;//总额

      })
      c = b-a;//立减
      this.Total=a.toFixed(2);
      this.orginTotal=b.toFixed(2);
      this.erectSubtraction=c.toFixed(2);
      if(this.Total>0){
        this.nextValue = "付款";
      }else{
        this.nextValue = "下一步";
      }
    }

  },
  methods:{

    explain(v){//付款说明  退款说明
      console.log(v)
      if (v=== "payment"){
          this.isShow = !this.isShow
      } else if (v=== "refund"){
          this.isShow1 = !this.isShow1
      }

    },
    paymentClick(){ //下一步
      if(this.$router.history.current.query.id){ //待支付来的
        localStorage.setItem("objListId",JSON.stringify(this.$router.history.current.query.id))
        sessionStorage.setItem("objList",JSON.stringify({orderId:this.orderId}))
        this.payMethod(this.$router.history.current.query.id);
      }else{ //正常报名流程来的
        let obj = {};
        obj.customerActivitySignupNote={};
        let goodsList = [], goodsListObj={};//单活单
        let groupList = [], groupListObj = {};//多活单
        this.registrationData.map((item,index)=>{ //数组组成对象
          obj.customerActivitySignupNote[item.code] = item.value;
        })

        for (let i = 0; i < this.buyData.length; i++){
          if (this.buyData[i].typeStr == 'dan') { //单票
            goodsListObj.id = this.buyData[i].id;
            this.buyData[i].sort = this.buyData[i].index;
            this.buyData[i].count = this.buyData[i].num;
            goodsList.push(this.buyData[i])
          }else{//组合票
            groupListObj.id = this.buyData[i].id;
            this.buyData[i].sort =this.buyData[i].index;
            this.buyData[i].count = this.buyData[i].num;
            groupList.push(this.buyData[i])
          }
        }
        obj.settingVersion = this.registrationData[0].version;
        obj.activityId = this.ActivityInfo.id;
        let faceURL = JSON.parse(sessionStorage.getItem("faceUrl"));
        if (!!faceURL){
          obj.faceUrl = faceURL;
        }else{
          obj.faceUrl = "";
        }

        obj.activityOrder={},
          obj.activityOrder.goodsList = goodsList;
        obj.activityOrder.groupList = groupList;
        obj.userId = this.userID;
        obj.companyIds = this.matchingArrStr;

        this.backstageData = obj;
        insertSignupNoteAndOrder(this.userInfo.data.access_token,obj).then(res=>{
          console.log(res,"sdhfsfgdfglh")
          if(res.status == true){
            sessionStorage.setItem("objList",JSON.stringify(res.data))
            localStorage.setItem("objListId",JSON.stringify(res.data.id))
            if (this.Total<=0){ //价格小于0去生成门票
              this.$router.push({path:"/admission"})
            } else {//去支付页面
              this.payMethod(res.data.id,res.data.orderId);
//            Toast("请选择免费活动")
//            this.$store.dispatch("payId",res.data.id); //vuex保存支付Id
//            this.$router.push({path:"/payH5"}) //去支付页面
            }
          }else{
            Toast("网络异常，请重试")
          }
        })
      }

    },
     payMethod(id,orderId){//支付的方法
       let ua = window.navigator.userAgent.toLowerCase();
       if(ua.match(/MicroMessenger/i) == 'micromessenger'){
         //ios的ua中无miniProgram，但都有MicroMessenger（表示是微信浏览器）
         let JSonData = {
           id:id,
           orderId:orderId,
           token:this.userInfo.data.access_token,
         }
         wx.miniProgram.getEnv((res)=>{
           if (res.miniprogram) {
//                      alert("在小程序里");
             wx.miniProgram.navigateTo({url: '/pages/wxpay/wxpay?JSon='+JSON.stringify(JSonData)})
           } else {
             //先获取appid;在调取微信的授权
             alert("在微信里");
             //做微信支付
             pubPayGetAppid(this.userInfo.data.access_token).then(res=>{
                console.log(res)
               if(res.data.status == true){
                 document.location.replace('https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + res.data.data.appid + '&redirect_uri=' + encodeURIComponent('http://account.butongtech.com/#/payH5') + '&response_type=code&scope=snsapi_base&state=' + '456' + '#wechat_redirect')

//                 document.location.replace('https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + res.data.data.appid + '&redirect_uri=' + encodeURIComponent('https://dcloud.butongtech.com/#/payH5') + '&response_type=code&scope=snsapi_base&state=' + '456' + '#wechat_redirect')
               }else {
                 Toast('获取微信appid失败')
               }

             })

           }
         })
       }else{
         //              做h5支付
         alert('不是微信浏览器，请安装,');
       }
     }
  }
}

</script>

<style scoped lang="less">
  #acknowledgementOfOrder{
    position: absolute;
    left: 0;
    top:0;
    bottom: 0;
    right: 0;
    overflow: hidden;
  .acknowledgementOfOrderBox{
    position: absolute;left: 0;
    bottom: 0.6rem;
    right: 0;
    top: 0;
    background: #fff;
    border-top: 0.01rem solid #EEEEEE;
  }
  .acknowledgementOfOrderBoxItem1{
    width: 100%;
    height: 1.2rem;
    padding: 0.2rem 0.15rem;
    box-sizing: border-box;
    display: flex;
  }
  .acknowledgementOfOrderBoxItem1Left{
    width: 0.8rem;
    height: 0.8rem;
    margin-right: 0.12rem;
  }
  .acknowledgementOfOrderBoxItem1Left img{
    display: block;
    width: 0.8rem;
    height: 0.8rem;
  }
  .acknowledgementOfOrderBoxItem1Right{
    flex: 1;
    height: 0.8rem;
  }
  .acknowledgementOfOrderBoxItem1Right div:first-child{
    max-width: 2rem;
    height: 0.3rem;
    font-size:0.15rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(5,5,9,1);
    line-height: 0.29rem;
    text-overflow:ellipsis;white-space:nowrap;overflow:hidden;
    /* //css3功能强大，可以让超出指定宽度的部分自动显示为“...” */
  }

  .acknowledgementOfOrderBoxItem1Right div:nth-child(2){
    height:0.25rem;
    font-size:0.12rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height:0.25rem;
  }
  .acknowledgementOfOrderBoxItem1Right .ellipsis{
    height:0.25rem;
    font-size:0.12rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height:0.25rem;
    display: inline-block;
    max-width: 2rem;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .acknowledgementOfOrderBoxItem1Right div:nth-child(2) img{
    display: inline-block;
    width: 0.1rem;
    height: 0.1rem;
    margin-right: 0.05rem;
  }
  .acknowledgementOfOrderBoxItem1Right div:nth-child(3) img{
    display: inline-block;
    width: 0.1rem;
    height: 0.13rem;
    margin-right: 0.05rem;
  }
  .acknowledgementOfOrderBoxItem2{
    height: 0.55rem;
    background:rgba(255,248,248,1);
    padding-top: 0.1rem;
  }
  .acknowledgementOfOrderBoxItem2 div:first-child{
    margin: 0 3%;
    width:94%;
    height:0.2rem;
    font-size:0.14rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(5,5,9,1);
    line-height:0.2rem;
  }
  .acknowledgementOfOrderBoxItem2 div:last-child{
    margin: 0 3%;
    width:94%;
    height: 0.34rem;
    font-size:0.15rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(153,153,153,1);
    line-height:0.34rem;
    border-bottom:0.01rem solid #DFDFDF;
  }
  .acknowledgementOfOrderBoxItem2 div:last-child span:nth-child(1){
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(254,95,95,1);
    display: inline-block;
    min-width: 0.7rem;
  }
  .acknowledgementOfOrderBoxItem2 div:last-child span:nth-child(2){
    font-family:PingFangSC-Medium;
    font-weight:400;
    color:rgba(5,5,9,1);
    margin-left: 0.1rem;
  }
  .acknowledgementOfOrderBoxItem3{
    width: 100%;
    height: 0.49rem;
    border-bottom:0.01rem solid #DFDFDF;
  }
  .acknowledgementOfOrderBoxItem3 div{
    width: 94%;
    margin: 0 3%;
    line-height: 0.49rem;
  }
  .acknowledgementOfOrderBoxItem3 div span:first-child, .acknowledgementOfOrderBoxItem4Top span:first-child{
    font-size:0.14rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
  }
  .acknowledgementOfOrderBoxItem3 div span:last-child{
    font-size:0.14rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
    display: inline-block;
    color:rgba(5,5,9,1);
    float: right;
    margin-right:0.28rem;
  }
  .acknowledgementOfOrderBoxItem4,.acknowledgementOfOrderBoxItem5{
    width: 100%;
    min-height: 0.49rem;
    border-bottom:0.01rem solid #DFDFDF;
  }
  .acknowledgementOfOrderBoxItem4Top,.acknowledgementOfOrderBoxItem5Top{
    width: 94%;
    margin: 0 3%;
    margin-top: 0.15rem;
    font-size:0.14rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
  }
  .acknowledgementOfOrderBoxItem4Top img{
    display: inline-block;
    width: 0.13rem;
    height: 0.19rem;
    float: right;
    margin-right:0.15rem;
  }
  .acknowledgementOfOrderBoxItem5Top img{
    display: inline-block;
    width: 0.13rem;
    height: 0.19rem;
    float: right;
    margin-right:0.15rem;
  }
  .acknowledgementOfOrderBoxItem4Bot{
    width: 94%;
    margin: 0 3%;
    margin: 0.15rem 0;
  }
  .acknowledgementOfOrderBoxItem4Bot div{
    font-size:0.12rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(5,5,9,1);
    width: 94%;
    margin: 0 3%;

  }
  /* ------------ */
  .acknowledgementOfOrderFoot{
    position: absolute;
    animation-iteration-count: 0;
    bottom: 0;
    width: 100%;
    height: 0.5rem;
    background: #fff;
    display: flex;
  }
  .acknowledgementOfOrderFootLeft{
    width: 60%;
    padding:0.04rem 0.16rem;
    box-sizing: border-box;
  }
  .acknowledgementOfOrderFootLeft div:first-child{
    width: 100%;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(5,5,9,1);
    font-size: 0.1rem;
  }
  .acknowledgementOfOrderFootLeft div:last-child{
    width: 100%;
    font-size:0.01rem;
    font-size: 0.1rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);

  }
  .acknowledgementOfOrderFootLeft  div:last-child span:nth-child(3){
    font-size: 0.1rem;
    margin-left: 0.05rem;
  }
  .acknowledgementOfOrderFootRight{
    flex: 1;
    font-size:0.13rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(255,255,255,1);
    text-align: center;
    line-height: 0.5rem;
    background:#21CB61;
  }
  }
</style>
