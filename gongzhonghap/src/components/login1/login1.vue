<template>
  <div id="login1Box">
    <div class='loginTitle1'><img :src='infoData.bannerUrl'/></div>
    <div class="telPhone1">
      <div class='telPhoneImae1'> <img src='/static/images/tel.png'/><span class='add861'>+86</span> </div>
      <div class='telPhoneImae11'><input type='number' @blur='telPhone' placeholder="请输入手机号码" v-model='telValue'/></div>
    </div>

    <div class="verificatioCode1">
      <div class='verificatioCodeImage1'><img src='/static/images/code.png'></div>
      <div class='verificatioCodeImage11'><input  @blur='codePsd' placeholder="请输入验证码" v-model='psdValue'/>
        <button @click="ObtainCode" v-if='isShow'>{{code}}</button>
        <button disabled v-else>{{codeNum}}秒</button>
      </div>

    </div>

    <div class='loginBnt1' @click='loginBnt'>
      <button>登录</button>
    </div>
    <div class='loginItem1'>
      <div><span class='loginItem1FZ'>承办单位：</span>{{infoData.organizers}}</div>
      <div><span class='loginItem1FZ'>联系电话：</span>{{infoData.linkPhone}}</div>
      <div><span class='loginItem1FZ'>会展地址：</span> {{infoData.address}}</div>
      <div><span class='loginItem1FZ'>会展日期：</span>{{infoData.startTime|formatTime}}-{{infoData.endTime|formatTime}}</div>
    </div>
  </div>
</template>

<script>
  import { telCode,login,InitializationData} from '../../assets/js/promiseHttp';
  import { Toast } from 'mint-ui';  //弹框
  import { Indicator } from 'mint-ui';
export default {
  name: 'Login1',
  data(){
    return{
       code: "获取验证码", //默认字
      isShow: true,  //秒倒计时显示
      codeNum: 60,  //60秒
      telValue: "", // 手机号码
      psdValue: "", //密码
      infoData:{
        "img":"http://pgf8indq4.bkt.clouddn.com/home_banner1.png",
        "tel":"+86-(0)755-83205121-8042",
        "Undertake": "深圳市工业设计行业协会",
        "ActivityTime": "2018年11月5-7日",
        "ActivityArdree": "深圳会展中心2号馆  "
      }//初始数据
    }
  },
  created(){
    this.$nextTick(function () {
      document.title = "登录";
    })
    if(this.$store.state.multiActivityId){
      InitializationData(this.$store.state.multiActivityId).then(res=>{
        this.infoData = res.data.data;
      })
    }else{
      Toast( '网络有误');
      this.$router.push({path:"/home"})
    }

  },
  methods:{
    loginBnt(){ //登录
      setTimeout(()=>{
        var that = this;
        if(!that.telValue) {
          Toast( '请填写手机号');
          return
        }else {
          if (!(/^1\d{10}$/.test(this.telValue))) {
            Toast( '手机号码有误！') ;
            return
          }
        }
        if(!that.psdValue) {
          Toast( '请填写验证码');
          return
        }
        login(that.telValue,that.psdValue).then(res=>{

           if(res.data.status==true){
             window.localStorage.setItem("userInfo",JSON.stringify(res.data))
             Indicator.open("正在登录...");
             setTimeout(()=>{
               Indicator.close();
               this.$router.go(-1);//返回上一层
             },1000)
           }else{
             if (res.statusCode == 500) {
                Toat("网络异常，请重试")
              } else if (res.statusCode == 401) {
               Toat("网络异常")
              } else {
                Toat(res.data.message)
              }

           }
        })

      },100)

    },
    telPhone(){ //手机失去焦点
    },
    codePsd(){ //密码失去焦点

    },
    ObtainCode(){ //获取验证码
     let that = this;
    setTimeout(()=>{
      if (!this.telValue) {

        Toast('请填写手机号')
        return;
      }

        this.isShow= false;
      //请求数据
      telCode(this.telValue).then(res=>{
        if(res.data.status==true){
          if(window.common.apiDomain20020 != "https://dcloud.butongtech.com:20020") {
            console.log(res.data)
            this.psdValue = res.data.data;
            var clearTime = setInterval(function () {
              that.codeNum--;
              if (that.codeNum <= 0) {
                this.psdValue = "";
                clearInterval(clearTime);
                that.code= '重新发送';
                that.codeNum= 60;
                that.isShow= true;
              }

            }, 1000)
          }else{
            var clearTime = setInterval(function () {
              that.codeNum--;
              if (that.codeNum <= 0) {
                clearInterval(clearTime)
                that.code= '重新发送';
                that.codeNum= 60;
                that.isShow= true;
              }

            }, 1000)
          }


        }else{
          Toast("网络错误，请重试")
        }
      });

    },100)

  }
}
}
</script>

<style>
@import "../../assets/css/login1.css";
</style>
