<template>
    <div id="PaySueccss">
    </div>
</template>

<script>
  import { Toast } from 'mint-ui';
  import { Indicator } from 'mint-ui';
  import {activityOrderFindOne} from "../../assets/js/promiseHttp.js"
export default {
  name: 'PayH5',
  data(){
    return{

    }
  },
  created(){
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    let that = this;
    Indicator.open('支付中，请等待...');
    let temp = setTimeout(()=>{
      activityOrderFindOne(that.$router.history.current.query.orderId,userInfo.data.access_token).then(res=>{
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
            localStorage.setItem("objListId",JSON.stringify(this.$router.history.current.query.id));
            this.$router.push({path:'/admission',query:{id:this.$router.history.current.query.id}})
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

  },
  methods:{

  },

}

</script>

<style scoped lang="less">
  #PaySueccss{
    background: #ffffff;
    position:absolute;
    left: 0;
    bottom: 0;
    right: 0;
    top:0;
    text-align: center;
    line-height: 300px;
    color: #cccccc;
  }


</style>
