<template>
  <div id="loginBox">
     <img class='image' src='/static/images/loginBj.png' />
    <div class='loginTitle'>{{titleText}}</div>
    <div class="telPhone">
        <div class='telPhoneImae'> <img src='/static/images/tel.png'/><span class='add86'>+86</span> </div>
        <div class='telPhoneImae1'><input type='number' @blur='telPhone' placeholder="请输入手机号码" v-model='telValue'/></div>
    </div>
    
        <div class="verificatioCode">
        <div class='verificatioCodeImage'><img src='/static/images/code.png'></div>
        <div class='verificatioCodeImage1'><input  @blur='codePsd' placeholder="请输入验证码" v-model='psdValue'/></div>
        <button class="ObtainCode"  @click="ObtainCode" v-if='isShow'>{{code}}</button>
        <button class="ObtainCode"  disabled v-if='!isShow'>{{codeNum}}秒后重新发送</button>
        </div>
        
        <div class='loginDetail'>
        点击查看 <span @click='loginDetail1'>“用户协议” </span> 和  <span @click='loginDetail1'>“隐私政策” </span>
        </div>
    
        <div class='loginBnt' @click='loginBnt'>
           <button>登录</button>
        </div>
  </div>
</template>

<script>
  import { telCode,login} from '../../assets/js/promiseHttp';
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
   
  },
  methods:{
      loginDetail1(){ //协议，隐私

      },
    loginBnt(){ //登录
    console.log(111111)
      setTimeout(()=>{
        var that = this;
        if(!that.telValue) {
          Toast( '请填写手机号');
          return
        } 
        if(!that.psdValue) {
          Toast( '请填写验证码');
          return
        } 
        login(that.telValue,that.psdValue).then(res=>{
           console.log(res,"dshajd")
           if(res.data.status==true){
             window.sessionStorage.setItem("userInfo",JSON.stringify(item))
             this.$router.go(-1);//返回上一层
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
            if (!(/^1\d{10}$/.test(this.telValue))) {
              Toast( '手机号码有误！') ;
              return
            }
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
          var clearTime = setInterval(function () {
                  that.codeNum--;
                  if (that.codeNum <= 0) {
                    clearInterval(clearTime)
                      that.code= '重新发送';
                      that.codeNum= 60;
                      that.isShow= true;
                  }

                }, 1000)
        
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
@import "../../assets/css/login.css";
</style>
