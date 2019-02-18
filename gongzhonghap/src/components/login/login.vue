<template>
  <div id="loginBox">
     <!--<img class='image' src='../../assets/images/loginBj.png' />-->
    <!--<div class="loginBox_box">-->
    <div class="loginBox_box" v-if="loginIndex == 0">
      <div class='loginTitle'>{{titleText}}</div>
      <div class="telPhone">
        <div class='telPhoneImae'> <img src='/static/images/tel.png'/><span class='add86'>+86</span> </div>
        <div class="xian"></div>
        <input oninput="if(value.length>11)value=value.slice(0,11)" type='number' @blur='telPhone' placeholder="请输入手机号码" v-model='telValue'/>

      </div>

      <div class="verificatioCode">
        <div class='verificatioCodeImage'><img src='/static/images/code.png'></div>

        <input  @blur='codePsd' oninput="if(value.length>6)value=value.slice(0,6)" type="number" placeholder="请输入验证码" v-model='psdValue'/>
        <div class="xian1"></div>
        <button class="ObtainCode"  @click="ObtainCode" v-if='isShow'>{{code}}</button>
        <button class="ObtainCode"  disabled v-if='!isShow'>{{codeNum}}秒后重新发送</button>
      </div>

      <!--<div class="userPhonePassword" @click="loginIndex=1">-->
        <!--用户手机号密码登陆-->
      <!--</div>-->

      <div class='loginBnt' @click='loginBnt'>
        <button>登　录</button>
      </div>

      <div class='loginBnt'style="margin-top: 0.15rem" @click="watchLogin">
        <button style="background: #72D992;color: #ffffff">微信登录</button>
      </div>

      <div class='loginDetail'>
        点击查看 <span @click='loginDetail1(2,"用户协议")'>“用户协议” </span> 和  <span @click='loginDetail1(3,"隐私政策")'>“隐私政策” </span>
      </div>
    </div>
    <!--index==1账号密码登陆-->
    <div class="passwordLogin" v-if="loginIndex == 1">
       <div class='loginTitle'>{{titleText}}</div>
        <div class="user_telPhone">
          <div>
            <img src="/static/images/userName.png" alt="">
          </div>
          <input  oninput="if(value.length>11)value=value.slice(0,11)" type='number'  placeholder="请输入用户手机号" v-model="passWordTel">
        </div>
        <div class="user_telPhone">
          <div>
            <img src="/static/images/password.png" alt="">
          </div>
          <input type="text" oninput="if(value.length>20)value=value.slice(0,20)"  placeholder="请输入密码" v-model="password">
        </div>

      <div class="userPhonePassword" @click="loginIndex=0">
        用户手机短信登陆
      </div>

      <div class='loginBnt' @click='passwordLogin'>
        <button>登　录</button>
      </div>
      <div class='loginDetail'>
        点击查看 <span @click='loginDetail1(2,"用户协议")'>“用户协议” </span> 和  <span @click='loginDetail1(3,"隐私政策")'>“隐私政策” </span>
      </div>
    </div>
  </div>
</template>

<script>
  import { telCode,login} from '../../assets/js/promiseHttp';
  import { Base64 } from '../../assets/js/common';
  let BASE = Base64();
  import { Toast } from 'mint-ui';  //弹框
  import { Indicator } from 'mint-ui';
export default {
  name: 'Login1',
  data(){
    return{
      loginIndex:0, //手机还是密码登陆
       code: "获取验证码", //默认字
      isShow: true,  //秒倒计时显示
      codeNum: 60,  //60秒
      passWordTel:"",//账户手机
      password:"",//密码
      telValue: "", // 手机号码
      psdValue: "", //密码
      titleText:"与设计相处，使彼此感动",
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
  },
  methods:{
    watchLogin(){//微信登陆
      var ua = navigator.userAgent.toLowerCase();
      var isWeixin = ua.indexOf('micromessenger') != -1;
      if (isWeixin) {
        document.location.replace('https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + "wx1c2c5188fd27b150" + '&redirect_uri=' + encodeURI('http://account.butongtech.com') + '&response_type=code&scope=snsapi_userinfo&state=' +
          '123' + '#wechat_redirect')
//        this.$Aiox.get(url).then(res=>{
//          console,log(res,"res")
//        })
      }else{
        Toast("请在微信浏览器运行")
      }
    },
      make_base_auth(user, password) {  //base的加密
        var tok = user + ':' + password;
        var hash = BASE.encode(tok);
        return "Basic " + hash;
      } ,
      loginDetail1(v,v1){ //协议，隐私
        let obj = {}
        obj.v = v;
        obj.v1= v1;
       localStorage.setItem("messageShow1",JSON.stringify(obj));
       this.$router.push({path:"/message"})
      },
    passwordLogin(){//密码登陆
      var that = this;
      setTimeout(()=> {
        if (!that.passWordTel) {
          Toast('请填写用户手机号');
          return
        } else {
          if (!(/^1\d{10}$/.test(that.passWordTel))) {
            Toast('手机号码有误！');
            return
          }
        }
        if (!that.password) {
          Toast('请填写密码');
          return
        }else{
          var reg = /^([a-z0-9\.\@\!\#\$\%\^\&\*\(\)]){6,20}$/i;
          if (!reg.test(that.password)) {
            Toast('密码长度为6-20的数字字母');
            return
          }
        }
        let url = window.common.apiDomain120020+'/sec/oauth/token';
        let obj={};
        obj.username = that.passWordTel;
        obj.password = that.password;
        obj.grant_type = "custompassword";
        obj.jiguangRegId = "12345678";
        let ajax = new XMLHttpRequest();
        ajax.open('post',window.common.apiDomain120020+'/sec/oauth/token',true);
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        ajax.setRequestHeader("Accept","application/json");
        ajax.setRequestHeader("Authorization",that.make_base_auth("acme","acmesecret"));
        ajax.setRequestHeader("grant_type","custompassword");
        ajax.send(JSON.stringify(obj));
        ajax.onreadystatechange = function () {
          if (ajax.readyState==4 &&ajax.status==200) {

            let res= JSON.parse(ajax.responseText)
             console.log(res,"fsdjfjksdk")
          }
          if(ajax.status==500){
            Toast("500后台服务器错误！")
          }
        }
//        console.log(that.make_base_auth(that.passWordTel,that.password),"that.make_base_auth(that.passWordTel,that.password)")
//        that.$Aiox.post(url,obj,{headers:{'Content-Type':'application/x-www-form-urlencoded','Accept':'application/json',"Authorization":that.make_base_auth("acme","acmesecret"),"grant_type":"custompassword"}}).then(res=>{
//          console.log(res,"fsdfsdk")
//        })
      },100)
    },
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
               Toast("网络异常，请重试")
              } else if (res.statusCode == 401) {
               Toat("网络异常")
              } else {
               Toast(res.data.message)
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
          if(window.common.apiDomain20020 != "https://dcloud.butongtech.com:20020"){
            console.log(res.data)
            this.psdValue = res.data.data;
            var clearTime = setInterval(function () {
              that.codeNum--;

              if (that.codeNum <= 0) {
                that.psdValue = "";
                clearInterval(clearTime)
                that.code= '重新发送';
                that.codeNum= 60;
                that.isShow= true;
              }
            }, 1000)
          }else {
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

<style scoped lang="less">
/*@import "../../assets/css/login.css";*/
  #loginBox{
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: url(../../assets/images/loginBj.png);
    background-size:cover ;
    background-size: 100% 100%;
    overflow: hidden;
    >.passwordLogin{
      width: 100%;
      height: 100%;
      >.loginTitle{
        width: 100%;
        text-align: center;
        height:0.4rem;
        font-size:0.2rem;
        font-family:PingFangSC-Light;
        font-weight:300;
        color:rgba(5,5,9,1);
        line-height:0.35rem;
        margin: 1.34rem 0 0.44rem 0;
      }
      .user_telPhone{
        width: 90%;
        margin: 0 auto;
        height: 0.5rem;
        background: #ffffff;
        margin-bottom: 0.16rem;
        display: flex;
        >div{
          width: 0.48rem;
          height: 0.5rem;
          box-sizing: border-box;
          overflow: hidden;
          img{
            display: block;
            width: 0.19rem;
            height: 0.25rem;
            margin: 0.12rem auto;
          }
        }
        input{
          flex: 1;
          margin-top: 0.1rem;
          line-height: 0.3rem;
          font-size:0.15rem;
          font-family:PingFangSC-Regular;
          font-weight:400;
          height: 0.3rem;
          outline: none;
        }
      }
      > .userPhonePassword{
        width: 90%;
        margin: 0 auto;
        font-size:0.13rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        text-decoration:underline;
        color:rgba(5,5,9,1);
        line-height:0.18rem;
        margin-top: 0.21rem;
        margin-bottom: 0.11rem;
      }
      > .loginBnt{
        width: 90%;
        height: .5rem;
        margin: 0 auto;
        button{
          font-size: 0.16rem;
          border-radius: 0.04rem;
          background-color: #050509;
          color: #fff;
          height: .5rem;
          outline: none;
          width: 100%;
          border: none;
        }
      }
      >.loginDetail{
        width: 100%;
        text-align: center;
        height:.14rem;
        font-size:.13rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(153,153,153,1);
        line-height:.18rem;
        margin-top: 0.31rem;
        span{
          color: #050509;
        }
      }
    }
    >.loginBox_box{
      width: 100%;
      height: 100%;
    .loginTitle{
      width: 100%;
      text-align: center;
      height:0.4rem;
      font-size:0.2rem;
      font-family:PingFangSC-Light;
      font-weight:300;
      color:rgba(5,5,9,1);
      line-height:0.35rem;
      margin-top: 1.34rem;
    }
    .telPhone{
      width: 90%;
      height: 0.5rem;
      margin: 0 auto;
      background: #fff;
      margin-top: 0.44rem;
      position: relative;
      .telPhoneImae{
        width: 30%;
        height: 0.5rem;
        float: left;
        padding: 0.1rem;
        box-sizing: border-box;
        line-height: 0.3rem;
        .add86{
          font-size: 0.14rem;
          margin-left: 0.1rem;
        }
        img{
          display: inline-block;
          width:.18rem;
          height: .22rem;
          margin-right: 0.1rem;
          transform: translateY(0.03rem);
        }

      }

        input{
          width: 65%;
          position: absolute;
          line-height: 0.3rem;
          right: 0.02rem;
          box-sizing: border-box;
          top:0;
          display: block;
           outline: none;
          font-size: 0.14rem;
          text-indent: 0.1rem;
          border: none;
          margin-top: .1rem;
      }
    }
    .verificatioCode{
      width: 90%;
      height: 0.5rem;
      margin: 0 auto;
      margin: 0.15rem;
      background: #fff;
      .verificatioCodeImage{
        width: 15%;
        float: left;
        height:0.5rem;
        padding: 0.1rem;
        font-size: 0.14rem;
        box-sizing: border-box;
        img{
          display: inline-block;
          width: .18rem;
          height: .22rem;
          transform: translateY(0.03rem);
        }
      }
        input{
          width: 45%;
          float: left;
          line-height: 0.3rem;
          display: block;
          margin-top: 0.1rem;
          font-size: 0.14rem;
          outline: none;
          border: none;
        }

      .ObtainCode{
        width: 39%;
        height: 100%;
        float: right;
        font-size: 0.14rem;
        line-height:.5rem;
        padding:0 0.05rem;
        border:none;
        outline: none;
        background: #ffffff;
      }
    }
    .loginDetail{
      width: 100%;
      text-align: center;
      height:.14rem;
      font-size:.13rem;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(153,153,153,1);
      line-height:.18rem;
      margin-top: 0.31rem;
      span{
        color: #050509;
      }
    }
    .userPhonePassword{
      width: 90%;
      margin: 0 auto;
      font-size:0.13rem;
      font-family:PingFangSC-Regular;
      font-weight:400;
      text-decoration:underline;
      color:rgba(5,5,9,1);
      line-height:0.18rem;
      margin-top: 0.21rem;
      margin-bottom: 0.11rem;
    }
    .loginBnt{
      width: 90%;
      height: .5rem;
      margin: 0 auto;
      button{
        font-size: 0.16rem;
        border-radius: 0.04rem;
        background-color: #050509;
        color: #fff;
        height: .5rem;
        outline: none;
        width: 100%;
        border: none;
        }
      }
    }
  }
  .xian{
    width: 0.01rem;
    float: left;
    height: 0.2rem;
    margin-top: 0.15rem;
    background: #dcdcdc;
  }
  .xian1{
    width: 0.01rem;
    float: left;
    height: 0.2rem;
    margin-top: 0.15rem;
    background: #dcdcdc;
  }
</style>
